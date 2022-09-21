<?php

namespace App\Http\Controllers;

use App\Http\Resources\CakeCollection;
use App\Http\Resources\CakeResource;
use App\Models\Cake;
use App\Models\UserRole;
use App\Rules\UserExist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CakeController extends Controller {
    /**
     * @group Cake
     * Display a listing of all cakes.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        return new CakeCollection(Cake::all());
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
     * @group Cake
     * Store a newly created cake in storage.
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
                'cake_name' => 'required|string|max:255',
                'cake_sort' => 'required|string|max:255',
                'vegan' => 'required|string|max:255',
                'description' => 'string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors());
            }

            $cake = Cake::create([
                'cake_name' => $request->cake_name,
                'cake_sort' => $request->cake_sort,
                'vegan' => $request->vegan,
                'description' => $request->description,
                'user_id' => $user_logged->id
            ]);

            return response()->json(['success' => true, 'message' => 'Cake saved.', new CakeResource($cake)]);

    }

    /**
     * @group Cake
     * Display the specified cake.
     *
     * @param \App\Models\Cake $cake
     * @return \Illuminate\Http\Response
     */
    public function show(Cake $cake) {
        return new CakeResource($cake);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Cake $cake
     * @return \Illuminate\Http\Response
     */
    public function edit(Cake $cake) {
        //
    }

    /**
     * @group Cake
     * Update the specified cake in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Cake $cake
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cake $cake) {

        $user_logged = auth()->user();
        $user_role=UserRole::find($user_logged->user_role_id);

        if($user_role->role_slug!=='admin' && !$user_role->role_capability) {
            return response()->json(['You have not any permissions to do that!']);
        }

        $validator = Validator::make($request->all(), [
            'cake_name' => 'required|string|max:255',
            'cake_sort' => 'required|string|max:255',
            'vegan' => 'required|string|max:255',
            'description' => 'string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $cake->cake_name = $request->cake_name;
        $cake->cake_sort = $request->cake_sort;
        $cake->vegan = $request->vegan;
        $cake->description = $request->description;
        $cake->save();
        return response()->json(['success' => true, 'message' => 'Cake updated.', new CakeResource($cake)]);
    }

    /**
     * @group Cake
     * Remove the specified cake from storage.
     *
     * @param \App\Models\Cake $cake
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cake $cake) {

        $user_logged = auth()->user();
        $user_role=UserRole::find($user_logged->user_role_id);

        if($user_role->role_slug!=='admin' && !$user_role->role_capability) {
            return response()->json(['You have not any permissions to do that!']);
        }

        $cake->delete();
        return response()->json(['Cake deleted.']);
    }
}
