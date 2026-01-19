// Module Sport - Kinesis, le mouvement créateur

const sportModule = {
    name: 'sport',
    title: 'Kinesis - Le mouvement créateur',
    icon: '💪',
    color: '#e74c3c',

    challenges: [
        {
            id: 'sport-discover',
            title: '30 façons de bouger',
            icon: '🎯',
            type: 'discovery',
            description: 'Découvre des activités variées'
        },
        {
            id: 'sport-science',
            title: 'Ton corps expliqué',
            icon: '🧬',
            type: 'info',
            description: 'Ce qui se passe quand tu bouges'
        },
        {
            id: 'sport-micro',
            title: 'Challenge micro-mouvements',
            icon: '⚡',
            type: 'challenge',
            description: 'Petites routines intégrables au quotidien'
        },
        {
            id: 'sport-tracker',
            title: 'Mon activité physique',
            icon: '📊',
            type: 'tracker',
            description: 'Suis ton activité pendant une semaine'
        },
        {
            id: 'sport-goal',
            title: 'Mon objectif mouvement',
            icon: '🎯',
            type: 'goal',
            description: 'Choisis ton défi sportif'
        }
    ],

    badges: [
        { id: 'sport-explorer', name: 'Explorateur actif', icon: '🚀', desc: 'Activités découvertes' },
        { id: 'sport-scientist', name: 'Anatomiste', icon: '🧬', desc: 'Science comprise' },
        { id: 'sport-active', name: 'Toujours en mouvement', icon: '⚡', desc: '7 jours actifs' },
        { id: 'sport-master', name: 'Maître du mouvement', icon: '🏆', desc: 'Module complété' }
    ],

    generateContent() {
        const moduleData = storage.getModuleData('sport');
        
        return `
            <div class="module-intro">
                <h2>💪 Bienvenue dans le monde de Kinesis</h2>
                <p class="intro-text">
                    L'activité physique, ce n'est pas que du "sport" ! C'est tout simplement BOUGER.
                    Découvre comment le mouvement booste ton énergie, ton humeur et ton cerveau.
                </p>
            </div>

            ${this.challenges.map(c => this.generateChallenge(c, moduleData)).join('')}

            <div class="module-notes">
                <h3>📝 Mes découvertes</h3>
                <div class="notes-container">
                    <textarea 
                        id="sport-notes" 
                        placeholder="Ce que le mouvement t'apporte..."
                        onchange="sportModule.saveNotes()"
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
            case 'sport-discover':
                return `
                    <div class="activities-grid">
                        <h4>🎯 Explore ces catégories d'activités :</h4>
                        
                        <div class="activity-category">
                            <strong>💪 Sports classiques</strong>
                            <p>Football, basket, volley, natation, athlétisme, tennis...</p>
                        </div>

                        <div class="activity-category">
                            <strong>🎨 Activités créatives</strong>
                            <p>Danse, parkour, escalade, skateboard, roller...</p>
                        </div>

                        <div class="activity-category">
                            <strong>🧘 Corps & esprit</strong>
                            <p>Yoga, pilates, arts martiaux, tai-chi...</p>
                        </div>

                        <div class="activity-category">
                            <strong>🚴 Mobilité douce</strong>
                            <p>Vélo, marche, trottinette, randonnée...</p>
                        </div>

                        <div class="activity-category">
                            <strong>🎮 Gaming actif</strong>
                            <p>Just Dance, Ring Fit, Beat Saber...</p>
                        </div>

                        <div class="activity-category">
                            <strong>🏠 À la maison</strong>
                            <p>Workout YouTube, corde à sauter, pompes, abdos...</p>
                        </div>

                        <div class="info-box">
                            <strong>💡 L'important :</strong>
                            <p>Trouve ce qui TE plaît ! L'activité physique doit être un plaisir, pas une contrainte.</p>
                        </div>

                        <button class="btn-primary" onclick="sportModule.completeChallenge('sport-discover')">
                            ✓ J'ai exploré
                        </button>
                    </div>
                `;
            
            case 'sport-science':
                return `
                    <div class="science-content">
                        <h4>🧬 Les super-pouvoirs du mouvement</h4>

                        <div class="science-section">
                            <h5>🧠 Sur ton cerveau</h5>
                            <p><strong>Concentration :</strong> L'exercice augmente l'oxygénation de ton cerveau. 
                            Résultat : tu es plus concentré et tu apprends mieux !</p>
                            <p><strong>Mémoire :</strong> Le mouvement stimule la production de BDNF, une protéine qui 
                            aide ton cerveau à créer de nouvelles connexions.</p>
                            <p><strong>Humeur :</strong> Production d'endorphines (hormones du bonheur) + réduction du stress.</p>
                        </div>

                        <div class="science-section">
                            <h5>💪 Sur ton corps</h5>
                            <p><strong>Muscles & os :</strong> Se renforcent, deviennent plus résistants.</p>
                            <p><strong>Cœur :</strong> Devient plus efficace, pompe mieux le sang.</p>
                            <p><strong>Système immunitaire :</strong> Se renforce, tu tombes moins malade.</p>
                            <p><strong>Sommeil :</strong> L'activité physique améliore la qualité du sommeil.</p>
                        </div>

                        <div class="science-section">
                            <h5>😊 Sur ton moral</h5>
                            <p><strong>Confiance en soi :</strong> Tu te sens capable, fort.</p>
                            <p><strong>Stress :</strong> Le mouvement évacue les tensions.</p>
                            <p><strong>Social :</strong> Les activités de groupe créent du lien.</p>
                        </div>

                        <div class="info-box">
                            <strong>🎯 Recommandation OMS :</strong>
                            <p>Au moins 60 minutes d'activité physique modérée à intense par jour pour les ados.
                            Ça peut être fractionné : 20 min le matin, 20 min le midi, 20 min le soir !</p>
                        </div>

                        <button class="btn-primary" onclick="sportModule.completeChallenge('sport-science')">
                            ✓ J'ai tout compris
                        </button>
                    </div>
                `;
            
            case 'sport-micro':
                return `
                    <div class="micro-movements">
                        <h4>⚡ Challenge : Intègre ces micro-mouvements dans ta journée</h4>
                        <p>Coche ceux que tu as essayés :</p>
                        
                        <div class="micro-list">
                            <label class="micro-item">
                                <input type="checkbox" onchange="sportModule.updateMicroProgress()">
                                <span>5 minutes d'étirements au réveil</span>
                            </label>
                            <label class="micro-item">
                                <input type="checkbox" onchange="sportModule.updateMicroProgress()">
                                <span>Prendre les escaliers au lieu de l'ascenseur</span>
                            </label>
                            <label class="micro-item">
                                <input type="checkbox" onchange="sportModule.updateMicroProgress()">
                                <span>Marcher/vélo pour aller à l'école</span>
                            </label>
                            <label class="micro-item">
                                <input type="checkbox" onchange="sportModule.updateMicroProgress()">
                                <span>Pause active de 5 min entre deux devoirs</span>
                            </label>
                            <label class="micro-item">
                                <input type="checkbox" onchange="sportModule.updateMicroProgress()">
                                <span>10 pompes ou squats pendant une pub</span>
                            </label>
                            <label class="micro-item">
                                <input type="checkbox" onchange="sportModule.updateMicroProgress()">
                                <span>Marcher en téléphonant au lieu de rester assis</span>
                            </label>
                        </div>

                        <div id="micro-progress" style="margin-top: 20px;"></div>
                    </div>
                `;
            
            case 'sport-tracker':
                return `
                    <div class="tracker-container">
                        <p>Note ton activité physique pendant une semaine :</p>
                        <div id="sport-tracker-inputs">
                            ${['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map(day => `
                                <div class="tracker-day">
                                    <label>${day} :</label>
                                    <input type="text" id="sport-${day}" placeholder="Activité + durée">
                                </div>
                            `).join('')}
                        </div>
                        <button class="btn-primary" onclick="sportModule.saveTracking()">
                            💾 Sauvegarder ma semaine
                        </button>
                    </div>
                `;
            
            case 'sport-goal':
                const currentGoal = moduleData.personalGoal || '';
                return `
                    <div class="goal-container">
                        <h4>🎯 Mon objectif mouvement</h4>
                        <div class="goal-suggestions">
                            <div class="goal-option" onclick="sportModule.selectGoal('Bouger 30 min par jour')">
                                Bouger 30 min par jour
                            </div>
                            <div class="goal-option" onclick="sportModule.selectGoal('Essayer une nouvelle activité')">
                                Essayer une nouvelle activité
                            </div>
                            <div class="goal-option" onclick="sportModule.selectGoal('Rejoindre un club/équipe')">
                                Rejoindre un club/équipe
                            </div>
                            <div class="goal-option" onclick="sportModule.selectGoal('Marcher 10000 pas par jour')">
                                Marcher 10000 pas par jour
                            </div>
                        </div>

                        <div class="custom-goal">
                            <label>Ou ton propre objectif :</label>
                            <textarea id="sport-custom-goal" rows="3">${currentGoal}</textarea>
                            <button class="btn-primary" onclick="sportModule.saveGoal()">💾 Enregistrer</button>
                        </div>

                        ${currentGoal ? `<div class="current-goal"><h5>✓ Mon objectif :</h5><p>${currentGoal}</p></div>` : ''}
                    </div>
                `;
            
            default:
                return '';
        }
    },

    updateMicroProgress() {
        const checked = document.querySelectorAll('.micro-item input:checked').length;
        const progressDiv = document.getElementById('micro-progress');
        
        progressDiv.innerHTML = `<div class="info-box"><strong>✓ ${checked}/6 micro-mouvements essayés</strong></div>`;
        
        if (checked >= 4) {
            this.completeChallenge('sport-micro');
        }
    },

    saveTracking() {
        const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
        let count = 0;
        
        days.forEach(day => {
            const value = document.getElementById(`sport-${day}`).value.trim();
            if (value) {
                storage.addTracking('sport', { day, activity: value });
                count++;
            }
        });
        
        if (count === 0) {
            app.showNotification('❌ Remplis au moins une journée');
            return;
        }
        
        app.showNotification(`✓ ${count} journées enregistrées`);
        
        if (count >= 5) {
            storage.addBadge('sport', this.badges[2]);
            this.completeChallenge('sport-tracker');
        }
        
        setTimeout(() => app.openModule('sport'), 1000);
    },

    selectGoal(goal) {
        document.getElementById('sport-custom-goal').value = goal;
    },

    saveGoal() {
        const goal = document.getElementById('sport-custom-goal').value.trim();
        if (!goal) {
            app.showNotification('❌ Écris un objectif');
            return;
        }
        storage.setPersonalGoal('sport', goal);
        app.showNotification('✓ Objectif enregistré !');
        this.completeChallenge('sport-goal');
        setTimeout(() => app.openModule('sport'), 1000);
    },

    saveNotes() {
        storage.saveNotes('sport', document.getElementById('sport-notes').value);
        app.showNotification('✓ Sauvegardé');
    },

    completeChallenge(challengeId) {
        storage.completeChallenge('sport', challengeId);
        app.showNotification('🎉 Défi complété !');
        const moduleData = storage.getModuleData('sport');
        if (moduleData.completed) {
            storage.addBadge('sport', this.badges[3]);
        }
    }
};
