<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sésame - Accueil</title>
    <style>
        :root {
            /* Palette cohérente avec les pages précédentes */
            --bg-color: #f4f1ea;
            --text-color: #2c3e50;
            --orange-accent: #d35400; /* Rappel page inscription */
            --green-accent: #27ae60;  /* Rappel page connexion */
            --shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            margin: 0;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            /* Texture subtile de fond (optionnelle) */
            background-image: radial-gradient(#e0e0e0 1px, transparent 1px);
            background-size: 30px 30px;
        }

        .hero-container {
            text-align: center;
            padding: 2rem;
            max-width: 600px;
            opacity: 0; /* Pour l'animation JS */
            transform: translateY(20px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .hero-container.visible {
            opacity: 1;
            transform: translateY(0);
        }

        h1 {
            font-size: 4rem;
            margin: 0 0 1rem 0;
            font-weight: 800;
            color: var(--text-color);
            letter-spacing: -2px;
        }
        
        .emoji-logo {
            font-size: 5rem;
            display: block;
            margin-bottom: 10px;
            animation: float 3s ease-in-out infinite;
        }

        p.subtitle {
            font-size: 1.5rem;
            color: #7f8c8d;
            margin-bottom: 3rem;
            font-weight: 300;
            line-height: 1.4;
        }

        .cta-group {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .btn {
            text-decoration: none;
            padding: 15px 40px;
            font-size: 1.1rem;
            border-radius: 50px;
            font-weight: 600;
            transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .btn:active {
            transform: translateY(-1px);
        }

        /* Bouton Inscription (Style Feuille/Orange) */
        .btn-register {
            background-color: var(--orange-accent);
            color: white;
            border: 2px solid var(--orange-accent);
        }
        .btn-register:hover {
            background-color: #ba4a00;
            border-color: #ba4a00;
        }

        /* Bouton Connexion (Style Marmite/Vert) */
        .btn-login {
            background-color: white;
            color: var(--green-accent);
            border: 2px solid var(--green-accent);
        }
        .btn-login:hover {
            background-color: var(--green-accent);
            color: white;
        }

        /* Animation flottante pour le logo */
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }

        footer {
            position: absolute;
            bottom: 20px;
            font-size: 0.8rem;
            color: #95a5a6;
        }
    </style>
</head>
<body>

    <div class="hero-container" id="hero">
        <span class="emoji-logo">🍲</span>
        <h1>Sésame</h1>
        <p class="subtitle">
            Oubliez vos mots de passe.<br>
            Cuisinez vos souvenirs.
        </p>

        <div class="cta-group">
            <a href="/register" class="btn btn-register">
                📝 Créer une recette (Inscription)
            </a>

            <a href="/login" class="btn btn-login">
                👨‍🍳 Passer en cuisine (Connexion)
            </a>
        </div>
    </div>

    <footer>
        &copy; 2024 Sésame Project - Authentification Culinaire
    </footer>

    <script>
        // Code JavaScript pour l'animation d'entrée
        document.addEventListener('DOMContentLoaded', () => {
            const hero = document.getElementById('hero');
            
            // Petit délai pour l'effet visuel
            setTimeout(() => {
                hero.classList.add('visible');
            }, 100);

            // Log de bienvenue dans la console
            console.log(
                "%c Bienvenue sur Sésame ! 🍲 ", 
                "background: #2c3e50; color: #fff; padding: 5px; border-radius: 5px; font-size: 14px;"
            );
        });
    </script>
</body>
</html>