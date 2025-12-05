<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription - L'Atelier Culinaire</title>
    <link rel="stylesheet" href="assets/register.css">
</head>
<body>

<div class="container">
    <aside class="sidebar">
        <h2>Ingrédients du Marché</h2>
        <p style="font-size: 0.9rem; color: #666;">Glissez les ingrédients sur la feuille.<br> 
	<em>Ajoutez au minimum 6 ingrédients a votre recette.</em></p>
        <div id="categories">
        </div>
        <div class="register-link">
            <p>Déjà un tablier ?<br> <a href="/login">Connectez-vous !</a></p>
        </div>
    </aside>

    <main class="main-area">
        <form id="signupForm" class="paper-sheet" onsubmit="handleSubmit(event)" action="/register" method="POST">
            @csrf
            <div class="paper-header">
                <label for="recipeName" class="sr-only"><strong>Nom du chef</strong></label>
                <input type="text" id="recipeName" class="input-title" placeholder="Nom du chef" required>
            </div>
            
            <ul class="recipe-list" id="recipeList">
                </ul>

            <input type="hidden" name="username" id="hiddenUsername">
            <input type="hidden" name="password" id="hiddenPassword">
        </form>

        <div class="actions">
            <button type="button" class="btn-submit" onclick="submitForm()">Publier ma recette</button>
        </div>
    </main>
</div>

<script src="assets/register.js"></script>

</body>
</html>
