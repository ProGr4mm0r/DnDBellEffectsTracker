// Bell effect definitions
const bellEffects = {
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
        stackCalc: (count) => `Approx. magic items lost: ${count} (one additional item broken per stack)`
    },
    7: {
        type: 'negative',
        text: 'Powerful creatures instinctively distrust or target them.',
        stackRule: 'When stacked they distrust more.',
        stackCalc: (count) => `Distrust intensity: +${count} (use DM fiat to scale social/hostile reactions)`
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
        stackRule: 'When stacked they gain more age. It is fully cosmetic; they will not lose any time before they die.',
        stackCalc: (count) => `Total age gain: roll ${count}d20 years (roll separately for each stack)`
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
        requiresCustom: ['feat', 'abilityLoss'],
        stackCalc: (count) => `Feats gained: ${count}, Ability points permanently lost: ${count}`
    },
    14: {
        type: 'mixed',
        text: 'Once per day, reroll a failed roll. Next save that day has disadvantage.',
        stackRule: 'If stacked then only one of them is permanent and the rest is until the end of the session.',
        stackCalc: (count) => `Permanent daily rerolls: 1; Temporary (session) rerolls: ${Math.max(0, count - 1)}`
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
        stackCalc: (count) => `Questions granted (usable overall): ${count}; Proficiencies lost: ${count}`
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
        stackRule: 'If stacked then only one of them is permanent and the rest is until the end of the session.',
        stackCalc: (count) => `Permanent +1d4 to weapons: 1; Temporary (session) bonuses: ${Math.max(0, count - 1)}`
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
        stackCalc: (count) => `Total extra spells known (2nd–3rd, 1/day): ${count}`
    },
    24: {
        type: 'powerful',
        text: 'Once per day, can\'t drop below 1 HP. Afterward, Frightened for 1 minute.',
        stackRule: 'If stacked then only one of them is permanent and the rest is until the end of the session.',
        stackCalc: (count) => `Permanent \"can\'t drop below 1HP\" effects: 1; Session-limited: ${Math.max(0, count - 1)}`
    },
    25: {
        type: 'powerful',
        text: 'Once per session force a reroll. DM may do the same later.',
        stackRule: 'If stacked then only one of them is permanent and the rest is until the end of the session.',
        stackCalc: (count) => `Permanent forced rerolls: 1; Session-limited forced rerolls: ${Math.max(0, count - 1)}`
    },
    26: {
        type: 'powerful',
        text: '+2 to one ability (max 24) (DM chooses). –2 to another permanently (DM chooses).',
        stackRule: 'Stacked normally.',
        requiresCustom: ['abilityGain', 'abilityLoss'],
        stackCalc: (count) => `Total ability gains (+2 each): ${count * 2}; Total permanent ability losses (−2 each): ${count * 2}`
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
        hasLink: true,
        stackCalc: (count) => `Total necrotic damage if stacked: ${count * 4}d10 (separate rolls)`
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
    },

    // NEW: 31–100 (unique & varied)
    31: {
        type: 'negative',
        text: 'All healing on the party is halved (round down) for the next 7 days.',
        stackRule: 'When stacked extend duration.',
        stackCalc: (count) => `Duration: ${7 * count} days of halved healing`
    },
    32: {
        type: 'negative',
        text: 'Your shadow detaches and follows a different path for 24 hours — grants enemies advantage on tracking you.',
        stackRule: 'When stacked extend duration and increase tracking penalty.',
        stackCalc: (count) => `Duration: ${24 * count} hours; Tracking penalty: advantage if count ≥ 1 (DM scales)`
    },
    33: {
        type: 'negative',
        text: 'All coinpurses you carry gain a small hole: each time you rest you lose 1 gp (if you have any).',
        stackRule: 'When stacked increase the gp lost per long rest.',
        stackCalc: (count) => `GP lost per long rest: ${count} gp`
    },
    34: {
        type: 'negative',
        text: 'Your hands glow faintly when you touch blood, revealing you in darkness.',
        stackRule: 'Cannot be stacked.'
    },
    35: {
        type: 'negative',
        text: 'You gain a visible sigil on your forehead. Detectable by magic that reads identity (scrying easier).',
        stackRule: 'Stacked marks intensify detection.',
        stackCalc: (count) => `Scrying penalty for others: −${count} to resist detection (DM-modified)`
    },
    36: {
        type: 'negative',
        text: 'All ranged attacks you make have −1 to attack rolls.',
        stackRule: 'When stacked increase penalty.',
        stackCalc: (count) => `Total ranged penalty: −${count} to attack rolls`
    },
    37: {
        type: 'mixed',
        text: 'Once per long rest, you may communicate telepathically with one creature within 60 ft for 1 minute. Others hear whispers afterward (minor social penalty).',
        stackRule: 'Stacked increase uses per long rest.',
        stackCalc: (count) => `Telepathic uses per long rest: ${count}`
    },
    38: {
        type: 'mixed',
        text: 'Gain proficiency in one tool of your choice. Each time you use it in a creative way, roll advantage but suffer a minor (1) temporary penalty afterward.',
        stackRule: 'Stacked grant multiple proficiencies.',
        stackCalc: (count) => `Tool proficiencies gained: ${count}`
    },
    39: {
        type: 'mixed',
        text: 'You can see invisible creatures for 10 minutes once per day; afterward you have disadvantage on Wisdom checks for 1 hour.',
        stackRule: 'When stacked extend duration of vision but increase penalty duration.',
        stackCalc: (count) => `See invisible duration: ${10 * count} minutes; Wisdom penalty duration: ${1 * count} hours`
    },
    40: {
        type: 'positive',
        text: 'A small magical trinket follows you and grants +1 to one chosen skill once per short rest.',
        stackRule: 'When stacked grant more skills or more uses.',
        stackCalc: (count) => `Per short rest uses: ${count}; Skills benefited: up to ${count}`
    },
    41: {
        type: 'mixed',
        text: 'Grant one single cast of the Wildmagic EX spell "Summon" (usable once by the ringing PC).',
        stackRule: 'Cannot be stacked.',
    },
    42: {
        type: 'powerful',
        text: 'For 24 hours, once per day you can reassign an enemy\'s single attack to another target (must be creature in range).',
        stackRule: 'When stacked increase the number of reassigns per day.',
        stackCalc: (count) => `Reassigns per day: ${count}`
    },
    43: {
        type: 'powerful',
        text: 'Your weapons become silvered and count as magical for 1 hour.',
        stackRule: 'When stacked extend duration.',
        stackCalc: (count) => `Duration: ${1 * count} hour(s)`
    },
    44: {
        type: 'positive',
        text: 'Gain a minor familiar (owl/cat/bat) that can deliver spoken messages once per day.',
        stackRule: 'When stacked the familiar grows more useful: more messages per day.',
        stackCalc: (count) => `Messages per day: ${count}`
    },
    45: {
        type: 'positive',
        text: 'You learn one language of your choice.',
        stackRule: 'Stacked grant more languages.',
        stackCalc: (count) => `Languages learned: ${count}`
    },
    46: {
        type: 'mixed',
        text: 'Your footsteps are silent for 1 hour, but you leave faint glowing footprints visible to arcane watchers.',
        stackRule: 'When stacked extend duration and intensity of footprints.',
        stackCalc: (count) => `Silent duration: ${1 * count} hour(s); Footprint visibility: increases with count (DM)`
    },
    47: {
        type: 'negative',
        text: 'Whenever you cast a cantrip, roll a d6: on a 1 the cantrip fizzles and you take 1 psychic damage.',
        stackRule: 'When stacked increase fizzles per day.',
        stackCalc: (count) => `Additional daily fizzles: ${count - 1} (DM tracks)`
    },
    48: {
        type: 'negative',
        text: 'Your hair grows rapidly and requires a free object interaction to tame each morning.',
        stackRule: 'Stacked require more interactions per morning.',
        stackCalc: (count) => `Free interactions needed each morning: ${count}`
    },
    49: {
        type: 'positive',
        text: 'You gain the ability to speak with one type of animal (DM chooses) for 7 days.',
        stackRule: 'Stacked extend duration and add animal types.',
        stackCalc: (count) => `Days: ${7 * count}; Animal types: ${count}`
    },
    50: {
        type: 'powerful',
        text: 'Once per day you may teleport up to 30 ft as a bonus action (short blink).',
        stackRule: 'Stacked increase uses per day.',
        stackCalc: (count) => `Teleports per day: ${count}`
    },
    51: {
        type: 'mixed',
        text: 'You gain a faint spectral shield: +1 AC vs ranged attacks for 24 hours; after shield fails once it shatters and causes -1 to Int until long rest.',
        stackRule: 'When stacked increase AC and number of shatter events.',
        stackCalc: (count) => `AC bonus vs ranged: +${count}; Shatter events before exhaustion: ${count}`
    },
    52: {
        type: 'negative',
        text: 'Your voice echoes oddly; attempts at stealth where you speak have −2 until cured.',
        stackRule: 'Stacked increase penalty.',
        stackCalc: (count) => `Stealth speaking penalty: −${2 * count}`
    },
    53: {
        type: 'positive',
        text: 'Once per long rest, you may reroll one skill check and take the higher result.',
        stackRule: 'Stacked increase rerolls per long rest.',
        stackCalc: (count) => `Rerolls per long rest: ${count}`
    },
    54: {
        type: 'negative',
        text: 'All food tastes bland to you; you gain no benefit from special meal bonuses for 3 days.',
        stackRule: 'Stacked extend duration.',
        stackCalc: (count) => `Duration: ${3 * count} days`
    },
    55: {
        type: 'mixed',
        text: 'Your footsteps leave tiny arcane sigils that heal allies who step on them for 1 hp once, lasting 1 day.',
        stackRule: 'Stacked increase number of sigils placed per day.',
        stackCalc: (count) => `Sigils per day: ${count}`
    },
    56: {
        type: 'positive',
        text: 'Your critical hit range increases by 1 (e.g., 19–20) for 24 hours.',
        stackRule: 'Stacked increase critical range up to 17–20.',
        stackCalc: (count) => `Critical range start: ${Math.max(20 - count, 17)} (min 17)`
    },
    57: {
        type: 'negative',
        text: 'You become slightly magnetic: small metal objects cling to you causing disadvantage on Sleight of Hand.',
        stackRule: 'When stacked increase penalty.',
        stackCalc: (count) => `Sleight of Hand penalty: −${count}`
    },
    58: {
        type: 'mixed',
        text: 'Gain the minor cantrip "Guiding Spark" (DM chooses damage/type). Once per short rest it can be heightened.',
        stackRule: 'Stacked grant more uses or cantrips.',
        stackCalc: (count) => `Cantrip uses per short rest: ${count}`
    },
    59: {
        type: 'powerful',
        text: 'Receive a spectral banner: while planted it grants allies +1 to saving throws within 10 ft (30 minutes).',
        stackRule: 'Stacked increase radius or duration.',
        stackCalc: (count) => `Radius: ${10 * count} ft; Duration: ${30 * count} minutes`
    },
    60: {
        type: 'disaster',
        text: 'A small localized storm follows you for 1 day: rain, static, and random lightning crackles (harmless but draws attention).',
        stackRule: 'Stacked increase duration.',
        stackCalc: (count) => `Duration: ${24 * count} hours`
    },
    61: {
        type: 'negative',
        text: 'You cannot be healed above half your max HP for the next long rest.',
        stackRule: 'When stacked lower the healing cap further.',
        stackCalc: (count) => `Max healable fraction: ${Math.max(0.5 - (count - 1) * 0.1, 0.1)} of max HP`
    },
    62: {
        type: 'positive',
        text: 'Gain expertise (double proficiency) in one skill of your choice.',
        stackRule: 'Stacked grant expertise in multiple skills.',
        stackCalc: (count) => `Skills with expertise: ${count}`
    },
    63: {
        type: 'mixed',
        text: 'Your hands can become spectral for 1 minute: you may pass through a nonmagical barrier once; afterward your hands ache giving −1 Str for 1 hour.',
        stackRule: 'Stacked increase uses per day.',
        stackCalc: (count) => `Uses per day: ${count}; Post-ache Str penalty duration: ${1 * count} hour(s)`
    },
    64: {
        type: 'negative',
        text: 'When wearing armor you hum softly; stealth rolls with armor suffer −2.',
        stackRule: 'Stacked increase penalty.',
        stackCalc: (count) => `Armor stealth penalty: −${2 * count}`
    },
    65: {
        type: 'positive',
        text: 'Gain a +1 bonus to saves vs one damage type of your choice for 7 days.',
        stackRule: 'Stacked allow more damage types or increase bonus.',
        stackCalc: (count) => `Damage types covered: ${count}; Bonus per type: +1 (per stack)`
    },
    66: {
        type: 'powerful',
        text: 'You may once per week call down a small flare that blinds (1 round) creatures in a 5-ft cone (Dex save DC 13).',
        stackRule: 'Stacked increase weekly uses.',
        stackCalc: (count) => `Flares per week: ${count}`
    },
    67: {
        type: 'mixed',
        text: 'All locks you touch become easier to pick for 24 hours (+2 to Thieves´ Tools checks), but you glow faintly in moonlight.',
        stackRule: 'Stacked increase bonus and glow intensity.',
        stackCalc: (count) => `Tool bonus: +${2 * count}; Glow intensity: level ${count}`
    },
    68: {
        type: 'negative',
        text: 'You constantly smell faintly of smoke; social checks in polite company suffer −1.',
        stackRule: 'Stacked increase penalty.',
        stackCalc: (count) => `Social penalty: −${count}`
    },
    69: {
        type: 'positive',
        text: 'Once per long rest, you may stabilize an ally automatically without a roll.',
        stackRule: 'Stacked increase automatic stabilizations per long rest.',
        stackCalc: (count) => `Automatic stabilizations per long rest: ${count}`
    },
    70: {
        type: 'powerful',
        text: 'Your next crafted magic item gains a minor bonus determined by DM (+1 to attack or +1 to save DC).',
        stackRule: 'Stacked add more minor bonuses.',
        stackCalc: (count) => `Minor bonuses on next item: ${count}`
    },
    71: {
        type: 'mixed',
        text: 'You speak with echoes of future-you for 1 minute; gain a hint (DM gives). Afterward you gain a −1 penalty to Int checks for 24 hours.',
        stackRule: 'Stacked increase number of hints but also penalty.',
        stackCalc: (count) => `Hints available: ${count}; Int penalty duration: ${24 * count} hours`
    },
    72: {
        type: 'negative',
        text: 'Your map ink fades randomly; investigations with written notes have −2 for 24 hours.',
        stackRule: 'Stacked increase penalty or duration.',
        stackCalc: (count) => `Investigation penalty: −${2 * count}; Duration: ${24 * count} hours`
    },
    73: {
        type: 'positive',
        text: 'For 48 hours you radiate a calming aura: one ally within 10 ft gains +2 to saves vs charm/fear.',
        stackRule: 'Stacked increase range or number of allies.',
        stackCalc: (count) => `Allies affected: ${count}; Range: ${10 * count} ft`
    },
    74: {
        type: 'disaster',
        text: 'A minor planar rift opens nearby; harmless fey and spirits appear, causing social/puzzle chaos for 1 day.',
        stackRule: 'Stacked increase frequency of odd encounters.',
        stackCalc: (count) => `Rift days: ${count} day(s); Encounters scale with count`
    },
    75: {
        type: 'negative',
        text: 'You lose short-term memory of one recent scene (1 hour) once per day; DM chooses which scene.',
        stackRule: 'Stacked increase lost scenes.',
        stackCalc: (count) => `Scenes forgotten per day: ${count}`
    },
    76: {
        type: 'positive',
        text: 'Your crafted nonmagical items are of superior quality: next 3 crafts have +2 to quality checks.',
        stackRule: 'Stacked increase number of enhanced crafts.',
        stackCalc: (count) => `Enhanced crafts: ${3 * count}`
    },
    77: {
        type: 'mixed',
        text: 'You gain the ability to hold your breath for 10 × Con minutes, but your color drains slightly (disadvantage on Performance checks relying on appearance).',
        stackRule: 'Stacked increase breath multiplier.',
        stackCalc: (count) => `Breath hold multiplier: ${10 * count} × Con minutes; Performance penalty stacks: −${count}`
    },
    78: {
        type: 'negative',
        text: 'You attract small vermin (no mechanical damage) that are a persistent nuisance in confined spaces.',
        stackRule: 'Stacked increase vermin number and nuisance impact.',
        stackCalc: (count) => `Vermin level: ${count} (DM describes nuisance effects)`
    },
    79: {
        type: 'positive',
        text: 'For one hour after resting you gain +2 to movement and dash costs no extra action once.',
        stackRule: 'Stacked extend duration and bonus.',
        stackCalc: (count) => `Duration: ${1 * count} hour(s); Bonus to movement: +${2 * count}`
    },
    80: {
        type: 'powerful',
        text: 'You may sacrifice a spell slot to grant an ally an immediate extra reaction (usable once per long rest).',
        stackRule: 'Stacked increase uses per long rest.',
        stackCalc: (count) => `Extra reactions per long rest: ${count}`
    },
    81: {
        type: 'mixed',
        text: 'A small familiar spirit offers cryptic advice once per day (+advantage on one chosen roll if you follow it, but you must accept a weird condition).',
        stackRule: 'Stacked increase daily advices and odd conditions.',
        stackCalc: (count) => `Advices per day: ${count}; Conditions tracked: ${count}`
    },
    82: {
        type: 'negative',
        text: 'Your footsteps echo heavy; stealth checks made while moving have disadvantage.',
        stackRule: 'Stacked increase duration of effect.',
        stackCalc: (count) => `Duration: ${24 * count} hours of moving disadvantage`
    },
    83: {
        type: 'positive',
        text: 'You gain a small hidden pocket that can carry 10 extra lbs without changing encumbrance.',
        stackRule: 'Stacked increase capacity.',
        stackCalc: (count) => `Extra capacity: ${10 * count} lbs`
    },
    84: {
        type: 'mixed',
        text: 'Once per day: you can step through a 5-ft wide shadow into another adjacent shadow (short teleport), but you leave a small sigil where you reappear that can be tracked for 1 hour.',
        stackRule: 'Stacked increase uses per day and sigil strength.',
        stackCalc: (count) => `Shadow steps per day: ${count}; Sigil track time: ${1 * count} hour(s)`
    },
    85: {
        type: 'negative',
        text: 'Any time you attempt to pick something up in combat you must succeed a DC 10 Dex check or drop it.',
        stackRule: 'Stacked increase DC or penalty frequency.',
        stackCalc: (count) => `Pick-up DC: ${10 + (count - 1) * 2}`
    },
    86: {
        type: 'powerful',
        text: 'You get a temporary boon: once in the next 30 days, you may rewrite one failed skill check to a success (DM enforces reasonable limits).',
        stackRule: 'Stacked increase the number of rewrites and shorten cooldown.',
        stackCalc: (count) => `Total rewrites available in 30 days: ${count}`
    },
    87: {
        type: 'positive',
        text: 'You may attune to an additional minor magic item (beyond normal attunement limits) for 7 days.',
        stackRule: 'Stacked increase number of extra attunements.',
        stackCalc: (count) => `Extra attunements: ${count}; Duration days: 7`
    },
    88: {
        type: 'mixed',
        text: 'Your next healing potion consumed provides double HP, but tastes awful and leaves you with −1 Cha for 8 hours.',
        stackRule: 'Stacked increase number of doubled potions or penalty duration.',
        stackCalc: (count) => `Doubled potions available: ${count}; Cha penalty duration: ${8 * count} hours`
    },
    89: {
        type: 'negative',
        text: 'You get a minor curse of clumsiness: on a natural 1 while moving you stumble and move 5 ft in a random direction.',
        stackRule: 'Stacked increase probability/severity.',
        stackCalc: (count) => `Extra stumble severity level: ${count}`
    },
    90: {
        type: 'positive',
        text: 'Gain a single-use magic token that casts the 1st-level healing spell "Cure Light Wounds" (homebrew) when consumed.',
        stackRule: 'Stacked grant more tokens.',
        stackCalc: (count) => `Healing tokens granted: ${count}`
    },
    91: {
        type: 'powerful',
        text: 'You may once per long rest add +5 temporary HP to an ally as a reaction.',
        stackRule: 'Stacked increase uses per long rest.',
        stackCalc: (count) => `Reactions per long rest: ${count}`
    },
    92: {
        type: 'mixed',
        text: 'Your eyes shimmer and you can see ethereal creatures for 1 hour, but you also take a −1 penalty to saves vs psychic for 24 hours afterward.',
        stackRule: 'Stacked increase vision duration and penalty length.',
        stackCalc: (count) => `Vision duration: ${1 * count} hour(s); Psychic penalty duration: ${24 * count} hours`
    },
    93: {
        type: 'negative',
        text: 'Your armor creaks loudly: while wearing it you have disadvantage on Stealth checks.',
        stackRule: 'When stacked increase severity (disadvantage -> auto-fail on checks ≤ 5).',
        stackCalc: (count) => `Stealth scaling: disadvantage at ${count === 1 ? '1' : count} stacks; auto-fail threshold: ≤ ${5 + (count - 1) * 2}`
    },
    94: {
        type: 'positive',
        text: 'You gain a tiny personal weather bubble: one time you can make it lightly rain in a 10-ft circle to obscure vision (good for escapes).',
        stackRule: 'Stacked increase uses or area.',
        stackCalc: (count) => `Uses: ${count}; Area per use: ${10 * count} ft circle`
    },
    95: {
        type: 'mixed',
        text: 'You can borrow a stranger\'s minor memory for 1 hour (DM supplies a short useful fact). Afterward you lose a benign memory for 1 hour.',
        stackRule: 'Stacked allow more borrowed memories simultaneously.',
        stackCalc: (count) => `Borrowed memories available simultaneously: ${count}`
    },
    96: {
        type: 'negative',
        text: 'Your pockets attract static: small metallic items spark and may misfire once per hour (if applicable).',
        stackRule: 'Stacked increase frequency.',
        stackCalc: (count) => `Spark events per hour: ${count}`
    },
    97: {
        type: 'positive',
        text: 'You obtain a single use of "Insightful Strike": your next attack instead uses your highest mental stat for attack/damage calculations (one-use).',
        stackRule: 'Stacked grant more uses.',
        stackCalc: (count) => `Insightful Strike uses: ${count}`
    },
    98: {
        type: 'powerful',
        text: 'A guardian spirit escorts you at night for 7 days, granting +2 to sleep-based saves and warding you from nightmares.',
        stackRule: 'Stacked extend the duration and add small additional benefits.',
        stackCalc: (count) => `Days guarded: ${7 * count}; Additional save bonus per stack: +${2 * count}`
    },
    99: {
        type: 'disaster',
        text: 'A local NPC develops an inexplicable obsession with you (roleplay-heavy; possible bounty or trouble).',
        stackRule: 'When stacked more NPCs are affected.',
        stackCalc: (count) => `Number of obsessed NPCs: ${count}`
    },
    100: {
        type: 'powerful',
        text: 'One time only: you may rewrite one short, clear event in the past 24 hours (DM final call). After use, gain 2 permanent minor complications (DM chooses).',
        stackRule: 'Cannot be stacked.'
    }
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
            { num: 26, abilityGain: 'Religion', abilityLoss: 'Survival' },
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
                html += `<div class="custom-note">+2 to ${roll.abilityGain}</div>`;
            }
            if (roll.abilityLoss) {
                html += `<div class="custom-note">-${roll.lossAmount * 2 || '2'} to ${roll.abilityLoss}</div>`;
            }
            if (roll.curseNum) {
                const curseIndex = roll.curseNum - 1;
                html += `<a href="#curse-${curseIndex}" onclick="showCurseModal(${curseIndex}); return false;" class="link-button">🎲 View Curse</a>`;
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