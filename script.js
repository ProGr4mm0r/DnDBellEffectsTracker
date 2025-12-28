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
        text: 'Weapons deal +1d4 thunder damage permanently.',
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

// CHARACTER DATA - EDIT THIS SECTION
const characters = {
    lim: {
        name: 'Lim',
        rolls: [
            { num: 2 },
            { num: 3 },
            { num: 12 },
            { num: 24 }
        ]
    },
    imp: {
        name: 'Imp',
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
        rolls: [
            { num: 19 },
            { num: 19 },
            { num: 20 },
            { num: 28, curseNum: 6 }
        ]
    },
    keaden: {
        name: 'Keaden',
        rolls: [
            { num: 23, spell: 'https://www.dndbeyond.com/spells/2299-web', spellName: 'Web' },
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
                html += `<div class="custom-note">-${roll.lossAmount || '1'} to ${roll.abilityLoss}</div>`;
            }
            if (roll.curseNum) {
                html += `<div class="custom-note">🎲 Curse #${roll.curseNum}</div>`;
            }
        });
        
        if (effect.hasLink && num == 28) {
            html += `<a href="curses.html" target="_blank" class="link-button">📋 View Curse List</a>`;
        }
        
        if (count > 1 || effect.stackRule.includes('Cannot be stacked')) {
            html += `<div class="custom-note">📋 ${effect.stackRule}</div>`;
        }
        
        item.innerHTML = html;
        display.appendChild(item);
    });
    
    document.getElementById('effects-container').appendChild(display);
}

renderCharacterGrid();