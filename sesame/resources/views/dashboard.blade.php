<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Soupe magique | Connecté</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: JetBrains Mono, monospace, sans-serif;
        }

        body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: radial-gradient(circle at top center, #A6813C, #260101);
            color: #f9fafb;
        }
        
        .card {
            background: #260101;
            border-radius: 18px;
            padding: 24px 28px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
            border: 1px solid rgba(148, 163, 184, 0.35);
            backdrop-filter: blur(18px);
            text-align: center;
        }

        .status-pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 12px;
            border-radius: 999px;
            background: #592B02;
            font-size: 13px;
            margin-bottom: 16px;
        }

        .status-dot {
            width: 8px;
            height: 8px; /* <-- corrigé (heigh -> height) */
            border-radius: 50%;
            background: #115923;
            box-shadow: 0 0 10px #595958;
        }

        h1 {
            font-size: 22px;
            margin-bottom: 8px;
        }

        .username {
            font-weight: 600;
            color: #e5e7eb;
        }

        .subtitle {
            font-size: 14px;
            color: #9ca3af;
            margin-bottom: 18px;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="status-pill">
            <div class="status-dot"></div>
            <span>Connecté</span>
        </div>

        <h1>Vous êtes connecté</h1>

        <p class="subtitle">
            Bonjour <span class="username" id="username">Utilisateur 👋</span>
        </p>
    </div>
</body>
</html>