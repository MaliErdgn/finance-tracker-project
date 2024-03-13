<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tags extends Model
{
    use HasFactory;
    public function getTagsByCategory($category_id) {
        $tags = Tags::where('category_id', $category_id)->get();

        return $tags;
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    protected $fillable = [
        "tag_name",
        'category_id'
    ];
}
