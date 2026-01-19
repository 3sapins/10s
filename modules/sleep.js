// Module Sommeil - Chronos, le maître du temps

const sleepModule = {
    name: 'sleep',
    title: 'Chronos - Le maître du temps',
    icon: '🌙',
    color: '#2c3e50',

    challenges: [
        {
            id: 'sleep-lab',
            title: 'Le laboratoire du sommeil',
            icon: '🔬',
            type: 'simulation',
            description: 'Gère un avatar sur 5 jours et découvre l\'impact de tes horaires de sommeil'
        },
        {
            id: 'sleep-quiz',
            title: 'Mythes vs Réalités',
            icon: '❓',
            type: 'quiz',
            description: 'Teste tes connaissances sur le sommeil'
        },
        {
            id: 'sleep-tracker',
            title: 'Mon compteur de sommeil',
            icon: '📊',
            type: 'tracker',
            description: 'Suis ton sommeil pendant une semaine'
        },
        {
            id: 'sleep-science',
            title: 'La science du sommeil',
            icon: '🧠',
            type: 'info',
            description: 'Découvre ce qui se passe quand tu dors'
        },
        {
            id: 'sleep-goal',
            title: 'Mon objectif personnel',
            icon: '🎯',
            type: 'goal',
            description: 'Fixe-toi un objectif réaliste pour améliorer ton sommeil'
        }
    ],

    badges: [
        { id: 'sleep-explorer', name: 'Explorateur de nuit', icon: '🌙', desc: 'Premier module commencé' },
        { id: 'sleep-scientist', name: 'Scientifique du sommeil', icon: '🔬', desc: 'Quiz réussi' },
        { id: 'sleep-tracker', name: 'Tracker consciencieux', icon: '📊', desc: '7 jours de suivi' },
        { id: 'sleep-master', name: 'Maître du temps', icon: '⏰', desc: 'Module complété' }
    ],

    // Génération du contenu HTML
    generateContent() {
        const moduleData = storage.getModuleData('sleep');
        
        return `
            <div class="module-intro">
                <h2>🌙 Bienvenue dans le monde de Chronos</h2>
                <p class="intro-text">
                    Le sommeil, c'est bien plus qu'un simple moment de repos. C'est pendant que tu dors 
                    que ton cerveau consolide tes apprentissages, que ton corps se régénère, et que tes 
                    émotions se régulent. Prêt à découvrir tous ses secrets ?
                </p>
            </div>

            ${this.generateChallenge(this.challenges[0], moduleData)}
            ${this.generateChallenge(this.challenges[1], moduleData)}
            ${this.generateChallenge(this.challenges[2], moduleData)}
            ${this.generateChallenge(this.challenges[3], moduleData)}
            ${this.generateChallenge(this.challenges[4], moduleData)}

            <div class="module-notes">
                <h3>📝 Mes notes personnelles</h3>
                <div class="notes-container">
                    <textarea 
                        id="sleep-notes" 
                        placeholder="Écris ici tes observations, ce que tu as appris, ce qui t'a surpris..."
                        onchange="sleepModule.saveNotes()"
                    >${moduleData.notes || ''}</textarea>
                </div>
            </div>
        `;
    },

    // Générer une carte de défi
    generateChallenge(challenge, moduleData) {
        const isCompleted = moduleData.challenges.find(c => c.id === challenge.id && c.completed);
        const completedClass = isCompleted ? 'completed' : '';
        
        return `
            <div class="activity-card ${completedClass}" id="${challenge.id}-card">
                <div class="activity-header">
                    <span class="activity-icon">${challenge.icon}</span>
                    <h3>${challenge.title}</h3>
                    ${isCompleted ? '<span class="completed-badge">✓ Complété</span>' : ''}
                </div>
                <p>${challenge.description}</p>
                <div id="${challenge.id}-content">
                    ${this.generateChallengeContent(challenge, moduleData)}
                </div>
            </div>
        `;
    },

    // Générer le contenu spécifique de chaque défi
    generateChallengeContent(challenge, moduleData) {
        switch (challenge.id) {
            case 'sleep-lab':
                return this.generateLabContent();
            case 'sleep-quiz':
                return this.generateQuizContent();
            case 'sleep-tracker':
                return this.generateTrackerContent(moduleData);
            case 'sleep-science':
                return this.generateScienceContent();
            case 'sleep-goal':
                return this.generateGoalContent(moduleData);
            default:
                return '';
        }
    },

    // Simulation du laboratoire du sommeil
    generateLabContent() {
        return `
            <div class="sleep-lab">
                <p><strong>Choisis tes horaires de sommeil pour 5 jours et observe les résultats !</strong></p>
                <div class="lab-simulator">
                    <div class="day-selector">
                        <label>Jour 1 - Heure de coucher :</label>
                        <select id="sleep-day1" onchange="sleepModule.updateLabSimulation()">
                            <option value="20">20h00</option>
                            <option value="21">21h00</option>
                            <option value="22" selected>22h00</option>
                            <option value="23">23h00</option>
                            <option value="24">00h00</option>
                            <option value="1">01h00</option>
                            <option value="2">02h00</option>
                        </select>
                    </div>
                    <div id="lab-results" style="display: none;">
                        <div class="result-metrics">
                            <div class="metric">
                                <span class="metric-icon">🧠</span>
                                <div>
                                    <strong>Concentration</strong>
                                    <div class="metric-bar">
                                        <div class="metric-fill" id="concentration-bar"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="metric">
                                <span class="metric-icon">😊</span>
                                <div>
                                    <strong>Humeur</strong>
                                    <div class="metric-bar">
                                        <div class="metric-fill" id="mood-bar"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="metric">
                                <span class="metric-icon">💪</span>
                                <div>
                                    <strong>Énergie</strong>
                                    <div class="metric-bar">
                                        <div class="metric-fill" id="energy-bar"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="lab-explanation" id="lab-explanation"></div>
                    </div>
                    <button class="btn-primary" onclick="sleepModule.runLabSimulation()">
                        🔬 Lancer la simulation
                    </button>
                </div>
            </div>
        `;
    },

    // Quiz sur le sommeil
    generateQuizContent() {
        return `
            <div class="quiz-container">
                <div class="quiz-question">
                    <strong>Question 1/5 :</strong> Combien d'heures de sommeil un ado de 13-14 ans devrait-il avoir par nuit ?
                </div>
                <div class="quiz-options" id="quiz-q1">
                    <div class="quiz-option" onclick="sleepModule.selectQuizAnswer(1, 'a', false)">
                        A) 6-7 heures
                    </div>
                    <div class="quiz-option" onclick="sleepModule.selectQuizAnswer(1, 'b', false)">
                        B) 7-8 heures
                    </div>
                    <div class="quiz-option" onclick="sleepModule.selectQuizAnswer(1, 'c', true)">
                        C) 8-10 heures
                    </div>
                    <div class="quiz-option" onclick="sleepModule.selectQuizAnswer(1, 'd', false)">
                        D) 10-12 heures
                    </div>
                </div>
                <div id="quiz-feedback-1" class="quiz-feedback" style="display: none;"></div>
                
                <div id="quiz-next-questions" style="display: none;">
                    <!-- Les autres questions seront chargées dynamiquement -->
                </div>
                
                <div id="quiz-results" style="display: none;">
                    <h4>🎉 Quiz terminé !</h4>
                    <p>Score : <span id="quiz-score"></span>/5</p>
                    <div id="quiz-final-feedback"></div>
                </div>
            </div>
        `;
    },

    // Tracker de sommeil
    generateTrackerContent(moduleData) {
        const trackingData = moduleData.tracking || [];
        
        return `
            <div class="tracker-container">
                <p>Suis ton sommeil pendant une semaine pour mieux comprendre tes habitudes.</p>
                <div class="tracker-input">
                    <input type="date" id="sleep-date" value="${new Date().toISOString().split('T')[0]}">
                    <input type="time" id="sleep-bedtime" placeholder="Heure de coucher">
                    <input type="time" id="sleep-waketime" placeholder="Heure de réveil">
                    <button class="btn-primary" onclick="sleepModule.addTrackingEntry()">
                        + Ajouter
                    </button>
                </div>
                <div class="tracker-data">
                    <h4>Mes données de sommeil</h4>
                    ${trackingData.length === 0 ? '<p class="empty-state">Aucune donnée pour le moment. Commence à tracker !</p>' : ''}
                    <div id="sleep-tracking-list">
                        ${trackingData.map(entry => this.renderTrackingEntry(entry)).join('')}
                    </div>
                    ${trackingData.length >= 3 ? `
                        <div class="tracker-analysis">
                            <h4>📊 Analyse</h4>
                            ${this.analyzeTracking(trackingData)}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    },

    // Contenu scientifique
    generateScienceContent() {
        return `
            <div class="science-content">
                <h4>🧠 Que se passe-t-il pendant ton sommeil ?</h4>
                
                <div class="science-section">
                    <h5>Phase 1-2 : Sommeil léger (25% de la nuit)</h5>
                    <p>Tu commences à te détendre, ton rythme cardiaque ralentit. C'est la transition vers le sommeil profond.</p>
                </div>

                <div class="science-section">
                    <h5>Phase 3-4 : Sommeil profond (25% de la nuit)</h5>
                    <p>C'est ici que ton corps se répare ! Tes muscles se régénèrent, ton système immunitaire se renforce, et ton hormone de croissance est sécrétée.</p>
                </div>

                <div class="science-section">
                    <h5>Phase REM : Sommeil paradoxal (25% de la nuit)</h5>
                    <p>Tes rêves les plus intenses arrivent ici. Ton cerveau consolide ta mémoire et traite tes émotions. C'est essentiel pour l'apprentissage !</p>
                </div>

                <div class="info-box">
                    <strong>💡 Le savais-tu ?</strong>
                    <p>Ton cerveau est presque aussi actif pendant le sommeil que quand tu es éveillé ! Il fait le tri dans tes souvenirs de la journée et renforce ceux qui sont importants.</p>
                </div>

                <div class="science-section">
                    <h5>🌅 Les effets du manque de sommeil</h5>
                    <ul>
                        <li>Difficultés de concentration et de mémorisation</li>
                        <li>Irritabilité et sautes d'humeur</li>
                        <li>Système immunitaire affaibli</li>
                        <li>Augmentation de l'appétit (surtout pour le sucré !)</li>
                        <li>Temps de réaction plus lents</li>
                    </ul>
                </div>

                <button class="btn-primary" onclick="sleepModule.completeChallenge('sleep-science')">
                    ✓ J'ai tout lu
                </button>
            </div>
        `;
    },

    // Définition d'objectif
    generateGoalContent(moduleData) {
        const currentGoal = moduleData.personalGoal || '';
        
        return `
            <div class="goal-container">
                <h4>🎯 Fixe-toi un objectif réaliste</h4>
                <p>Choisis UN changement que tu veux essayer de mettre en place :</p>
                
                <div class="goal-suggestions">
                    <div class="goal-option" onclick="sleepModule.selectGoal('Me coucher 30 minutes plus tôt')">
                        Me coucher 30 minutes plus tôt
                    </div>
                    <div class="goal-option" onclick="sleepModule.selectGoal('Éviter les écrans 1h avant de dormir')">
                        Éviter les écrans 1h avant de dormir
                    </div>
                    <div class="goal-option" onclick="sleepModule.selectGoal('Créer une routine de coucher relaxante')">
                        Créer une routine de coucher relaxante
                    </div>
                    <div class="goal-option" onclick="sleepModule.selectGoal('Me réveiller à heure fixe (même le weekend)')">
                        Me réveiller à heure fixe (même le weekend)
                    </div>
                </div>

                <div class="custom-goal">
                    <label>Ou écris ton propre objectif :</label>
                    <textarea 
                        id="sleep-custom-goal" 
                        placeholder="Mon objectif personnalisé..."
                        rows="3"
                    >${currentGoal}</textarea>
                    <button class="btn-primary" onclick="sleepModule.saveGoal()">
                        💾 Enregistrer mon objectif
                    </button>
                </div>

                ${currentGoal ? `
                    <div class="current-goal">
                        <h5>✓ Mon objectif actuel :</h5>
                        <p>${currentGoal}</p>
                    </div>
                ` : ''}
            </div>
        `;
    },

    // Méthodes interactives

    runLabSimulation() {
        const bedtime = parseInt(document.getElementById('sleep-day1').value);
        const wakeTime = 7; // Réveil à 7h pour l'école
        
        // Calcul des heures de sommeil
        let sleepHours;
        if (bedtime <= 7) {
            sleepHours = 7 - bedtime;
        } else {
            sleepHours = 24 - bedtime + 7;
        }

        // Calcul des scores (0-100)
        let concentration, mood, energy;
        
        if (sleepHours >= 8.5) {
            concentration = 90;
            mood = 95;
            energy = 90;
        } else if (sleepHours >= 7.5) {
            concentration = 75;
            mood = 80;
            energy = 75;
        } else if (sleepHours >= 6.5) {
            concentration = 55;
            mood = 60;
            energy = 55;
        } else {
            concentration = 30;
            mood = 35;
            energy = 30;
        }

        // Affichage des résultats
        document.getElementById('lab-results').style.display = 'block';
        document.getElementById('concentration-bar').style.width = concentration + '%';
        document.getElementById('mood-bar').style.width = mood + '%';
        document.getElementById('energy-bar').style.width = energy + '%';

        let explanation = '';
        if (sleepHours >= 8.5) {
            explanation = `<strong>Excellent !</strong> Avec ${sleepHours}h de sommeil, tu es au top de ta forme. Ton cerveau a eu le temps de bien consolider tes apprentissages et ton corps s'est complètement régénéré.`;
        } else if (sleepHours >= 7.5) {
            explanation = `<strong>Pas mal !</strong> Avec ${sleepHours}h de sommeil, tu es fonctionnel, mais tu pourrais encore améliorer. Essaie de te coucher un peu plus tôt.`;
        } else if (sleepHours >= 6.5) {
            explanation = `<strong>Attention !</strong> Avec seulement ${sleepHours}h de sommeil, tu commences à accumuler une dette de sommeil. Tu as du mal à te concentrer et tu es plus irritable.`;
        } else {
            explanation = `<strong>Alerte rouge !</strong> Avec ${sleepHours}h de sommeil, c'est vraiment insuffisant. Tu as du mal à suivre en cours, tu es de mauvaise humeur, et ton corps ne récupère pas bien.`;
        }

        document.getElementById('lab-explanation').innerHTML = explanation;
        
        this.completeChallenge('sleep-lab');
    },

    updateLabSimulation() {
        // Réinitialiser les résultats quand on change l'heure
        document.getElementById('lab-results').style.display = 'none';
    },

    // Quiz
    quizScore: 0,
    currentQuestion: 1,

    selectQuizAnswer(questionNum, answer, isCorrect) {
        const options = document.querySelectorAll(`#quiz-q${questionNum} .quiz-option`);
        options.forEach(opt => {
            opt.style.pointerEvents = 'none';
            if (opt.textContent.trim().startsWith(answer.toUpperCase())) {
                if (isCorrect) {
                    opt.classList.add('correct');
                    this.quizScore++;
                } else {
                    opt.classList.add('incorrect');
                }
            } else if (opt.onclick && opt.onclick.toString().includes('true')) {
                opt.classList.add('correct');
            }
        });

        const feedback = document.getElementById(`quiz-feedback-${questionNum}`);
        feedback.style.display = 'block';
        
        if (isCorrect) {
            feedback.innerHTML = '<strong>✓ Correct !</strong> Les adolescents ont besoin de 8 à 10 heures de sommeil pour être en pleine forme.';
        } else {
            feedback.innerHTML = '<strong>✗ Pas tout à fait.</strong> Les adolescents ont besoin de 8 à 10 heures de sommeil pour un développement optimal.';
        }

        // Charger la prochaine question après 2 secondes
        setTimeout(() => {
            if (this.currentQuestion < 5) {
                this.currentQuestion++;
                this.loadNextQuestion();
            } else {
                this.showQuizResults();
            }
        }, 2000);
    },

    loadNextQuestion() {
        // Ici, on pourrait charger plus de questions
        // Pour simplifier, on montre directement les résultats
        this.showQuizResults();
    },

    showQuizResults() {
        document.getElementById('quiz-results').style.display = 'block';
        document.getElementById('quiz-score').textContent = this.quizScore;
        
        const feedback = document.getElementById('quiz-final-feedback');
        if (this.quizScore >= 4) {
            feedback.innerHTML = '<p>🌟 Excellent ! Tu maîtrises bien les bases du sommeil. Continue comme ça !</p>';
            storage.addBadge('sleep', this.badges[1]); // Badge scientifique
        } else if (this.quizScore >= 3) {
            feedback.innerHTML = '<p>👍 Pas mal ! Tu as de bonnes connaissances sur le sommeil.</p>';
        } else {
            feedback.innerHTML = '<p>💡 Continue à explorer le module pour en apprendre plus sur le sommeil.</p>';
        }

        this.completeChallenge('sleep-quiz');
        
        // Recharger la page pour voir le badge
        setTimeout(() => {
            app.openModule('sleep');
        }, 2000);
    },

    // Tracker
    addTrackingEntry() {
        const date = document.getElementById('sleep-date').value;
        const bedtime = document.getElementById('sleep-bedtime').value;
        const waketime = document.getElementById('sleep-waketime').value;

        if (!date || !bedtime || !waketime) {
            app.showNotification('❌ Remplis tous les champs');
            return;
        }

        const entry = {
            date: date,
            bedtime: bedtime,
            waketime: waketime
        };

        storage.addTracking('sleep', entry);
        app.showNotification('✓ Données ajoutées !');
        
        // Vérifier si on a 7 entrées pour le badge
        const moduleData = storage.getModuleData('sleep');
        if (moduleData.tracking.length >= 7) {
            storage.addBadge('sleep', this.badges[2]); // Badge tracker
            this.completeChallenge('sleep-tracker');
        }

        // Recharger le module
        app.openModule('sleep');
    },

    renderTrackingEntry(entry) {
        const bedtime = entry.bedtime;
        const waketime = entry.waketime;
        
        // Calcul simple des heures de sommeil
        const bedHour = parseInt(bedtime.split(':')[0]);
        const wakeHour = parseInt(waketime.split(':')[0]);
        let hours = wakeHour - bedHour;
        if (hours < 0) hours += 24;

        return `
            <div class="tracker-entry">
                <div>
                    <strong>${new Date(entry.date).toLocaleDateString('fr-FR')}</strong><br>
                    🌙 ${bedtime} → 🌅 ${waketime}
                </div>
                <div>
                    <strong>${hours}h de sommeil</strong>
                </div>
            </div>
        `;
    },

    analyzeTracking(trackingData) {
        const avgHours = trackingData.reduce((sum, entry) => {
            const bedHour = parseInt(entry.bedtime.split(':')[0]);
            const wakeHour = parseInt(entry.waketime.split(':')[0]);
            let hours = wakeHour - bedHour;
            if (hours < 0) hours += 24;
            return sum + hours;
        }, 0) / trackingData.length;

        let analysis = `<p>En moyenne, tu dors <strong>${avgHours.toFixed(1)}h par nuit</strong>.</p>`;
        
        if (avgHours >= 8.5) {
            analysis += '<p>✅ C\'est excellent ! Tu respectes bien tes besoins de sommeil.</p>';
        } else if (avgHours >= 7) {
            analysis += '<p>⚠️ C\'est un peu juste. Essaie de gagner 1h de sommeil en plus.</p>';
        } else {
            analysis += '<p>❌ Tu manques clairement de sommeil. C\'est important d\'essayer de te coucher plus tôt.</p>';
        }

        return analysis;
    },

    // Objectifs
    selectGoal(goal) {
        document.getElementById('sleep-custom-goal').value = goal;
    },

    saveGoal() {
        const goal = document.getElementById('sleep-custom-goal').value.trim();
        if (!goal) {
            app.showNotification('❌ Écris un objectif d\'abord');
            return;
        }

        storage.setPersonalGoal('sleep', goal);
        app.showNotification('✓ Objectif enregistré !');
        this.completeChallenge('sleep-goal');
        
        setTimeout(() => {
            app.openModule('sleep');
        }, 1000);
    },

    // Notes
    saveNotes() {
        const notes = document.getElementById('sleep-notes').value;
        storage.saveNotes('sleep', notes);
        app.showNotification('✓ Notes sauvegardées');
    },

    // Compléter un défi
    completeChallenge(challengeId) {
        storage.completeChallenge('sleep', challengeId);
        app.showNotification('🎉 Défi complété !');
        
        // Vérifier si le module est complété
        const moduleData = storage.getModuleData('sleep');
        if (moduleData.completed) {
            storage.addBadge('sleep', this.badges[3]); // Badge master
        }
    }
};
