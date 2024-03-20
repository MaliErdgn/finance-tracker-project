<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ["category_name" => "Personal", "created_at" => now(),"updated_at"=> now()],
            ["category_name" => "Transportation", "created_at" => now(),"updated_at"=> now()],
            ["category_name" => "Food/Beverages", "created_at" => now(),"updated_at"=> now()],
            ["category_name" => "Utilities", "created_at" => now(),"updated_at"=> now()],
            ["category_name" => "Health", "created_at" => now(),"updated_at"=> now()],
            ["category_name" => "Insurance", "created_at" => now(),"updated_at"=> now()],
            ["category_name" => "House Needs", "created_at" => now(),"updated_at"=> now()],
            ["category_name" => "Investment", "created_at" => now(),"updated_at"=> now()],
            ["category_name" => "Misc", "created_at" => now(),"updated_at"=> now()]
        ];
        DB::table("categories")->insert($data);
    }
}
