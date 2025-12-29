// Bell effect definitions
const bellEffectsDeprecated = {
    2: {
        type: 'negative',
        text: 'A random PC drops to 0 HP and gains 2 failed death saves.',
        stackRule: 'Nothing happens when rolled again in the same session by the same person.'
    },
    3: {
        type: 'negative',
        text: 'PC permanently loses 2 from their highest ability score.',
        stackRule: 'Nothing happens when rolled again in the same session by the same person.'
    },
    4: {
        type: 'negative',
        text: 'PC permanently loses their voice. Verbal spells require a DC 15 CON save.',
        stackRule: 'Cannot be stacked.'
    },
    5: {
        type: 'negative',
        text: 'PC gains vulnerability to cold damage.',
        stackRule: 'Cannot be stacked.'
    },
    6: {
        type: 'negative',
        text: 'A random magic item carried by the party has a 1d4 chance to lose all magic.',
        stackRule: 'When stacked another breaks.'
    },
    7: {
        type: 'negative',
        text: 'Powerful creatures instinctively distrust or target them.',
        stackRule: 'When stacked they distrust more.'
    },
    8: {
        type: 'negative',
        text: 'PC\'s maximum HP is reduced by 5 permanently.',
        stackRule: 'When stacked they lose more HP.',
        stackCalc: (count) => `Total HP reduction: ${count * 5}`
    },
    9: {
        type: 'negative',
        text: 'PC ages 1d20 years instantly.',
        stackRule: 'When stacked they gain more age. It is fully cosmetic; they will not lose any time before they die.'
    },
    10: {
        type: 'negative',
        text: 'Thrice per session, the DM may force the PC to reroll a successful roll and take the lower result.',
        stackRule: 'Cannot be stacked.'
    },
    11: {
        type: 'mixed',
        text: 'Gain cold resistance, but disadvantage on saves vs exhaustion.',
        stackRule: 'Cannot be stacked.'
    },
    12: {
        type: 'mixed',
        text: 'Advantage on Initiative permanently. You can never be surprised — enemies focus you first.',
        stackRule: 'Cannot be stacked.'
    },
    13: {
        type: 'mixed',
        text: 'Gain a feat (DM chooses). Lose 1 from an ability score (DM chooses).',
        stackRule: 'Gets another feat and loses another point in a score when rolled again.',
        requiresCustom: ['feat', 'abilityLoss']
    },
    14: {
        type: 'mixed',
        text: 'Once per day, reroll a failed roll. Next save that day has disadvantage.',
        stackRule: 'If stacked then only one of them is permanent and the rest is until the end of the session.'
    },
    15: {
        type: 'mixed',
        text: 'Advantage on Perception. Cannot benefit from Alert or similar effects.',
        stackRule: 'Cannot be stacked.'
    },
    16: {
        type: 'mixed',
        text: 'Once ever auto-succeed a death save. After triggering, gain 1 permanent exhaustion.',
        stackRule: 'Cannot be stacked.'
    },
    17: {
        type: 'mixed',
        text: 'Ask DM one yes/no question. Lose proficiency in one skill permanently (PC\'s Choice). You can save your questions.',
        stackRule: 'Cannot be stacked unless they used their question already.'
    },
    18: {
        type: 'positive',
        text: '+1 CON (max 22).',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Total CON bonus: +${count}`
    },
    19: {
        type: 'positive',
        text: 'Non Ranged Weapons deal +1d4 thunder damage permanently.',
        stackRule: 'If stacked then only one of them is permanent and the rest is until the end of the session.'
    },
    20: {
        type: 'positive',
        text: 'Gain 2 Luck points total (from Lucky feat, but not the feat itself). When using a lucky point it will fully use one.',
        stackRule: 'When stacked they will gain 2 more up to a max of 3.',
        stackCalc: (count) => `Total Luck points: ${Math.min(count * 2, 3)}`
    },
    21: {
        type: 'positive',
        text: 'Immune to environmental cold.',
        stackRule: 'Cannot be stacked.'
    },
    22: {
        type: 'positive',
        text: '+5 max HP.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Total HP bonus: +${count * 5}`
    },
    23: {
        type: 'positive',
        text: 'Spell Echo: Gain one 2nd–3rd level spell, 1/day (DM chooses).',
        stackRule: 'Stacked normally.',
        requiresCustom: ['spell']
    },
    24: {
        type: 'powerful',
        text: 'Once per day, can\'t drop below 1 HP. Afterward, Frightened for 1 minute.',
        stackRule: 'If stacked then only one of them is permanent and the rest is until the end of the session.'
    },
    25: {
        type: 'powerful',
        text: 'Once per session force a reroll. DM may do the same later.',
        stackRule: 'If stacked then only one of them is permanent and the rest is until the end of the session.'
    },
    26: {
        type: 'powerful',
        text: '+2 to one ability (max 24) (DM chooses). –2 to another permanently (DM chooses).',
        stackRule: 'Stacked normally.',
        requiresCustom: ['abilityGain', 'abilityLoss']
    },
    27: {
        type: 'powerful',
        text: 'Cannot be surprised. Enemies gain +2 to hit you on the initial round of combat.',
        stackRule: 'When stacked add +2 to the effect to a max of +10.',
        stackCalc: (count) => `Enemies have +${Math.min(count * 2, 10)} to hit on first round`
    },
    28: {
        type: 'disaster',
        text: 'The PC who rang takes 4d10 necrotic damage and gains a minor curse from goofy ahh curse list.',
        stackRule: 'Stacked normally.',
        hasLink: true
    },
    29: {
        type: 'disaster',
        text: 'One future critical success becomes a failure (DM chooses when).',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Future crits that become failures: ${count}`
    },
    30: {
        type: 'positive',
        text: 'Instantly level up. Remove one permanent negative from each PC. Bell shatters forever.',
        stackRule: 'Cannot be stacked.'
    }
    
};

const bellEffects = {
    // POSITIVE (20 total)
    18: {
        type: 'positive',
        text: '+1 CON (max 22).',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Total CON bonus: +${count}`
    },
    19: {
        type: 'positive',
        text: 'Non Ranged Weapons deal +1d4 thunder damage permanently.',
        stackRule: 'If stacked then only one of them is permanent and the rest is until the end of the session.',
        stackCalc: (count) => `Permanent: 1, Session-only: ${count - 1}`
    },
    20: {
        type: 'positive',
        text: 'Gain 2 Luck points total (from Lucky feat, but not the feat itself). When using a lucky point it will fully use one.',
        stackRule: 'When stacked they will gain 2 more up to a max of 3.',
        stackCalc: (count) => `Total Luck points: ${Math.min(count * 2, 3)}`
    },
    21: {
        type: 'positive',
        text: 'Immune to environmental cold.',
        stackRule: 'Cannot be stacked.'
    },
    22: {
        type: 'positive',
        text: '+5 max HP.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Total HP bonus: +${count * 5}`
    },
    23: {
        type: 'positive',
        text: 'Spell Echo: Gain one 2nd–3rd level spell, 1/day (DM chooses).',
        stackRule: 'Stacked normally.',
        requiresCustom: ['spell'],
        stackCalc: (count) => `Total daily spells: ${count}`
    },
    30: {
        type: 'positive',
        text: 'Instantly level up. Remove one permanent negative from each PC. Bell shatters forever.',
        stackRule: 'Cannot be stacked.'
    },
    33: {
        type: 'positive',
        text: 'Gain resistance to poison damage and advantage on saves vs poison.',
        stackRule: 'Cannot be stacked.'
    },
    37: {
        type: 'positive',
        text: '+1 to all saving throws.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Total save bonus: +${count}`
    },
    43: {
        type: 'positive',
        text: 'Gain darkvision 60ft. If you already have it, increase range by 30ft.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Darkvision range: ${count === 1 ? '60ft' : `increased by ${count * 30}ft`}`
    },
    47: {
        type: 'positive',
        text: 'Once per long rest, automatically succeed on a Concentration check.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Auto-successes per long rest: ${count}`
    },
    54: {
        type: 'positive',
        text: 'Gain proficiency in one skill of your choice.',
        stackRule: 'Stacked normally.',
        requiresCustom: ['skill'],
        stackCalc: (count) => `Skills gained: ${count}`
    },
    57: {
        type: 'positive',
        text: '+1 to attack rolls with one weapon type (DM chooses).',
        stackRule: 'Stacked normally.',
        requiresCustom: ['weaponType'],
        stackCalc: (count) => `Attack bonus: +${count}`
    },
    61: {
        type: 'positive',
        text: 'Gain one additional attunement slot.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Additional attunement slots: +${count}`
    },
    68: {
        type: 'positive',
        text: 'Add your proficiency bonus to initiative rolls.',
        stackRule: 'Cannot be stacked.'
    },
    71: {
        type: 'positive',
        text: 'Resistance to thunder damage.',
        stackRule: 'Cannot be stacked.'
    },
    82: {
        type: 'positive',
        text: 'Gain +1 spell slot of your highest available level (if you can cast spells).',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Additional spell slots: ${count}`
    },
    85: {
        type: 'positive',
        text: 'Advantage on saves against being paralyzed or petrified.',
        stackRule: 'Cannot be stacked.'
    },
    89: {
        type: 'positive',
        text: 'Climbing and swimming no longer cost extra movement.',
        stackRule: 'Cannot be stacked.'
    },
    96: {
        type: 'positive',
        text: '+1 to AC permanently.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Total AC bonus: +${count}`
    },

    // POWERFUL (5 total)
    25: {
        type: 'powerful',
        text: 'Once per session, force any creature to reroll an attack, save, or check.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Uses per session: ${count}`
    },
    26: {
        type: 'powerful',
        text: '+3 to one ability score (max 24) (DM chooses).',
        stackRule: 'Stacked normally.',
        requiresCustom: ['abilityGain'],
        stackCalc: (count) => `Total ability increases: ${count} (+3 each)`
    },
    27: {
        type: 'powerful',
        text: 'Cannot be surprised. Gain advantage on Initiative rolls.',
        stackRule: 'Cannot be stacked.'
    },
    40: {
        type: 'powerful',
        text: 'Once per long rest, negate all damage from one attack or effect.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Uses per long rest: ${count}`
    },
    99: {
        type: 'powerful',
        text: 'Once per session, automatically succeed on any save, attack, or check of your choice.',
        stackRule: 'Cannot be stacked.'
    },

    // MIXED (35 total)
    11: {
        type: 'mixed',
        text: 'Gain cold resistance, but disadvantage on saves vs exhaustion.',
        stackRule: 'Cannot be stacked.'
    },
    12: {
        type: 'mixed',
        text: 'Advantage on Initiative permanently. You can never be surprised — enemies focus you first.',
        stackRule: 'Cannot be stacked.'
    },
    13: {
        type: 'mixed',
        text: 'Gain a feat (DM chooses). Lose 1 from an ability score (DM chooses).',
        stackRule: 'Gets another feat and loses another point in a score when rolled again.',
        requiresCustom: ['feat', 'abilityLoss'],
        stackCalc: (count) => `Total feats: ${count}, Total ability loss: -${count}`
    },
    14: {
        type: 'mixed',
        text: 'Once per day, reroll a failed roll. Next save that day has disadvantage.',
        stackRule: 'If stacked then only one of them is permanent and the rest is until the end of the session.',
        stackCalc: (count) => `Permanent: 1, Session-only: ${count - 1}`
    },
    15: {
        type: 'mixed',
        text: 'Advantage on Perception. Cannot benefit from Alert or similar effects.',
        stackRule: 'Cannot be stacked.'
    },
    16: {
        type: 'mixed',
        text: 'Once ever auto-succeed a death save. After triggering, gain 1 permanent exhaustion.',
        stackRule: 'Cannot be stacked.'
    },
    17: {
        type: 'mixed',
        text: 'Ask DM one yes/no question. Lose proficiency in one skill permanently (PC\'s Choice). You can save your questions.',
        stackRule: 'Cannot be stacked unless they used their question already.',
        requiresCustom: ['skillLoss'],
        stackCalc: (count) => `Total questions available: ${count}, Total skills lost: ${count}`
    },
    24: {
        type: 'mixed',
        text: 'Once per day, can\'t drop below 1 HP. Afterward, Frightened for 1 minute.',
        stackRule: 'If stacked then only one of them is permanent and the rest is until the end of the session.',
        stackCalc: (count) => `Permanent: 1, Session-only: ${count - 1}`
    },
    32: {
        type: 'mixed',
        text: 'Gain +2 AC. Take 1d4 psychic damage at the start of each combat.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Total AC: +${count * 2}, Damage per combat: ${count}d4 psychic`
    },
    34: {
        type: 'mixed',
        text: 'PC emits dim light in a 10ft radius. Advantage on Intimidation, but cannot benefit from being hidden or invisible.',
        stackRule: 'Cannot be stacked.'
    },
    35: {
        type: 'mixed',
        text: 'Critical hits deal an extra damage die. Critical fails deal that damage to you.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Extra crit damage dice: ${count}, Self-damage on crit fail: ${count} dice`
    },
    39: {
        type: 'mixed',
        text: 'Gain advantage on Charisma checks. Disadvantage on Wisdom checks.',
        stackRule: 'Cannot be stacked.'
    },
    42: {
        type: 'mixed',
        text: 'Weapons you wield deal +2 damage. You take 2 damage when you miss an attack.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Total damage bonus: +${count * 2}, Miss penalty: ${count * 2} damage`
    },
    46: {
        type: 'mixed',
        text: 'Spells you cast have +1 to spell save DC. You have -1 to saves against spells.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Your spell DC: +${count}, Your saves: -${count}`
    },
    49: {
        type: 'mixed',
        text: 'Gain +1d6 to Initiative rolls. Go last on ties.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Initiative bonus: +${count}d6`
    },
    50: {
        type: 'mixed',
        text: 'Once per session, treat a roll of 1-9 as a 10. Next natural 20 becomes a natural 1.',
        stackRule: 'Cannot be stacked.'
    },
    53: {
        type: 'mixed',
        text: 'Your maximum HP increases by 10. You cannot be healed above half HP by magical means.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Total HP increase: +${count * 10}`
    },
    55: {
        type: 'mixed',
        text: 'Gain +2 to Persuasion and Deception. Take 1 force damage each time you speak more than 10 words consecutively.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Social bonus: +${count * 2}, Damage per violation: ${count} force`
    },
    56: {
        type: 'mixed',
        text: 'Double proficiency bonus on Investigation. Passive Perception reduced by 5.',
        stackRule: 'Cannot be stacked.'
    },
    60: {
        type: 'mixed',
        text: 'Attacks of opportunity against you have disadvantage. You provoke them 10ft earlier.',
        stackRule: 'Cannot be stacked.'
    },
    63: {
        type: 'mixed',
        text: 'Spells you cast ignore half cover. You do not benefit from half cover.',
        stackRule: 'Cannot be stacked.'
    },
    64: {
        type: 'mixed',
        text: 'Once ever, when reduced to 0 HP, instantly teleport up to 60ft and stabilize at 1 HP. Gain 3 exhaustion after.',
        stackRule: 'Cannot be stacked.'
    },
    66: {
        type: 'mixed',
        text: 'Long rests fully restore all HD and grant +5 temp HP. Long rests take 10 hours instead of 8.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Temp HP gained: +${count * 5}, Long rest duration: ${8 + count * 2} hours`
    },
    67: {
        type: 'mixed',
        text: 'Critical hit range increases by 1 (19-20). Critical fumble range increases by 1 (1-2).',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Crit range: ${20 - count}-20, Fumble range: 1-${1 + count}`
    },
    70: {
        type: 'mixed',
        text: 'Gain expertise in one skill you\'re proficient in (DM chooses). Lose proficiency in a different skill.',
        stackRule: 'Stacked normally.',
        requiresCustom: ['skillGain', 'skillLoss'],
        stackCalc: (count) => `Expertise gained: ${count}, Proficiencies lost: ${count}`
    },
    74: {
        type: 'mixed',
        text: 'Gain +3 to one ability score (max 20). Permanent -1 to two other ability scores.',
        stackRule: 'Cannot be stacked.',
        requiresCustom: ['abilityGain', 'abilityLoss1', 'abilityLoss2']
    },
    77: {
        type: 'mixed',
        text: 'Advantage on death saves. Healing spells cast on you restore half as much.',
        stackRule: 'Cannot be stacked.'
    },
    78: {
        type: 'mixed',
        text: 'Once per long rest, cast Counterspell at 3rd level. Spell slots cost +1 level to cast your own spells.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Counterspell uses: ${count}/long rest, Spell slot penalty: +${count} level`
    },
    81: {
        type: 'mixed',
        text: 'Unarmed strikes deal 1d6 + STR damage. You take 1d4 damage when you grapple.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Unarmed damage: ${count}d6 + STR, Grapple damage: ${count}d4`
    },
    84: {
        type: 'mixed',
        text: 'Regain all hit dice on long rests. Short rests restore no hit dice.',
        stackRule: 'Cannot be stacked.'
    },
    88: {
        type: 'mixed',
        text: '+2 to spell attack rolls. Concentration checks have +2 DC.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Spell attack: +${count * 2}, Concentration DC: +${count * 2}`
    },
    91: {
        type: 'mixed',
        text: 'You can cast Detect Magic at will. You are always detected by Detect Magic.',
        stackRule: 'Cannot be stacked.'
    },
    92: {
        type: 'mixed',
        text: 'Once per long rest, take an additional action on your turn. Stunned until end of your next turn after.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Uses per long rest: ${count}`
    },
    95: {
        type: 'mixed',
        text: 'Gain resistance to radiant damage. Vulnerable to necrotic damage.',
        stackRule: 'Cannot be stacked.'
    },
    98: {
        type: 'mixed',
        text: 'Add 1d4 to all skill checks you are proficient in. Subtract 1d4 from checks you are not proficient in.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Proficient: +${count}d4, Non-proficient: -${count}d4`
    },

    // NEGATIVE (25 total)
    2: {
        type: 'negative',
        text: 'A random PC drops to 0 HP and gains 2 failed death saves.',
        stackRule: 'Nothing happens when rolled again in the same session by the same person.'
    },
    3: {
        type: 'negative',
        text: 'PC permanently loses 2 from their highest ability score.',
        stackRule: 'Nothing happens when rolled again in the same session by the same person.'
    },
    4: {
        type: 'negative',
        text: 'PC permanently loses their voice. Verbal spells require a DC 15 CON save.',
        stackRule: 'Cannot be stacked.'
    },
    5: {
        type: 'negative',
        text: 'PC gains vulnerability to cold damage.',
        stackRule: 'Cannot be stacked.'
    },
    6: {
        type: 'negative',
        text: 'A random magic item carried by the party has a 1d4 chance to lose all magic.',
        stackRule: 'When stacked another breaks.',
        stackCalc: (count) => `Magic items at risk: ${count}`
    },
    7: {
        type: 'negative',
        text: 'Powerful creatures instinctively distrust or target them.',
        stackRule: 'When stacked they distrust more.',
        stackCalc: (count) => `Distrust intensity: ${count}x (DM determines encounter frequency)`
    },
    8: {
        type: 'negative',
        text: 'PC\'s maximum HP is reduced by 5 permanently.',
        stackRule: 'When stacked they lose more HP.',
        stackCalc: (count) => `Total HP reduction: -${count * 5}`
    },
    9: {
        type: 'negative',
        text: 'PC ages 1d20 years instantly.',
        stackRule: 'When stacked they gain more age. It is fully cosmetic; they will not lose any time before they die.',
        stackCalc: (count) => `Total aging rolls: ${count}d20 years`
    },
    10: {
        type: 'negative',
        text: 'Thrice per session, the DM may force the PC to reroll a successful roll and take the lower result.',
        stackRule: 'Cannot be stacked.'
    },
    31: {
        type: 'negative',
        text: 'All healing received is reduced by 2 permanently.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Total healing reduction: -${count * 2}`
    },
    38: {
        type: 'negative',
        text: 'Speed reduced by 5ft permanently.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Total speed reduction: -${count * 5}ft`
    },
    41: {
        type: 'negative',
        text: 'Cannot benefit from short rests. Only long rests restore resources.',
        stackRule: 'Cannot be stacked.'
    },
    45: {
        type: 'negative',
        text: 'Disadvantage on all Dexterity saving throws.',
        stackRule: 'Cannot be stacked.'
    },
    48: {
        type: 'negative',
        text: 'Magical darkness within 30ft of you cannot be dispelled by your spells or items.',
        stackRule: 'Cannot be stacked.'
    },
    52: {
        type: 'negative',
        text: 'All attack rolls against you have advantage during the first round of combat.',
        stackRule: 'Cannot be stacked.'
    },
    59: {
        type: 'negative',
        text: 'Disadvantage on all Strength checks (not saves or attacks).',
        stackRule: 'Cannot be stacked.'
    },
    62: {
        type: 'negative',
        text: 'Cannot benefit from the Help action, given or received.',
        stackRule: 'Cannot be stacked.'
    },
    69: {
        type: 'negative',
        text: 'Metal armor you wear weighs double and gives disadvantage on Stealth.',
        stackRule: 'Cannot be stacked.'
    },
    73: {
        type: 'negative',
        text: 'You cannot gain temporary hit points by any means.',
        stackRule: 'Cannot be stacked.'
    },
    80: {
        type: 'negative',
        text: 'You leave obvious tracks. Survival checks to track you have advantage.',
        stackRule: 'Cannot be stacked.'
    },
    83: {
        type: 'negative',
        text: 'Magical light sources you carry emit half the normal light.',
        stackRule: 'Cannot be stacked.'
    },
    87: {
        type: 'negative',
        text: 'Healing potions restore half effectiveness when you drink them.',
        stackRule: 'Cannot be stacked.'
    },
    90: {
        type: 'negative',
        text: 'Your scent becomes overpowering. Disadvantage on Stealth, creatures have advantage tracking you by smell.',
        stackRule: 'Cannot be stacked.'
    },
    94: {
        type: 'negative',
        text: 'Cannot dash as an action or bonus action.',
        stackRule: 'Cannot be stacked.'
    },
    97: {
        type: 'negative',
        text: 'Spells with somatic components have a 10% chance to fail if you are damaged since your last turn.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Fail chance: ${count * 10}%`
    },

    // DISASTER (14 total)
    1: {
        type: 'disaster',
        text: 'PC\'s soul is marked. Next time they would die, they cannot be resurrected by any means short of a Wish spell.',
        stackRule: 'Cannot be stacked.'
    },
    28: {
        type: 'disaster',
        text: 'The PC who rang takes 4d10 necrotic damage and gains a minor curse from goofy ahh curse list.',
        stackRule: 'Stacked normally.',
        hasLink: true,
        stackCalc: (count) => `Damage: ${count}×4d10 necrotic, Curses: ${count}`
    },
    29: {
        type: 'disaster',
        text: 'One future critical success becomes a failure (DM chooses when).',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Future crits that become failures: ${count}`
    },
    36: {
        type: 'disaster',
        text: 'PC loses all death save successes and failures. Next time at 0 HP, start with 1 failed save already.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Failed saves at 0 HP: ${Math.min(count, 2)}`
    },
    44: {
        type: 'disaster',
        text: 'PC\'s shadow becomes hostile. Once per session, DM may force disadvantage on a crucial roll.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Forced disadvantages per session: ${count}`
    },
    58: {
        type: 'disaster',
        text: 'PC gains a random indefinite madness (DMG pg. 260). Roll on the table.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Indefinite madnesses: ${count}`
    },
    65: {
        type: 'disaster',
        text: 'All gold and platinum pieces you touch turn to copper. Magical coins are unaffected.',
        stackRule: 'Cannot be stacked.'
    },
    72: {
        type: 'disaster',
        text: 'Next 3 magical items you attune to become cursed. DM determines curse effect.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Cursed attunements remaining: ${count * 3}`
    },
    75: {
        type: 'disaster',
        text: 'Immune to being frightened. When an ally within 30ft becomes frightened, you take 2d6 psychic damage.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Psychic damage when ally frightened: ${count}×2d6`
    },
    76: {
        type: 'disaster',
        text: 'Any critical hit against you deals maximum damage and you gain 1 level of exhaustion.',
        stackRule: 'Cannot be stacked.'
    },
    79: {
        type: 'disaster',
        text: 'PC develops a random phobia. Disadvantage on all rolls when the source is within sight. DM determines trigger.',
        stackRule: 'Stacked normally.',
        requiresCustom: ['phobia'],
        stackCalc: (count) => `Active phobias: ${count}`
    },
    86: {
        type: 'disaster',
        text: 'Randomly lose a prepared spell at the start of each day (if you prepare spells). DM rolls.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Spells lost per day: ${count}`
    },
    93: {
        type: 'disaster',
        text: 'Your blood becomes flammable. When you take fire damage, take an additional 1d6 fire damage.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Additional fire damage: ${count}d6`
    },
    100: {
        type: 'disaster',
        text: 'Reality fractures around you. Roll on this table 1d4 times, applying all results immediately.',
        stackRule: 'Cannot be stacked.'
    },

    // Esoteric (2 total)

    1005: { // represents a negative number
        type: 'esoteric',
        text: 'An elder bronze dragon appears and stays by your side until you die.',
        stackRule: 'Cannot be stacked.'
    },
    51: {
        type: 'esoteric',
        text: 'The player gains a use of the the Eso-Spell "Summon".',
        stackRule: 'Cannot be stacked.'
    }

    // Final count:
    // Positive: 20 entries (18,19,20,21,22,23,30,33,37,43,47,54,57,61,68,71,82,85,89,96)
    // Powerful: 5 entries (25,26,27,40,99)
    // Mixed: 35 entries (11,12,13,14,15,16,17,24,32,34,35,39,42,46,49,50,53,55,56,60,63,64,66,67,70,74,77,78,81,84,88,91,92,95,98)
    // Negative: 25 entries (2,3,4,5,6,7,8,9,10,31,38,41,45,48,52,59,62,69,73,80,83,87,90,94,97)
    // Disaster: 14 entries (1,28,29,36,44,58,65,72,75,76,79,86,93,100)
    // Esoteric: 2 entries (1005/-5,51)
};

// Curse list
const curses = [
    "Curse of Inconvenient Quacking — During combat, when you roll a natural 1: you quack until the end of your turn; any spell you try to cast that has a verbal component during that quack automatically fails, and any Stealth or Intimidation checks made that turn take a −2 penalty.",
    "Curse of Uncontrollable Humming — When you roll a natural 1 on a Stealth check: you hum until the end of your turn; while humming your next Stealth check is at −2 and creatures within 10 ft automatically know your square.",
    "Curse of Sticky Eyelids — When you make a Perception check that relies on sight: subtract 1 from the roll.",
    "Curse of Awkward Sneezes — When you roll a natural 1 on any Constitution saving throw: you sneeze loudly, and all creatures within 10 ft are alerted to your presence (they automatically know your tile).",
    "Curse of Wandering Hat — When you stand up from sitting: your hat or headgear falls off and you must use your free object interaction to put it back.",
    "Curse of the Limp Spoon — When you hold a small metal object: you must spend a free object interaction each time you first grip it that combat to prevent it slipping.",
    "Curse of Reverse Step — When you take a 5-ft step: roll a d6; on a 1, you instead step 1 ft left or right (DM picks), costing that movement.",
    "Curse of Sticky Fingers — When you pick up a small item: you must spend a bonus action to peel it off your fingers before you can use it.",
    "Curse of Random Goose Honks — When you roll a natural 1 on Persuasion or Intimidation: your voice honks for the rest of that check; if the check is in public, creatures within 15 ft notice you.",
    "Curse of Perpetual Dampness — When you move over dry ground: you leave a 5-ft wet trail that is visible to anyone actively tracking.",
    "Curse of Sudden Yawns — When you roll a natural 1 on a Wisdom save: you yawn for one round and lose your reaction until the end of your next turn.",
    "Curse of Awkward Handshakes — When you attempt a handshake as part of a social interaction: the first Persuasion check automatically fails and you must spend your free interaction to redo the handshake.",
    "Curse of Sneaky Pants — When you stand still for any reason: your trousers slip 1 ft and you must spend your next free object interaction to adjust them.",
    "Curse of Excessive Glitter — When you roll a natural 1 on a Stealth check in dim or bright light: emit faint sparkles that reveal your location to creatures within 10 ft.",
    "Curse of Talking Shoes — When you roll a natural 1 on a movement-related Dexterity check: your shoes whisper loudly and creatures within 5 ft know your location.",
    "Curse of Unreadable Handwriting — When you write notes: anyone else reading them must succeed on a DC 10 Intelligence check or misread a line (DM decides consequence).",
    "Curse of the Soggy Sandwich — When you eat food from your pack: fail a DC 10 Con save and take 1 hp of poison damage (automatic failure if you already have 0 gp worth of food).",
    "Curse of Cold Breezes — When someone touches you in a non-hostile way: they must succeed on a DC 10 Con save or suffer disadvantage on their next skill check against you (they shiver).",
    "Curse of the Giggling Goblet — When you drink from a shared vessel: you giggle instantly and your next attack or skill check that relies on focus is made at −1.",
    "Curse of Phantom Itches — When you roll a natural 1 on any skill check: you must use your free object interaction to scratch before making another action.",
    "Curse of the Bent Spoon — When you use an improvised weapon: its damage is reduced by 1.",
    "Curse of Random Popping — When you roll a natural 1 on Stealth: small popping noises reveal your position to creatures within 10 ft.",
    "Curse of Slow Ladders — When you climb: each 10 ft of vertical movement costs 1 extra foot of horizontal movement (effectively 1 extra foot of movement per 10 vertical ft).",
    "Curse of the Clumsy Quill — When you cast a spell with somatic components and you roll a natural 1 on the attack/ability check associated with casting (if DM calls for one): the somatic component fails and the spell is lost.",
    "Curse of Whistling Bags — When you open or rummage a bag: it emits a soft whistle; creatures within 10 ft who are unaware of you become aware of general activity.",
    "Curse of the Wobbly Chair — When you sit down: roll d20; on 1–3 you fall prone.",
    "Curse of Random Hiccups — When you roll a natural 1 on a Constitution check: you hiccup and any spell with verbal components you start that turn is interrupted (spell fails).",
    "Curse of Ticklish Elbows — When someone touches your elbows: you laugh and have −1 to attack rolls until your next turn.",
    "Curse of the Mismatched Socks — When someone comments on your appearance: any Charisma (Performance or Persuasion) check you make while wearing mismatched socks is at −1.",
    "Curse of Forgotten Words — When you attempt a verbal component and roll a natural 1 on any relevant check: you forget the words and the spell fails.",
    "Curse of the Tiny Breeze — When you stand perfectly still for one round: roll d6; on 1 you are pushed 1 ft in a random cardinal direction (no damage).",
    "Curse of the Muddy Footprints — When you move outdoors in mud: you leave easily traced footprints that reveal your last 20 ft of movement to trackers.",
    "Curse of the Slippery Handle — When you draw a weapon or grasp a tool and roll a natural 1 on that roll: it slips and falls; you must spend your bonus action to pick it up.",
    "Curse of Random Farting — When you roll a natural 1 on Stealth in an enclosed 10-ft space: you emit a sound that reveals your location to all creatures in that space.",
    "Curse of Slightly Off Tunes — When you sing and roll a natural 1 on Performance: the song is off by a noticeable half-step; the Performance check is reduced by 2.",
    "Curse of Sticky Locks — When you pick a lock and roll a natural 1 on your Thieves' Tools check: the lock jams and you cannot attempt that lock again for 1 minute.",
    "Curse of the Vanishing Spoon — When you hold a small metal utensil and roll a natural 1 on any check: the utensil disappears for 1d4 rounds and returns to your hand.",
    "Curse of Perpetual Itch — When you roll a natural 1 on any attack roll: you must use your free object interaction to scratch before making another action.",
    "Curse of Awkward Sitting — When you sit in a chair and roll a natural 1 on a check: your next skill check in the next round is at −1.",
    "Curse of the Slippery Floor — When you move across a slick surface and roll a natural 1 on your Dex save: you fall prone.",
    "Curse of the Squeaky Voice — When you roll a natural 1 on any Charisma (speech) check: your voice squeaks for the rest of that interaction; apply −1 to the check.",
    "Curse of Wiggly Hair — When you roll a natural 1 on Acrobatics or Performance: your hair obstructs vision and you take −1 to that roll.",
    "Curse of Rolling Pens — When you drop a pen/quill: it rolls 5 ft away in a random direction automatically.",
    "Curse of Phantom Droplets — When you cast a spell with a visible component and roll a natural 1 on a related check: harmless droplets appear and the spell's DC is reduced by 1.",
    "Curse of the Fluttering Eyelash — When you roll a natural 1 on an attack or skill check: an eyelash irritates you and you subtract 1 from that roll.",
    "Curse of Clanging Plates — When you use metal utensils to eat or tinker and roll a natural 1: the clanging alerts creatures within 10 ft.",
    "Curse of the Slippery Hairpin — When you wear a hairpin and roll a natural 1 on a check: the pin falls out and you spend your free object interaction to re-secure it.",
    "Curse of Bouncing Steps — When you roll a natural 1 on an Acrobatics check while moving: your next movement that turn costs an extra 5 ft.",
    "Curse of the Wandering Pen — When you write and roll a natural 1: your pen moves 1 ft and adds a tiny doodle; readers must make a DC 10 Int check to ignore the doodle.",
    "Curse of the Wiggly Tailbone — When you roll a natural 1 while seated: you shift and take −1 to your next roll.",
    "Curse of the Faint Glow — When you roll a natural 1 on a Stealth check in darkness: your fingertips glow dimly, revealing your location within 5 ft.",
    "Curse of the Shuffling Feet — When you roll a natural 1 on a movement check: your next 5 ft of movement costs you an extra foot of movement.",
    "Curse of Slightly Crooked Posture — When you roll a natural 1 on a Charisma check: subtract 1 from that check.",
    "Curse of the Ticklish Tongue — When you roll a natural 1 on a Verbal Performance: you laugh and the check fails.",
    "Curse of Phantom Sneezes — When you roll a natural 1 on any saving throw: you sneeze and take −1 to your next attack roll.",
    "Curse of the Squeaky Belt — When you roll a natural 1 on a movement-related Dexterity check: your belt squeaks and creatures within 5 ft notice you.",
    "Curse of the Talking Hat — When you roll a natural 1 on Persuasion: your hat emits a mutter and subtracts 1 from the check.",
    "Curse of the Bouncing Mug — When you drink and roll a natural 1 on a Dex check: 1 oz of the drink spills.",
    "Curse of Random Glitter — When you roll a natural 1 on Stealth: one glittering speck flies off and creatures within 5 ft notice you.",
    "Curse of the Wandering Eyebrow — When you roll a natural 1 on Charisma: your eyebrow twitches and the check is at −1.",
    "Curse of Phantom Taps — When you roll a natural 1 on Dexterity: your fingers or feet tap and creatures within 5 ft notice.",
    "Curse of the Jiggly Hair — When you roll a natural 1 on Acrobatics or Performance: hair movement imposes −1 to the roll.",
    "Curse of the Clattering Teeth — When you roll a natural 1 on a Con save: your teeth chatter and your next attack roll is at −1.",
    "Curse of the Soggy Note — When you roll a natural 1 while writing: ink smears; anyone reading must make DC 10 Int to correctly parse a sentence.",
    "Curse of the Whistling Lantern — When you roll a natural 1 on a Dex check while holding a light: the light emits a faint whistle and nearby creatures within 5 ft notice.",
    "Curse of the Rolling Spoon — When you drop a spoon: it rolls 5 ft in a random direction.",
    "Curse of the Fluttering Cloak — When you roll a natural 1 on Acrobatics: your cloak flaps and your movement that turn is reduced by 5 ft.",
    "Curse of the Dripping Nose — When you roll a natural 1 on a Con check: your nose drips and you must use a free object interaction to wipe it.",
    "Curse of Random Wiggles — When you roll a natural 1 on a Dex check: your fingers wiggle and subtract 1 from the roll.",
    "Curse of the Rolling Quill — When you drop a quill: it rolls 2 ft away on its own.",
    "Curse of Minor Static — When you roll a natural 1 on a Sleight of Hand or touch check: you receive a tiny static shock and drop the item.",
    "Curse of the Bouncing Pen — When you roll a natural 1 while writing: the pen bounces and you add one random character to the text.",
    "Curse of Odd Shadows — When you roll a natural 1 on Stealth: your shadow twitches and creatures within 5 ft notice you.",
    "Curse of Faint Smells — When you roll a natural 1 on Persuasion or Deception: you emit a faint odd smell; subtract 1 from that check.",
    "Curse of the Squeaky Shoes — When you roll a natural 1 on a movement Dex check: your shoes squeak; creatures within 5 ft know your tile.",
    "Curse of Wandering Trinkets — When you drop a trinket: it rolls 1–5 ft away randomly.",
    "Curse of Phantom Blink — When you roll a natural 1 on Perception or Investigation: you blink and take −1 to that roll.",
    "Curse of the Wobbly Mug — When you hold a cup and roll a natural 1 on Dex: you spill 1 oz.",
    "Curse of Ticklish Spine — When you roll a natural 1 on Con or Acrobatics: a shiver gives −1 to that roll.",
    "Curse of Minor Glimmer — When you roll a natural 1 on Stealth: a tiny glimmer appears and creatures within 5 ft notice you.",
    "Curse of Tangled Laces — When you roll a natural 1 on movement-related checks: your laces tangle and you must use a free object interaction to untangle.",
    "Curse of Tiny Bumps — When you roll a natural 1 on Acrobatics: you stumble and lose 5 ft of movement.",
    "Curse of Random Hiccups — When you roll a natural 1 on Con: you hiccup and any verbal skill check started that turn (not spells) takes −1.",
    "Curse of Wiggly Eyelids — When you roll a natural 1 on Perception (sight): your eyelids flutter and subtract 1 from the roll.",
    "Curse of Rolling Dice — When you roll dice for a game and get a natural 1: all your dice roll one extra time in random directions (DM narrates minor chaos; no mechanical change beyond distraction: −1 to next gambling check).",
    "Curse of Fluttering Sleeves — When you roll a natural 1 on Dex checks involving arms/hands: sleeves flap and subtract 1 from the roll.",
    "Curse of Minor Popping — When you roll a natural 1 on Stealth: small pops occur and creatures within 5 ft notice.",
    "Curse of Squeaky Knees — When you roll a natural 1 on Acrobatics: knees squeak; creatures within 5 ft notice.",
    "Curse of Talking Hair — When you roll a natural 1 on Persuasion: your hair moves awkwardly and the check is at −1.",
    "Curse of the Wiggling Nose — When you roll a natural 1 on Con or Str: your nose wiggles and the roll is reduced by 1.",
    "Curse of the Sliding Gloves — When you roll a natural 1 on Sleight of Hand: your gloves slip and you drop the item.",
    "Curse of Minor Spills — When you roll a natural 1 while drinking: you spill 1 oz of liquid.",
    "Curse of Bouncing Shoulders — When you roll a natural 1 on Acrobatics: shoulders bounce and your movement that turn is reduced by 5 ft.",
    "Curse of Fluttering Eyebrows — When you roll a natural 1 on Charisma: your eyebrows twitch and the check is at −1.",
    "Curse of Rolling Coins — When you drop coins: they roll 1–5 ft away on their own.",
    "Curse of Shuffling Papers — When you roll a natural 1 while handling notes: pages shuffle and the related Intelligence/Investigation check is at −1.",
    "Curse of Faint Giggles — When you roll a natural 1 on any social skill check: you giggle and the check is at −1.",
    "Curse of Minor Sparks — When you roll a natural 1 on Arcana or while handling small metal components: harmless sparks appear and the check is at −1.",
    "Curse of the Rolling Bottle — When you drop a bottle: on a roll of natural 1, it rolls 2 ft away.",
    "Curse of Inconvenient Quacking Redux — When you attempt a sentence of 6 or more words during social speech: roll a d20; on 1 you quack for that sentence and any Skill Check tied to that sentence takes −2."
];

// CHARACTER DATA - EDIT THIS SECTION
const characters = {
    lim: {
        name: 'Lim',
        password: 'LimLovesDND',
        rolls: [
            {
                num: 13,
                feat: 'https://dnd5e.wikidot.com/feat:skilled',
                featName: 'Skilled - Birdpipes, Bagpipes, Bowls',
                abilityLoss: 'Sleight of Hand',
                lossAmount: '1'
            },
            {
                num: 13,
                feat: 'https://dnd5e.wikidot.com/feat:skilled',
                featName: 'Skilled - Clarinet, Carpenter\'s Tools, Cartographer\'s Tools',
                abilityLoss: 'Stealth',
                lossAmount: '1'
            },
            { num: 12 },
            { num: 24 }

        ]
    },
    imp: {
        name: 'Imp',
        password: 'ImpTheGreat',
        rolls: [
            { num: 10 },
            { num: 19 },
            { num: 7 },
            { num: 16 },
            { num: 11 },
            { num: 24 },
            { num: 11 }
        ]
    },
    crava: {
        name: 'Crava',
        password: 'CravaIsTheBest',
        rolls: [
            { num: 19 },
            { num: 19 },
            { num: 20 },
            { num: 28, curseNum: 1 }
        ]
    },
    keaden: {
        name: 'Keaden',
        password: 'DragonSlayer99',
        rolls: [
            { num: 23, spell: 'https://www.dndbeyond.com/spells/2299-web', spellName: 'Web' },
            { num: 26, abilityGain: 'Religion'},
            { num: 19 },
            { num: 19 },
            { num: 21 },
            { num: 18 },
            { num: 27 },
            { num: 27 }
        ]
    }
};

function countRolls(rolls) {
    const counts = {};
    rolls.forEach(roll => {
        counts[roll.num] = (counts[roll.num] || 0) + 1;
    });
    return counts;
}

function renderCharacterGrid() {
    const grid = document.getElementById('character-grid');
    Object.keys(characters).forEach(key => {
        const char = characters[key];
        const card = document.createElement('div');
        card.className = 'character-card';
        card.onclick = () => showEffects(key);
        card.innerHTML = `
            <div class="character-name">${char.name}</div>
            <div class="effect-count">${char.rolls.length} Rolls</div>
        `;
        grid.appendChild(card);
    });
}

function showEffects(characterKey) {
    const char = characters[characterKey];
    
    // Check if password is still valid
    const storageKey = `password_verified_${characterKey}`;
    const storedData = localStorage.getItem(storageKey);
    
    if (storedData) {
        const { timestamp } = JSON.parse(storedData);
        const hoursSinceVerified = (Date.now() - timestamp) / (1000 * 60 * 60);
        
        // Password valid for 24 hours
        if (hoursSinceVerified < 24) {
            displayEffects(characterKey);
            return;
        } else {
            // Password expired, remove it
            localStorage.removeItem(storageKey);
        }
    }
    
    // Show password prompt if not verified or expired
    showPasswordPrompt(characterKey);
}

function showPasswordPrompt(characterKey) {
    const char = characters[characterKey];
    
    // Remove any existing prompts and effects
    document.querySelectorAll('.password-prompt, .effects-display').forEach(el => el.remove());
    document.querySelectorAll('.character-card').forEach(el => el.classList.remove('active'));
    
    event.target.closest('.character-card').classList.add('active');
    
    const prompt = document.createElement('div');
    prompt.className = 'password-prompt visible';
    prompt.innerHTML = `
        <div class="password-header">🔒 Enter Password for ${char.name}</div>
        <input type="password" id="password-input" placeholder="Enter password" class="password-input">
        <div class="password-buttons">
            <button onclick="verifyPassword('${characterKey}')" class="password-btn verify">Unlock</button>
            <button onclick="cancelPassword()" class="password-btn cancel">Cancel</button>
        </div>
        <div id="password-error" class="password-error"></div>
    `;
    
    document.getElementById('effects-container').appendChild(prompt);
    document.getElementById('password-input').focus();
    
    // Allow Enter key to submit
    document.getElementById('password-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            verifyPassword(characterKey);
        }
    });
}

function verifyPassword(characterKey) {
    const char = characters[characterKey];
    const input = document.getElementById('password-input').value;
    const errorEl = document.getElementById('password-error');
    
    if (input === char.password) {
        // Store verification in localStorage with timestamp
        const storageKey = `password_verified_${characterKey}`;
        localStorage.setItem(storageKey, JSON.stringify({
            timestamp: Date.now()
        }));
        
        // Remove prompt and show effects
        document.querySelector('.password-prompt').remove();
        displayEffects(characterKey);
    } else {
        errorEl.textContent = '❌ Incorrect password';
        document.getElementById('password-input').value = '';
        document.getElementById('password-input').focus();
    }
}

function cancelPassword() {
    document.querySelector('.password-prompt').remove();
    document.querySelectorAll('.character-card').forEach(el => el.classList.remove('active'));
}

function displayEffects(characterKey) {
    document.querySelectorAll('.effects-display').forEach(el => el.remove());
    document.querySelectorAll('.character-card').forEach(el => el.classList.remove('active'));
    
    const char = characters[characterKey];
    const counts = countRolls(char.rolls);
    
    event.target.closest('.character-card').classList.add('active');
    
    const display = document.createElement('div');
    display.className = 'effects-display visible';
    display.innerHTML = `<div class="effects-header">${char.name.toUpperCase()}'s Bell Effects</div>`;
    
    Object.keys(counts).sort((a, b) => a - b).forEach(num => {
        const count = counts[num];
        const effect = bellEffects[num];
        const rollsWithNum = char.rolls.filter(r => r.num == num);
        
        const item = document.createElement('div');
        item.className = `effect-item ${effect.type}`;
        
        let html = `
            <div>
                <span class="effect-number">${num}</span>
                ${count > 1 ? `<span class="stack-badge">×${count}</span>` : ''}
            </div>
            <div class="effect-description">${effect.text}</div>
        `;
        
        if (count > 1 && effect.stackCalc) {
            html += `<div class="custom-note">⚡ ${effect.stackCalc(count)}</div>`;
        }
        
        rollsWithNum.forEach((roll, idx) => {
            if (roll.spell) {
                html += `<a href="${roll.spell}" target="_blank" class="link-button">📜 ${roll.spellName || 'Spell Link'}</a>`;
            }
            if (roll.feat) {
                html += `<a href="${roll.feat}" target="_blank" class="link-button">🎯 ${roll.featName || 'Feat'}</a>`;
            }
            if (roll.abilityGain) {
                html += `<div class="custom-note">+3 to ${roll.abilityGain}</div>`;
            }
            if (roll.abilityLoss) {
                html += `<div class="custom-note">-${roll.lossAmount * 2 || '2'} to ${roll.abilityLoss}</div>`;
            }
            if (roll.curseNum) {
                const curseIndex = roll.curseNum - 1;
                html += `<a href="#curse-${curseIndex}" onclick="showCurseModal(${curseIndex}); return false;" class="link-button">🎲 View Curse</a>`;
            }
            if (roll.skill) {
                html += `<div class="custom-note">📚 Skill: ${roll.skill}</div>`;
            }
            if (roll.skillGain) {
                html += `<div class="custom-note">📚 Gained: ${roll.skillGain}</div>`;
            }
            if (roll.skillLoss) {
                html += `<div class="custom-note">📚 Lost: ${roll.skillLoss}</div>`;
            }
            if (roll.weaponType) {
                html += `<div class="custom-note">⚔️ Weapon: ${roll.weaponType}</div>`;
            }
            if (roll.ability) {
                html += `<div class="custom-note">💪 Ability: ${roll.ability}</div>`;
            }
            if (roll.abilityLoss1) {
                html += `<div class="custom-note">-1 to ${roll.abilityLoss1}</div>`;
            }
            if (roll.abilityLoss2) {
                html += `<div class="custom-note">-1 to ${roll.abilityLoss2}</div>`;
            }
            if (roll.phobia) {
                html += `<div class="custom-note">😱 Phobia: ${roll.phobia}</div>`;
            }
            if (roll.curse) {
                html += `<div class="custom-note">🎲 Curse: ${roll.curse}</div>`;
            }
        });
        
        if (count > 1 || effect.stackRule.includes('Cannot be stacked')) {
            html += `<div class="custom-note">📋 ${effect.stackRule}</div>`;
        }
        
        item.innerHTML = html;
        display.appendChild(item);
    });
    
    document.getElementById('effects-container').appendChild(display);
}

function showCurseModal(curseIndex) {
    // Remove any existing modal
    const existingModal = document.querySelector('.curse-modal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.className = 'curse-modal';
    modal.innerHTML = `
        <div class="curse-modal-content">
            <div class="curse-modal-header">
                <span>🎲 Curse #${curseIndex + 1}</span>
                <button onclick="closeCurseModal()" class="curse-close-btn">✕</button>
            </div>
            <div class="curse-modal-body">
                ${curses[curseIndex] || 'Curse not found'}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeCurseModal();
        }
    });
}

function closeCurseModal() {
    const modal = document.querySelector('.curse-modal');
    if (modal) {
        modal.remove();
    }
}

renderCharacterGrid();