export async function starMap({ item }) {
    let freeUses = item.system.uses.max - item.system.uses.spent;

    if(freeUses === 0) return false;

    let result = await foundry.applications.api.DialogV2.wait({
        window: { title: `Free ${item.name} Use` },
        content: `
            <div class="gps-dialog-container">
                <div class="gps-dialog-section">
                    <div class="gps-dialog-content">
                        <div>
                            <div class="gps-dialog-flex">
                                <p class="gps-dialog-paragraph">你是否要使用星图来免费施展一次 ${item.name}? 它将以基础法术环级施展。你还有 ${freeUses} 次剩余。</p>
                                <div id="image-container" class="gps-dialog-image-container">
                                    <img src="${item.img}" class="gps-dialog-image">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        buttons: [{
            action: "Yes",
            label: "是",
            callback: async (event, button, dialog) => {
                await item.update({ "system.uses.spent": item.system.uses.spent + 1 });
                ui.notifications.info(`你使用了星图来施展 ${item.name} ，没有消耗法术环位。`);
                return true;
            }
        },
        {
            action: "No",
            label: "否",
            callback: async () => {return false;}
        }],
        close: async (event, dialog) => {
            return false;
        }, rejectClose:false
    });

    return result;
}