// Système de gestion du localStorage pour Mission Équilibre

class StorageManager {
    constructor() {
        this.storageKey = 'missionEquilibre';
        this.initializeStorage();
    }

    // Initialiser le stockage avec des données par défaut
    initializeStorage() {
        if (!localStorage.getItem(this.storageKey)) {
            const defaultData = this.getDefaultData();
            this.save(defaultData);
        }
    }

    // Structure de données par défaut
    getDefaultData() {
        return {
            version: '1.0',
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            user: {
                startDate: new Date().toISOString()
            },
            modules: {
                sleep: {
                    started: false,
                    completed: false,
                    progress: 0,
                    challenges: [],
                    badges: [],
                    discoveries: [],
                    personalGoal: '',
                    tracking: [],
                    notes: '',
                    timeSpent: 0
                },
                nutrition: {
                    started: false,
                    completed: false,
                    progress: 0,
                    challenges: [],
                    badges: [],
                    discoveries: [],
                    personalGoal: '',
                    tracking: [],
                    notes: '',
                    timeSpent: 0
                },
                screens: {
                    started: false,
                    completed: false,
                    progress: 0,
                    challenges: [],
                    badges: [],
                    discoveries: [],
                    personalGoal: '',
                    tracking: [],
                    notes: '',
                    timeSpent: 0
                },
                sport: {
                    started: false,
                    completed: false,
                    progress: 0,
                    challenges: [],
                    badges: [],
                    discoveries: [],
                    personalGoal: '',
                    tracking: [],
                    notes: '',
                    timeSpent: 0
                }
            },
            globalBadges: [],
            stats: {
                totalChallengesCompleted: 0,
                totalTimeSpent: 0,
                modulesStarted: 0,
                modulesCompleted: 0
            }
        };
    }

    // Sauvegarder les données
    save(data) {
        try {
            data.lastUpdated = new Date().toISOString();
            const encrypted = this.encrypt(JSON.stringify(data));
            localStorage.setItem(this.storageKey, encrypted);
            return true;
        } catch (error) {
            console.error('Erreur de sauvegarde:', error);
            return false;
        }
    }

    // Charger les données
    load() {
        try {
            const encrypted = localStorage.getItem(this.storageKey);
            if (!encrypted) {
                return this.getDefaultData();
            }
            const decrypted = this.decrypt(encrypted);
            return JSON.parse(decrypted);
        } catch (error) {
            console.error('Erreur de chargement:', error);
            return this.getDefaultData();
        }
    }

    // Chiffrement simple (Base64)
    encrypt(data) {
        return btoa(unescape(encodeURIComponent(data)));
    }

    // Déchiffrement
    decrypt(data) {
        return decodeURIComponent(escape(atob(data)));
    }

    // Mettre à jour un module spécifique
    updateModule(moduleName, data) {
        const allData = this.load();
        allData.modules[moduleName] = { ...allData.modules[moduleName], ...data };
        this.updateStats(allData);
        return this.save(allData);
    }

    // Mettre à jour les statistiques globales
    updateStats(data) {
        let totalChallenges = 0;
        let totalTime = 0;
        let modulesStarted = 0;
        let modulesCompleted = 0;

        Object.values(data.modules).forEach(module => {
            totalChallenges += module.challenges.filter(c => c.completed).length;
            totalTime += module.timeSpent || 0;
            if (module.started) modulesStarted++;
            if (module.completed) modulesCompleted++;
        });

        data.stats = {
            totalChallengesCompleted: totalChallenges,
            totalTimeSpent: totalTime,
            modulesStarted: modulesStarted,
            modulesCompleted: modulesCompleted
        };
    }

    // Ajouter un badge
    addBadge(moduleName, badge) {
        const data = this.load();
        if (moduleName === 'global') {
            if (!data.globalBadges.find(b => b.id === badge.id)) {
                data.globalBadges.push(badge);
            }
        } else {
            if (!data.modules[moduleName].badges.find(b => b.id === badge.id)) {
                data.modules[moduleName].badges.push(badge);
            }
        }
        return this.save(data);
    }

    // Marquer un défi comme complété
    completeChallenge(moduleName, challengeId) {
        const data = this.load();
        const challenge = data.modules[moduleName].challenges.find(c => c.id === challengeId);
        if (challenge) {
            challenge.completed = true;
            challenge.completedAt = new Date().toISOString();
        } else {
            data.modules[moduleName].challenges.push({
                id: challengeId,
                completed: true,
                completedAt: new Date().toISOString()
            });
        }

        // Mise à jour du progrès
        const totalChallenges = 5; // 5 défis par module
        const completedChallenges = data.modules[moduleName].challenges.filter(c => c.completed).length;
        data.modules[moduleName].progress = (completedChallenges / totalChallenges) * 100;

        if (completedChallenges === totalChallenges) {
            data.modules[moduleName].completed = true;
        }

        return this.save(data);
    }

    // Ajouter une entrée de tracking
    addTracking(moduleName, entry) {
        const data = this.load();
        data.modules[moduleName].tracking.push({
            ...entry,
            timestamp: new Date().toISOString()
        });
        return this.save(data);
    }

    // Ajouter une découverte
    addDiscovery(moduleName, discovery) {
        const data = this.load();
        if (!data.modules[moduleName].discoveries.includes(discovery)) {
            data.modules[moduleName].discoveries.push(discovery);
        }
        return this.save(data);
    }

    // Définir un objectif personnel
    setPersonalGoal(moduleName, goal) {
        const data = this.load();
        data.modules[moduleName].personalGoal = goal;
        return this.save(data);
    }

    // Sauvegarder des notes
    saveNotes(moduleName, notes) {
        const data = this.load();
        data.modules[moduleName].notes = notes;
        return this.save(data);
    }

    // Incrémenter le temps passé
    incrementTime(moduleName, minutes) {
        const data = this.load();
        data.modules[moduleName].timeSpent += minutes;
        return this.save(data);
    }

    // Marquer un module comme démarré
    startModule(moduleName) {
        const data = this.load();
        data.modules[moduleName].started = true;
        return this.save(data);
    }

    // Exporter les données vers un fichier
    exportToFile() {
        try {
            const data = this.load();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const date = new Date().toISOString().split('T')[0];
            link.download = `mission-equilibre-${date}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            return true;
        } catch (error) {
            console.error('Erreur d\'export:', error);
            return false;
        }
    }

    // Importer les données depuis un fichier
    importFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    if (this.validateData(data)) {
                        this.save(data);
                        resolve(true);
                    } else {
                        reject(new Error('Données invalides'));
                    }
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(new Error('Erreur de lecture du fichier'));
            reader.readAsText(file);
        });
    }

    // Valider la structure des données
    validateData(data) {
        return (
            data.version &&
            data.modules &&
            data.modules.sleep &&
            data.modules.nutrition &&
            data.modules.screens &&
            data.modules.sport &&
            data.stats
        );
    }

    // Réinitialiser toutes les données
    reset() {
        const defaultData = this.getDefaultData();
        return this.save(defaultData);
    }

    // Obtenir les statistiques globales
    getStats() {
        const data = this.load();
        return data.stats;
    }

    // Obtenir tous les badges débloqués
    getAllBadges() {
        const data = this.load();
        const allBadges = [...data.globalBadges];
        
        Object.values(data.modules).forEach(module => {
            allBadges.push(...module.badges);
        });

        return allBadges;
    }

    // Obtenir les données d'un module
    getModuleData(moduleName) {
        const data = this.load();
        return data.modules[moduleName];
    }

    // Obtenir les scores d'équilibre pour le graphique radar
    getBalanceScores() {
        const data = this.load();
        return {
            sleep: data.modules.sleep.progress || 0,
            nutrition: data.modules.nutrition.progress || 0,
            screens: data.modules.screens.progress || 0,
            sport: data.modules.sport.progress || 0
        };
    }

    // Obtenir les dates pour le PDF
    getUserDates() {
        const data = this.load();
        return {
            start: new Date(data.user.startDate).toLocaleDateString('fr-FR'),
            end: new Date().toLocaleDateString('fr-FR')
        };
    }

    // Formater le temps
    formatTime(minutes) {
        if (minutes < 60) {
            return `${minutes}min`;
        }
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h${mins}` : `${hours}h`;
    }

    // Obtenir le temps d'exploration formaté
    getFormattedExplorationTime() {
        const stats = this.getStats();
        return this.formatTime(stats.totalTimeSpent);
    }
}

// Instance globale
const storage = new StorageManager();
