// Générateur de PDF - Mission Équilibre

const pdfGenerator = {
    
    generateCompletePDF() {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        const data = storage.load();
        
        this.pdf = pdf;
        this.data = data;
        this.currentY = 20;
        
        // Génération des pages
        this.addCoverPage();
        this.addOverviewPage();
        this.addSleepPage();
        this.addNutritionPage();
        this.addScreensPage();
        this.addSportPage();
        this.addGoalsPage();
        
        // Téléchargement
        const date = new Date().toISOString().split('T')[0];
        pdf.save(`Mission-Equilibre-${date}.pdf`);
    },

    addCoverPage() {
        const pdf = this.pdf;
        
        // Fond coloré
        pdf.setFillColor(102, 126, 234);
        pdf.rect(0, 0, 210, 80, 'F');
        
        // Titre
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(32);
        pdf.setFont(undefined, 'bold');
        pdf.text('Mission Équilibre', 105, 35, { align: 'center' });
        
        pdf.setFontSize(18);
        pdf.setFont(undefined, 'normal');
        pdf.text('Mon Bilan Personnel', 105, 50, { align: 'center' });
        
        // Période
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(12);
        const dates = storage.getUserDates();
        pdf.text(`Période : ${dates.start} - ${dates.end}`, 105, 100, { align: 'center' });
        
        // Emoji central
        pdf.setFontSize(60);
        pdf.text('🎯', 105, 150, { align: 'center' });
        
        // Message
        pdf.setFontSize(11);
        pdf.setTextColor(100, 100, 100);
        const message = 'Ce document est ton espace personnel de réflexion.\nIl est strictement confidentiel.';
        pdf.text(message, 105, 200, { align: 'center' });
    },

    addOverviewPage() {
        this.pdf.addPage();
        this.currentY = 20;
        
        this.addSectionTitle('Vue d\'ensemble de mon parcours');
        
        const stats = this.data.stats;
        
        // Stats principales
        this.currentY += 10;
        this.addStatBox('Modules explorés', `${stats.modulesCompleted}/4`, this.currentY);
        this.currentY += 25;
        
        this.addStatBox('Défis relevés', `${stats.totalChallengesCompleted}/20`, this.currentY);
        this.currentY += 25;
        
        const badgesCount = storage.getAllBadges().length;
        this.addStatBox('Badges débloqués', badgesCount.toString(), this.currentY);
        this.currentY += 25;
        
        const timeFormatted = storage.formatTime(stats.totalTimeSpent);
        this.addStatBox('Temps d\'exploration', timeFormatted, this.currentY);
        this.currentY += 35;
        
        // Graphique d'équilibre simplifié (texte)
        this.pdf.setFontSize(14);
        this.pdf.setFont(undefined, 'bold');
        this.pdf.text('Equilibre global', 20, this.currentY);
        this.currentY += 10;
        
        const scores = storage.getBalanceScores();
        this.pdf.setFontSize(10);
        this.pdf.setFont(undefined, 'normal');
        
        Object.entries(scores).forEach(([module, score]) => {
            const moduleNames = {
                sleep: 'Sommeil',
                nutrition: 'Alimentation',
                screens: 'Ecrans',
                sport: 'Sport'
            };
            
            this.pdf.text(`${moduleNames[module]}: ${Math.round(score)}%`, 25, this.currentY);
            
            // Barre de progression
            this.pdf.setDrawColor(200, 200, 200);
            this.pdf.rect(80, this.currentY - 3, 100, 5);
            
            this.pdf.setFillColor(102, 126, 234);
            this.pdf.rect(80, this.currentY - 3, score, 5, 'F');
            
            this.currentY += 10;
        });
    },

    addSleepPage() {
        this.pdf.addPage();
        this.currentY = 20;
        
        this.addModulePage('sleep', 'Sommeil - Chronos', '🌙');
    },

    addNutritionPage() {
        this.pdf.addPage();
        this.currentY = 20;
        
        this.addModulePage('nutrition', 'Alimentation - Energia', '🍎');
    },

    addScreensPage() {
        this.pdf.addPage();
        this.currentY = 20;
        
        this.addModulePage('screens', 'Ecrans - Digital Balance', '📱');
    },

    addSportPage() {
        this.pdf.addPage();
        this.currentY = 20;
        
        this.addModulePage('sport', 'Sport - Kinesis', '💪');
    },

    addModulePage(moduleName, title, emoji) {
        const moduleData = this.data.modules[moduleName];
        
        // Titre avec emoji
        this.pdf.setFontSize(20);
        this.pdf.setFont(undefined, 'bold');
        this.pdf.text(`${emoji} ${title}`, 20, this.currentY);
        this.currentY += 15;
        
        // Progression
        const completedChallenges = moduleData.challenges.filter(c => c.completed).length;
        this.pdf.setFontSize(12);
        this.pdf.setFont(undefined, 'normal');
        this.pdf.text(`Progression : ${completedChallenges}/5 défis complétés`, 20, this.currentY);
        this.currentY += 10;
        
        // Badges
        if (moduleData.badges.length > 0) {
            this.pdf.text(`Badges débloqués : ${moduleData.badges.length}`, 20, this.currentY);
            this.currentY += 8;
            
            moduleData.badges.forEach(badge => {
                this.pdf.setFontSize(10);
                this.pdf.text(`  ${badge.icon} ${badge.name} - ${badge.desc}`, 25, this.currentY);
                this.currentY += 6;
            });
        }
        
        this.currentY += 10;
        
        // Découvertes
        if (moduleData.discoveries && moduleData.discoveries.length > 0) {
            this.pdf.setFontSize(12);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('Mes découvertes :', 20, this.currentY);
            this.currentY += 8;
            
            this.pdf.setFontSize(10);
            this.pdf.setFont(undefined, 'normal');
            moduleData.discoveries.slice(0, 3).forEach(discovery => {
                const lines = this.pdf.splitTextToSize(`• ${discovery}`, 170);
                lines.forEach(line => {
                    if (this.currentY > 270) {
                        this.pdf.addPage();
                        this.currentY = 20;
                    }
                    this.pdf.text(line, 25, this.currentY);
                    this.currentY += 6;
                });
            });
        }
        
        this.currentY += 10;
        
        // Objectif personnel
        if (moduleData.personalGoal) {
            this.pdf.setFontSize(12);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('Mon objectif personnel :', 20, this.currentY);
            this.currentY += 8;
            
            this.pdf.setFontSize(10);
            this.pdf.setFont(undefined, 'normal');
            const goalLines = this.pdf.splitTextToSize(moduleData.personalGoal, 170);
            goalLines.forEach(line => {
                if (this.currentY > 270) {
                    this.pdf.addPage();
                    this.currentY = 20;
                }
                this.pdf.text(line, 25, this.currentY);
                this.currentY += 6;
            });
        }
        
        this.currentY += 10;
        
        // Notes personnelles
        if (moduleData.notes && moduleData.notes.trim()) {
            if (this.currentY > 200) {
                this.pdf.addPage();
                this.currentY = 20;
            }
            
            this.pdf.setFontSize(12);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('Mes notes :', 20, this.currentY);
            this.currentY += 8;
            
            this.pdf.setFontSize(10);
            this.pdf.setFont(undefined, 'normal');
            const notesLines = this.pdf.splitTextToSize(moduleData.notes, 170);
            notesLines.forEach(line => {
                if (this.currentY > 270) {
                    this.pdf.addPage();
                    this.currentY = 20;
                }
                this.pdf.text(line, 25, this.currentY);
                this.currentY += 6;
            });
        }
    },

    addGoalsPage() {
        this.pdf.addPage();
        this.currentY = 20;
        
        this.addSectionTitle('Mes objectifs personnels');
        this.currentY += 10;
        
        const modules = ['sleep', 'nutrition', 'screens', 'sport'];
        const moduleNames = {
            sleep: 'Sommeil',
            nutrition: 'Alimentation',
            screens: 'Ecrans',
            sport: 'Sport'
        };
        
        modules.forEach(module => {
            const moduleData = this.data.modules[module];
            if (moduleData.personalGoal) {
                this.pdf.setFontSize(12);
                this.pdf.setFont(undefined, 'bold');
                this.pdf.text(`${moduleNames[module]}:`, 20, this.currentY);
                this.currentY += 7;
                
                this.pdf.setFontSize(10);
                this.pdf.setFont(undefined, 'normal');
                const goalLines = this.pdf.splitTextToSize(moduleData.personalGoal, 170);
                goalLines.forEach(line => {
                    this.pdf.text(line, 25, this.currentY);
                    this.currentY += 6;
                });
                
                this.currentY += 8;
            }
        });
        
        // Message de conclusion
        if (this.currentY > 220) {
            this.pdf.addPage();
            this.currentY = 20;
        }
        
        this.currentY += 20;
        
        this.pdf.setFillColor(232, 244, 248);
        this.pdf.rect(20, this.currentY - 10, 170, 40, 'F');
        
        this.pdf.setFontSize(11);
        this.pdf.setFont(undefined, 'bold');
        this.pdf.text('Félicitations pour ton parcours !', 105, this.currentY, { align: 'center' });
        this.currentY += 8;
        
        this.pdf.setFont(undefined, 'normal');
        this.pdf.setFontSize(10);
        const message = 'Continue à prendre soin de toi. Ces petits changements\npeuvent faire une grande différence dans ton quotidien.';
        this.pdf.text(message, 105, this.currentY, { align: 'center' });
        
        this.currentY += 20;
        this.pdf.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 105, this.currentY, { align: 'center' });
    },

    addSectionTitle(title) {
        this.pdf.setFontSize(16);
        this.pdf.setFont(undefined, 'bold');
        this.pdf.setTextColor(102, 126, 234);
        this.pdf.text(title, 20, this.currentY);
        this.pdf.setTextColor(0, 0, 0);
        
        // Ligne de séparation
        this.pdf.setDrawColor(102, 126, 234);
        this.pdf.setLineWidth(0.5);
        this.pdf.line(20, this.currentY + 2, 190, this.currentY + 2);
        
        this.currentY += 10;
    },

    addStatBox(label, value, y) {
        this.pdf.setFillColor(240, 240, 240);
        this.pdf.roundedRect(20, y - 5, 170, 18, 3, 3, 'F');
        
        this.pdf.setFontSize(11);
        this.pdf.setFont(undefined, 'bold');
        this.pdf.text(label + ' :', 25, y + 5);
        
        this.pdf.setFont(undefined, 'normal');
        this.pdf.text(value, 170, y + 5);
    }
};
