<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $guarded = [''];

    public function coffee_post(){
        return $this->hasMany(CoffeePost::class);
    }
    public function user_that_posted(){
        return $this->belongsTo(User::class);
    }
}
