<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\ExpenseIncome;
use App\Models\Methods;
use App\Models\Tags;
use App\Models\Types;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function balance() {
        $data = ExpenseIncome::with(["tag","tag.category", "type", "method"])->get();

        return response()->json($data);
    }
    public function categories() {
        $categories = Category::all();

        return response()->json($categories);
    }

    public function tags(Request $request) {
        // Retrieve the category_id from the request
        $category_id = $request->query('category_id');

        // Use $category_id to filter tags
        $tags = ($category_id)
        ? Tags::where('category_id', $category_id)->get()
        : Tags::all();

        // Return the filtered tags as JSON
        return response()->json($tags);
    }

    public function types(){
        $types = Types::all();
        return response()->json($types);
    }
    public function methods() {
        $methods = Methods::all();
        return response()->json($methods);
    }
}

