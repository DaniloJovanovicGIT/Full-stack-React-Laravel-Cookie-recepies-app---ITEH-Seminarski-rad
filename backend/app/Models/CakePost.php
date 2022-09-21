<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CakePost extends Model {
    use HasFactory;

    protected $guarded = [''];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function cake_post_comment() {
        return $this->hasMany(CakePostComment::class);
    }
    public function user_that_posted(){
        return $this->belongsTo(User::class);
    }
}
