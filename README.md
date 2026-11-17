# 🎬 Site web d'une chaîne YouTube – HTML, Tailwind CSS & JavaScript

Projet réalisé **en groupe** : nous devions **créer une vidéo YouTube** puis **concevoir le site web de la chaîne**, en **HTML** et **Tailwind CSS**.

Le site comporte deux pages : une **page d'accueil** (vidéo vedette, shorts, FAQ) et une **page de présentation** de la chaîne (analyse, charte graphique, stratégie).

## 🎯 Objectifs du projet

- Travailler en équipe sur un projet complet (contenu vidéo + site web)
- Imaginer l'identité d'une chaîne YouTube et la traduire en site
- Construire plusieurs pages en HTML et les relier entre elles
- Utiliser **Tailwind CSS** pour la mise en forme, complété par du CSS personnalisé
- Ajouter de l'interactivité en JavaScript




## 📄 Les pages du site

### 🏠 Page d'accueil (`index.html`)

- **Barre de navigation** fixe avec menu burger sur mobile
- **En-tête** avec un bouton qui mène à la vidéo
- **Vidéo vedette** : lecteur YouTube intégré
- **Section parallax** avec image de fond
- **Shorts** : trois shorts YouTube affichés dans un **carrousel 3D circulaire**
- **FAQ** : questions/réponses en accordéon
- **Pied de page**

### 📊 Page de présentation (`presentation.html`)

Elle regroupe le travail d'analyse et de stratégie autour de la chaîne :

- Description de la chaîne
- Benchmark (tableau de comparaison avec des chaînes concurrentes)
- Analyse SWOT
- Charte graphique (typographie, couleurs, sons)
- Personae
- Objectifs
- Message, ton et vocabulaire
- Storytelling et storyboard
- Stratégie marketing sur Instagram

## ✨ Fonctionnalités

- **Fond parallax multi-couches** avec des éléments « binaires » animés, qui réagissent au défilement et à la souris
- **Barre de navigation** qui se masque en descendant et réapparaît en remontant
- **Défilement fluide** vers les sections
- **Apparition progressive des sections** grâce à `IntersectionObserver`
- **Carrousel 3D des shorts** : boutons précédent/suivant, indicateurs, lecture automatique, navigation avec les flèches du clavier
- **FAQ en accordéon**
- **Curseur personnalisé**
- **Site adaptatif** (responsive) grâce aux classes Tailwind et à des media queries

## 🛠️ Technologies utilisées

- **HTML5** : structure des pages
- **Tailwind CSS 2.2.19** (via CDN) : classes utilitaires
- **CSS3** : fichier `style.css` pour les animations, le parallax et le carrousel
- **JavaScript** : fichier `script.js` pour les interactions
- **Font Awesome 6** (via CDN) : icônes
- **Google Fonts** : police *Michroma*
- **Git / GitHub** : travail collaboratif

## 📁 Structure du projet

```
.
├── index.html          # page d'accueil
├── presentation.html   # page de présentation de la chaîne
├── style.css           # styles personnalisés
├── script.js           # interactions (menu, FAQ, parallax, carrousel...)
└── images/             # logo et images du site
```

## 🚀 Lancer le projet

1. Clone le repo :
   ```bash
   git clone https://github.com/alioudiarra/compete_ytb.git
   ```
2. Ouvre le dossier du projet.
3. Double-clique sur `index.html` pour l'ouvrir dans ton navigateur.

Aucune installation n'est nécessaire, mais une **connexion internet** est requise : Tailwind, Font Awesome, la police Michroma et les vidéos YouTube sont chargés depuis des CDN.

## 👥 L'équipe

- **Aliou** — étudiant, passionné de football et de développement web


## 📚 Ce que j'ai appris

- Travailler à plusieurs sur un même projet avec Git et GitHub
- Prendre en main Tailwind CSS et le combiner avec du CSS personnalisé
- Créer des animations (parallax, apparition au scroll) et un carrousel en JavaScript
- Structurer un site de plusieurs pages à partir d'un concept de chaîne YouTube
