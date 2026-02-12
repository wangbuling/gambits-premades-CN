export async function poetryInMisery({workflowData,workflowType,workflowCombat}) {
    const workflow = workflowCombat ? await MidiQOL.Workflow.getWorkflow(workflowData) ?? null : null;
    if(!workflow && workflowCombat === true) return;
    const gpsUuid = "f4b6923a-eda4-4c29-a6fb-a1728f6e71e3";
    if(workflow?.item.flags["gambits-premades"]?.gpsUuid === gpsUuid) return;
    let itemName = "惨中取意";
    let dialogId = gpsUuid;
    let initiatingToken;
    (workflow) ? initiatingToken = workflow.token : initiatingToken = await MidiQOL.tokenForActor(workflowData.actor.uuid);
    let gmUser = game.gps.getPrimaryGM();
    const initialTimeLeft = Number(MidiQOL.safeGetGameSetting('gambits-premades', `Poetry in Misery Timeout`));

    let findValidTokens = game.gps.findValidTokens({initiatingToken: initiatingToken, targetedToken: initiatingToken, itemName: itemName, itemType: null, itemChecked: null, reactionCheck: true, sightCheck: false, rangeCheck: true, rangeTotal: 30, dispositionCheck: true, dispositionCheckType: "ally", workflowType: workflowType, workflowCombat: workflowCombat, gpsUuid: gpsUuid});

    let browserUser;

    for (const validTokenPrimary of findValidTokens) {
        const itemData = validTokenPrimary.actor.items.find(i => i.identifier.includes("bardic-inspiration"));

        if(itemData) {
            if(itemData.system.uses.spent === 0) continue;
        }

        let chosenItem = validTokenPrimary.actor.items.find(i => i.flags["gambits-premades"]?.gpsUuid === gpsUuid);
        let itemProperName = chosenItem?.name;
        const dialogTitlePrimary = `${validTokenPrimary.actor.name} | ${itemProperName}`;
        const dialogTitleGM = `等待 ${validTokenPrimary.actor.name} 选择 | ${itemProperName}`;
        browserUser = game.gps.getBrowserUser({ actorUuid: validTokenPrimary.actor.uuid });
        let chatActor;

        if (workflowType === "attack") {
            if(initiatingToken.document.disposition !== validTokenPrimary.document.disposition) continue;
            if(!workflow.attackRoll.isFumble) return;
        }
        if (workflowType === "save") {
            if(workflow) {
                if(initiatingToken.document.disposition === validTokenPrimary.document.disposition) continue;
                const fumbleRoll = workflow.saveRolls.find(roll => roll.isFumble && roll.data.token.document.disposition === validTokenPrimary.document.disposition);
                if(!fumbleRoll) return;
                chatActor = fumbleRoll.data.token.actor;
            }
            else {
                if(initiatingToken.document.disposition !== validTokenPrimary.document.disposition) continue;
                if(!workflowData.roll.isFumble) return;
                chatActor = initiatingToken.actor;
            }
        }
        if(workflowType === "ability" || workflowType === "skill") {
            if(initiatingToken.document.disposition !== validTokenPrimary.document.disposition) continue;
            if(!workflowData.roll.isFumble) return;
        }

        let dialogContent = `
            <div class="gps-dialog-container">
                <div class="gps-dialog-section">
                    <div class="gps-dialog-content">
                        <div>
                            <div class="gps-dialog-flex">
                                <p class="gps-dialog-paragraph">你是否要使用反应对此自然1 ${workflowType} 掷骰施展 ${itemProperName} ?</p>
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

        let result;
        let content = `<span style='text-wrap: wrap;'><img src="${validTokenPrimary.actor.img}" style="width: 25px; height: auto;" /> ${validTokenPrimary.actor.name} has a reaction available for a roll triggering ${itemProperName}.</span>`
        let chatData = { user: gmUser, content: content, roll: false };
        let notificationMessage = await MidiQOL.socket().executeAsUser("createChatMessage", gmUser, { chatData });

        if (MidiQOL.safeGetGameSetting('gambits-premades', 'Mirror 3rd Party Dialog for GMs') && browserUser !== gmUser) {
            let userDialogArgs = { dialogTitle:dialogTitlePrimary,dialogContent,dialogId,initialTimeLeft,validTokenPrimaryUuid: validTokenPrimary.document.uuid,source: "user",type: "multiDialog", browserUser: browserUser, notificationId: notificationMessage._id };
            
            let gmDialogArgs = { dialogTitle:dialogTitleGM,dialogContent,dialogId,initialTimeLeft,validTokenPrimaryUuid: validTokenPrimary.document.uuid,source: "gm",type: "multiDialog", notificationId: notificationMessage._id };
        
            result = await game.gps.socket.executeAsUser("handleDialogPromises", gmUser, {userDialogArgs, gmDialogArgs});
        } else {
            result = await game.gps.socket.executeAsUser("process3rdPartyReactionDialog", browserUser, {dialogTitle:dialogTitlePrimary,dialogContent,dialogId,initialTimeLeft,validTokenPrimaryUuid: validTokenPrimary.document.uuid,source: gmUser === browserUser ? "gm" : "user",type:"singleDialog", notificationId: notificationMessage._id});
        }

        const { userDecision, enemyTokenUuid, allyTokenUuid, damageChosen, source, type } = result || {};

        if (!userDecision) {
            continue;
        }
        else if (userDecision) {
            await game.gps.addReaction({actorUuid: `${validTokenPrimary.actor.uuid}`});

            if(itemData) {
                await itemData.update({ 'system.uses.spent' : itemData.system.uses.spent - 1 })
            }

            let typeText = (workflowType === "attack") ? `${initiatingToken.actor.name} 的自然1攻击掷骰` : (workflowType === "ability") ? `${initiatingToken.actor.name} 的自然1属性检定` : (workflowType === "skill") ? `${initiatingToken.actor.name} 的自然1技能检定` : `${chatActor.name} 的自然1豁免检定`;

            let contentOutcome = `<span style='text-wrap: wrap;'>你在 ${typeText} 面前独自沉思，并施展 ${itemProperName} 恢复了一次诗人激励使用次数。<br/><img src="${initiatingToken.actor.img}" width="30" height="30" style="border:0px"></span>`;
            let actorPlayer = MidiQOL.playerForActor(validTokenPrimary.actor);
            let chatDataOutcome = {
            user: actorPlayer.id,
            speaker: ChatMessage.getSpeaker({ token: validTokenPrimary }),
            content: contentOutcome
            };
            ChatMessage.create(chatDataOutcome);
            continue;
        }
    }
}