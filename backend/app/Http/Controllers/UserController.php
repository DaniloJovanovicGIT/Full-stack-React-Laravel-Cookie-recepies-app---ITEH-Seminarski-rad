<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\UserRole;
use App\Rules\UserRoleExist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller {
    /**
     * @group User
     * Display a listing of the all Users. Need to be logged in.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $users = User::all();
        $user_logged = auth()->user();
        $user_role = UserRole::find($user_logged->user_role_id);
        if ($user_role->role_slug != 'admin' || $user_role->role_capability != 1) {
            return response()->json(['success' => false, 'error' => 'You have not any permissions to do that!']);
        }
        return response()->json(['success' => true, 'users' => new UserCollection($users)]);
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
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        //
    }

    /**
     * @group User
     * Gettomg data of specified User.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user) {
        $user_logged = auth()->user();
        $user_role = UserRole::find($user_logged->user_role_id);
        if ($user_role->role_slug != 'admin' && $user_logged->id != $user->id) {
            return response()->json(['success' => false, 'error' => 'You have not any permissions to do that!']);
        }
        return response()->json(['success' => true, 'user' => new UserResource($user)]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user) {


    }

    /**
     * @group User
     * Update the specified User.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user) {

        $user_logged = auth()->user();
        $user_role = UserRole::find($user_logged->user_role_id);
        if ($user_role->role_slug != 'admin' && $user_logged->id != $user->id) {
//            return response()->json([$user_logged,$user_logged->id,$user->id]);
            return response()->json(['You have not any permissions to do that!']);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|string|max:255|email|unique:users,email,' . $user->id,
            'password' => 'string|min:5',
            'user_role_id' => [new UserRoleExist()],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user->name = $request->name;
        $user->lastname = $request->lastname;
        $user->email = $request->email;
        if ($user_role->role_slug === 'admin') {

            $user->user_role_id = intval($request->user_role_id);
        }
        $user->password = Hash::make($request->password);
        $user->save();


        return response()->json(['success' => true, 'message' => 'User successfully updated.', new UserResource($user)]);
    }

    /**
     * @group User
     * Remove the specified User from database.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user) {
        $user_logged = auth()->user();
        $user_role = UserRole::find($user_logged->user_role_id);
        if ($user_role->role_slug != 'admin' && $user_logged->id != $user->id) {
            return response()->json(['success' => false, 'error' => 'You have not any permissions to do that!']);
        }
        $user->delete();
        return response()->json('User deleted');
    }
}
