<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash; // Pour hacher le mot de passe
use App\Models\User;

class RegisterController extends Controller
{
    public function index()
    {
        return view("register");
    }

    public function register (Request $request)
    {
        $credentials = $request->validate([
            'username' => ['required'],
            'password' => ['required'],
        ]);

        $user = User::create([
            'name' => $credentials['username'], // Utiliser 'name' ou 'username' selon votre migration
            'email' => $credentials['username'] . '@crampte.re', // Laravel a besoin d'un champ 'email' par défaut
            'password' => Hash::make($credentials['password']), // Hacher le mot de passe !
        ]);

        // Étape 3 : Réponse et Redirection
        // Vous pouvez connecter l'utilisateur immédiatement si vous le souhaitez,
        // puis le rediriger vers son tableau de bord.
        
        auth()->login($user); // Connexion automatique
        
        return redirect('/dashboard')->with('success', 'Inscription réussie !');

        return $credentials['username'];
    }
}
