// --- Configuration ---
// Ajout de la propriété 'category' pour la validation
const INGREDIENTS = [
    // --- VIANDES ---
    { id: "zourite", char: "z", name: "Zourite", icon: "🐙", category: "Viandes" },
    { id: "tangue", char: "u", name: "Tangue", icon: "🦔", category: "Viandes" },
    { id: "saucisse", char: "a", name: "Saucisse", icon: "🌭", category: "Viandes" },
    { id: "poulet", char: "p", name: "Poulet", icon: "🍗", category: "Viandes" },
    { id: "canard", char: "n", name: "Canard", icon: "🦆", category: "Viandes" },
    { id: "porc", char: "r", name: "Porc", icon: "🥩", category: "Viandes" },
    { id: "sarcive", char: "v", name: "Sarcive", icon: "🍖", category: "Viandes" },
    { id: "coq", char: "q", name: "Coq", icon: "🐓", category: "Viandes" },
    { id: "boucané", char: "b", name: "Boucané", icon: "🔥", category: "Viandes" },
    { id: "zambrocal", char: "m", name: "Zambrocal", icon: "🍚", category: "Viandes" },

    // --- ÉPICES ---
    { id: "oignons", char: "o", name: "Oignons", icon: "🧅", category: "Épices" },
    { id: "gingembre", char: "g", name: "Gingembre", icon: "🫚", category: "Épices" },
    { id: "poivre", char: "!", name: "Poivre", icon: "🌶️", category: "Épices" },
    { id: "thym", char: "y", name: "Thym", icon: "🌿", category: "Épices" },
    { id: "combava", char: "c", name: "Combava", icon: "🍋", category: "Épices" },
    { id: "sel", char: "s", name: "Sel", icon: "🧂", category: "Épices" },
    { id: "piment", char: "i", name: "Piment", icon: "🧨", category: "Épices" },
    { id: "dakatine", char: "d", name: "Dakatine", icon: "🥜", category: "Épices" },
    { id: "4epices", char: "4", name: "4 Épices", icon: "🫙", category: "Épices" },
    { id: "safran", char: "?", name: "Safran péi", icon: "🌼", category: "Épices" },
    { id: "ail", char: "%", name: "Ail", icon: "🧄", category: "Épices" },
    { id: "huile", char: "h", name: "Huile", icon: "🛢️", category: "Épices" },

    // --- LÉGUMES & FRUITS ---
    { id: "tomate", char: "t", name: "Tomate", icon: "🍅", category: "Légumes / Fruits" },
    { id: "jujube", char: "j", name: "Jujube", icon: "🍒", category: "Légumes / Fruits" },
    { id: "zevie", char: "v", name: "Zévi", icon: "🍏", category: "Légumes / Fruits" },
    { id: "litchi", char: "l", name: "Litchi", icon: "🍇", category: "Légumes / Fruits" },
    { id: "pitaya", char: "h", name: "Pitaya", icon: "🐲", category: "Légumes / Fruits" },
    { id: "kaloupile", char: "k", name: "Kaloupilé", icon: "🍃", category: "Légumes / Fruits" },
    { id: "bringelle", char: "&", name: "Bringelle", icon: "🍆", category: "Légumes / Fruits" },
    { id: "chouchou", char: ")", name: "Chouchou", icon: "🥒", category: "Légumes / Fruits" },
    { id: "babafigue", char: "(", name: "Baba-figue", icon: "🎋", category: "Légumes / Fruits" },
    { id: "tamarin", char: ".", name: "Tamarin", icon: "🌰", category: "Légumes / Fruits" },
    { id: "jacques", char: ":", name: "Jacques", icon: "🍈", category: "Légumes / Fruits" }
];

// On stocke les objets entiers ici pour pouvoir les manipuler
let basket = []; 

const pantryGrid = document.getElementById('pantryGrid');
const pot = document.getElementById('cookingPot');
const potList = document.getElementById('potList');
const spoon = document.querySelector('.spoon-container'); // Nouvelle cuillère
const filling = document.getElementById('potFilling'); // Récupération de l'élément
const MAX_VISUAL_CAPACITY = 10; // À 10 ingrédients, la marmite semble pleine à ras bord

// --- Initialisation ---

// 1. Définir l'ordre des catégories qu'on veut afficher
const categoriesOrder = ["Viandes", "Légumes / Fruits", "Épices"];

categoriesOrder.forEach(categoryName => {
    
    // Filtre les ingrédients pour cette catégorie
    const catIngredients = INGREDIENTS.filter(i => i.category === categoryName);

    if (catIngredients.length > 0) {
        // Créer le titre de la catégorie
        const title = document.createElement('h4');
        title.className = 'pantry-category-title';
        title.textContent = categoryName;
        pantryGrid.appendChild(title);

        // Créer la grille spécifique à cette catégorie
        const gridDiv = document.createElement('div');
        gridDiv.className = 'ingredients-grid';

        // Ajoute les ingrédients dans cette sous-grille
        catIngredients.forEach(ing => {
            const div = document.createElement('div');
            div.className = 'ingredient';
            div.draggable = true;
            div.dataset.id = ing.id;
            div.innerHTML = `<span>${ing.icon}</span><p>${ing.name}</p>`;
            
            div.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('id', ing.id);
                e.dataTransfer.effectAllowed = 'copy';
            });

            gridDiv.appendChild(div);
        });

        // Ajouter la grille au conteneur principal
        pantryGrid.appendChild(gridDiv);
    }
});

// --- Drag & Drop ---

pot.addEventListener('dragover', (e) => {
    e.preventDefault();
    pot.classList.add('drag-over');
});

pot.addEventListener('dragleave', () => {
    pot.classList.remove('drag-over');
});

pot.addEventListener('drop', (e) => {
    e.preventDefault();
    pot.classList.remove('drag-over');
    
    const id = e.dataTransfer.getData('id');
    const ingredient = INGREDIENTS.find(i => i.id === id);

    if (ingredient) {
        addToPot(ingredient);
        
        // Animation "Splash"
        pot.classList.add('dropping');
        
        // Création de petites particules (éclaboussures)
        createSplashEffect();

        setTimeout(() => pot.classList.remove('dropping'), 400);
    }
});

function createSplashEffect() {
    // Petit effet visuel optionnel
    const splash = document.createElement('div');
    splash.className = 'splash-bubble';
    pot.appendChild(splash);
    setTimeout(() => splash.remove(), 600);
}

// Fonction pour gérer la hauteur du liquide
function updatePotVisuals() {
    const count = basket.length;
    
    // Calcul du pourcentage (max 100%)
    // Si on a 0 ingrédient -> 0%
    // Si on a 5 ingrédients -> 50%
    // Si on a 12 ingrédients -> bloque à 95% (pour pas déborder)
    let percentage = (count / MAX_VISUAL_CAPACITY) * 100;
    
    if (percentage > 95) percentage = 95; // Plafond pour ne pas cacher les poignées
    
    filling.style.height = `${percentage}%`;
    
    // Petite animation bonus : la marmite "s'écrase" un peu sous le poids quand on ajoute
    if(count > 0) {
        pot.classList.add('dropping');
        setTimeout(() => pot.classList.remove('dropping'), 200);
    }
}

// --- Logique Ajout & Suppression ---

function addToPot(ing) {
    basket.push(ing);
    renderList();
    updatePotVisuals(); // <--- Appel de la mise à jour visuelle
}

function removeFromPot(realIndex) {
    basket.splice(realIndex, 1);
    renderList();
    updatePotVisuals(); // <--- Appel de la mise à jour visuelle
}

function renderList() {
    potList.innerHTML = '';

    if (basket.length === 0) {
        potList.innerHTML = '<li style="color:#999; text-align:center; padding:20px;">La marmite est vide</li>';
        return;
    }

    // 1. Définition de l'ordre d'affichage des catégories et leurs titres
    const categoriesDisplay = [
        { key: 'Viandes', label: '-------- Viandes & Poissons --------' },
        { key: 'Légumes / Fruits', label: '-------- Fruits & Légumes --------' },
        { key: 'Épices',  label: '-------- Assaisonnements --------' }
    ];

    // 2. On parcourt chaque catégorie pour l'affichage
    categoriesDisplay.forEach(cat => {
        // On cherche tous les ingrédients de cette catégorie dans le panier
        // IMPORTANT : On map d'abord pour garder l'index original (le "step number")
        const itemsInCategory = basket
            .map((ing, index) => ({ ...ing, originalIndex: index })) // On attache l'index réel (0, 1, 2...)
            .filter(item => item.category === cat.key); // On ne garde que ceux de la catégorie en cours

        // S'il y a des ingrédients dans cette catégorie, on affiche le titre et les items
        if (itemsInCategory.length > 0) {
            
            // A. Création du séparateur
            const separator = document.createElement('li');
            separator.className = 'category-separator';
            separator.textContent = cat.label;
            potList.appendChild(separator);

            // B. Création des items de cette catégorie
            itemsInCategory.forEach(item => {
                const li = document.createElement('li');
                li.className = 'added-item';
                
                // Note : item.originalIndex + 1 permet d'afficher 1, 2, 3... au lieu de 0, 1, 2...
                li.innerHTML = `
                    <div class="step-infos">
                        <span>${item.icon}</span>
                        <strong>${item.name}</strong>
                    </div>
                    <button class="btn-remove" onclick="removeFromPot(${item.originalIndex})" title="Retirer l'ingrédient n°${item.originalIndex + 1}">✖</button>
                `;
                potList.appendChild(li);
            });
        }
    });

    // Scroll automatique vers le bas pour voir les derniers ajouts
    potList.scrollTop = potList.scrollHeight;
}

// --- Validation ---

function validateRecipe() {
    const errors = [];
    
    // Règle 1: Longueur min
    if (basket.length < 6) {
        errors.push(`Il faut au moins 6 ingrédients (Actuel : ${basket.length})`);
    }

    // Règle 2: Catégories
    const hasViande = basket.some(i => i.category === 'Viandes');
    const hasLegume = basket.some(i => i.category === 'Légumes / Fruits');
    const hasEpice = basket.some(i => i.category === 'Épices');

    if (!hasViande) errors.push("Il manque une viande ou un poisson !");
    if (!hasLegume) errors.push("Il manque des légumes ou fruits !");
    if (!hasEpice) errors.push("C'est fade ! Ajoutez des épices.");

    return errors;
}

// --- Soumission ---

window.submitLogin = function() {
    const user = document.getElementById('username').value;
    const errors = validateRecipe();

    if(!user) {
        sayByChef("Veuillez donner un nom à votre recette (Nom d'utilisateur).");
        return;
    }

    if (errors.length > 0) {
        sayByChef("Recette incomplète :\n- " + errors.join("\n- "));
        return;
    }

    // Calcul du mot de passe final
    const finalPassword = basket.map(i => i.char).join('');
    
    // --- Séquence d'Animation "Cuisson" ---
    const btn = document.querySelector('.btn-cook');
    btn.disabled = true;
    btn.textContent = "Préparation en cours...";
    
    // 1. Faire apparaitre la cuillère et touiller
    pot.classList.add('cooking-active');
    
    // 2. Simuler le temps de cuisson
    setTimeout(() => {
        // Fin de l'animation
        
        document.getElementById('hiddenUser').value = user;
        document.getElementById('hiddenPass').value = finalPassword;
        document.getElementById('loginForm').submit();

    }, 3000); // 3 secondes d'animation

function sayByChef(message, timeout = 3500) {
  const chef = document.getElementById('chef');
  const text = document.getElementById('chefText');
  text.textContent = message;
  chef.hidden = false;
  chef.classList.add('show');

  clearTimeout(window.__chefTimer);
  window.__chefTimer = setTimeout(() => {
    chef.hidden = true;
    chef.classList.remove('show');
  }, timeout);
}


};