<?php

namespace App\Http\Controllers;

use App\Models\ExpenseIncome;
use Illuminate\Http\Request;

class DeleteUpdateController extends Controller
{
    public function update( Request $request, $id ) {
        try {
            $balance = ExpenseIncome::findOrFail($id);
            $balance->update($request->all());

            return response()->json(["message" => "Updated Successfully"]);
        } catch (\Exception $e) {
            return response()->json(["error"=>"failed to update"],500);
        }
    }
}
