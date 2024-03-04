<?php

namespace App\Http\Controllers;

use App\Models\ExpenseIncome;
use Illuminate\Http\Request;

class BalanceApiController extends Controller
{
    public function balanceApi() {
        $data = ExpenseIncome::with(["tag","tag.category", "type", "method"])->get();

        return response()->json($data);
    }
}

