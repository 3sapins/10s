# Mission Équilibre - Plateforme de Prévention PSPS

## 📋 Description

Mission Équilibre est une plateforme interactive de prévention et de promotion de la santé (PSPS) destinée aux élèves de 10S (13-14 ans). Elle aborde quatre thématiques essentielles du bien-être :

- 🌙 **Chronos** - Le sommeil et ses impacts
- 🍎 **Energia** - L'alimentation et l'énergie
- 📱 **Digital Balance** - L'usage équilibré des écrans
- 💪 **Kinesis** - L'activité physique et le mouvement

## 🎯 Objectifs pédagogiques

- Sensibiliser sans moraliser
- Éveiller la curiosité et l'esprit critique
- Développer l'autonomie et la responsabilisation
- Favoriser la prise de conscience personnelle
- Proposer des outils concrets et applicables

## ✨ Fonctionnalités

### Pour les élèves

- **4 modules interactifs** avec défis, quiz, simulations et trackers
- **Système de badges** pour valoriser les découvertes
- **Journal personnel** pour noter observations et réflexions
- **Fixation d'objectifs personnalisés** pour chaque thématique
- **Tableau de bord** avec vue d'ensemble de la progression
- **Export PDF** pour conserver un bilan personnel

### Respect de la vie privée

- **Stockage 100% local** (localStorage du navigateur)
- **Aucune donnée envoyée vers un serveur**
- **Confidentialité totale** des réponses et réflexions
- **Export/import manuel** pour sauvegarde et transfert
- **Possibilité d'effacer** toutes les données à tout moment

## 🛠️ Technologies utilisées

- **HTML5** - Structure
- **CSS3** - Design moderne et responsive
- **JavaScript Vanilla** - Logique et interactivité
- **jsPDF** - Génération de PDF
- **localStorage** - Sauvegarde des données

## 📂 Structure du projet

```
mission-equilibre/
├── index.html              # Page principale
├── styles.css              # Styles globaux
├── app.js                  # Application principale
├── storage.js              # Gestion du localStorage
├── pdf-generator.js        # Génération des bilans PDF
└── modules/
    ├── sleep.js            # Module Sommeil
    ├── nutrition.js        # Module Alimentation
    ├── screens.js          # Module Écrans
    └── sport.js            # Module Sport
```

## 🚀 Installation et utilisation

### Utilisation simple (recommandée)

1. Télécharger tous les fichiers dans un même dossier
2. Ouvrir `index.html` dans un navigateur web moderne
3. C'est tout ! L'application fonctionne hors ligne

### Hébergement sur un serveur

1. Uploader tous les fichiers sur votre serveur web
2. Accéder à l'URL du fichier index.html
3. Partager le lien avec vos élèves

### Utilisation en classe

**Scénario 1 : Exploration autonome**
- Les élèves accèdent à la plateforme individuellement
- Exploration libre pendant 2-3 périodes
- Temps de partage collectif (volontaire) en fin de parcours

**Scénario 2 : Parcours guidé**
- Introduction collective (20 min)
- Exploration d'un module par période
- Discussions de groupe entre les modules

**Scénario 3 : Travail à la maison**
- Introduction en classe
- Exploration à la maison sur 1-2 semaines
- Restitution et échanges en classe

## 📊 Contenu pédagogique

### Module Sommeil (Chronos)
- Simulation des effets du manque de sommeil
- Quiz "Mythes vs Réalités"
- Tracker de sommeil sur 7 jours
- Explication scientifique des phases du sommeil
- Fixation d'objectifs personnels

### Module Alimentation (Energia)
- Simulateur de composition de repas
- Jeu "Détective des étiquettes"
- Explication de la transformation alimentaire
- Journal alimentaire
- Définition d'un défi nutrition

### Module Écrans (Digital Balance)
- Test du profil d'usage des écrans
- Découverte des effets invisibles
- Tracker du temps d'écran
- Boîte à outils pour l'équilibre digital
- Choix d'un défi personnel

### Module Sport (Kinesis)
- Découverte de 30 activités variées
- Explication scientifique des bienfaits
- Challenge micro-mouvements
- Suivi de l'activité physique
- Objectif mouvement personnalisé

## 🎓 Conseils d'utilisation pour les enseignants

### Avant l'activité
- Tester vous-même la plateforme
- Préparer quelques questions de discussion
- Prévoir un temps pour le partage d'expériences

### Pendant l'activité
- Laisser les élèves explorer librement
- Être disponible pour répondre aux questions
- Ne pas consulter les réponses individuelles (confidentialité)

### Après l'activité
- Discussion collective sur les découvertes
- Mise en commun des stratégies choisies
- Suivi des objectifs personnels (optionnel)

## 📱 Compatibilité

- ✅ Chrome, Firefox, Safari, Edge (versions récentes)
- ✅ Ordinateurs, tablettes, smartphones
- ✅ Fonctionne hors ligne une fois chargé
- ⚠️ Nécessite JavaScript activé

## 🔒 Protection des données (RGPD/LPD)

Cette plateforme est conforme au RGPD et à la LPD suisse :
- Aucune collecte de données nominatives
- Stockage local uniquement
- Pas de cookies tiers
- Pas de traçage ou analytics
- Information transparente sur le fonctionnement

## 🤝 Contributions et adaptations

Ce projet peut être adapté selon vos besoins :
- Modifier les contenus pédagogiques
- Ajouter de nouveaux défis
- Personnaliser le design
- Traduire dans d'autres langues

## 📄 Licence

Ce projet est créé à des fins éducatives pour le Collège des Trois-Sapins, Echallens.
Utilisation libre pour des contextes éducatifs non commerciaux.

## ✉️ Contact

Pour toute question ou suggestion d'amélioration :
- Délégué PSPS - Collège des Trois-Sapins
- Echallens, Suisse

## 🎉 Remerciements

Merci aux élèves qui testeront et utiliseront cette plateforme.
Vos retours sont précieux pour l'améliorer !

---

**Version 1.0** - Janvier 2025
