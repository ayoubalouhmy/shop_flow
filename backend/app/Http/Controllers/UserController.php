<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $users = User::withCount('orders')
                ->when($request->search, fn($q) => $q
                    ->where('name', 'like', "%{$request->search}%")
                    ->orWhere('email', 'like', "%{$request->search}%"))
                ->when($request->role, fn($q) => $q->where('role', $request->role))
                ->latest()
                ->paginate($request->get('per_page', 20));

            return response()->json(['success' => true, 'data' => $users]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show(User $user): JsonResponse
    {
        try {
            $user->load(['orders' => fn($q) => $q->with('items.product')->latest()->limit(5)])
                 ->loadCount('orders');

            return response()->json(['success' => true, 'data' => $user]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name'     => 'required|string|max:255',
                'email'    => 'required|email|unique:users,email',
                'password' => ['required', Password::min(8)->letters()->numbers()],
                'role'     => 'sometimes|in:client,admin',
                'avatar'   => 'nullable|image|max:2048',
            ]);

            $validated['password'] = Hash::make($validated['password']);

            if ($request->hasFile('avatar')) {
                $validated['avatar'] = $request->file('avatar')->store('avatars', 'public');
            }

            $user = User::create($validated);

            return response()->json(['success' => true, 'message' => 'Utilisateur créé.', 'data' => $user], 201);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, User $user): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name'   => 'sometimes|string|max:255',
                'email'  => "sometimes|email|unique:users,email,{$user->id}",
                'role'   => 'sometimes|in:client,admin',
                'avatar' => 'nullable|image|max:2048',
            ]);

            if ($request->hasFile('avatar')) {
                $validated['avatar'] = $request->file('avatar')->store('avatars', 'public');
            }

            $user->update($validated);

            return response()->json(['success' => true, 'message' => 'Utilisateur mis à jour.', 'data' => $user->fresh()]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy(User $user): JsonResponse
    {
        try {
            if ($user->role === 'admin') {
                return response()->json(['success' => false, 'message' => 'Impossible de supprimer un administrateur.'], 422);
            }

            $user->delete();

            return response()->json(['success' => true, 'message' => 'Utilisateur supprimé.']);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function changeRole(Request $request, User $user): JsonResponse
    {
        try {
            $request->validate(['role' => 'required|in:client,admin']);
            $user->update(['role' => $request->role]);

            return response()->json(['success' => true, 'message' => 'Rôle mis à jour.', 'data' => $user->fresh()]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
