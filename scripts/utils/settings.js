// Create a Base class mixing in Handlebars support onto V2 Application
const Base = foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.api.ApplicationV2);

export function registerSettings() {
    game.settings.register('gambits-premades', 'Mirror 3rd Party Dialog for GMs', {
        name: "GM第三方对话框镜像",
        hint: "启用后，第三方对话框将同时发送给GM与玩家，任意一方均可操作对话框以使用/关闭/暂停功能。",
        scope: 'world',
        config: false,
        type: Boolean,
        default: false
    });

    game.settings.register('gambits-premades', 'Enable Opportunity Attack', {
        name: "启用借机攻击",
        hint: "启用后，在战斗开始时自动为相关参战者添加“借机攻击”物品，并在战斗结束时移除该物品。",
        scope: 'world',
        config: false,
        type: Boolean,
        default: false
    });

    game.settings.register('gambits-premades', 'Opportunity Attack Timeout', {
        name: "借机攻击超时时间",
        hint: "输入自定义数值（单位：秒）。默认超时时间为15秒",
        scope: 'world',
        config: false,
        type: String,
        default: "15"
    });

    game.settings.register('gambits-premades', 'Enable Counterspell', {
        name: "启用法术反制",
        hint: "若启用此功能，当角色身上存在法术反制时，系统将向用户弹出相应对话框，并在使用法术反制时自动应用该效果。",
        scope: 'world',
        config: false,
        type: Boolean,
        default: false
    });

    game.settings.register('gambits-premades', 'Counterspell Timeout', {
        name: "法术反制超时时间",
        hint: "输入自定义数值（单位：秒）。默认超时时间为15秒。",
        scope: 'world',
        config: false,
        type: String,
        default: "15",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register('gambits-premades', 'Enable Silvery Barbs', {
        name: "启用银光锐语",
        hint: "若启用此功能，当角色身上存在银光锐语时，系统将向用户弹出相应对话框，并在使用银光锐语时自动应用该效果。",
        scope: 'world',
        config: false,
        type: Boolean,
        default: false
    });

    game.settings.register('gambits-premades', 'Silvery Barbs Timeout', {
        name: "银光锐语超时时间",
        hint: "输入自定义数值（单位：秒）。默认超时时间为30秒。",
        scope: 'world',
        config: false,
        type: String,
        default: "30",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register('gambits-premades', 'Enable Cutting Words', {
        name: "启用语出惊人",
        hint: "若启用此功能，当角色身上存在语出惊人时，系统将向用户弹出相应对话框，并在使用语出惊人时自动应用该效果。",
        scope: 'world',
        config: false,
        type: Boolean,
        default: false
    });

    game.settings.register('gambits-premades', 'Cutting Words Timeout', {
        name: "语出惊人超时时间",
        hint: "输入自定义数值（单位：秒）。默认超时时间为30秒。",
        scope: 'world',
        config: false,
        type: String,
        default: "30",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register('gambits-premades', 'Enable Interception', {
        name: "启用拦截",
        hint: "若启用此功能，当角色身上存在战斗风格：拦截时，系统将向用户弹出相应对话框，并在使用拦截时自动应用该效果。",
        scope: 'world',
        config: false,
        type: Boolean,
        default: false
    });

    game.settings.register('gambits-premades', 'Interception Timeout', {
        name: "拦截超时时间",
        hint: "输入自定义数值（单位：秒）。默认超时时间为30秒。",
        scope: 'world',
        config: false,
        type: String,
        default: "30",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register('gambits-premades', 'Enable Indomitable', {
        name: "启用不屈",
        hint: "",
        scope: 'world',
        config: false,
        type: Boolean,
        default: false
    });

    game.settings.register('gambits-premades', 'Indomitable Timeout', {
        name: "不屈超时时间",
        hint: "",
        scope: 'world',
        config: false,
        type: String,
        default: "15",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register('gambits-premades', 'Enable Protection', {
        name: "启用守护（战斗风格）",
        hint: "",
        scope: 'world',
        config: false,
        type: Boolean,
        default: false
    });

    game.settings.register('gambits-premades', 'Protection Timeout', {
        name: "守护超时时间",
        hint: "",
        scope: 'world',
        config: false,
        type: String,
        default: "15",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register('gambits-premades', 'Enable Sentinel', {
        name: "启用哨兵",
        hint: "",
        scope: 'world',
        config: false,
        type: Boolean,
        default: false
    });

    game.settings.register('gambits-premades', 'Sentinel Timeout', {
        name: "哨兵超时时间",
        hint: "",
        scope: 'world',
        config: false,
        type: String,
        default: "15",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register('gambits-premades', 'Enable Riposte', {
        name: "启用反击（战技）",
        hint: "",
        scope: 'world',
        config: false,
        type: Boolean,
        default: false
    });

    game.settings.register('gambits-premades', 'Riposte Timeout', {
        name: "反击超时时间",
        hint: "",
        scope: 'world',
        config: false,
        type: String,
        default: "15",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register('gambits-premades', 'Enable Poetry in Misery', {
        name: "启用惨中取意",
        hint: "若启用此功能，当角色身上存在吟游诗人特性惨中取意时，系统将向用户弹出相应对话框，并在使用时自动应用该效果。",
        scope: 'world',
        config: false,
        type: Boolean,
        default: false
    });

    game.settings.register('gambits-premades', 'Poetry in Misery Timeout', {
        name: "惨中取意超时时间",
        hint: "输入自定义数值（单位：秒）。默认超时时间为15秒。",
        scope: 'world',
        config: false,
        type: String,
        default: "15",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register('gambits-premades', 'Enable Witches Hex', {
        name: "启用女巫诅咒",
        hint: "若启用此功能，当角色身上存在女巫特性女巫诅咒时，系统将向用户弹出相应对话框，并在使用时自动应用该效果。",
        scope: 'world',
        config: false,
        type: Boolean,
        default: false
    });

    game.settings.register('gambits-premades', 'Witches Hex Timeout', {
        name: "女巫诅咒超时时间",
        hint: "输入自定义数值（单位：秒）。默认超时时间为30秒。",
        scope: 'world',
        config: false,
        type: String,
        default: "30",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register('gambits-premades', 'Enable Power Word Rebound', {
        name: "启用律令反弹",
        hint: "若启用此功能，当角色身上存在律令反弹法术时，系统将向用户弹出相应对话框，并在使用时自动应用该效果。",
        scope: 'world',
        config: false,
        type: Boolean,
        default: false
    });

    game.settings.register('gambits-premades', 'Power Word Rebound Timeout', {
        name: "律令反弹超时时间",
        hint: "输入自定义数值（单位：秒）。默认超时时间为30秒。",
        scope: 'world',
        config: false,
        type: String,
        default: "15",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register('gambits-premades', 'Enable Identify Restrictions', {
        name: "启用鉴定限制",
        hint: "若启用此功能，将限制玩家角色鉴定未识别物品的方式，仅能通过我的鉴定术自动化功能实现。",
        scope: 'world',
        config: false,
        type: Boolean,
        default: false
    });

    game.settings.register('gambits-premades', 'Identify Restriction Message', {
        name: "鉴定限制提示信息",
        hint: "这是当用户受到限制时将显示的信息。",
        scope: 'world',
        config: false,
        type: String,
        default: "Nice try, DENIED ;)"
    });

    game.settings.register('gambits-premades', 'enableTimerFullAnim', {
        name: "启用计时器全栏动画",
        hint: "若启用，对话框的倒计时动画将覆盖整个标题栏，而非仅标题栏边框。",
        scope: 'world',
        config: false,
        type: Boolean,
        default: false
    });

    game.settings.register('gambits-premades', 'enable3prNoCombat', {
        name: "在战斗外启用第三方反应",
        hint: "若启用，将允许第三方反应功能在战斗未激活时生效。",
        scope: 'world',
        config: false,
        type: Boolean,
        default: false
    });

    game.settings.register('gambits-premades', 'hideTemplates', {
        name: "隐藏测量版",
        hint: "此项设置对于借机攻击始终启用。若启用，将完全隐藏本模块中其他使用测量版的自动化功能所产生的测量版。不会隐藏本模块之外的自动化功能或测量版。",
        scope: 'world',
        config: false,
        type: Boolean,
        default: false
    });

    game.settings.register('gambits-premades', 'debugEnabled', {
        name: "启用调试",
        hint: "若启用，将为反应验证过程输出控制台日志以进行故障排除。",
        scope: 'world',
        config: false,
        type: Boolean,
        default: false
    });

    game.settings.register("gambits-premades", "disableSilveryBarbsOnNat20", {
        name: "N20时禁用银光锐语",
        scope: "world",
        config: false,
        type: Boolean,
        default: false,
        type: Boolean
    });
    
    game.settings.register("gambits-premades", "enableSilveryBarbsOnNat20", {
        name: "仅在N20时启用银光锐语",
        scope: "world",
        config: false,
        type: Boolean,
        default: false,
        type: Boolean
    });

    game.settings.register("gambits-premades", "enableAutoSucceedIndomitable", {
        name: "启用不屈自动成功",
        scope: "world",
        config: false,
        type: Boolean,
        default: false,
        type: Boolean
    });

    game.settings.register("gambits-premades", "enableProtectionOnSuccess", {
        name: "仅在攻击成功时启用守护",
        scope: "world",
        config: false,
        type: Boolean,
        default: false,
        type: Boolean
    });

    game.settings.register("gambits-premades", "enableCounterspellSpellPenetration", {
        name: "启用法术反制穿透",
        scope: "world",
        config: false,
        type: Boolean,
        default: false,
        type: Boolean
    });

    game.settings.register("gambits-premades", "enableMageSlayer", {
        name: "启用巫师杀手",
        scope: "world",
        config: false,
        type: Boolean,
        default: false,
        type: Boolean
    });

    game.settings.register('gambits-premades', 'Mage Slayer Timeout', {
        name: "巫师杀手超时时间",
        hint: "输入自定义数值（单位：秒）。默认超时时间为15秒。",
        scope: 'world',
        config: false,
        type: String,
        default: "15",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register("gambits-premades", "enableInstinctiveCharm", {
        name: "启用直觉魅惑",
        scope: "world",
        config: false,
        type: Boolean,
        default: false,
        type: Boolean
    });

    game.settings.register('gambits-premades', 'Instinctive Charm Timeout', {
        name: "直觉魅惑超时时间",
        hint: "输入自定义数值（单位：秒）。默认超时时间为15秒。",
        scope: 'world',
        config: false,
        type: String,
        default: "15",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register("gambits-premades", "enableRainOfCinders", {
        name: "启用灰烬之雨",
        scope: "world",
        config: false,
        type: Boolean,
        default: false,
        type: Boolean
    });

    game.settings.register('gambits-premades', 'Rain of Cinders Timeout', {
        name: "灰烬之雨超时时间",
        hint: "输入自定义数值（单位：秒）。默认超时时间为15秒。",
        scope: 'world',
        config: false,
        type: String,
        default: "15",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register("gambits-premades", "enableRestoreBalance", {
        name: "启用归复平衡",
        scope: "world",
        config: false,
        type: Boolean,
        default: false,
        type: Boolean
    });

    game.settings.register('gambits-premades', 'Restore Balance Timeout', {
        name: "归复平衡超时时间",
        hint: "输入自定义数值（单位：秒）。默认超时时间为15秒。",
        scope: 'world',
        config: false,
        type: String,
        default: "15",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register("gambits-premades", "enableLegendaryResistance", {
        name: "启用传奇抗性",
        scope: "world",
        config: false,
        type: Boolean,
        default: false,
        type: Boolean
    });

    game.settings.register('gambits-premades', 'Legendary Resistance Timeout', {
        name: "传奇抗性超时时间",
        hint: "输入自定义数值（单位：秒）。默认超时时间为15秒。",
        scope: 'world',
        config: false,
        type: String,
        default: "15",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register("gambits-premades", "enableBurstOfIngenuity", {
        name: "启用灵光乍现",
        scope: "world",
        config: false,
        type: Boolean,
        default: false,
        type: Boolean
    });

    game.settings.register('gambits-premades', 'Burst of Ingenuity Timeout', {
        name: "灵光乍现超时时间",
        hint: "输入自定义数值（单位：秒）。默认超时时间为15秒。",
        scope: 'world',
        config: false,
        type: String,
        default: "15",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register("gambits-premades", "enableTemporalShunt", {
        name: "启用时刹流转",
        scope: "world",
        config: false,
        type: Boolean,
        default: false,
        type: Boolean
    });

    game.settings.register('gambits-premades', 'Temporal Shunt Timeout', {
        name: "时流刹转超时时间",
        hint: "输入自定义数值（单位：秒）。默认超时时间为15秒。",
        scope: 'world',
        config: false,
        type: String,
        default: "15",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register("gambits-premades", "enableChronalShift", {
        name: "启用时间变换",
        scope: "world",
        config: false,
        type: Boolean,
        default: false,
        type: Boolean
    });

    game.settings.register('gambits-premades', 'Chronal Shift Timeout', {
        name: "时间变换超时时间",
        hint: "输入自定义数值（单位：秒）。默认超时时间为15秒。",
        scope: 'world',
        config: false,
        type: String,
        default: "15",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register("gambits-premades", "enableMagicUsersNemesis", {
        name: "启用魔法使的克星",
        scope: "world",
        config: false,
        type: Boolean,
        default: false,
        type: Boolean
    });

    game.settings.register('gambits-premades', "Magic-User's Nemesis Timeout", {
        name: "魔法使的克星超时时间",
        hint: "输入自定义数值（单位：秒）。默认超时时间为15秒。",
        scope: 'world',
        config: false,
        type: String,
        default: "15",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register("gambits-premades", "enableDreadCounterspell", {
        name: "启用恐惧反制",
        scope: "world",
        config: false,
        type: Boolean,
        default: false,
        type: Boolean
    });

    game.settings.register('gambits-premades', "Dread Counterspell Timeout", {
        name: "恐惧反制超时时间",
        hint: "输入自定义数值（单位：秒）。默认超时时间为15秒。",
        scope: 'world',
        config: false,
        type: String,
        default: "15",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register("gambits-premades", "enableTaleOfHubris", {
        name: "启用盛极必衰",
        scope: "world",
        config: false,
        type: Boolean,
        default: false,
        type: Boolean
    });

    game.settings.register('gambits-premades', 'Tale of Hubris Timeout', {
        name: "盛极必衰超时时间",
        hint: "输入自定义数值（单位：秒）。默认超时时间为15秒。",
        scope: 'world',
        config: false,
        type: String,
        default: "15",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register("gambits-premades", "enableFlashOfGenius", {
        name: "启用灵光一闪",
        scope: "world",
        config: false,
        type: Boolean,
        default: false,
        type: Boolean
    });

    game.settings.register('gambits-premades', 'Flash of Genius Timeout', {
        name: "灵光一闪超时时间",
        hint: "输入自定义数值（单位：秒）。默认超时时间为15秒。",
        scope: 'world',
        config: false,
        type: String,
        default: "15",
        onChange: value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
            } else {
                game.gps.logInfo("Invalid input for Numeric Setting Example: Not a number.");
            }
        }
    });

    game.settings.register("gambits-premades", "disableCuttingWordsMaxMiss", {
        name: "禁用语出惊人最大失手",
        scope: "world",
        config: false,
        type: Boolean,
        default: false,
        type: Boolean
    });

    game.settings.register("gambits-premades", "enableRegionWrapping", {
        name: "启用区域环绕",
        scope: "world",
        config: false,
        type: Boolean,
        default: true,
        type: Boolean
    });

    game.settings.register('gambits-premades', 'primaryGM', {
        name: "首选GM",
        hint: "",
        scope: 'world',
        config: false,
        type: String,
        default: ""
    });

    game.settings.register("gambits-premades", "enableTokenMovementSpeed", {
        name: "启用Token移动速度调整",
        scope: "world",
        config: false,
        type: Boolean,
        default: false,
        onChange: value => {
          if(!value) CONFIG.Token.movement.defaultSpeed = 6;
          else if(!isNaN(game.settings.get('gambits-premades', 'tokenMovementSpeed'))) CONFIG.Token.movement.defaultSpeed = game.settings.get('gambits-premades', 'tokenMovementSpeed');
        }
    });

    game.settings.register('gambits-premades', 'tokenMovementSpeed', {
        name: "Token移动速度",
        hint: "",
        scope: 'world',
        config: false,
        type: Number,
        default: 6,
        onChange: value => {
            if (!isNaN(value) && game.settings.get('gambits-premades', 'enableTokenMovementSpeed')) CONFIG.Token.movement.defaultSpeed = value;
            else game.gps.logInfo("Invalid input for Numeric Setting: Not a number.");
        }
    });

    game.settings.registerMenu('gambits-premades', 'patreonSupport', {
        name: "Patreon 支持",
        label: "Gambit's Lounge",
        hint: "如果你想支持我Gambit! 赞助将对本模组及其它免费模组的开发提供帮助，并且将会获得我的付费模组 Gambit's FXMaster+, Gambit's Asset Previewer,和 Gambit's Image Viewer的使用权!",
        icon: "fas fa-card-spade",
        scope: 'world',
        config: true,
        type: PatreonSupportMenu,
        restricted: true
    });

    game.settings.registerMenu('gambits-premades', 'generalSettings', {
        name: game.i18n.localize("一般设置"),
        label: game.i18n.localize("一般设置"),
        hint: game.i18n.localize("镜像对话框，鉴定限制等"),
        icon: 'fas fa-cogs',
        scope: 'world',
        config: true,
        type: GeneralSettingsMenu,
        restricted: true
    });

    game.settings.registerMenu('gambits-premades', 'spells', {
        name: game.i18n.localize("法术"),
        label: game.i18n.localize("启用法术"),
        hint: game.i18n.localize("法术反制，银光锐语等"),
        icon: 'fas fa-magic',
        scope: 'world',
        config: true,
        type: SpellSettingsMenu,
        restricted: true
    });

    game.settings.registerMenu('gambits-premades', 'classFeatures', {
        name: game.i18n.localize("职业特性"),
        label: game.i18n.localize("启用职业特性"),
        hint: game.i18n.localize("语出惊人，拦截，惨中取意等"),
        icon: 'fas fa-book',
        scope: 'world',
        config: true,
        type: ClassFeaturesSettingsMenu,
        restricted: true
    });

    game.settings.registerMenu('gambits-premades', 'genericFeatures', {
        name: game.i18n.localize("通用特性"),
        label: game.i18n.localize("启用通用特性"),
        hint: game.i18n.localize("借机攻击，哨兵等"),
        icon: 'fas fa-globe',
        scope: 'world',
        config: true,
        type: GenericFeatureSettingsMenu,
        restricted: true
    });

    
    game.settings.registerMenu('gambits-premades', 'monsterFeatures', {
        name: game.i18n.localize("怪物特性"),
        label: game.i18n.localize("启用怪物特性"),
        hint: game.i18n.localize("怪物特性"),
        icon: 'fas fa-dragon',
        scope: 'world',
        config: true,
        type: MonsterFeaturesSettingsMenu,
        restricted: true
    });
}

export class BaseSettingsMenu extends Base {
  static DEFAULT_OPTIONS = {
    id: "classFeaturesSettingsMenu",
    tag: "form",
    classes: [ "gambits-premades", "gps-settings" ],
    actions: {
      stopPropagation: (event, element) => event.stopPropagation(),
      toggleCollapse: BaseSettingsMenu.toggleCollapse,
      validateNumericInput: BaseSettingsMenu.validateNumericInput
    },
    form: {
      closeOnSubmit: true,
      handler: this.#handleSubmit
    },
    position: {
      width: 800,
      height: "auto",
    }
  };

  static PARTS =
    {
      form: { template: "modules/gambits-premades/templates/settingsMenu.hbs" },
      footer: {
        template: "templates/generic/form-footer.hbs",
      },
    };

  setDefault(object) {
    this.default = object;
  }

  static toggleCollapse(event, element) {
    if ( event.target.tagName.toLowerCase() === "input" ) return;

    event.preventDefault();

    const rowText = element;
    const contentId = rowText.dataset.contentId;
    const form = rowText.closest("form.gps-settings");
    const panel = form?.querySelector(`#${contentId}`);
    if (!panel) return;

    panel.classList.toggle("show");
    rowText.classList.toggle("open");
    const app = form.closest(".window-app");
    if (app) app.style.height = `${form.scrollHeight}px`;
  }

  static validateNumericInput(event, element) {
    const inputField = element;
    const numericValue = Number(inputField.value);

    if (isNaN(numericValue)) {
      game.gps.logInfo("Invalid input: Not a number.");
      inputField.value = inputField.defaultValue;
    }
  }

  _onRender(options) {
    super._onRender?.(options);
    this.expandCheckedCollapsibleSections();
  }

  expandCheckedCollapsibleSections() {
    const form = this.element;
    for ( const row of form.querySelectorAll(".gps-settings-row") ) {
      const contentId = row.dataset.contentId;
      if ( !contentId ) continue;
      const container = form.querySelector(`#${CSS.escape(contentId)}`);
      if ( !container ) continue;

      const childChecked = container.querySelector("input[type=checkbox]:checked");
      if ( childChecked ) {
        container.classList.add("show");
        const rowText = row.querySelector(".gps-settings-row-text");
        rowText?.classList.add("open");
      }
    }

    // Resize window to fit expanded content
    const app = form.closest(".window-app");
    if ( app ) app.style.height = `${form.scrollHeight}px`;
  }

  static async #handleSubmit(event, form, formData) {
    for (let [key, value] of Object.entries(formData.object)) {
        if (game.settings.get('gambits-premades', key) === value) continue;
        await game.settings.set('gambits-premades', key, value);
    }
  }
}

export class ClassFeaturesSettingsMenu extends BaseSettingsMenu {
  static DEFAULT_OPTIONS = {
    id: "classFeaturesSettingsMenu",
    window: {
      title: "启用职业特性"
    }
  };

  async _prepareContext(options) {
    let context = await super._prepareContext(options);
    let hasTimeoutColumn = true;

    const definitions = [
      {
        id: "chronalShift",
        name: "时间变换",
        description: "为时间学派法师时间变换特性提供对话框",
        boolKey: "enableChronalShift",
        timeoutKey: "Chronal Shift Timeout"
      },
      {
        id: "cuttingWords",
        name: "语出惊人",
        description: "为逸闻学院吟游诗人的“语出惊人”提供对话框。",
        boolKey: "Enable Cutting Words",
        timeoutKey: "Cutting Words Timeout",
        children: [
          {
            id: "disableCuttingWordsMaxMiss",
            name: "禁用语出惊人最大失误时触发",
            description: "当最大诗人激励骰也无法影响命中时跳过提示。",
            boolKey: "disableCuttingWordsMaxMiss"
          }
        ]
      },
      {
        id: "interception",
        name: "拦截",
        description: "为圣武士/战士的“拦截”提供对话框。",
        boolKey: "Enable Interception",
        timeoutKey: "Interception Timeout"
      },
      {
        id: "protection",
        name: "守护",
        description: "为圣武士/战士的“守护”提供对话框。",
        boolKey: "Enable Protection",
        timeoutKey: "Protection Timeout",
        children: [
          {
            id: "enableProtectionOnSuccess",
            name: "成功时启用守护",
            description: "仅在攻击成功时触发。",
            boolKey: "enableProtectionOnSuccess"
          }
        ]
      },
      {
        id: "flashOfGenius",
        name: "灵光一闪",
        description: "为奇械师的“灵光一闪”提供对话框。",
        boolKey: "enableFlashOfGenius",
        timeoutKey: "Flash of Genius Timeout"
      },
      {
        id: "indomitable",
        name: "不屈",
        description: "为战士的“不屈”提供对话框。",
        boolKey: "Enable Indomitable",
        timeoutKey: "Indomitable Timeout",
        children: [
          {
            id: "enableAutoSucceedIndomitable",
            name: "启用不屈自动成功",
            description: "使用时自动成功。",
            boolKey: "enableAutoSucceedIndomitable"
          }
        ]
      },
      {
        id: "instinctiveCharm",
        name: "直觉魅惑",
        description: "为惑控学派法师的“直觉魅惑”提供对话框。",
        boolKey: "enableInstinctiveCharm",
        timeoutKey: "Instinctive Charm Timeout"
      },
      {
        id: "magicUsersNemesis",
        name: "魔法使的克星",
        description: "为怪物杀手游侠的“魔法使的克星”提供对话框。",
        boolKey: "enableMagicUsersNemesis",
        timeoutKey: "Magic-User's Nemesis Timeout"
      },
      {
        id: "poetryInMisery",
        name: "惨中取意",
        description: "为悲剧学院吟游诗人的“惨中取意”提供对话框。",
        boolKey: "Enable Poetry in Misery",
        timeoutKey: "Poetry in Misery Timeout"
      },
      {
        id: "rainOfCinders",
        name: "灰烬之雨",
        description: "为沸炉巫团女巫的“灰烬之雨”提供对话框。",
        boolKey: "enableRainOfCinders",
        timeoutKey: "Rain of Cinders Timeout"
      },
      {
        id: "restoreBalance",
        name: "归复平衡",
        description: "为时械术士的“归复平衡”特性提供对话框",
        boolKey: "enableRestoreBalance",
        timeoutKey: "Restore Balance Timeout"
      },
      {
        id: "riposte",
        name: "反击",
        description: "为战斗大师战士的“反击”提供对话框。",
        boolKey: "Enable Riposte",
        timeoutKey: "Riposte Timeout"
      },
      {
        id: "taleOfHubris",
        name: "盛极必衰",
        description: "为悲剧学院吟游诗人的“盛极必衰”提供对话框。",
        boolKey: "enableTaleOfHubris",
        timeoutKey: "Tale of Hubris Timeout"
      },
      {
        id: "witchesHex",
        name: "女巫诅咒",
        description: "为女巫的“女巫诅咒”提供对话框。",
        boolKey: "Enable Witches Hex",
        timeoutKey: "Witches Hex Timeout"
      }
    ];

    const features = definitions.map(def => {
      const feature = {
        id:          def.id,
        name:        def.name,
        description: def.description,
        boolKey:     def.boolKey,
        timeoutKey:  def.timeoutKey,
        enabled:     game.settings.get("gambits-premades", def.boolKey),
        timeout:     game.settings.get("gambits-premades", def.timeoutKey)
      };
      if (Array.isArray(def.children)) {
        feature.children = def.children.map(child => ({
          id:          child.id,
          name:        child.name,
          description: child.description,
          boolKey:     child.boolKey,
          enabled:     game.settings.get("gambits-premades", child.boolKey)
        }));
      }
      return feature;
    });

    return foundry.utils.mergeObject(context, {
      features,
      hasTimeoutColumn,
      buttons: [
        { type: "submit", icon: "fa-solid fa-save", label: "保存设置" }
      ]
    });
  }
}

// -------------------------
// Generic Features Menu
// -------------------------
export class GenericFeatureSettingsMenu extends BaseSettingsMenu {
  static DEFAULT_OPTIONS = {
    id: "genericFeatureSettingsMenu",
    window: {
      title: "启用通用特性"
    },
  };

  async _prepareContext(options) {
    let context = await super._prepareContext(options);
    let hasTimeoutColumn = true;

    const definitions = [
      { id: "opportunityAttack", name: "借机攻击", description: "自动为战斗中的参战者启用借机攻击。", boolKey: "Enable Opportunity Attack", timeoutKey: "Opportunity Attack Timeout" },
      { id: "sentinel", name: "哨兵", description: "当敌人攻击范围内的盟友时，向拥有“哨兵”专长的玩家呈现对话框。", boolKey: "Enable Sentinel", timeoutKey: "Sentinel Timeout" },
      { id: "mageSlayer", name: "巫师杀手", description: "向拥有“巫师杀手”专长的玩家呈现对话框。", boolKey: "enableMageSlayer", timeoutKey: "Mage Slayer Timeout" },
      { id: "legendaryResistance", name: "传奇抗性", description: "为拥有“传奇抗性”特性的怪物呈现对话框。", boolKey: "enableLegendaryResistance", timeoutKey: "Legendary Resistance Timeout" }
    ];

    const features = definitions.map(def => ({
      id:          def.id,
      name:        def.name,
      description: def.description,
      boolKey:     def.boolKey,
      timeoutKey:  def.timeoutKey,
      enabled:     game.settings.get("gambits-premades", def.boolKey),
      timeout:     game.settings.get("gambits-premades", def.timeoutKey)
    }));

    return foundry.utils.mergeObject(context, {
      features: features,
      hasTimeoutColumn,
      buttons:  [
        { type: "submit", icon: "fa-solid fa-save", label: "保存设置" }
      ]
    });
  }
}

// ----------------
// Spell Settings
// ----------------
export class SpellSettingsMenu extends BaseSettingsMenu {
  static DEFAULT_OPTIONS = {
    id: "spellSettingsMenu",
    window: {
      title: "启用法术"
    }
  };

  async _prepareContext(options) {
    let context = await super._prepareContext(options);
    let hasTimeoutColumn = true;

    const definitions = [
      {
        id: "counterspell",
        name: "法术反制",
        description: "向拥有“法术反制”法术的玩家呈现对话框。",
        boolKey: "Enable Counterspell",
        timeoutKey: "Counterspell Timeout",
        children: [ { id: "counterspellSpellPenetration", name: "法术穿透", description: "启用Bloodied & Bruised法术穿透可选项。", boolKey: "enableCounterspellSpellPenetration" } ]
      },
      {
        id: "silveryBarbs",
        name: "银光锐语",
        description: "向拥有“银光锐语”法术的玩家呈现对话框。",
        boolKey: "Enable Silvery Barbs",
        timeoutKey: "Silvery Barbs Timeout",
        children: [
          { id: "disableSilveryBarbsOnNat20", name: "重击时禁用", description: "在重击攻击掷骰时禁用。", boolKey: "disableSilveryBarbsOnNat20" },
          { id: "enableSilveryBarbsOnNat20", name: "重击时启用", description: "仅在攻击掷骰重击时启用", boolKey: "enableSilveryBarbsOnNat20" }
        ]
      },
      { id: "powerWordRebound", name: "律令反弹", description: "向拥有“律令反弹”法术的玩家呈现对话框。", boolKey: "Enable Power Word Rebound", timeoutKey: "Power Word Rebound Timeout" },
      { id: "temporalShunt", name: "时流刹转", description: "向拥有“时流刹转”法术的玩家呈现对话框。", boolKey: "enableTemporalShunt", timeoutKey: "Temporal Shunt Timeout" }
    ];

    const features = definitions.map(def => {
      const feature = {
        id:          def.id,
        name:        def.name,
        description: def.description,
        boolKey:     def.boolKey,
        timeoutKey:  def.timeoutKey,
        enabled:     game.settings.get("gambits-premades", def.boolKey),
        timeout:     game.settings.get("gambits-premades", def.timeoutKey)
      };
      if (Array.isArray(def.children)) {
        feature.children = def.children.map(child => ({
          id:          child.id,
          name:        child.name,
          description: child.description,
          boolKey:     child.boolKey,
          enabled:     game.settings.get("gambits-premades", child.boolKey)
        }));
      }
      return feature;
    });

    return foundry.utils.mergeObject(context, {
      features,
      hasTimeoutColumn,
      buttons: [
        { type: "submit", icon: "fa-solid fa-save", label: "保存设置" }
      ]
    });
  }
}

// -------------------
// General Settings
// -------------------
export class GeneralSettingsMenu extends BaseSettingsMenu {
  static DEFAULT_OPTIONS = {
    id: "generalSettingsMenu",
    window: {
      title: "通用设置"
    }
  };

  async _prepareContext(options) {
    let context = await super._prepareContext(options);

    const definitions = [
      { id: "enable3prNoCombat", name: "在战斗外启用第三方反应", description: "允许第三方反应在战斗未激活时生效。", boolKey: "enable3prNoCombat" },
      { id: "enableIdentifyRestrictions", name: "启用鉴定限制", description: "防止玩家通过除本模块的鉴定术自动化功能以外的任何方式鉴定物品。", boolKey: "Enable Identify Restrictions", children: [{ id: "identifyRestrictionMessage", name: "鉴定限制信息", description: "当用户受到限制时将显示的自定义信息。", type: "String", boolKey: "Identify Restriction Message" }] },
      { id: "enableRegionWrapping", name: "启用区域环绕", description: "替换Foundry默认的仅测试Token中心点的区域行为为多点测试，以更好地匹配5版规则集（需要重载）。", boolKey: "enableRegionWrapping" },
      { id: "enableTimerFullAnim", name: "启用计时器全栏动画", description: "修改对话框的倒计时动画，使其覆盖整个标题栏而非仅标题栏边框。", boolKey: "enableTimerFullAnim" },
      { id: "hideTemplates", name: "隐藏测量版", description: "放置后隐藏测量版。", boolKey: "hideTemplates" },
      { id: "mirror3rdPartyDialogForGMs", name: "GM第三方对话框镜像", description: "第三方对话框将同时发送给游戏主持人与玩家，以便任意一方均可操作对话框以使用/关闭/暂停它。", boolKey: "Mirror 3rd Party Dialog for GMs" },
      { id: "tokenMovementSpeed", name: "Token移动速度", description: "Token移动动画速度的数值。Foundry默认速度为6。", boolKey: "enableTokenMovementSpeed", timeoutKey: "tokenMovementSpeed" },
      { id: "debugEnabled", name: "启用调试", description: "启用反应验证过程的控制台日志以进行故障排除。", boolKey: "debugEnabled" }
    ];

    const hasTimeoutColumn = definitions.some(d => !!d.timeoutKey);

    const features = definitions.map(def => {
      const feature = {
        id:          def.id,
        name:        def.name,
        description: def.description,
        boolKey:     def.boolKey,
        enabled:     game.settings.get("gambits-premades", def.boolKey),
        timeoutKey:  def.timeoutKey
      };

      if (def.timeoutKey) {
        feature.timeout = game.settings.get("gambits-premades", def.timeoutKey);
      }

      if (Array.isArray(def.children)) {
        feature.children = def.children.map(child => ({
          id:          child.id,
          name:        child.name,
          description: child.description,
          boolKey:     child.boolKey,
          value:       game.settings.get("gambits-premades", child.boolKey),
          type:        child.type || "Boolean"
        }));
      }

      return feature;
    });

    return foundry.utils.mergeObject(context, {
      features,
      hasTimeoutColumn,
      buttons: [
        { type: "submit", icon: "fa-solid fa-save", label: "保存设置" }
      ]
    });
  }
}

// -----------------------
// Monster Features Menu
// -----------------------
export class MonsterFeaturesSettingsMenu extends BaseSettingsMenu {
  static DEFAULT_OPTIONS = {
    id: "monsterFeaturesSettingsMenu",
    window: {
      title: "启用怪物特性"
    }
  };

  async _prepareContext(options) {
    let context = await super._prepareContext(options);
    let hasTimeoutColumn = true;

    const definitions = [
      { id: "burstOfIngenuity", name: "灵光乍现", description: "为拥有“灵光乍现”特性的怪物呈现对话框。", boolKey: "enableBurstOfIngenuity", timeoutKey: "Burst of Ingenuity Timeout" },
      { id: "dreadCounterspell", name: "恐惧反制", description: "为维克那的“恐惧法术反制”呈现对话框。", boolKey: "enableDreadCounterspell", timeoutKey: "Dread Counterspell Timeout" }
    ];

    const features = definitions.map(def => {
      const feature = {
        id:          def.id,
        name:        def.name,
        description: def.description,
        boolKey:     def.boolKey,
        timeoutKey:  def.timeoutKey,
        enabled:     game.settings.get("gambits-premades", def.boolKey),
        timeout:     game.settings.get("gambits-premades", def.timeoutKey)
      };
      if (Array.isArray(def.children)) {
        feature.children = def.children.map(child => ({
          id:          child.id,
          name:        child.name,
          description: child.description,
          boolKey:     child.boolKey,
          enabled:     game.settings.get("gambits-premades", child.boolKey)
        }));
      }
      return feature;
    });

    return foundry.utils.mergeObject(context, {
      features,
      hasTimeoutColumn,
      buttons: [
        { type: "submit", icon: "fa-solid fa-save", label: "保存设置" }
      ]
    });
  }
}

class PatreonSupportMenu extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.api.ApplicationV2) {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "gambits-patreon-support",
      title: "Patreon Support",
      template: "templates/blank.hbs",
      width: 1,
      height: 1,
      popOut: false
    });
  }

  render(force = false, options = {}) {
    window.open("https://www.patreon.com/GambitsLounge/membership", "_blank", "noopener,noreferrer");
    return this;
  }
}