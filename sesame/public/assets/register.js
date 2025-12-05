// --- 1. CONFIGURATION ---
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

const grid = document.getElementById('ingredientsGrid');
const recipeList = document.getElementById('recipeList');

// --- 2. INITIALISATION ---

let categories_dom = document.getElementById("categories");


function createIngredientGrid(category){
    const div = document.createElement('div');
    const pCategory = document.createElement("p");
    pCategory.innerHTML = `<strong>${category}</strong>`;
    const ingredientGrid = document.createElement("div");
    ingredientGrid.className = "ingredients-grid";
    ingredientGrid.id = category;


    div.appendChild(pCategory);
    div.appendChild(ingredientGrid);


    categories_dom.appendChild(div);

    return ingredientGrid;
}


let grids = {};


INGREDIENTS.forEach(ing => {
    let category = ing["category"];


    if (grids[category] === undefined){
        grids[category] = createIngredientGrid(category);
    }


    const div = document.createElement('div');
    div.className = 'ingredient';
    div.draggable = true;
    div.setAttribute('data-id', ing.id);
    div.setAttribute('data-char', ing.char);
    div.innerHTML = `<span>${ing.icon}</span><p>${ing.name}</p>`;

    // Event Listeners pour le Grid Item
    div.addEventListener('dragstart', handleGridDragStart);

    grids[category].appendChild(div);
	});

// --- 3. DRAG & DROP LOGIC ---

// A. Drag depuis la grille (Nouvel ingrédient)
function handleGridDragStart(e) {
    e.dataTransfer.setData('source', 'grid');
    e.dataTransfer.setData('id', this.dataset.id);
    e.dataTransfer.effectAllowed = 'copy';
}

// B. Drag depuis la liste (Réorganisation)
function handleListDragStart(e) {
    e.dataTransfer.setData('source', 'list');
    e.dataTransfer.setData('index', Array.from(recipeList.children).indexOf(this));
    e.dataTransfer.effectAllowed = 'move';
    this.classList.add('dragging');
}

function handleListDragEnd(e) {
    this.classList.remove('dragging');
    updatePasswordString();
}

// C. Drop Zone (La feuille)
recipeList.addEventListener('dragover', (e) => {
    e.preventDefault(); // Nécessaire pour autoriser le drop
    const afterElement = getDragAfterElement(recipeList, e.clientY);
    const dragging = document.querySelector('.dragging');
    
    // Si on réordonne (élément déjà dans la liste)
    if (dragging) {
        if (afterElement == null) {
            recipeList.appendChild(dragging);
        } else {
            recipeList.insertBefore(dragging, afterElement);
        }
    }
});

recipeList.addEventListener('drop', (e) => {
    e.preventDefault();
    const source = e.dataTransfer.getData('source');

    // Si ça vient de la grille, on crée un nouvel élément
    if (source === 'grid') {
        const id = e.dataTransfer.getData('id');
        const ingredientData = INGREDIENTS.find(i => i.id === id);
        
        if(ingredientData) {
            addIngredientToList(ingredientData);
        }
    }
});

// Helper pour trouver la position de l'insertion lors du réordonnancement
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.recipe-item:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2; // Distance par rapport au centre de l'enfant
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// --- 4. GESTION DE LA LISTE ---

function addIngredientToList(ing) {
    const li = document.createElement('li');
    li.className = 'recipe-item';
    li.draggable = true;
    li.setAttribute('data-char', ing.char);
    li.innerHTML = `
        <span>${ing.icon}</span>
        <strong>${ing.name}</strong>
        <button type="button" class="btn-remove" onclick="removeIngredient(this)">×</button>
    `;

    // Events pour le réordonnancement
    li.addEventListener('dragstart', handleListDragStart);
    li.addEventListener('dragend', handleListDragEnd);

    recipeList.appendChild(li);
    updatePasswordString();
}

window.removeIngredient = function(btn) {
    btn.closest('.recipe-item').remove();
    updatePasswordString();
};

// --- 5. LOGIQUE MOT DE PASSE ---

function updatePasswordString() {
    const items = document.querySelectorAll('.recipe-item');
    let password = "";
    items.forEach(item => {
        password += item.getAttribute('data-char');
    });
    
    document.getElementById('hiddenPassword').value = password;
    console.log("Password actuel:", password); // Pour debug
}

// --- Validation ---

function validateRecipe() {
    const errors = [];
    
    // Règle 1: Longueur min
    if (basket.length < 6) {
        errors.push(`Il faut au moins 6 ingrédients (Actuel : ${basket.length})`);
    }

    // Règle 2: Catégories
    const hasViande = basket.some(i => i.category === 'viande');
    const hasLegume = basket.some(i => i.category === 'legume');
    const hasEpice = basket.some(i => i.category === 'epice');

    if (!hasViande) errors.push("Il manque une viande ou un poisson !");
    if (!hasLegume) errors.push("Il manque des légumes ou fruits !");
    if (!hasEpice) errors.push("C'est fade ! Ajoutez des épices.");

    return errors;
}

// --- 6. SOUMISSION ---

window.submitForm = function() {
    const username = document.getElementById('recipeName').value;
    const password = document.getElementById('hiddenPassword').value;

    if (!username) {
        alert("Merci de donner un nom à votre recette !");
        return;
    }
    if (password.length === 0) {
        alert("Votre recette est vide ! Ajoutez des ingrédients.");
        return;
    }

    document.getElementById('hiddenUsername').value = username;

    // Envoi
    document.getElementById('signupForm').submit();
};
