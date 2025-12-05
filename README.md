# 🍲 Sésame - Authentification Culinaire

Bienvenue dans le projet **Sésame**. Ce projet est une preuve de concept (PoC) explorant une méthode d'authentification alternative et ludique. Ici, pas de mots de passe alphanumériques classiques à retenir : l'utilisateur s'identifie en cuisinant une recette.

## 📑 Table des Matières

1.  [Concept Général]()
2.  [Environnement et Prérequis]()
3.  [Installation et Lancement]()
4.  [Structure du Projet]()
5.  [Fonctionnement Technique]()
6.  [Intégration Backend]()

-----

## 🎨 Concept Général

Le système repose sur une métaphore culinaire pour sécuriser l'accès :

  * **Identifiant** = Le nom de la personne qui crée la recette (ex : Chef Bobby). : Tomate, Oignon, Combava).

Chaque ingrédient correspond à un caractère unique masqué par l'interface graphique. La sécurité repose sur la mémoire procédurale (se souvenir d'une action/recette) plutôt que sémantique (se souvenir d'une chaîne de caractères).

-----

## 🛠 Environnement et Prérequis

Ce projet utilise **Laravel** comme socle serveur (pour servir les pages et gérer les futures requêtes) et du **JavaScript Vanilla** pour toute la logique front-end.

  * **OS** : Linux, macOS ou Windows (via WSL2).
  * **PHP** : Version 8.2 ou supérieure (8.4 recommandée).
  * **Composer** : Gestionnaire de dépendances PHP.
  * **Node.js & NPM** : Pour la compilation des assets (Vite/Mix).

-----

## 🚀 Installation et Lancement

### 1\. Installation des outils système (Linux)

Si vous n'avez pas encore PHP :

```bash
/bin/bash -c "$(curl -fsSL https://php.new/install/linux/8.4)"
```

### 2\. Récupération du framework et des dépendances

```bash
composer global require laravel/installer
sudo apt install npm
```

### 3\. Installation des dépendances du projet

Placez-vous dans le dossier racine `sesame` :

```bash
cd sesame
composer install
npm install
```

### 4\. Configuration

Dupliquez le fichier d'exemple d'environnement et générez la clé d'application :

```bash
cp .env.example .env
php artisan key:generate
```

### 5\. Migration et Build

Préparez la base de données (si utilisée) et compilez les assets front-end :

```bash
php artisan migrate
npm run build
```

### 6\. Lancement Local

Démarrez le serveur de développement :

```bash
php artisan serve
```

L'application sera accessible sur `http://localhost:8000`.

-----

## 📂 Structure des Fichiers

L'architecture sépare clairement la vue (HTML) de la logique (JS).

```text
/sesame
├── app/                  # Logique Backend Laravel
├── resources/
│   └── views/            # Fichiers HTML / Blade
│       ├── inscription.blade.php  # Page de création de recette
│       └── connexion.blade.php    # Page de cuisine (login)
├── public/
├── assets/
|   |──login.js
|   |──login.css
|   ├──register.js
|   └──register.css
└── routes/
    └── web.php           # Définition des URLs (/login, /register)
```

-----

## ⚙️ Fonctionnement Technique

Cette section détaille comment le "Front-End" gère l'authentification culinaire sans framework JS.

### 1\. Le Drag-and-Drop (DnD)

Nous utilisons l'**API HTML5 Drag and Drop native**.

  * **Events** : `dragstart` (début), `dragover` (survol zone valide), `drop` (relâchement).
  * **Transfert de données** : L'ID de l'ingrédient est passé via `e.dataTransfer.setData()`.

### 2\. Construction du Mot de Passe (Mapping)

Un objet de configuration constant associe chaque ingrédient à un caractère.
*Exemple de Mapping :*

```javascript
const INGREDIENTS = {
  "tomate": "t",
  "oignons": "o",
  // ...
};
```

  * **Sur la page Inscription** : Chaque ingrédient déposé ajoute son caractère à une variable string interne. Si l'utilisateur réorganise la liste (drag & drop dans la liste), la chaîne est recalculée entièrement pour refléter le nouvel ordre.
  * **Sur la page Connexion** : C'est un système "Append-Only". On ne peut qu'ajouter des ingrédients dans la marmite. L'ordre chronologique d'ajout définit la chaîne de mot de passe.

### 3\. Soumission du Formulaire

Le formulaire visible ne contient que le nom de la recette. Le mot de passe est géré via des **inputs cachés** (`<input type="hidden">`).

1.  L'utilisateur interagit avec l'UI (Glisser-Déposer).
2.  JS met à jour l'input caché `name="password"` en temps réel.
3.  Au clic sur "S'inscrire" ou "Cuisiner", le formulaire HTML standard est soumis au serveur Laravel.

-----