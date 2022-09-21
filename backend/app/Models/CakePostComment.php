<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CakePostComment extends Model
{
    use HasFactory;

    protected $guarded = [''];

    public function cake_post(){
        return $this->belongsTo(CakePost::class);
    }

    public function user_that_posted(){
        return $this->belongsTo(User::class);
    }
}
