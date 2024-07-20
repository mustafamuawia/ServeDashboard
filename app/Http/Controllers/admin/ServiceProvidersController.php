<?php

namespace App\Http\Controllers\Admin;

use App\Models\ServiceProvider;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ServiceProvidersController extends Controller
{
    public function index()
    {
        $serviceProviders = ServiceProvider::with('user')->get();
        return response()->json($serviceProviders);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,user_id',
            'service_type' => 'required|string|max:255',
            'availability' => 'required|boolean',
            'rating' => 'nullable|numeric|min:0|max:5',
        ]);

        $serviceProvider = ServiceProvider::create($validated);
        return response()->json($serviceProvider, 201);
    }

    public function show($id)
    {
        $serviceProvider = ServiceProvider::findOrFail($id);
        return response()->json($serviceProvider);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'service_type' => 'required|string|max:255',
            'availability' => 'required|boolean',
            'rating' => 'nullable|numeric|min:0|max:5',
        ]);

        $serviceProvider = ServiceProvider::findOrFail($id);
        $serviceProvider->update($validated);
        return response()->json($serviceProvider);
    }

    public function destroy($id)
    {
        $serviceProvider = ServiceProvider::findOrFail($id);
        $serviceProvider->delete();
        return response()->json(null, 204);
    }
}
