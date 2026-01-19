// Module Sommeil - Chronos, le maître du temps

const sleepModule = {
    name: 'sleep',
    title: 'Chronos - Le maître du temps',
    icon: '🌙',
    color: '#2c3e50',

    challenges: [
        {
            id: 'sleep-lab',
            title: 'Mon suivi de sommeil interactif',
            icon: '🔬',
            type: 'simulation',
            description: 'Note ton sommeil et vois l\'impact immédiat sur ta forme'
        },
        {
            id: 'sleep-quiz',
            title: 'Mythes vs Réalités',
            icon: '❓',
            type: 'quiz',
            description: 'Teste tes connaissances sur le sommeil'
        },
        {
            id: 'sleep-science',
            title: 'La science du sommeil',
            icon: '🧠',
            type: 'info',
            description: 'Découvre ce qui se passe quand tu dors'
        },
        {
            id: 'sleep-tips',
            title: 'Astuces pour mieux dormir',
            icon: '💡',
            type: 'info',
            description: 'Conseils pratiques et techniques efficaces'
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

    generateChallengeContent(challenge, moduleData) {
        switch (challenge.id) {
            case 'sleep-lab':
                return this.generateLabContent(moduleData);
            case 'sleep-quiz':
                return this.generateQuizContent();
            case 'sleep-science':
                return this.generateScienceContent();
            case 'sleep-tips':
                return this.generateTipsContent();
            case 'sleep-goal':
                return this.generateGoalContent(moduleData);
            default:
                return '';
        }
    },

    generateLabContent(moduleData) {
        const trackingData = moduleData.tracking || [];
        
        return `
            <div class="sleep-lab">
                <h4>📊 Note ton sommeil et vois l'impact sur ta forme</h4>
                <p>Chaque matin, note tes horaires et comment tu te sens. Tu verras directement l'impact de ton sommeil !</p>
                
                <div class="sleep-tracker-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Date :</label>
                            <input type="date" id="sleep-date" value="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <div class="form-group">
                            <label>Couché à :</label>
                            <input type="time" id="sleep-bedtime" value="22:00">
                        </div>
                        <div class="form-group">
                            <label>Levé à :</label>
                            <input type="time" id="sleep-waketime" value="07:00">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Comment te sens-tu ce matin ?</label>
                            <select id="sleep-feeling">
                                <option value="5">😄 En pleine forme !</option>
                                <option value="4">🙂 Bien</option>
                                <option value="3">😐 Moyen</option>
                                <option value="2">😴 Fatigué</option>
                                <option value="1">😩 Épuisé</option>
                            </select>
                        </div>
                    </div>
                    
                    <button class="btn-primary" onclick="sleepModule.addSleepEntry()">
                        ✓ Enregistrer
                    </button>
                </div>
                
                ${trackingData.length > 0 ? `
                    <div class="sleep-analysis">
                        <h4>📈 Ton évolution</h4>
                        <canvas id="sleep-chart" width="400" height="200"></canvas>
                        
                        <div class="sleep-stats">
                            ${this.calculateSleepStats(trackingData)}
                        </div>
                        
                        <div class="sleep-entries">
                            <h5>Historique (${trackingData.length} entrées)</h5>
                            ${trackingData.slice(-7).reverse().map(entry => this.renderSleepEntry(entry)).join('')}
                        </div>
                    </div>
                ` : `
                    <div class="empty-state">
                        <p>💡 Commence à noter ton sommeil pour voir ton évolution !</p>
                    </div>
                `}
            </div>
            
            ${trackingData.length > 0 ? `<script>sleepModule.drawSleepChart();</script>` : ''}
        `;
    },

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
                
                <div id="quiz-results" style="display: none;">
                    <h4>🎉 Quiz terminé !</h4>
                    <p>Score : <span id="quiz-score"></span>/1</p>
                    <div id="quiz-final-feedback"></div>
                </div>
            </div>
        `;
    },

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

    generateTipsContent() {
        return `
            <div class="tips-content">
                <h4>💡 Astuces concrètes pour mieux dormir</h4>
                
                <div class="tip-card">
                    <div class="tip-icon">🌅</div>
                    <div class="tip-content">
                        <h5>Routine de coucher régulière</h5>
                        <p>Couche-toi et lève-toi à heures fixes, même le weekend. Ton corps adore la régularité !</p>
                    </div>
                </div>

                <div class="tip-card">
                    <div class="tip-icon">📱</div>
                    <div class="tip-content">
                        <h5>Stop écrans 1h avant</h5>
                        <p>La lumière bleue bloque la mélatonine. Remplace par : lecture, musique, discussion, dessin...</p>
                    </div>
                </div>

                <div class="tip-card">
                    <div class="tip-icon">🍵</div>
                    <div class="tip-content">
                        <h5>Évite la caféine après 16h</h5>
                        <p>Coca, café, thé, Red Bull... La caféine reste 6h dans ton corps !</p>
                    </div>
                </div>

                <div class="tip-card">
                    <div class="tip-icon">🧊</div>
                    <div class="tip-content">
                        <h5>Chambre fraîche (16-18°C)</h5>
                        <p>Ton corps a besoin de baisser sa température pour s'endormir. Une chambre fraîche aide !</p>
                    </div>
                </div>

                <div class="tip-card">
                    <div class="tip-icon">🌙</div>
                    <div class="tip-content">
                        <h5>Obscurité totale</h5>
                        <p>Même une petite lumière perturbe ton sommeil. Volets fermés, pas de veille d'appareil.</p>
                    </div>
                </div>

                <div class="tip-card">
                    <div class="tip-icon">🧘</div>
                    <div class="tip-content">
                        <h5>Technique de relaxation : 4-7-8</h5>
                        <p>Inspire 4 secondes, retiens 7 secondes, expire 8 secondes. Répète 4 fois. Ça calme instantanément !</p>
                    </div>
                </div>

                <div class="tip-card">
                    <div class="tip-icon">🎵</div>
                    <div class="tip-content">
                        <h5>Sons apaisants</h5>
                        <p>Pluie, vagues, bruit blanc... Si tu as du mal à t'endormir, essaie ces sons (à faible volume).</p>
                    </div>
                </div>

                <div class="info-box">
                    <strong>⚡ Astuce bonus :</strong>
                    <p>Si tu ne dors pas après 20 minutes, lève-toi et fais une activité calme. Retourne au lit quand tu sens la fatigue.</p>
                </div>

                <button class="btn-primary" onclick="sleepModule.completeChallenge('sleep-tips')">
                    ✓ Astuces notées
                </button>
            </div>
        `;
    },

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
    addSleepEntry() {
        const date = document.getElementById('sleep-date').value;
        const bedtime = document.getElementById('sleep-bedtime').value;
        const waketime = document.getElementById('sleep-waketime').value;
        const feeling = parseInt(document.getElementById('sleep-feeling').value);

        if (!date || !bedtime || !waketime) {
            app.showNotification('❌ Remplis tous les champs');
            return;
        }

        const bedHour = parseInt(bedtime.split(':')[0]) + parseInt(bedtime.split(':')[1]) / 60;
        const wakeHour = parseInt(waketime.split(':')[0]) + parseInt(waketime.split(':')[1]) / 60;
        let hours = wakeHour - bedHour;
        if (hours < 0) hours += 24;

        const entry = {
            date,
            bedtime,
            waketime,
            hours: hours.toFixed(1),
            feeling
        };

        storage.addTracking('sleep', entry);
        app.showNotification('✓ Données enregistrées !');
        
        const moduleData = storage.getModuleData('sleep');
        if (moduleData.tracking.length >= 7) {
            storage.addBadge('sleep', this.badges[2]);
        }
        if (moduleData.tracking.length >= 3) {
            this.completeChallenge('sleep-lab');
        }

        setTimeout(() => app.openModule('sleep'), 500);
    },

    calculateSleepStats(trackingData) {
        const avgHours = trackingData.reduce((sum, e) => sum + parseFloat(e.hours), 0) / trackingData.length;
        const avgFeeling = trackingData.reduce((sum, e) => sum + e.feeling, 0) / trackingData.length;
        
        let quality = '';
        if (avgHours >= 8.5) quality = '✅ Excellent';
        else if (avgHours >= 7.5) quality = '👍 Bien';
        else if (avgHours >= 6.5) quality = '⚠️ Insuffisant';
        else quality = '❌ Très insuffisant';

        return `
            <div class="stat-box">
                <div class="stat-item">
                    <strong>Moyenne de sommeil</strong>
                    <span class="stat-value">${avgHours.toFixed(1)}h</span>
                </div>
                <div class="stat-item">
                    <strong>Qualité</strong>
                    <span class="stat-value">${quality}</span>
                </div>
                <div class="stat-item">
                    <strong>Forme moyenne</strong>
                    <span class="stat-value">${'⭐'.repeat(Math.round(avgFeeling))}</span>
                </div>
            </div>
        `;
    },

    renderSleepEntry(entry) {
        const icons = ['😩', '😴', '😐', '🙂', '😄'];
        return `
            <div class="sleep-entry">
                <div class="entry-date">${new Date(entry.date).toLocaleDateString('fr-FR', {weekday: 'short', day: 'numeric', month: 'short'})}</div>
                <div class="entry-hours">${entry.hours}h de sommeil</div>
                <div class="entry-feeling">${icons[entry.feeling - 1]}</div>
            </div>
        `;
    },

    drawSleepChart() {
        const moduleData = storage.getModuleData('sleep');
        const data = moduleData.tracking.slice(-7);
        
        const canvas = document.getElementById('sleep-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.clearRect(0, 0, width, height);
        
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(40, 10);
        ctx.lineTo(40, height - 30);
        ctx.lineTo(width - 10, height - 30);
        ctx.stroke();
        
        ctx.fillStyle = '#666';
        ctx.font = '10px Arial';
        ctx.textAlign = 'right';
        for (let i = 0; i <= 12; i += 2) {
            const y = height - 30 - (i / 12) * (height - 40);
            ctx.fillText(i + 'h', 35, y + 3);
        }
        
        ctx.strokeStyle = '#27ae60';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        const y8h = height - 30 - (8 / 12) * (height - 40);
        ctx.moveTo(40, y8h);
        ctx.lineTo(width - 10, y8h);
        ctx.stroke();
        ctx.setLineDash([]);
        
        if (data.length > 1) {
            const stepX = (width - 50) / (data.length - 1);
            
            ctx.strokeStyle = '#667eea';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            data.forEach((entry, i) => {
                const x = 40 + i * stepX;
                const y = height - 30 - (parseFloat(entry.hours) / 12) * (height - 40);
                
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
                
                ctx.fillStyle = '#667eea';
                ctx.fillRect(x - 3, y - 3, 6, 6);
            });
            
            ctx.stroke();
        }
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

        setTimeout(() => {
            this.showQuizResults();
        }, 2000);
    },

    showQuizResults() {
        document.getElementById('quiz-results').style.display = 'block';
        document.getElementById('quiz-score').textContent = this.quizScore;
        
        const feedback = document.getElementById('quiz-final-feedback');
        if (this.quizScore >= 1) {
            feedback.innerHTML = '<p>🌟 Exact ! Tu connais tes besoins de sommeil.</p>';
            storage.addBadge('sleep', this.badges[1]);
        } else {
            feedback.innerHTML = '<p>💡 Continue à explorer le module pour en apprendre plus sur le sommeil.</p>';
        }

        this.completeChallenge('sleep-quiz');
        
        setTimeout(() => {
            app.openModule('sleep');
        }, 2000);
    },

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

    saveNotes() {
        const notes = document.getElementById('sleep-notes').value;
        storage.saveNotes('sleep', notes);
        app.showNotification('✓ Notes sauvegardées');
    },

    completeChallenge(challengeId) {
        storage.completeChallenge('sleep', challengeId);
        app.showNotification('🎉 Défi complété !');
        
        const moduleData = storage.getModuleData('sleep');
        if (moduleData.completed) {
            storage.addBadge('sleep', this.badges[3]);
        }
    }
};
