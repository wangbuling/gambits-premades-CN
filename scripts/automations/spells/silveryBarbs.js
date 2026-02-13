export async function silveryBarbs({workflowData,workflowType,workflowCombat}) {
    const workflow = await MidiQOL.Workflow.getWorkflow(workflowData);
    if(!workflow) return;
    const gpsUuid = "548b5cab-f870-47b6-828a-8de7549debeb";
    if(workflow.item.flags["gambits-premades"]?.gpsUuid === gpsUuid) return;
    let itemName = "银光锐语";
    let dialogId = gpsUuid;
    let gmUser = game.gps.getPrimaryGM();
    let debugEnabled = MidiQOL.safeGetGameSetting('gambits-premades', 'debugEnabled');
    let homebrewDisableNat20 = MidiQOL.safeGetGameSetting('gambits-premades', 'disableSilveryBarbsOnNat20');
    let homebrewEnableNat20 = MidiQOL.safeGetGameSetting('gambits-premades', 'enableSilveryBarbsOnNat20');
    const initialTimeLeft = Number(MidiQOL.safeGetGameSetting('gambits-premades', `Silvery Barbs Timeout`));

    if(workflow.legendaryResistanceUsed) return;

    // Check if attack hits
    if(workflowType === "attack" && workflow.attackTotal < workflow.targets?.first()?.actor.system.attributes.ac.value) return debugEnabled ? game.gps.logInfo(`${itemName} failed due to no valid attack targets`) : "";
    // Check if there is a save success
    if(workflowType === "save" && workflow.saves.size === 0) return debugEnabled ? game.gps.logInfo(`${itemName} failed due to no valid save targets`) : "";

    let findValidTokens;
    
    if(workflowType === "attack") {
        findValidTokens = game.gps.findValidTokens({initiatingToken: workflow.token, targetedToken: null, itemName: itemName, itemType: "spell", itemChecked: null, reactionCheck: true, sightCheck: true, rangeCheck: true, rangeTotal: 60, dispositionCheck: true, dispositionCheckType: "enemy", workflowType: workflowType, workflowCombat: workflowCombat, gpsUuid: gpsUuid});
    }
    else if(workflowType === "save") {
        findValidTokens = game.gps.findValidTokens({initiatingToken: workflow.token, targetedToken: null, itemName: itemName, itemType: "spell", itemChecked: null, reactionCheck: true, sightCheck: false, rangeCheck: false, rangeTotal: null, dispositionCheck: true, dispositionCheckType: "ally", workflowType: workflowType, workflowCombat: workflowCombat, gpsUuid: gpsUuid});
    }
    
    let browserUser;

    for (const validTokenPrimary of findValidTokens) {
        let chosenItem = validTokenPrimary.actor.items.find(i => i.flags["gambits-premades"]?.gpsUuid === gpsUuid);
        let itemProperName = chosenItem?.name;
        const dialogTitlePrimary = `${validTokenPrimary.actor.name} | ${itemProperName}`;
        const dialogTitleGM = `等待 ${validTokenPrimary.actor.name} 选择 | ${itemName}`;
        
        browserUser = game.gps.getBrowserUser({ actorUuid: validTokenPrimary.actor.uuid });

        let dialogContent;
        const rollDetailSetting = MidiQOL.safeGetGameSetting('midi-qol', 'ConfigSettings').hideRollDetails;
        const nearbyFriendlies = MidiQOL.findNearby(null, validTokenPrimary, 60, { includeToken: true });
        let validFriendlies = nearbyFriendlies.filter(token => token.document.disposition === validTokenPrimary.document.disposition && MidiQOL.canSee(validTokenPrimary.document.uuid,token.document.uuid) && !token.actor.effects.getName(`${itemProperName} - Advantage`));

        if(workflowType === "save") {
            let targets = Array.from(workflow.saves).filter(t => t.document.disposition !== validTokenPrimary.document.disposition && MidiQOL.canSee(validTokenPrimary, t) && MidiQOL.computeDistance(validTokenPrimary, t, {wallsBlock: true, includeCover: true}) <= 60);

            if(targets.length === 0) {
                debugEnabled ? game.gps.logInfo(`${itemName} for ${validTokenPrimary.actor.name} failed due to no valid save targets`) : "";
                continue;
            }

            const targetUuids = targets.map(t => t.document.uuid);
            const targetNames = targets.map(t => t.document.name);
        
            dialogContent = `
                <div class="gps-dialog-container">
                    <div class="gps-dialog-section">
                        <div class="gps-dialog-content">
                            <p class="gps-dialog-paragraph">你是否要使用反应施展 ${itemProperName}? ${targets.length > 1 ? "敌人豁免成功，选择一个敌人作为目标并且：" : "敌人豁免成功，选择"} 一个盟友给予优势：</p>
                            <div class="gps-dialog-flex-wrapper">
                                <div class="gps-dialog-select-container">
                                    <div class="gps-dialog-flex">
                                    <label for="enemy-token" class="gps-dialog-label">Target:</label>
                                    <select id="enemy-token" class="gps-dialog-select">
                                        ${targetNames.map((name, index) => `<option class="gps-dialog-option" value="${targetUuids[index]}">${name}</option>`).join('')}
                                    </select>
                                    </div>
                                    <div class="gps-dialog-flex">
                                    <label for="ally-token" class="gps-dialog-label">Advantage:</label>
                                    ${validFriendlies.length >= 1 ? 
                                    `<select id="ally-token" class="gps-dialog-select">
                                        ${validFriendlies.map(friendly => `<option class="gps-dialog-option" value="${friendly.document.uuid}">${friendly.document.name}</option>`).join('')}
                                    </select>` : '<div style="padding: 4px; width: 100%; box-sizing: border-box; line-height: normal;"> 距离内没有友军。</div>'
                                    }
                                    </div>
                                </div>
                                <div id="image-container" class="gps-dialog-image-container">
                                    <img id="img_${dialogId}" src="${chosenItem.img}" class="gps-dialog-image">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="gps-dialog-button-container">
                        <button id="pauseButton_${dialogId}" type="button" class="gps-dialog-button">
                            <i class="fas fa-pause" id="pauseIcon_${dialogId}" style="margin-right: 5px;"></i>Pause
                        </button>
                    </div>
                </div>
            `;
        }
        else if(workflowType === "attack") {
            if (workflow.token.document.disposition === validTokenPrimary.document.disposition) {
                debugEnabled ? game.gps.logInfo(`${itemName} for ${validTokenPrimary.actor.name} failed due to no valid attack targets`) : "";
                continue;
            }
            if (homebrewDisableNat20 && workflow.isCritical === true) return debugEnabled ? game.gps.logInfo(`${itemName} failed due to homebrew rule disabling on criticle success`) : "";
            if (homebrewEnableNat20 && workflow.isCritical !== true) return debugEnabled ? game.gps.logInfo(`${itemName} failed due to homebrew rule enabling only on criticle success`) : "";

            dialogContent = `
                <div class="gps-dialog-container">
                    <div class="gps-dialog-section">
                        <div class="gps-dialog-content">
                            <p class="gps-dialog-paragraph">Would you like to use your reaction to cast ${itemProperName}? ${["none", "detailsDSN", "details"].includes(rollDetailSetting) ? `一个敌人成功以 ${workflow.attackTotal} 命中你的盟友。` : "一个敌人成功命中你的盟友。"} 选择一个盟友给予优势：</p>
                            <div>
                                <div class="gps-dialog-flex">
                                    <label for="ally-token" class="gps-dialog-label">优势：</label>
                                    ${validFriendlies.length >= 1 ? 
                                    `<select id="ally-token" class="gps-dialog-select">
                                        ${validFriendlies.map(friendly => `<option class="gps-dialog-option" value="${friendly.document.uuid}">${friendly.document.name}</option>`).join('')}
                                    </select>` : '<div style="padding: 4px; width: 100%; box-sizing: border-box; line-height: normal;"> 距离内没有友军。</div>'
                                    }
                                    <div id="image-container" class="gps-dialog-image-container">
                                        <img id="img_${dialogId}" src="${chosenItem.img}" class="gps-dialog-image">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="gps-dialog-button-container">
                        <button id="pauseButton_${dialogId}" type="button" class="gps-dialog-button">
                            <i class="fas fa-pause" id="pauseIcon_${dialogId}" style="margin-right: 5px;"></i>Pause
                        </button>
                    </div>
                </div>
            `;
        }

        let content = `<span style='text-wrap: wrap;'><img src="${validTokenPrimary.actor.img}" style="width: 25px; height: auto;" /> ${validTokenPrimary.actor.name} 可以用反应触发 ${itemProperName}.</span>`
        let chatData = { user: gmUser, content: content, roll: false };
        let notificationMessage = await MidiQOL.socket().executeAsUser("createChatMessage", gmUser, { chatData });
        
        let result;

        if (MidiQOL.safeGetGameSetting('gambits-premades', 'Mirror 3rd Party Dialog for GMs') && browserUser !== gmUser) {
            let userDialogArgs = { dialogTitle: dialogTitlePrimary, dialogContent, dialogId, initialTimeLeft, validTokenPrimaryUuid: validTokenPrimary.document.uuid, source: "user", type: "multiDialog", browserUser: browserUser, notificationId: notificationMessage._id };
            
            let gmDialogArgs = { dialogTitle: dialogTitleGM, dialogContent, dialogId, initialTimeLeft, validTokenPrimaryUuid: validTokenPrimary.document.uuid, source: "gm", type: "multiDialog", notificationId: notificationMessage._id };
            
            result = await game.gps.socket.executeAsUser("handleDialogPromises", gmUser, {userDialogArgs, gmDialogArgs});
        } else {
            result = await game.gps.socket.executeAsUser("process3rdPartyReactionDialog", browserUser, {dialogTitle:dialogTitlePrimary,dialogContent,dialogId,initialTimeLeft,validTokenPrimaryUuid: validTokenPrimary.document.uuid,source: gmUser === browserUser ? "gm" : "user",type:"singleDialog", notificationId: notificationMessage._id});
        }
                
        const { userDecision, enemyTokenUuid, allyTokenUuid, damageChosen, source, type } = result || {};

        if (!userDecision) {
            continue;
        }
        else if (userDecision) {
            let advantageToken;
            let enemyToken;
            if(allyTokenUuid) advantageToken = await fromUuid(allyTokenUuid);
            if(enemyTokenUuid) enemyToken = await fromUuid(enemyTokenUuid);
            let chatContent;

            const options = {
                showFullCard: false,
                createWorkflow: true,
                versatile: false,
                configureDialog: true,
                targetUuids: [(enemyTokenUuid) ? enemyTokenUuid : workflow.token.document.uuid],
            };
            
            let itemRoll;
            if(source && source === "user") itemRoll = await MidiQOL.socket().executeAsUser("completeItemUse", browserUser, { itemData: chosenItem, actorUuid: validTokenPrimary.actor.uuid, options: options });
            else if(source && source === "gm") itemRoll = await MidiQOL.socket().executeAsUser("completeItemUse", gmUser, { itemData: chosenItem, actorUuid: validTokenPrimary.actor.uuid, options: options });

            if(!itemRoll) continue;

            await game.gps.addReaction({actorUuid: `${validTokenPrimary.actor.uuid}`});

            let effectData = [
                {
                    "icon": `${chosenItem.img}`,
                    "origin": `${validTokenPrimary.actor.uuid}`,
                    "duration": {
                    "seconds": 60
                    },
                    "disabled": false,
                    "name": "Silvery Barbs - Advantage",
                    "changes": [
                    {
                        "key": "flags.midi-qol.advantage.attack.all",
                        "mode": 0,
                        "value": "1",
                        "priority": 20
                    },
                    {
                        "key": "flags.midi-qol.advantage.check.all",
                        "mode": 0,
                        "value": "1",
                        "priority": 20
                    },
                    {
                        "key": "flags.midi-qol.advantage.save.all",
                        "mode": 0,
                        "value": "1",
                        "priority": 20
                    }
                    ],
                    "transfer": false,
                    "flags": {
                    "dae": {
                        "specialDuration": [
                            "1Attack",
                            "isCheck",
                            "isSave",
                            "isSkill"
                        ]
                    }
                    }
                }
            ];
            if(advantageToken) await MidiQOL.socket().executeAsUser("createEffects", gmUser, { actorUuid: advantageToken.actor.uuid, effects: effectData });

            let cprConfig = game.gps.getCprConfig({itemUuid: chosenItem.uuid});
            const { animEnabled } = cprConfig;
            if(animEnabled) {
                new Sequence()
                .effect()
                    .file("animated-spell-effects-cartoon.misc.music.01")
                    .fadeIn(500)
                    .fadeOut(500)
                    .atLocation(validTokenPrimary, {offset:{x: -550, y: 180}, local: true})
                    .stretchTo((enemyTokenUuid) ? enemyToken.object : workflow.token, {offset:{x: 200, y: -150}, local: true})
                    .playbackRate(1)
                .play()

                new Sequence()
                .effect()
                    .file("jb2a.cast_generic.sound.side01.pinkteal")
                    .fadeIn(500)
                    .fadeOut(500)
                    .atLocation((enemyTokenUuid) ? enemyToken.object : workflow.token)
                    .scaleToObject(4)
                    .playbackRate(1)
                .play()
            }

            if(workflowType === "save") {
                let isSave = workflow?.saveActivity.type === "save" ? true : false;
                let saveDC = workflow?.saveActivityDetails?.dc?.value;
                let getAbility = workflow?.saveActivityDetails?.ability?.first() ?? workflow?.saveActivityDetails?.ability;
                let saveAbility = isSave ? getAbility : workflow?.saveActivityDetails?.associated.first() ? workflow?.saveActivityDetails?.associated.first() : getAbility;
                let workflowTarget = Array.from(workflow.saves).find(t => t.document.uuid === enemyTokenUuid);

                let browserUserTarget = game.gps.getBrowserUser({ actorUuid: workflowTarget.actor.uuid });
                let targetSaveBonus = isSave ? workflowTarget.actor.system.abilities[`${saveAbility}`]?.save?.value : workflowTarget.actor.system.skills[`${saveAbility}`]?.total ? workflowTarget.actor.system.skills[`${saveAbility}`].total : workflowTarget.actor.system.abilities[`${saveAbility}`].mod;
                let reroll;
                if(workflowTarget.actor.type !== "npc") reroll = await game.gps.socket.executeAsUser("rollAsUser", browserUserTarget, { rollParams: `1d20 + ${targetSaveBonus}` });
                else reroll = await game.gps.socket.executeAsUser("rollAsUser", gmUser, { rollParams: `1d20 + ${targetSaveBonus}` });

                if(reroll.total < saveDC) {
                    workflow.saves.delete(workflowTarget);
                    workflow.failedSaves.add(workflowTarget);

                    chatContent = `<span style='text-wrap: wrap;'>生物被银光锐语影响，并在 ${workflow.item.name} 的 ${isSave ? "save" : "check"} 中失败。 <img src="${workflowTarget.actor.img}" width="30" height="30" style="border:0px"></span>`;
                    await game.gps.socket.executeAsUser("replaceChatCard", gmUser, {actorUuid: validTokenPrimary.actor.uuid, itemUuid: chosenItem.uuid, chatContent: chatContent, rollData: reroll});
                    return;
                }

                else {
                    chatContent = `<span style='text-wrap: wrap;'>生物被银光锐语影响，但仍在 ${workflow.item.name} 的 ${isSave ? "save" : "check"} 中成功。 <img src="${workflowTarget.actor.img}" width="30" height="30" style="border:0px"></span>`;
                    await game.gps.socket.executeAsUser("replaceChatCard", gmUser, {actorUuid: validTokenPrimary.actor.uuid, itemUuid: chosenItem.uuid, chatContent: chatContent, rollData: reroll});
                    continue;
                }
            }
            else if(workflowType === "attack") {
                let rerollAddition = workflow.attackRoll.total - workflow.attackRoll.dice[0].total;
                let targetAC = workflow.targets.first().actor.system.attributes.ac.value;
                const saveSetting = workflow.workflowOptions.noOnUseMacro;
                workflow.workflowOptions.noOnUseMacro = true;
                let reroll;
                if(source && source === "user") reroll = await game.gps.socket.executeAsUser("rollAsUser", browserUser, { rollParams: `1d20 + ${rerollAddition}` });
                if(source && source === "gm") reroll = await game.gps.socket.executeAsUser("rollAsUser", gmUser, { rollParams: `1d20 + ${rerollAddition}` });
                if(reroll.total < workflow.attackTotal) await workflow.setAttackRoll(reroll);

                workflow.workflowOptions.noOnUseMacro = saveSetting;

                if(workflow.attackTotal < targetAC) {                    
                    chatContent = `<span style='text-wrap: wrap;'>生物被银光锐语所影响，并攻击失手。 <img src="${workflow.token.actor.img}" width="30" height="30" style="border:0px"></span>`;
                    await game.gps.socket.executeAsUser("replaceChatCard", gmUser, {actorUuid: validTokenPrimary.actor.uuid, itemUuid: chosenItem.uuid, chatContent: chatContent, rollData: reroll});
                    return;
                }

                else {
                    chatContent = `<span style='text-wrap: wrap;'>生物被银光锐语所影响，但仍攻击命中。 <img src="${workflow.token.actor.img}" width="30" height="30" style="border:0px"></span>`;
                    await game.gps.socket.executeAsUser("replaceChatCard", gmUser, {actorUuid: validTokenPrimary.actor.uuid, itemUuid: chosenItem.uuid, chatContent: chatContent, rollData: reroll});
                    continue;
                }
            }
        }
    }
}