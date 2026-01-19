// Module Écrans - Digital Balance

const screensModule = {
    name: 'screens',
    title: 'Digital Balance',
    icon: '📱',
    color: '#e67e22',

    challenges: [
        {
            id: 'screens-profile',
            title: 'Mon profil écran',
            icon: '📊',
            type: 'quiz',
            description: 'Découvre ton rapport aux écrans'
        },
        {
            id: 'screens-effects',
            title: 'Les effets invisibles',
            icon: '👁️',
            type: 'info',
            description: 'Comprendre l\'impact des écrans sur ton corps'
        },
        {
            id: 'screens-tracker',
            title: 'Mon temps d\'écran',
            icon: '⏱️',
            type: 'tracker',
            description: 'Estime ton temps d\'écran quotidien'
        },
        {
            id: 'screens-balance',
            title: 'Trouve ton équilibre',
            icon: '⚖️',
            type: 'info',
            description: 'Des stratégies pour un usage équilibré'
        },
        {
            id: 'screens-goal',
            title: 'Mon défi digital',
            icon: '🎯',
            type: 'goal',
            description: 'Choisis ton amélioration'
        }
    ],

    badges: [
        { id: 'screens-aware', name: 'Conscient digital', icon: '👁️', desc: 'Profil complété' },
        { id: 'screens-balanced', name: 'Équilibriste', icon: '⚖️', desc: 'Stratégies découvertes' },
        { id: 'screens-tracker', name: 'Observateur', icon: '📊', desc: 'Tracking complété' },
        { id: 'screens-master', name: 'Maître du digital', icon: '🎯', desc: 'Module complété' }
    ],

    generateContent() {
        const moduleData = storage.getModuleData('screens');
        
        return `
            <div class="module-intro">
                <h2>📱 Bienvenue dans Digital Balance</h2>
                <p class="intro-text">
                    Les écrans font partie de notre vie, c'est un fait. L'objectif n'est pas de les diaboliser,
                    mais de trouver TON équilibre pour en profiter sans que ça impacte négativement ton bien-être.
                </p>
            </div>

            ${this.challenges.map(c => this.generateChallenge(c, moduleData)).join('')}

            <div class="module-notes">
                <h3>📝 Mes réflexions</h3>
                <div class="notes-container">
                    <textarea 
                        id="screens-notes" 
                        placeholder="Tes observations sur ton usage des écrans..."
                        onchange="screensModule.saveNotes()"
                    >${moduleData.notes || ''}</textarea>
                </div>
            </div>
        `;
    },

    generateChallenge(challenge, moduleData) {
        const isCompleted = moduleData.challenges.find(c => c.id === challenge.id && c.completed);
        return `
            <div class="activity-card ${isCompleted ? 'completed' : ''}" id="${challenge.id}-card">
                <div class="activity-header">
                    <span class="activity-icon">${challenge.icon}</span>
                    <h3>${challenge.title}</h3>
                    ${isCompleted ? '<span class="completed-badge">✓</span>' : ''}
                </div>
                <p>${challenge.description}</p>
                <div id="${challenge.id}-content">
                    ${this.generateChallengeContent(challenge.id, moduleData)}
                </div>
            </div>
        `;
    },

    generateChallengeContent(challengeId, moduleData) {
        switch (challengeId) {
            case 'screens-profile':
                return `
                    <div class="quiz-simple">
                        <h4>Estime ton temps d'écran quotidien (en dehors de l'école) :</h4>
                        <select id="screen-time" onchange="screensModule.analyzeProfile()">
                            <option value="">-- Choisis --</option>
                            <option value="1">Moins d'1h</option>
                            <option value="2">1-2h</option>
                            <option value="3">2-3h</option>
                            <option value="4">3-4h</option>
                            <option value="5">Plus de 4h</option>
                        </select>
                        <div id="profile-result" style="display:none; margin-top:20px;"></div>
                    </div>
                `;
            
            case 'screens-effects':
                return `
                    <div class="effects-content">
                        <h4>👁️ Sur tes yeux</h4>
                        <p>La lumière bleue des écrans fatigue tes yeux et peut causer maux de tête et vision floue. 
                        Règle des 20-20-20 : toutes les 20 minutes, regarde quelque chose à 20 pieds (6m) pendant 20 secondes.</p>

                        <h4>😴 Sur ton sommeil</h4>
                        <p>La lumière bleue bloque la production de mélatonine (hormone du sommeil). 
                        Résultat : tu as du mal à t'endormir après avoir scrollé sur ton téléphone.</p>

                        <h4>🧠 Sur ton cerveau</h4>
                        <p>Le multi-tasking (passer d'une app à l'autre) fatigue ton cerveau et réduit ta concentration. 
                        Ton cerveau a besoin de temps calme pour traiter les informations.</p>

                        <h4>💪 Sur ton corps</h4>
                        <p>Position courbée = mal de dos et de nuque. Sédentarité = moins d'énergie. 
                        Bouge régulièrement !</p>

                        <button class="btn-primary" onclick="screensModule.completeChallenge('screens-effects')">
                            ✓ J'ai compris
                        </button>
                    </div>
                `;
            
            case 'screens-tracker':
                return `
                    <div class="tracker-container">
                        <p>Estime ton temps d'écran pour chaque journée de la semaine :</p>
                        <div id="screen-tracker-inputs">
                            ${['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map(day => `
                                <div class="tracker-day">
                                    <label>${day} :</label>
                                    <input type="number" id="screen-${day}" min="0" max="24" placeholder="Heures">
                                </div>
                            `).join('')}
                        </div>
                        <button class="btn-primary" onclick="screensModule.analyzeTracking()">
                            📊 Analyser ma semaine
                        </button>
                        <div id="tracking-analysis" style="display:none; margin-top:20px;"></div>
                    </div>
                `;
            
            case 'screens-balance':
                return `
                    <div class="balance-strategies">
                        <h4>🛠️ Boîte à outils pour un usage équilibré</h4>
                        
                        <div class="strategy">
                            <strong>1. Mode "Ne pas déranger"</strong>
                            <p>Active-le pendant les devoirs, les repas, et 1h avant de dormir.</p>
                        </div>

                        <div class="strategy">
                            <strong>2. Limite de temps</strong>
                            <p>Utilise les fonctions de ton téléphone pour limiter certaines apps.</p>
                        </div>

                        <div class="strategy">
                            <strong>3. Zone sans écran</strong>
                            <p>Ta chambre = zone sans écran 1h avant de dormir. Laisse ton téléphone ailleurs !</p>
                        </div>

                        <div class="strategy">
                            <strong>4. Remplace par...</strong>
                            <p>Au lieu de scroller : lis, dessine, fais du sport, vois des amis IRL.</p>
                        </div>

                        <div class="info-box">
                            <strong>💡 Le truc :</strong>
                            <p>Désactive les notifications non-essentielles. C'est elles qui créent l'addiction !</p>
                        </div>

                        <button class="btn-primary" onclick="screensModule.completeChallenge('screens-balance')">
                            ✓ Stratégies notées
                        </button>
                    </div>
                `;
            
            case 'screens-goal':
                const currentGoal = moduleData.personalGoal || '';
                return `
                    <div class="goal-container">
                        <h4>🎯 Mon défi digital</h4>
                        <div class="goal-suggestions">
                            <div class="goal-option" onclick="screensModule.selectGoal('Pas d\\'écran 1h avant de dormir')">
                                Pas d'écran 1h avant de dormir
                            </div>
                            <div class="goal-option" onclick="screensModule.selectGoal('Limiter les réseaux sociaux à 1h/jour')">
                                Limiter les réseaux sociaux à 1h/jour
                            </div>
                            <div class="goal-option" onclick="screensModule.selectGoal('Téléphone hors de ma chambre la nuit')">
                                Téléphone hors de ma chambre la nuit
                            </div>
                        </div>

                        <div class="custom-goal">
                            <label>Ou ton propre défi :</label>
                            <textarea id="screens-custom-goal" rows="3">${currentGoal}</textarea>
                            <button class="btn-primary" onclick="screensModule.saveGoal()">💾 Enregistrer</button>
                        </div>

                        ${currentGoal ? `<div class="current-goal"><h5>✓ Mon défi :</h5><p>${currentGoal}</p></div>` : ''}
                    </div>
                `;
            
            default:
                return '';
        }
    },

    analyzeProfile() {
        const time = document.getElementById('screen-time').value;
        const result = document.getElementById('profile-result');
        
        if (!time) return;
        
        result.style.display = 'block';
        
        const messages = {
            '1': '✅ Super ! Tu as un usage très modéré des écrans. Continue comme ça !',
            '2': '👍 Pas mal ! Tu es dans une zone équilibrée. Veille à garder du temps pour d\'autres activités.',
            '3': '⚠️ Attention, ça commence à faire beaucoup. Essaie de réduire progressivement.',
            '4': '❌ C\'est vraiment beaucoup. Ton sommeil et ta concentration en pâtissent probablement.',
            '5': '🚨 Alerte ! Plus de 4h par jour, c\'est excessif. Il est temps de reprendre le contrôle.'
        };
        
        result.innerHTML = `<div class="info-box">${messages[time]}</div>`;
        
        this.completeChallenge('screens-profile');
        storage.addBadge('screens', this.badges[0]);
    },

    analyzeTracking() {
        const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
        let total = 0;
        let count = 0;
        
        days.forEach(day => {
            const value = parseFloat(document.getElementById(`screen-${day}`).value) || 0;
            if (value > 0) {
                total += value;
                count++;
            }
        });
        
        if (count === 0) {
            app.showNotification('❌ Remplis au moins une journée');
            return;
        }
        
        const avg = (total / count).toFixed(1);
        const analysis = document.getElementById('tracking-analysis');
        
        let message = `<h4>📊 Résultat</h4><p>Moyenne : <strong>${avg}h par jour</strong></p>`;
        
        if (avg < 2) {
            message += '<p>✅ Excellent équilibre digital !</p>';
        } else if (avg < 3) {
            message += '<p>👍 Usage modéré. Pense à varier tes activités.</p>';
        } else if (avg < 4) {
            message += '<p>⚠️ Ça commence à être beaucoup. Essaie de réduire.</p>';
        } else {
            message += '<p>❌ Usage excessif. Mets en place des limites !</p>';
        }
        
        analysis.innerHTML = message;
        analysis.style.display = 'block';
        
        this.completeChallenge('screens-tracker');
        storage.addBadge('screens', this.badges[2]);
    },

    selectGoal(goal) {
        document.getElementById('screens-custom-goal').value = goal;
    },

    saveGoal() {
        const goal = document.getElementById('screens-custom-goal').value.trim();
        if (!goal) {
            app.showNotification('❌ Écris un défi');
            return;
        }
        storage.setPersonalGoal('screens', goal);
        app.showNotification('✓ Défi enregistré !');
        this.completeChallenge('screens-goal');
        setTimeout(() => app.openModule('screens'), 1000);
    },

    saveNotes() {
        storage.saveNotes('screens', document.getElementById('screens-notes').value);
        app.showNotification('✓ Sauvegardé');
    },

    completeChallenge(challengeId) {
        storage.completeChallenge('screens', challengeId);
        app.showNotification('🎉 Défi complété !');
        const moduleData = storage.getModuleData('screens');
        if (moduleData.completed) {
            storage.addBadge('screens', this.badges[3]);
        }
    }
};
