// Application principale - Mission Équilibre

const app = {
    currentScreen: 'welcome',
    currentModule: null,
    modules: {
        sleep: sleepModule,
        nutrition: nutritionModule,
        screens: screensModule,
        sport: sportModule
    },

    init() {
        // Vérifier si l'utilisateur a déjà commencé
        const data = storage.load();
        if (data.modules.sleep.started || data.modules.nutrition.started || 
            data.modules.screens.started || data.modules.sport.started) {
            this.showDashboard();
        } else {
            this.showScreen('welcome');
        }
    },

    // Navigation entre écrans
    showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(`${screenName}-screen`).classList.add('active');
        this.currentScreen = screenName;
    },

    // Démarrer la mission
    startMission() {
        this.showDashboard();
    },

    // Afficher le dashboard
    showDashboard() {
        this.showScreen('dashboard');
        this.updateDashboard();
    },

    // Mettre à jour les données du dashboard
    updateDashboard() {
        const data = storage.load();
        const stats = data.stats;

        // Statistiques globales
        document.getElementById('modules-completed').textContent = 
            `${stats.modulesCompleted}/4`;
        document.getElementById('challenges-completed').textContent = 
            `${stats.totalChallengesCompleted}/20`;
        document.getElementById('badges-earned').textContent = 
            storage.getAllBadges().length;
        document.getElementById('exploration-time').textContent = 
            storage.formatTime(stats.totalTimeSpent);

        // Progression des modules
        Object.keys(this.modules).forEach(moduleName => {
            const moduleData = data.modules[moduleName];
            const completedChallenges = moduleData.challenges.filter(c => c.completed).length;
            
            document.getElementById(`progress-${moduleName}`).style.width = 
                `${moduleData.progress || 0}%`;
            document.getElementById(`challenges-${moduleName}`).textContent = 
                completedChallenges;
            document.getElementById(`badges-${moduleName}`).textContent = 
                moduleData.badges.length;
        });

        // Badges
        this.updateBadgesDisplay();
    },

    // Afficher les badges
    updateBadgesDisplay() {
        const badges = storage.getAllBadges();
        const container = document.getElementById('badges-container');

        if (badges.length === 0) {
            container.innerHTML = '<p class="empty-state">Aucun badge pour le moment. Explore les modules pour en débloquer !</p>';
            return;
        }

        container.innerHTML = badges.map(badge => `
            <div class="badge-item">
                <span class="badge-icon">${badge.icon}</span>
                <div class="badge-name">${badge.name}</div>
                <div class="badge-desc">${badge.desc}</div>
            </div>
        `).join('');
    },

    // Ouvrir un module
    openModule(moduleName) {
        const module = this.modules[moduleName];
        if (!module) return;

        this.currentModule = moduleName;
        storage.startModule(moduleName);

        // Mettre à jour l'en-tête du module
        document.getElementById('module-title').textContent = module.title;
        
        const moduleData = storage.getModuleData(moduleName);
        const completedChallenges = moduleData.challenges.filter(c => c.completed).length;
        document.getElementById('module-progress-text').textContent = 
            `${completedChallenges}/5`;

        // Charger le contenu du module
        document.getElementById('module-content').innerHTML = module.generateContent();

        // Afficher l'écran du module
        this.showScreen('module');

        // Incrémenter le temps (simulé)
        storage.incrementTime(moduleName, 5);
    },

    // Retour au dashboard
    backToDashboard() {
        this.showDashboard();
    },

    // Afficher la modal d'information sur les données
    showDataInfo() {
        this.showModal('data-info-modal');
    },

    // Afficher les paramètres
    showSettings() {
        const data = storage.load();
        const lastSave = new Date(data.lastUpdated).toLocaleString('fr-FR');
        
        document.getElementById('last-save-time').textContent = lastSave;
        document.getElementById('settings-modules').textContent = 
            `${data.stats.modulesCompleted}/4`;

        this.showModal('settings-modal');
    },

    // Afficher une modal
    showModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    },

    // Fermer une modal
    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    },

    // Afficher une notification
    showNotification(message) {
        const notification = document.getElementById('notification');
        document.getElementById('notification-text').textContent = message;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    },

    // Exporter les données
    exportData() {
        if (storage.exportToFile()) {
            this.showNotification('✓ Carnet téléchargé !');
            this.closeModal('settings-modal');
        } else {
            this.showNotification('❌ Erreur d\'export');
        }
    },

    // Importer les données
    importData() {
        document.getElementById('import-file').click();
    },

    handleImport(event) {
        const file = event.target.files[0];
        if (!file) return;

        storage.importFromFile(file)
            .then(() => {
                this.showNotification('✓ Carnet restauré !');
                this.closeModal('settings-modal');
                this.updateDashboard();
            })
            .catch(error => {
                this.showNotification('❌ Fichier invalide');
                console.error(error);
            });
    },

    // Confirmer la réinitialisation
    confirmReset() {
        document.getElementById('confirm-title').textContent = '⚠️ Attention !';
        document.getElementById('confirm-message').textContent = 
            'Es-tu sûr de vouloir effacer TOUTES tes données ? Cette action est irréversible.';
        
        const confirmBtn = document.getElementById('confirm-action-btn');
        confirmBtn.onclick = () => {
            this.resetAllData();
        };

        this.closeModal('settings-modal');
        this.showModal('confirm-modal');
    },

    // Réinitialiser toutes les données
    resetAllData() {
        storage.reset();
        this.closeModal('confirm-modal');
        this.showNotification('🗑️ Données effacées');
        
        setTimeout(() => {
            this.showScreen('welcome');
            this.updateDashboard();
        }, 1000);
    },

    // Exporter en PDF
    exportPDF() {
        this.showNotification('⏳ Génération du PDF...');
        
        setTimeout(() => {
            pdfGenerator.generateCompletePDF();
            this.showNotification('✓ PDF téléchargé !');
        }, 500);
    }
};

// Initialiser l'application au chargement
window.addEventListener('DOMContentLoaded', () => {
    app.init();
});

// Fermer les modales en cliquant à l'extérieur
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});
