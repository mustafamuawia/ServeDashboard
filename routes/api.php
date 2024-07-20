<?php

use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\ServiceProvidersController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::post('/', [UserController::class, 'store']);
    Route::get('/{user_id}', [UserController::class, 'show']);
    Route::put('/{user_id}', [UserController::class, 'update']);
    Route::delete('/{user_id}', [UserController::class, 'destroy']);
});


Route::prefix('services')->group(function () {
    Route::get('/', [ServiceController::class, 'index']);
    Route::post('/', [ServiceController::class, 'store']);
    Route::get('/{id}', [ServiceController::class, 'show']);
    Route::put('/{id}', [ServiceController::class, 'update']);
    Route::delete('/{id}', [ServiceController::class, 'destroy']);
});

Route::prefix('service-providers')->group(function () {
    Route::get('/', [ServiceProvidersController::class, 'index']);
    Route::post('/', [ServiceProvidersController::class, 'store']);
    Route::get('/{id}', [ServiceProvidersController::class, 'show']);
    Route::put('/{id}', [ServiceProvidersController::class, 'update']);
    Route::delete('/{id}', [ServiceProvidersController::class, 'destroy']);
});

