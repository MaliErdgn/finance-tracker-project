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

    public function delete($id)
    {
        try {
            // Find the record by ID
            $data = ExpenseIncome::findOrFail($id);

            // Delete the record
            $data->delete();

            return response()->json(['message' => 'Data deleted successfully'], 200);
        } catch (\Exception $e) {
            // Handle the exception, you might want to return a proper error response
            return response()->json(['error' => 'Error deleting data'], 500);
        }
    }

}
