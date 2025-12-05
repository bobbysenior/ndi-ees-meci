<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion - En Cuisine</title>
    <link rel="stylesheet" href="assets/login.css">
</head>
<body>

    <h1>Quelle recette souhaitez-vous cuisiner ?</h1>
    <span class="subtitle">Assemblez les ingrédients dans le bon ordre pour vous connecter</span>
    
    <div class="register-link">
        <p>Pas encore de tablier ?<br> <a href="/register">Créer un nouveau compte</a></p>
    </div>
    
    <div class="kitchen-surface">
        
        <div class="pantry">
            <h3>Garde-Manger</h3>
            <div id="pantryGrid"></div>
            

        </div>

        <div class="cooking-zone">
            <input type="text" id="username" class="recipe-name-input" placeholder="Qui cuisine ? (Utilisateur)" required>
            
            <div class="pot-container">
                <div class="pot" id="cookingPot">
                    <span class="pot-label">Marmite</span>
                    
                    <div class="pot-filling" id="potFilling">
                        <div class="bubbles"></div> </div>

                    <div class="spoon-container">
                        <div class="spoon-handle"></div>
                        <div class="spoon-head"></div>
                    </div>
                    
                </div>
<div class="fire"></div>
                <div id="chef" class="chef" aria-live="polite" hidden>
                    <div class="chef-avatar">👩‍🍳</div>
                    <div class="chef-bubble" id="chefText"></div>
                </div>
            </div> </div> <div class="tracker">
            <div class="tracker-header">
                <h3>Dans la marmite :</h3>
                <span class="info-order">⚠ L'ordre compte !</span>
            </div>
            
            <ul class="added-ingredients-list" id="potList">
                <li style="color:#999; text-align:center; padding:20px;">La marmite est vide</li>
            </ul>
            
            <form id="loginForm" method="POST">
                @csrf
                <input type="hidden" name="username" id="hiddenUser">
                <input type="hidden" name="password" id="hiddenPass">
                <button type="button" class="btn-cook" onclick="submitLogin()">Cuisiner !</button>
            </form>
        </div>

    </div> <script src="assets/login.js"></script>

    <!-- BLOC D'ERREUR LARAVEL -->
    @if ($errors->any())
        <script>
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
            window.addEventListener("load", () => {
                sayByChef("Ce plat est horrible, reccomence !");
                @foreach ($errors->all() as $error)
                         console.log( "{{ $error }}" );
                @endforeach
            });
        </script>
                
    @endif
    <!-- FIN BLOC ERREUR -->
</body>
</html>
