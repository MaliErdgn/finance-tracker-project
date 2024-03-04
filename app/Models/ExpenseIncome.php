<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpenseIncome extends Model
{
    use HasFactory;
    protected $table = "expense_income";
    public function tag()
    {
        return $this->belongsTo(Tags::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function method()
    {
        return $this->belongsTo(Methods::class);
    }
    public function type()
    {
        return $this->belongsTo(Types::class);
    }
    protected $fillable = [
        'amount',
        'time',
        'description',
        'type_id',
        'tag_id',
        'method_id',
    ];
}
