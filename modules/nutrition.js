// Module Alimentation - Energia, le carburant du corps

const nutritionModule = {
    name: 'nutrition',
    title: 'Energia - Le carburant du corps',
    icon: '🍎',
    color: '#27ae60',

    challenges: [
        {
            id: 'nutrition-simulator',
            title: 'Compose ton menu',
            icon: '🍽️',
            type: 'simulation',
            description: 'Crée des repas et vois leur impact sur ton énergie'
        },
        {
            id: 'nutrition-detective',
            title: 'Détective des étiquettes',
            icon: '🔍',
            type: 'game',
            description: 'Apprends à décoder les informations nutritionnelles'
        },
        {
            id: 'nutrition-energy',
            title: 'L\'énergie dans l\'assiette',
            icon: '⚡',
            type: 'info',
            description: 'Découvre comment ton corps transforme la nourriture en énergie'
        },
        {
            id: 'nutrition-tracker',
            title: 'Mon journal alimentaire',
            icon: '📓',
            type: 'tracker',
            description: 'Observe tes habitudes alimentaires pendant une semaine'
        },
        {
            id: 'nutrition-goal',
            title: 'Mon défi nutrition',
            icon: '🎯',
            type: 'goal',
            description: 'Choisis une amélioration à apporter à ton alimentation'
        }
    ],

    badges: [
        { id: 'nutrition-explorer', name: 'Chef explorateur', icon: '👨‍🍳', desc: 'Premier défi complété' },
        { id: 'nutrition-detective', name: 'Détective nutritionnel', icon: '🔍', desc: 'Expert des étiquettes' },
        { id: 'nutrition-conscious', name: 'Mangeur conscient', icon: '🧠', desc: '7 jours de suivi' },
        { id: 'nutrition-master', name: 'Maître de l\'énergie', icon: '⚡', desc: 'Module complété' }
    ],

    generateContent() {
        const moduleData = storage.getModuleData('nutrition');
        
        return `
            <div class="module-intro">
                <h2>🍎 Bienvenue dans le monde d'Energia</h2>
                <p class="intro-text">
                    Ce que tu manges influence directement ton énergie, ta concentration, ton humeur et même 
                    tes performances physiques et intellectuelles. Découvrons ensemble comment faire les bons choix !
                </p>
            </div>

            ${this.generateChallenge(this.challenges[0], moduleData)}
            ${this.generateChallenge(this.challenges[1], moduleData)}
            ${this.generateChallenge(this.challenges[2], moduleData)}
            ${this.generateChallenge(this.challenges[3], moduleData)}
            ${this.generateChallenge(this.challenges[4], moduleData)}

            <div class="module-notes">
                <h3>📝 Mes découvertes</h3>
                <div class="notes-container">
                    <textarea 
                        id="nutrition-notes" 
                        placeholder="Qu'est-ce qui t'a surpris ? Qu'as-tu appris sur ton alimentation ?"
                        onchange="nutritionModule.saveNotes()"
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
            case 'nutrition-simulator':
                return this.generateSimulatorContent();
            case 'nutrition-detective':
                return this.generateDetectiveContent();
            case 'nutrition-energy':
                return this.generateEnergyContent();
            case 'nutrition-tracker':
                return this.generateTrackerContent(moduleData);
            case 'nutrition-goal':
                return this.generateGoalContent(moduleData);
            default:
                return '';
        }
    },

    generateSimulatorContent() {
        return `
            <div class="nutrition-simulator">
                <p><strong>Compose un petit-déjeuner et vois son impact sur ta matinée !</strong></p>
                
                <div class="meal-builder">
                    <h4>Choisis tes aliments :</h4>
                    <div class="food-options">
                        <label class="food-option">
                            <input type="checkbox" value="cereales" data-energy="40" data-duration="short">
                            <span>🥣 Céréales sucrées</span>
                        </label>
                        <label class="food-option">
                            <input type="checkbox" value="pain-complet" data-energy="60" data-duration="long">
                            <span>🍞 Pain complet + beurre</span>
                        </label>
                        <label class="food-option">
                            <input type="checkbox" value="fruits" data-energy="30" data-duration="medium">
                            <span>🍎 Fruits frais</span>
                        </label>
                        <label class="food-option">
                            <input type="checkbox" value="yaourt" data-energy="40" data-duration="medium">
                            <span>🥛 Yaourt nature</span>
                        </label>
                        <label class="food-option">
                            <input type="checkbox" value="oeufs" data-energy="70" data-duration="long">
                            <span>🥚 Œufs</span>
                        </label>
                        <label class="food-option">
                            <input type="checkbox" value="jus" data-energy="20" data-duration="short">
                            <span>🧃 Jus de fruits</span>
                        </label>
                    </div>
                    
                    <button class="btn-primary" onclick="nutritionModule.simulateMeal()">
                        ⚡ Voir l'impact sur ma matinée
                    </button>
                </div>
                
                <div id="meal-results" style="display: none;">
                    <h4>📊 Résultats de la simulation</h4>
                    <div class="energy-graph">
                        <canvas id="energy-canvas" width="400" height="200"></canvas>
                    </div>
                    <div id="meal-explanation"></div>
                </div>
            </div>
        `;
    },

    generateDetectiveContent() {
        return `
            <div class="detective-game">
                <h4>🔍 Mission : Décoder cette étiquette !</h4>
                <p>Regarde cette étiquette de céréales et réponds aux questions :</p>
                
                <div class="nutrition-label">
                    <strong>Valeurs nutritionnelles pour 100g :</strong>
                    <ul>
                        <li>Énergie : 380 kcal</li>
                        <li>Glucides : 75g</li>
                        <li>dont sucres : 28g</li>
                        <li>Protéines : 8g</li>
                        <li>Lipides : 4g</li>
                        <li>Fibres : 3g</li>
                        <li>Sel : 1.2g</li>
                    </ul>
                </div>

                <div class="detective-questions">
                    <div class="question">
                        <p><strong>1. Ces céréales contiennent beaucoup de sucre ?</strong></p>
                        <button onclick="nutritionModule.checkDetective(1, true)">Oui</button>
                        <button onclick="nutritionModule.checkDetective(1, false)">Non</button>
                        <div id="detective-feedback-1" class="feedback" style="display: none;"></div>
                    </div>
                </div>

                <div class="info-box" style="margin-top: 20px;">
                    <strong>💡 Astuce :</strong>
                    <p>Un aliment est considéré comme "riche en sucres" s'il contient plus de 22g de sucres pour 100g. 
                    Ici, avec 28g, ces céréales sont très sucrées !</p>
                </div>

                <button class="btn-primary" onclick="nutritionModule.completeChallenge('nutrition-detective')" style="margin-top: 20px;">
                    ✓ J'ai compris
                </button>
            </div>
        `;
    },

    generateEnergyContent() {
        return `
            <div class="energy-content">
                <h4>⚡ Comment ton corps transforme la nourriture en énergie</h4>
                
                <div class="science-section">
                    <h5>Les 3 types de carburants</h5>
                    
                    <div class="fuel-type">
                        <strong>🍞 Les glucides (sucres et féculents)</strong>
                        <p>Ton carburant principal ! Ils se transforment en glucose, le "super-carburant" de ton cerveau. 
                        Les glucides complexes (pain complet, pâtes, riz) libèrent l'énergie progressivement. 
                        Les sucres simples (bonbons, sodas) donnent un coup de boost rapide... mais court !</p>
                    </div>

                    <div class="fuel-type">
                        <strong>🥑 Les lipides (graisses)</strong>
                        <p>L'énergie longue durée ! Ils sont essentiels pour ton cerveau et tes hormones. 
                        Privilégie les "bonnes graisses" : huile d'olive, noix, poisson, avocat.</p>
                    </div>

                    <div class="fuel-type">
                        <strong>🥚 Les protéines</strong>
                        <p>Les briques de construction ! Elles réparent et construisent tes muscles, 
                        ta peau, tes cheveux. Elles te rassasient aussi longtemps.</p>
                    </div>
                </div>

                <div class="info-box">
                    <strong>🧠 Pourquoi tu as un coup de barre après un gros repas ?</strong>
                    <p>Quand tu manges beaucoup d'un coup, ton corps envoie du sang vers ton système digestif 
                    pour digérer. Résultat : moins de sang pour ton cerveau = fatigue ! 
                    C'est pour ça qu'il vaut mieux manger équilibré et ne pas sauter de repas.</p>
                </div>

                <div class="science-section">
                    <h5>💧 L'hydratation : le secret oublié</h5>
                    <p>Ton cerveau est composé de 75% d'eau ! Même une légère déshydratation peut réduire 
                    ta concentration et te fatiguer. Objectif : boire régulièrement tout au long de la journée 
                    (pas uniquement quand tu as soif).</p>
                </div>

                <button class="btn-primary" onclick="nutritionModule.completeChallenge('nutrition-energy')">
                    ✓ J'ai tout compris
                </button>
            </div>
        `;
    },

    generateTrackerContent(moduleData) {
        const trackingData = moduleData.tracking || [];
        
        return `
            <div class="tracker-container">
                <p>Note ce que tu manges pendant une semaine pour observer tes habitudes (sans te juger !)</p>
                <div class="tracker-input">
                    <input type="date" id="nutrition-date" value="${new Date().toISOString().split('T')[0]}">
                    <select id="nutrition-meal">
                        <option>Petit-déjeuner</option>
                        <option>Collation matin</option>
                        <option>Déjeuner</option>
                        <option>Goûter</option>
                        <option>Dîner</option>
                    </select>
                    <input type="text" id="nutrition-food" placeholder="Qu'as-tu mangé ?">
                    <button class="btn-primary" onclick="nutritionModule.addTrackingEntry()">
                        + Ajouter
                    </button>
                </div>
                <div class="tracker-data">
                    <h4>Mon journal</h4>
                    ${trackingData.length === 0 ? '<p class="empty-state">Commence à noter tes repas !</p>' : ''}
                    <div id="nutrition-tracking-list">
                        ${trackingData.map(entry => this.renderTrackingEntry(entry)).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    generateGoalContent(moduleData) {
        const currentGoal = moduleData.personalGoal || '';
        
        return `
            <div class="goal-container">
                <h4>🎯 Mon défi nutrition</h4>
                <p>Choisis UNE amélioration à essayer :</p>
                
                <div class="goal-suggestions">
                    <div class="goal-option" onclick="nutritionModule.selectGoal('Prendre un vrai petit-déjeuner chaque matin')">
                        Prendre un vrai petit-déjeuner chaque matin
                    </div>
                    <div class="goal-option" onclick="nutritionModule.selectGoal('Ajouter un fruit ou légume à chaque repas')">
                        Ajouter un fruit ou légume à chaque repas
                    </div>
                    <div class="goal-option" onclick="nutritionModule.selectGoal('Boire plus d\\'eau (1,5L par jour)')">
                        Boire plus d'eau (1,5L par jour)
                    </div>
                    <div class="goal-option" onclick="nutritionModule.selectGoal('Limiter les boissons sucrées à 1 par semaine')">
                        Limiter les boissons sucrées à 1 par semaine
                    </div>
                </div>

                <div class="custom-goal">
                    <label>Ou ton propre défi :</label>
                    <textarea id="nutrition-custom-goal" rows="3">${currentGoal}</textarea>
                    <button class="btn-primary" onclick="nutritionModule.saveGoal()">
                        💾 Enregistrer
                    </button>
                </div>

                ${currentGoal ? `
                    <div class="current-goal">
                        <h5>✓ Mon défi :</h5>
                        <p>${currentGoal}</p>
                    </div>
                ` : ''}
            </div>
        `;
    },

    // Méthodes interactives

    simulateMeal() {
        const selected = document.querySelectorAll('.food-option input:checked');
        if (selected.length === 0) {
            app.showNotification('Choisis au moins un aliment !');
            return;
        }

        let totalEnergy = 0;
        let longDuration = 0;
        let shortDuration = 0;

        selected.forEach(item => {
            totalEnergy += parseInt(item.dataset.energy);
            if (item.dataset.duration === 'long') longDuration++;
            else if (item.dataset.duration === 'short') shortDuration++;
        });

        // Afficher le graphique d'énergie
        const canvas = document.getElementById('energy-canvas');
        const ctx = canvas.getContext('2d');
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#27ae60';
        ctx.lineWidth = 3;
        ctx.beginPath();

        // Simulation d'une courbe d'énergie
        if (shortDuration > longDuration) {
            // Pic rapide puis chute
            ctx.moveTo(0, 150);
            ctx.lineTo(50, 50);
            ctx.lineTo(150, 180);
            document.getElementById('meal-explanation').innerHTML = `
                <strong>⚠️ Attention au crash !</strong>
                <p>Ton petit-déjeuner va te donner un coup de boost rapide, mais tu risques d'avoir un coup de barre vers 10h. 
                Ajoute des aliments à énergie longue durée (pain complet, œufs) pour tenir jusqu'au déjeuner !</p>
            `;
        } else {
            // Énergie stable
            ctx.moveTo(0, 100);
            ctx.lineTo(50, 80);
            ctx.lineTo(200, 90);
            ctx.lineTo(350, 100);
            document.getElementById('meal-explanation').innerHTML = `
                <strong>✅ Excellent choix !</strong>
                <p>Ton petit-déjeuner va te fournir une énergie stable toute la matinée. 
                Les glucides complexes et les protéines vont libérer l'énergie progressivement. Bravo !</p>
            `;
        }

        ctx.stroke();

        document.getElementById('meal-results').style.display = 'block';
        this.completeChallenge('nutrition-simulator');
    },

    checkDetective(questionNum, answer) {
        const feedback = document.getElementById(`detective-feedback-${questionNum}`);
        feedback.style.display = 'block';
        
        if (answer) {
            feedback.innerHTML = '<strong>✓ Exact !</strong> 28g de sucres pour 100g, c\'est beaucoup trop. Ces céréales te donneront un pic d\'énergie puis un coup de barre.';
            feedback.style.color = '#27ae60';
            storage.addBadge('nutrition', this.badges[1]);
        } else {
            feedback.innerHTML = '<strong>✗ Pas tout à fait.</strong> Regarde bien : 28g de sucres sur 100g, c\'est vraiment beaucoup !';
            feedback.style.color = '#e74c3c';
        }
    },

    addTrackingEntry() {
        const date = document.getElementById('nutrition-date').value;
        const meal = document.getElementById('nutrition-meal').value;
        const food = document.getElementById('nutrition-food').value;

        if (!food.trim()) {
            app.showNotification('❌ Décris ce que tu as mangé');
            return;
        }

        storage.addTracking('nutrition', { date, meal, food });
        app.showNotification('✓ Ajouté !');

        const moduleData = storage.getModuleData('nutrition');
        if (moduleData.tracking.length >= 7) {
            storage.addBadge('nutrition', this.badges[2]);
            this.completeChallenge('nutrition-tracker');
        }

        app.openModule('nutrition');
    },

    renderTrackingEntry(entry) {
        return `
            <div class="tracker-entry">
                <div>
                    <strong>${new Date(entry.date).toLocaleDateString('fr-FR')}</strong> - ${entry.meal}<br>
                    ${entry.food}
                </div>
            </div>
        `;
    },

    selectGoal(goal) {
        document.getElementById('nutrition-custom-goal').value = goal;
    },

    saveGoal() {
        const goal = document.getElementById('nutrition-custom-goal').value.trim();
        if (!goal) {
            app.showNotification('❌ Écris un défi d\'abord');
            return;
        }

        storage.setPersonalGoal('nutrition', goal);
        app.showNotification('✓ Défi enregistré !');
        this.completeChallenge('nutrition-goal');
        
        setTimeout(() => app.openModule('nutrition'), 1000);
    },

    saveNotes() {
        const notes = document.getElementById('nutrition-notes').value;
        storage.saveNotes('nutrition', notes);
        app.showNotification('✓ Notes sauvegardées');
    },

    completeChallenge(challengeId) {
        storage.completeChallenge('nutrition', challengeId);
        app.showNotification('🎉 Défi complété !');
        
        const moduleData = storage.getModuleData('nutrition');
        if (moduleData.completed) {
            storage.addBadge('nutrition', this.badges[3]);
        }
    }
};
