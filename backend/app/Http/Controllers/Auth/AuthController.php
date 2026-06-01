<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    // ── POST /api/auth/register ───────────────────────────────────────────────

    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $user  = User::create([
                'name'         => $request->name,
                'email'        => $request->email,
                'password'     => Hash::make($request->password),
                'role'         => 'client',
                'member_since' => now(),
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Inscription réussie.',
                'data'    => ['user' => $user, 'token' => $token],
            ], 201);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // ── POST /api/auth/login ──────────────────────────────────────────────────

    public function login(LoginRequest $request): JsonResponse
    {
        try {
            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json(['success' => false, 'message' => 'Identifiants incorrects.'], 401);
            }

            $user  = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Connexion réussie.',
                'data'    => ['user' => $user, 'token' => $token],
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // ── POST /api/auth/logout ─────────────────────────────────────────────────

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['success' => true, 'message' => 'Déconnexion réussie.']);
    }

    // ── GET /api/auth/profile ─────────────────────────────────────────────────

    public function profile(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data'    => $request->user()->loadCount('orders'),
        ]);
    }

    // ── PUT /api/auth/profile ─────────────────────────────────────────────────

    public function updateProfile(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name'     => 'sometimes|string|max:255',
                'phone'    => 'sometimes|nullable|string|max:20',
                'birthday' => 'sometimes|nullable|date',
                'avatar'   => 'sometimes|nullable|image|max:2048',
                'password' => ['sometimes', 'confirmed', Password::min(8)],
            ]);

            $user = $request->user();

            if ($request->hasFile('avatar')) {
                $validated['avatar'] = $request->file('avatar')->store('avatars', 'public');
            }

            if (isset($validated['password'])) {
                $validated['password'] = Hash::make($validated['password']);
            }

            $user->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Profil mis à jour.',
                'data'    => $user->fresh(),
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
