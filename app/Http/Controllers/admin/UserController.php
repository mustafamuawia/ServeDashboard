<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'user_type' => 'required|in:Customer,Service Provider,Admin',
        ]);

        $user = User::create($validatedData);
        return response()->json($user, 201);
    }

    public function show($user_id)
    {
        $user = User::findOrFail($user_id);
        return response()->json($user, 200);
    }

    public function update(Request $request, $user_id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user_id . ',user_id',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'user_type' => 'required|in:Customer,Service Provider,Admin',
        ]);

        $user = User::findOrFail($user_id);
        $user->update($validatedData);
        return response()->json($user, 200);
    }

    public function destroy($user_id)
    {
        try {
            $user = User::findOrFail($user_id);
            $user->delete();
            return response()->json(['message' => 'User deleted successfully'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'User not found'], 404);
        }
    }
}
