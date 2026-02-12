export async function perfectSelf({ speaker, actor, token, character, item, args, scope, workflow, options }) {
    if(args[0] === "off") {
        if (actor.classes.monk.system.levels < 20) return;

        // 【第一步】在这里定义所有可能的名称（包括英文原版和所有常见汉化版）
        // 这里的 .toLowerCase() 对中文没影响，但为了兼容英文保留
        const validKiNames = ["ki", "ki points", "气", "武僧武功", "功力点", "内力"]; 

        function checkAndUpdateResource(resource) {
            // 【第二步】修改判断逻辑：检查资源标签是否包含在上面的列表里
            if (resource && validKiNames.includes(resource.label.toLowerCase())) {
                if (resource.value !== 0) return false;
                resource.value = 4;
                return true;
            }
            return false;
        }

        async function updateEffects() {
            let effectData = Array.from(actor.allApplicableEffects()).find(e => e.name === item.name);
            // 增加安全检查，防止找不到effect报错
            if(effectData) await effectData.update({"disabled" : false});
        }

        if (!checkAndUpdateResource(actor.system.resources.primary) &&
            !checkAndUpdateResource(actor.system.resources.secondary) &&
            !checkAndUpdateResource(actor.system.resources.tertiary)) {
            
            // 【第三步】修改物品查找逻辑：同样检查名字是否在列表里
            const kiItems = actor.items.filter(i => 
                validKiNames.includes(i.name.toLowerCase())
            );

            if (kiItems.length === 0) return await updateEffects();

            let itemData;
            // 下面这部分逻辑不需要动，是处理当有多个气资源时的优先级的
            if (kiItems.length > 1 && kiItems[0].system.uses.max && kiItems[1].system.uses.max) {
                itemData = kiItems[0];
            } else {
                itemData = kiItems.find(i => i.system.uses.max);
            }

            if (!itemData || (itemData.system.uses?.spent < itemData.system.uses?.max)) return await updateEffects();

            await itemData.update({"system.uses.spent": itemData.system.uses.spent - 4});
        }

        await updateEffects();
    }
}