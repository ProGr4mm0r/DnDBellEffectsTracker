// Global state loaded from JSON files
let bellEffects = {};
let curses = [];
let characters = {};

// ── Data loading ──────────────────────────────────────────────────────────────

async function loadData() {
    const [effectsRes, cursesRes, charsRes] = await Promise.all([
        fetch('bell_effects.json'),
        fetch('curses.json'),
        fetch('characters.json')
    ]);
    bellEffects  = await effectsRes.json();
    curses       = await cursesRes.json();
    characters   = await charsRes.json();
    renderCharacterGrid();
}

// ── Stack calc evaluation ─────────────────────────────────────────────────────

function evalStackCalc(template, count) {
    if (!template) return null;
    return template.replace(/\{([^}]+)\}/g, (_, expr) => {
        try {
            // eslint-disable-next-line no-new-func
            return Function('count', `return ${expr}`)(count);
        } catch {
            return expr;
        }
    });
}

// ── Character grid ────────────────────────────────────────────────────────────

function renderCharacterGrid() {
    const grid = document.getElementById('character-grid');
    grid.innerHTML = '';
    Object.keys(characters).forEach(key => {
        const char = characters[key];
        const card = document.createElement('div');
        card.className = 'character-card';
        card.dataset.animal = char.animal || '';
        card.dataset.key = key;
        card.onclick = (e) => showEffects(key, e);
        card.innerHTML = `
            <span class="animal-emoji">${char.animalEmoji || '🎲'}</span>
            <div class="character-name">${char.name}</div>
            <div class="effect-count">${char.rolls.length} Rolls</div>
            ${char.animal ? `<span class="animal-badge">${char.animal.replace('-', ' ')}</span>` : ''}
        `;
        grid.appendChild(card);
    });
}

// ── Roll counting ─────────────────────────────────────────────────────────────

function countRolls(rolls) {
    const counts = {};
    rolls.forEach(roll => {
        counts[roll.num] = (counts[roll.num] || 0) + 1;
    });
    return counts;
}

// ── Password flow ─────────────────────────────────────────────────────────────

function showEffects(characterKey, e) {
    const storageKey = `password_verified_${characterKey}`;
    const storedData = localStorage.getItem(storageKey);

    if (storedData) {
        const { timestamp } = JSON.parse(storedData);
        if ((Date.now() - timestamp) / 36e5 < 24) {
            displayEffects(characterKey, e);
            return;
        }
        localStorage.removeItem(storageKey);
    }
    showPasswordPrompt(characterKey, e);
}

function showPasswordPrompt(characterKey, e) {
    const char = characters[characterKey];

    document.querySelectorAll('.password-prompt, .effects-display').forEach(el => el.remove());
    document.querySelectorAll('.character-card').forEach(el => el.classList.remove('active'));
    e.target.closest('.character-card').classList.add('active');

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
    document.getElementById('password-input').addEventListener('keypress', (ev) => {
        if (ev.key === 'Enter') verifyPassword(characterKey);
    });
}

function verifyPassword(characterKey) {
    const char = characters[characterKey];
    const input = document.getElementById('password-input').value;
    const errorEl = document.getElementById('password-error');

    if (input === char.password) {
        localStorage.setItem(`password_verified_${characterKey}`, JSON.stringify({ timestamp: Date.now() }));
        document.querySelector('.password-prompt').remove();
        const activeCard = document.querySelector('.character-card.active');
        displayEffects(characterKey, { target: activeCard });
    } else {
        errorEl.textContent = '❌ Incorrect password';
        document.getElementById('password-input').value = '';
        document.getElementById('password-input').focus();
    }
}

function cancelPassword() {
    document.querySelector('.password-prompt')?.remove();
    document.querySelectorAll('.character-card').forEach(el => el.classList.remove('active'));
}

// ── Effects display ───────────────────────────────────────────────────────────

function buildAnimalAbilityBlock(char) {
    if (!char.animalAbility) return '';
    return `
        <div class="animal-ability-block" data-animal="${char.animal || ''}">
            <div class="animal-ability-header">
                <span class="animal-ability-emoji">${char.animalEmoji || '🐾'}</span>
                <div>
                    <div class="animal-ability-name">${char.animalAbilityName || 'Animal Ability'}</div>
                    ${char.animalAbilityUsage ? `<div class="animal-ability-usage">${char.animalAbilityUsage}</div>` : ''}
                </div>
            </div>
            <div class="animal-ability-text">${char.animalAbility}</div>
        </div>
    `;
}

function displayEffects(characterKey, e) {
    document.querySelectorAll('.effects-display').forEach(el => el.remove());
    document.querySelectorAll('.character-card').forEach(el => el.classList.remove('active'));

    const char = characters[characterKey];
    const counts = countRolls(char.rolls);

    const card = e.target.closest('.character-card');
    card.classList.add('active');

    const display = document.createElement('div');
    display.className = 'effects-display visible';
    if (char.animal) display.dataset.animal = char.animal;

    display.innerHTML = `
        <div class="effects-header">
            ${char.animalEmoji || ''} ${char.name.toUpperCase()}'s Bell Effects
        </div>
        ${buildAnimalAbilityBlock(char)}
    `;

    Object.keys(counts).sort((a, b) => Number(a) - Number(b)).forEach(num => {
        const count = counts[num];
        const effect = bellEffects[num];
        if (!effect) return;

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
            html += `<div class="custom-note">⚡ ${evalStackCalc(effect.stackCalc, count)}</div>`;
        }

        rollsWithNum.forEach(roll => {
            if (roll.spell)        html += `<a href="${roll.spell}" target="_blank" class="link-button">📜 ${roll.spellName || 'Spell Link'}</a>`;
            if (roll.feat)         html += `<a href="${roll.feat}" target="_blank" class="link-button">🎯 ${roll.featName || 'Feat'}</a>`;
            if (roll.abilityGain)  html += `<div class="custom-note">+3 to ${roll.abilityGain}</div>`;
            if (roll.abilityLoss)  html += `<div class="custom-note">-${(Number(roll.lossAmount) || 1) * 2} to ${roll.abilityLoss}</div>`;
            if (roll.curseNum != null) {
                const ci = roll.curseNum - 1;
                html += `<a href="#curse-${ci}" onclick="showCurseModal(${ci}); return false;" class="link-button">🎲 View Curse</a>`;
            }
            if (roll.ageMod)       html += `<div class="custom-note">🎂 Age Modifier: ${roll.ageMod > 0 ? '+' : ''}${roll.ageMod} years</div>`;
            if (roll.skill)        html += `<div class="custom-note">📚 Skill: ${roll.skill}</div>`;
            if (roll.skillGain)    html += `<div class="custom-note">📚 Gained: ${roll.skillGain}</div>`;
            if (roll.skillLoss)    html += `<div class="custom-note">📚 Lost: ${roll.skillLoss}</div>`;
            if (roll.weaponType)   html += `<div class="custom-note">⚔️ Weapon: ${roll.weaponType}</div>`;
            if (roll.ability)      html += `<div class="custom-note">💪 Ability: ${roll.ability}</div>`;
            if (roll.abilityLoss1) html += `<div class="custom-note">-1 to ${roll.abilityLoss1}</div>`;
            if (roll.abilityLoss2) html += `<div class="custom-note">-1 to ${roll.abilityLoss2}</div>`;
            if (roll.phobia)       html += `<div class="custom-note">😱 Phobia: ${roll.phobia}</div>`;
            if (roll.curse)        html += `<div class="custom-note">🎲 Curse: ${roll.curse}</div>`;
        });

        if (count > 1 || effect.stackRule.includes('Cannot be stacked')) {
            html += `<div class="custom-note">📋 ${effect.stackRule}</div>`;
        }

        item.innerHTML = html;
        display.appendChild(item);
    });

    document.getElementById('effects-container').appendChild(display);
}

// ── Curse modal ───────────────────────────────────────────────────────────────

function showCurseModal(curseIndex) {
    document.querySelector('.curse-modal')?.remove();

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
    modal.addEventListener('click', (ev) => { if (ev.target === modal) closeCurseModal(); });
}

function closeCurseModal() {
    document.querySelector('.curse-modal')?.remove();
}

// ── Boot ──────────────────────────────────────────────────────────────────────

loadData();