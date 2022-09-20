<?php

namespace App\Http\Controllers;

use App\Http\Resources\CoffeeCollection;
use App\Http\Resources\CoffeeResource;
use App\Models\Coffee;
use App\Models\UserRole;
use App\Rules\UserExsist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CoffeeController extends Controller {
    /**
     * @group Coffee
     * Display a listing of all coffees.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        return new CoffeeCollection(Coffee::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {
        //
    }

    /**
     * @group Coffee
     * Store a newly created coffee in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {

        $user_logged = auth()->user();
        $user_role=UserRole::find($user_logged->user_role_id);

        if($user_role->role_slug!=='admin' && !$user_role->role_capability) {
            return response()->json(['You have not any permissions to do that!']);
        }

            $validator = Validator::make($request->all(), [
                'coffee_name' => 'required|string|max:255',
                'coffee_sort' => 'required|string|max:255',
                'country_origin' => 'required|string|max:255',
                'description' => 'string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors());
            }

            $coffee = Coffee::create([
                'coffee_name' => $request->coffee_name,
                'coffee_sort' => $request->coffee_sort,
                'country_origin' => $request->country_origin,
                'description' => $request->description,
                'user_id' => $user_logged->id
            ]);

            return response()->json(['success' => true, 'message' => 'Coffee saved.', new CoffeeResource($coffee)]);

    }

    /**
     * @group Coffee
     * Display the specified coffee.
     *
     * @param \App\Models\Coffee $coffee
     * @return \Illuminate\Http\Response
     */
    public function show(Coffee $coffee) {
        return new CoffeeResource($coffee);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Coffee $coffee
     * @return \Illuminate\Http\Response
     */
    public function edit(Coffee $coffee) {
        //
    }

    /**
     * @group Coffee
     * Update the specified coffee in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Coffee $coffee
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Coffee $coffee) {

        $user_logged = auth()->user();
        $user_role=UserRole::find($user_logged->user_role_id);

        if($user_role->role_slug!=='admin' && !$user_role->role_capability) {
            return response()->json(['You have not any permissions to do that!']);
        }

        $validator = Validator::make($request->all(), [
            'coffee_name' => 'required|string|max:255',
            'coffee_sort' => 'required|string|max:255',
            'country_origin' => 'required|string|max:255',
            'description' => 'string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $coffee->coffee_name = $request->coffee_name;
        $coffee->coffee_sort = $request->coffee_sort;
        $coffee->country_origin = $request->country_origin;
        $coffee->description = $request->description;
        $coffee->save();
        return response()->json(['success' => true, 'message' => 'Coffee updated.', new CoffeeResource($coffee)]);
    }

    /**
     * @group Coffee
     * Remove the specified coffee from storage.
     *
     * @param \App\Models\Coffee $coffee
     * @return \Illuminate\Http\Response
     */
    public function destroy(Coffee $coffee) {

        $user_logged = auth()->user();
        $user_role=UserRole::find($user_logged->user_role_id);

        if($user_role->role_slug!=='admin' && !$user_role->role_capability) {
            return response()->json(['You have not any permissions to do that!']);
        }

        $coffee->delete();
        return response()->json(['Coffee deleted.']);
    }
}
