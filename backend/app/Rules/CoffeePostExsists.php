<?php

namespace App\Rules;

use App\Models\CoffeePost;
use Illuminate\Contracts\Validation\Rule;

class CoffeePostExsists implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return CoffeePost::find($value)!==null;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Coffee post does not exsist.';
    }
}
