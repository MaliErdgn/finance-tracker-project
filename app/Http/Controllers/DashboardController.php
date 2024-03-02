<?php

namespace App\Http\Controllers;

use App\Models\ExpenseIncome;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function dashboard() {
        $data = ExpenseIncome::with(["tag","tag.category"])->get();

        return view("dashboard", compact('data'));
    }
}

