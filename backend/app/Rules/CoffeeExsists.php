<?php

namespace App\Rules;

use App\Models\Coffee;
use Illuminate\Contracts\Validation\Rule;

class CoffeeExsists implements Rule
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
        return Coffee::find($value)!==null;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Coffee does not exsist.';
    }
}
