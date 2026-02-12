export async function huntersSense({ speaker, actor, token, character, item, args, scope, workflow, options }) {
    if (args[0].macroPass == 'preActiveEffects' && workflow.targets.size !== 1) return ui.notifications.warn("Hunter's Sense: Please target only 1 creature and try again");

    const targetActor = workflow.targets.first().actor;
    const actorPlayer = MidiQOL.playerForActor(actor);

    // Effect names to check if target is immune to Divination Magic, add additional effects below
    let effectNames = ["mind blank", "nondetection", "private sanctum"];
    let isImmuneEffect = targetActor.appliedEffects.some(effect => effectNames.includes(effect.name.toLowerCase()));
    // Item names to check if target is immune to Divination Magic, add additional items below
    let itemNames = ["反侦护符"];
    let isImmuneItem = targetActor.items.some(item => itemNames.includes(item.name.toLowerCase()) && item.system.equipped === true);

    // Function to pretty up the traits attributes with some capitalization
    function capitalizeFirstLetter(array) {
        return array.map(item => item.charAt(0).toUpperCase() + item.slice(1));
    }

    const chatMessage = game.messages.get(args[0].itemCardId);

    const damageImmunities = isImmuneEffect || isImmuneItem ? "None" : capitalizeFirstLetter(Array.from(targetActor.system.traits.di.value)).join(", ") || "None";
    const damageResistances = isImmuneEffect || isImmuneItem ? "None" : capitalizeFirstLetter(Array.from(targetActor.system.traits.dr.value)).join(", ") || "None";
    const damageVulnerabilities = isImmuneEffect || isImmuneItem ? "None" : capitalizeFirstLetter(Array.from(targetActor.system.traits.dv.value)).join(", ") || "None";

    const contentUpdate = `${targetActor.name} 具有以下伤害抗性，免疫和易伤:<br/><br/>
    - 免疫: <b>${damageImmunities}</b><br/><br/>
    - 抗性: <b>${damageResistances}</b><br/><br/>
    - 易伤: <b>${damageVulnerabilities}</b>`;

    await chatMessage.update({content: contentUpdate, whisper: actorPlayer.id});
}