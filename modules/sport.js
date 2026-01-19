// Module Sport - Kinesis, le mouvement créateur

const sportModule = {
    name: 'sport',
    title: 'Kinesis - Le mouvement créateur',
    icon: '💪',
    color: '#e74c3c',

    challenges: [
        {
            id: 'sport-science',
            title: 'Ton corps expliqué',
            icon: '🧬',
            type: 'info',
            description: 'Ce qui se passe quand tu bouges'
        },
        {
            id: 'sport-discover',
            title: '30 façons de bouger',
            icon: '🎯',
            type: 'discovery',
            description: 'Découvre des activités variées'
        },
        {
            id: 'sport-videos',
            title: 'Entraînements faciles',
            icon: '🎬',
            type: 'videos',
            description: 'Vidéos d\'exercices à faire chez toi'
        },
        {
            id: 'sport-micro',
            title: 'Challenge micro-mouvements',
            icon: '⚡',
            type: 'challenge',
            description: 'Petites routines intégrables au quotidien'
        },
        {
            id: 'sport-tips',
            title: 'Rester motivé',
            icon: '🔥',
            type: 'tips',
            description: 'Astuces pour bouger régulièrement'
        }
    ],

    badges: [
        { id: 'sport-explorer', name: 'Explorateur actif', icon: '🚀', desc: 'Activités découvertes' },
        { id: 'sport-scientist', name: 'Anatomiste', icon: '🧬', desc: 'Science comprise' },
        { id: 'sport-active', name: 'Toujours en mouvement', icon: '⚡', desc: 'Micro-mouvements maîtrisés' },
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
            case 'sport-science':
                return this.generateScienceContent();
            case 'sport-discover':
                return this.generateDiscoverContent();
            case 'sport-videos':
                return this.generateVideosContent();
            case 'sport-micro':
                return this.generateMicroContent();
            case 'sport-tips':
                return this.generateTipsContent();
            default:
                return '';
        }
    },

    generateScienceContent() {
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
    },

    generateDiscoverContent() {
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
    },

    generateVideosContent() {
        return `
            <div class="videos-content">
                <h4>🎬 Entraînements faciles à faire chez toi</h4>
                <p>Voici des chaînes YouTube avec des vidéos adaptées aux ados (10-15 min) :</p>

                <div class="video-category">
                    <h5>🔥 Pour débutants (aucun matériel nécessaire)</h5>
                    <div class="video-links">
                        <a href="https://www.youtube.com/results?search_query=entraînement+débutant+10+minutes+sans+matériel" target="_blank" class="video-link">
                            <span class="video-icon">▶️</span>
                            <div>
                                <strong>Entraînements 10 min sans matériel</strong>
                                <p>Recherche YouTube - Parfait pour commencer</p>
                            </div>
                        </a>
                        <a href="https://www.youtube.com/results?search_query=HIIT+débutant+français+10+minutes" target="_blank" class="video-link">
                            <span class="video-icon">▶️</span>
                            <div>
                                <strong>HIIT débutant 10 min</strong>
                                <p>Entraînements intensifs courts</p>
                            </div>
                        </a>
                    </div>
                </div>

                <div class="video-category">
                    <h5>💃 Danse & cardio fun</h5>
                    <div class="video-links">
                        <a href="https://www.youtube.com/results?search_query=just+dance+workout+français" target="_blank" class="video-link">
                            <span class="video-icon">▶️</span>
                            <div>
                                <strong>Just Dance Workout</strong>
                                <p>Bouger en s'amusant sur de la musique</p>
                            </div>
                        </a>
                        <a href="https://www.youtube.com/results?search_query=zumba+débutant+français" target="_blank" class="video-link">
                            <span class="video-icon">▶️</span>
                            <div>
                                <strong>Zumba débutant</strong>
                                <p>Danse latine énergique</p>
                            </div>
                        </a>
                    </div>
                </div>

                <div class="video-category">
                    <h5>🧘 Stretching & relaxation</h5>
                    <div class="video-links">
                        <a href="https://www.youtube.com/results?search_query=yoga+débutant+ado+français+10+minutes" target="_blank" class="video-link">
                            <span class="video-icon">▶️</span>
                            <div>
                                <strong>Yoga débutant 10 min</strong>
                                <p>Parfait le matin ou avant de dormir</p>
                            </div>
                        </a>
                        <a href="https://www.youtube.com/results?search_query=stretching+complet+débutant+français" target="_blank" class="video-link">
                            <span class="video-icon">▶️</span>
                            <div>
                                <strong>Stretching complet</strong>
                                <p>Étirements pour tout le corps</p>
                            </div>
                        </a>
                    </div>
                </div>

                <div class="video-category">
                    <h5>💪 Renforcement musculaire</h5>
                    <div class="video-links">
                        <a href="https://www.youtube.com/results?search_query=abdos+débutant+10+minutes+français" target="_blank" class="video-link">
                            <span class="video-icon">▶️</span>
                            <div>
                                <strong>Abdos 10 min</strong>
                                <p>Renforcer son centre</p>
                            </div>
                        </a>
                        <a href="https://www.youtube.com/results?search_query=pompes+progressif+débutant+français" target="_blank" class="video-link">
                            <span class="video-icon">▶️</span>
                            <div>
                                <strong>Pompes progressives</strong>
                                <p>Apprendre les pompes étape par étape</p>
                            </div>
                        </a>
                    </div>
                </div>

                <div class="info-box">
                    <strong>💡 Conseil :</strong>
                    <p>Commence par 10 minutes, 2-3 fois par semaine. Augmente progressivement. L'important c'est la régularité, pas l'intensité !</p>
                </div>

                <button class="btn-primary" onclick="sportModule.completeChallenge('sport-videos')">
                    ✓ J'ai trouvé des vidéos qui m'intéressent
                </button>
            </div>
        `;
    },

    generateMicroContent() {
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
    },

    generateTipsContent() {
        return `
            <div class="tips-content">
                <h4>🔥 Astuces pour rester motivé</h4>
                
                <div class="tip-card">
                    <div class="tip-icon">🎯</div>
                    <div class="tip-content">
                        <h5>Fixe-toi des objectifs réalistes</h5>
                        <p>Commence petit : 10 min par jour, c'est déjà super ! Augmente progressivement.</p>
                    </div>
                </div>

                <div class="tip-card">
                    <div class="tip-icon">👥</div>
                    <div class="tip-content">
                        <h5>Bouge avec des amis</h5>
                        <p>C'est plus fun à plusieurs ! Propose à tes potes une activité sportive plutôt que Netflix.</p>
                    </div>
                </div>

                <div class="tip-card">
                    <div class="tip-icon">🎵</div>
                    <div class="tip-content">
                        <h5>Crée ta playlist motivante</h5>
                        <p>La musique booste ta motivation et rend l'effort plus agréable.</p>
                    </div>
                </div>

                <div class="tip-card">
                    <div class="tip-icon">📅</div>
                    <div class="tip-content">
                        <h5>Rends-le automatique</h5>
                        <p>Même heure, même jour chaque semaine. Ça devient une habitude, pas une corvée.</p>
                    </div>
                </div>

                <div class="tip-card">
                    <div class="tip-icon">🎮</div>
                    <div class="tip-content">
                        <h5>Gamifie ton activité</h5>
                        <p>Applications de suivi, challenges avec des amis, objectifs à atteindre...</p>
                    </div>
                </div>

                <div class="tip-card">
                    <div class="tip-icon">🌈</div>
                    <div class="tip-content">
                        <h5>Varie les plaisirs</h5>
                        <p>Ne fais pas toujours la même chose. Alterne les activités pour ne pas t'ennuyer.</p>
                    </div>
                </div>

                <div class="info-box">
                    <strong>⚡ Astuce bonus :</strong>
                    <p>Rappelle-toi : tu ne regrettes JAMAIS une séance faite, mais toujours une séance sautée !</p>
                </div>

                <button class="btn-primary" onclick="sportModule.completeChallenge('sport-tips')">
                    ✓ Astuces notées
                </button>
            </div>
        `;
    },

    updateMicroProgress() {
        const checked = document.querySelectorAll('.micro-item input:checked').length;
        const progressDiv = document.getElementById('micro-progress');
        
        progressDiv.innerHTML = `<div class="info-box"><strong>✓ ${checked}/6 micro-mouvements essayés</strong></div>`;
        
        if (checked >= 4) {
            this.completeChallenge('sport-micro');
            storage.addBadge('sport', this.badges[2]);
        }
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
