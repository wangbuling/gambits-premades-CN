export async function powerWordStun2024({ speaker, actor, token, character, item, args, scope, workflow, options }) {
    if(args[0].macroPass === "postPreambleComplete") {
        const targets = workflow.targets;
        for(let target of targets) {
            if(target.actor.system.attributes.hp.value > 150) {
                ui.notifications.warn("目标有150以上的HP，因此未被震慑，但其速度直到施法者的下一个回合开始降为零。");
                workflow.targets.delete(target);
                await game.gps.gpsActivityUse({itemUuid: item.uuid, identifier: "syntheticSaveSuccess", targetUuid: target.document.uuid});
                continue;
            }
        }
    }
}