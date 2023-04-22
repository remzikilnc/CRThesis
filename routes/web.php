<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'secure', 'middleware' => 'web'], function () {

    //BOOTSTRAP
    Route::get('bootstrap-data', 'Common\Core\Controllers\BootstrapController@getBootstrapData');

    // LOGIN
    Route::post('auth/register', [\App\Http\Controllers\Auth\RegisterController::class,'register']);
    Route::post('auth/login', [\App\Http\Controllers\Auth\LoginController::class,'login']);
    Route::post('auth/logout', [\App\Http\Controllers\Auth\LoginController::class,'logout']);

    // FORGOT/RESET PASSWORD
    Route::post('auth/password/email', 'Common\Auth\Controllers\SendPasswordResetEmailController@sendResetLinkEmail');
    Route::post('auth/password/reset', 'Common\Auth\Controllers\ResetPasswordController@reset');



});

// no need for "secure" prefix here, but need "web" middleware
Route::group(['middleware' => 'web'], function() {
    // Laravel Auth routes with names so route('login') and similar calls don't error out
    Route::get('login', [\App\Http\Controllers\HomeController::class,'show'])->name('login');
    Route::get('register', [\App\Http\Controllers\HomeController::class,'show'])->name('register');
});

Route::get('test', [\App\Http\Controllers\TestController::class,'testPost']);
Route::get('{all}', [\App\Http\Controllers\HomeController::class,'show'])->where('all', '.*');
