<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CoffeeController;
use App\Http\Controllers\CoffeePostCommentController;
use App\Http\Controllers\CoffeePostController;
use App\Http\Controllers\CoffeePostStatisticsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserRoleController;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::resource('category', CategoryController::class)->only(['index', 'show']);
Route::resource('coffee', CoffeeController::class)->only(['index', 'show']);
Route::resource('coffee-post', CoffeePostController::class)->only(['index', 'show']);
Route::resource('coffee-post-comment', CoffeePostCommentController::class)->only(['index', 'show']);
Route::get('coffee-post-newest', [CoffeePostController::class, 'show_newest']);

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::get('/profile', function (Request $request) {
        return auth()->user();
    });

    Route::post('register-bez-tokena', [AuthController::class, 'registerBezTokena']);

    Route::get('/get-admin-statistics', [CoffeePostStatisticsController::class, 'getStatisticsForAdminPage']);
    Route::get('/get-report', [CoffeePostStatisticsController::class, 'getAdminReport']);


    Route::resource('user', UserController::class)->only(['index', 'show', 'update', 'destroy']);

    Route::resource('coffee', CoffeeController::class)->only(['store', 'update', 'destroy']);
    Route::resource('coffee-post', CoffeePostController::class)->only(['store', 'update', 'destroy']);
    Route::resource('coffee-post-comment', CoffeePostCommentController::class)->only(['store', 'destroy']);

    Route::resource('category', CategoryController::class)->only(['store', 'destroy']);

    Route::resource('user-role', UserRoleController::class)->only(['index', 'show', 'store', 'destroy']);

    Route::post('logout', [AuthController::class, 'logout']);

});
