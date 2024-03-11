<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\DeleteUpdateController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubmitDataController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::group(['prefix'=> '/api'], function () {
    Route::get('/balance', [ApiController::class,'balance']);
    Route::get('/categories',[ApiController::class, "categories"]);
    Route::get('/tags',[ApiController::class, "tags"]);
    Route::get('/types',[ApiController::class, "types"]);
    Route::get('/methods',[ApiController::class, "methods"]);
    Route::post("/submit-income-expense", [SubmitDataController::class, "submitIncomeExpense"]);
    Route::put("/update-data/{id}",[DeleteUpdateController::class, "update"]);
    Route::delete("/delete-data/{id}", [DeleteUpdateController::class, "delete"]);
});

Route::get("/dashboard", function ()
{
    return Inertia::render("Dashboard", []);
})->name("dashboard");

Route::get("/data-submit", function()
{
    return Inertia::render("DataSubmit", []);
})->name("data-submit");

Route::get("/insights", function() {
    return Inertia::render("Insights", []);
})->name("insights");





Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
