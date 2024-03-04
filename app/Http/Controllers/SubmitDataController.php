<?php

namespace App\Http\Controllers;

use App\Models\ExpenseIncome;
use Illuminate\Http\Request;

class SubmitDataController extends Controller
{
    public function submitIncomeExpense(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'type_id' => 'required|integer',
            'amount' => 'required|numeric',
            'time' => 'required|date',
            'description' => 'nullable|string',
            'category' => 'required|integer',
            'tag_id' => 'required|integer',
            'method_id' => 'required|integer',
        ]);

        // Process the validated data (save to the database, etc.)
        // You can use the $validatedData array to access the form data

        // Example: Save to the database
        $result = ExpenseIncome::create($validatedData);

        // Return a response (you can customize this based on your needs)
        return response()->json(['message' => 'Form submitted successfully', 'data' => $result]);
    }
}
