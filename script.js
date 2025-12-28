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
    },

    31: {
        type: 'negative',
        text: 'PC permanently loses proficiency in one saving throw (DM chooses).',
        stackRule: 'Cannot be stacked.'
    },
    32: {
        type: 'negative',
        text: 'PC gains disadvantage on their first roll of every session.',
        stackRule: 'Cannot be stacked.'
    },
    33: {
        type: 'negative',
        text: 'PC permanently loses one attunement slot.',
        stackRule: 'Cannot be stacked.'
    },
    34: {
        type: 'negative',
        text: 'PC can no longer gain inspiration.',
        stackRule: 'Cannot be stacked.'
    },
    35: {
        type: 'negative',
        text: 'All healing received by the PC is reduced by 2.',
        stackRule: 'When stacked, healing reduction increases.',
        stackCalc: (count) => `Healing reduced by ${count * 2}`
    },
    36: {
        type: 'negative',
        text: 'PC permanently gains disadvantage on death saving throws.',
        stackRule: 'Cannot be stacked.'
    },
    37: {
        type: 'negative',
        text: 'PC’s carrying capacity is halved permanently.',
        stackRule: 'Cannot be stacked.'
    },
    38: {
        type: 'negative',
        text: 'PC cannot benefit from Help actions.',
        stackRule: 'Cannot be stacked.'
    },
    39: {
        type: 'negative',
        text: 'PC loses resistance to one damage type they currently have.',
        stackRule: 'When stacked, loses another resistance.'
    },
    40: {
        type: 'negative',
        text: 'PC permanently loses darkvision (if they had it).',
        stackRule: 'Nothing happens if rolled again.'
    },

    41: {
        type: 'mixed',
        text: '+2 to one skill of choice. –2 to another skill of choice.',
        stackRule: 'Stacked normally.'
    },
    42: {
        type: 'mixed',
        text: 'Advantage on saving throws vs magic. Disadvantage on non-magical saves.',
        stackRule: 'Cannot be stacked.'
    },
    43: {
        type: 'mixed',
        text: 'Once per session, ignore difficult terrain. Speed is reduced by 5 permanently.',
        stackRule: 'Cannot be stacked.'
    },
    44: {
        type: 'mixed',
        text: 'Gain blindsight 5 ft. Become vulnerable to psychic damage.',
        stackRule: 'Cannot be stacked.'
    },
    45: {
        type: 'mixed',
        text: 'Once per day, auto-crit on a hit. Next long rest gives no benefits.',
        stackRule: 'Cannot be stacked.'
    },
    46: {
        type: 'mixed',
        text: 'Immune to fear. Automatically fail the first charm save each session.',
        stackRule: 'Cannot be stacked.'
    },
    47: {
        type: 'mixed',
        text: '+1 AC permanently. –1 to all saving throws.',
        stackRule: 'Stacked normally.'
    },
    48: {
        type: 'mixed',
        text: 'Gain advantage on Perception. Disadvantage on Insight.',
        stackRule: 'Cannot be stacked.'
    },
    49: {
        type: 'mixed',
        text: 'Once per session, turn a miss into a hit. Take 1d10 force damage.',
        stackRule: 'Stacked normally.'
    },
    50: {
        type: 'mixed',
        text: 'Gain one extra reaction per day. Lose your reaction on round one of combat.',
        stackRule: 'Cannot be stacked.'
    },

    51: {
        type: 'positive',
        text: '+1 to all saving throws.',
        stackRule: 'When stacked, increases normally.',
        stackCalc: (count) => `Total save bonus: +${count}`
    },
    52: {
        type: 'positive',
        text: '+10 ft movement speed permanently.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Total speed bonus: +${count * 10} ft`
    },
    53: {
        type: 'positive',
        text: 'Regain one spent hit die at the start of every session.',
        stackRule: 'Cannot be stacked.'
    },
    54: {
        type: 'positive',
        text: 'Choose one damage type: gain resistance.',
        stackRule: 'When stacked, choose another damage type.'
    },
    55: {
        type: 'positive',
        text: '+1 to spell save DC.',
        stackRule: 'Stacked normally.',
        stackCalc: (count) => `Total spell DC bonus: +${count}`
    },
    56: {
        type: 'positive',
        text: 'Once per day, gain advantage on all rolls for one round.',
        stackRule: 'Cannot be stacked.'
    },
    57: {
        type: 'positive',
        text: 'Gain proficiency in one saving throw (DM chooses).',
        stackRule: 'Cannot be stacked.'
    },
    58: {
        type: 'positive',
        text: 'Critical hits deal max damage instead of rolling.',
        stackRule: 'Cannot be stacked.'
    },
    59: {
        type: 'positive',
        text: '+2 to death saving throws.',
        stackRule: 'Cannot be stacked.'
    },
    60: {
        type: 'positive',
        text: 'Gain one extra attunement slot.',
        stackRule: 'Cannot be stacked.'
    },

    61: {
        type: 'powerful',
        text: 'Once per day, negate all damage from one source.',
        stackRule: 'If stacked, extra uses last only this session.'
    },
    62: {
        type: 'powerful',
        text: '+2 to AC until you are hit; then it ends permanently.',
        stackRule: 'Cannot be stacked.'
    },
    63: {
        type: 'powerful',
        text: 'Once per session, act twice on your turn.',
        stackRule: 'If stacked, extra uses last this session only.'
    },
    64: {
        type: 'powerful',
        text: 'Immune to one condition of your choice.',
        stackRule: 'When stacked, choose another condition.'
    },
    65: {
        type: 'powerful',
        text: 'Once per day, automatically succeed any saving throw.',
        stackRule: 'Cannot be stacked.'
    },
    66: {
        type: 'powerful',
        text: '+2 to one ability score (max 24).',
        stackRule: 'Stacked normally.'
    },
    67: {
        type: 'powerful',
        text: 'Whenever you drop to 0 HP, immediately take one extra turn.',
        stackRule: 'Cannot be stacked.'
    },
    68: {
        type: 'powerful',
        text: 'Spells ignore resistance.',
        stackRule: 'Cannot be stacked.'
    },
    69: {
        type: 'powerful',
        text: 'Weapon attacks ignore immunity and treat it as resistance.',
        stackRule: 'Cannot be stacked.'
    },
    70: {
        type: 'powerful',
        text: 'You cannot die from failed death saves. Massive damage can still kill you.',
        stackRule: 'Cannot be stacked.'
    },

    71: {
        type: 'disaster',
        text: 'PC immediately gains 3 permanent exhaustion levels.',
        stackRule: 'Cannot be stacked.'
    },
    72: {
        type: 'disaster',
        text: 'All gold carried by the party turns to dust.',
        stackRule: 'Nothing happens if rolled again.'
    },
    73: {
        type: 'disaster',
        text: 'A random PC permanently loses one class feature (DM chooses).',
        stackRule: 'Cannot be stacked.'
    },
    74: {
        type: 'disaster',
        text: 'PC’s soul is marked; resurrection requires a DC 15 check.',
        stackRule: 'When stacked, DC increases by 5.'
    },
    75: {
        type: 'disaster',
        text: 'PC permanently loses access to one spell level (highest available).',
        stackRule: 'Cannot be stacked.'
    },
    76: {
        type: 'disaster',
        text: 'PC becomes vulnerable to all damage for one session.',
        stackRule: 'Nothing happens if rolled again.'
    },
    77: {
        type: 'disaster',
        text: 'PC loses one death save permanently (now fails at 2).',
        stackRule: 'Cannot be stacked.'
    },
    78: {
        type: 'disaster',
        text: 'A major NPC becomes a permanent enemy.',
        stackRule: 'When stacked, enemy gains power.'
    },
    79: {
        type: 'disaster',
        text: 'PC permanently loses one spell slot of each level.',
        stackRule: 'Cannot be stacked.'
    },
    80: {
        type: 'disaster',
        text: 'PC cannot benefit from long rests for the next 3 sessions.',
        stackRule: 'Nothing happens if rolled again.'
    },

    81: {
        type: 'positive',
        text: 'Remove one permanent negative effect from the PC.',
        stackRule: 'Stacked normally.'
    },
    82: {
        type: 'positive',
        text: 'Gain advantage on all saving throws for one full session.',
        stackRule: 'Nothing happens if rolled again.'
    },
    83: {
        type: 'positive',
        text: 'Gain one extra feat (DM chooses).',
        stackRule: 'Cannot be stacked.'
    },
    84: {
        type: 'positive',
        text: 'Regain all spent spell slots immediately.',
        stackRule: 'Nothing happens if rolled again.'
    },
    85: {
        type: 'positive',
        text: 'Automatically succeed your next three rolls.',
        stackRule: 'Cannot be stacked.'
    },
    86: {
        type: 'powerful',
        text: 'Choose any spell of 5th level or lower: cast it once per day.',
        stackRule: 'Cannot be stacked.',
        requiresCustom: ['spell']
    },
    87: {
        type: 'powerful',
        text: 'You always act first in initiative.',
        stackRule: 'Cannot be stacked.'
    },
    88: {
        type: 'powerful',
        text: 'You cannot be critically hit.',
        stackRule: 'Cannot be stacked.'
    },
    89: {
        type: 'powerful',
        text: 'Double all healing you receive.',
        stackRule: 'Cannot be stacked.'
    },
    90: {
        type: 'powerful',
        text: 'Once per campaign, rewrite the outcome of any one event.',
        stackRule: 'Cannot be stacked.'
    },

    91: {
        type: 'disaster',
        text: 'The bell permanently bonds to the PC; only they may ring it.',
        stackRule: 'Nothing happens if rolled again.'
    },
    92: {
        type: 'disaster',
        text: 'PC permanently loses a level.',
        stackRule: 'Cannot be stacked.'
    },
    93: {
        type: 'disaster',
        text: 'All magic items carried become cursed.',
        stackRule: 'Nothing happens if rolled again.'
    },
    94: {
        type: 'disaster',
        text: 'PC permanently fails one saving throw type.',
        stackRule: 'Cannot be stacked.'
    },
    95: {
        type: 'disaster',
        text: 'PC becomes invisible to resurrection magic.',
        stackRule: 'Cannot be stacked.'
    },
    96: {
        type: 'disaster',
        text: 'A hostile extraplanar entity becomes aware of the PC.',
        stackRule: 'When stacked, it acts sooner.'
    },
    97: {
        type: 'disaster',
        text: 'PC permanently loses their highest ability score.',
        stackRule: 'Cannot be stacked.'
    },
    98: {
        type: 'disaster',
        text: 'Reality fractures: reroll all bell effects this session.',
        stackRule: 'Cannot be stacked.'
    },
    99: {
        type: 'disaster',
        text: 'PC immediately dies. Resurrection is possible.',
        stackRule: 'Nothing happens if rolled again.'
    },
    100: {
        type: 'legendary',
        text: 'The bell rewrites fate. PC chooses any result from this table. Bell shatters forever.',
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