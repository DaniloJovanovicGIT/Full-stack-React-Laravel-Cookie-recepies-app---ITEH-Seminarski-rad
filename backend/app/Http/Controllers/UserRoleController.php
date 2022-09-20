<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserRoleCollection;
use App\Http\Resources\UserRoleResource;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserRoleController extends Controller {
    /**
     * @group UserRole
     * Display a listing of all UserRoles
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $id = auth()->user()->id;

        $user = User::find($id);
        if ($user->user_role->role_slug == 'admin') {

            return new UserRoleCollection(UserRole::all());
        }
        return response()->json(['User have  not permission for this operation.']);


    }

    /**
     *
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {
        //
    }

    /**
     * @group User
     * Store a newly created UserRole
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {

        $id = auth()->user()->id;

        $user = User::find($id);
        if ($user->user_role->role_slug == 'admin') {

            $validator = Validator::make($request->all(), [
                'role_name' => 'required|string|max:255',
                'role_slug' => 'required|string|max:255',
                'role_capability' => 'required|boolean'
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors());
            }

            $userRole = UserRole::create([
                'role_name' => $request->role_name,
                'role_slug' => $request->role_slug,
                'role_capability' => $request->role_capability,
            ]);

            return response()->json(['User role saved.', new UserRoleResource($userRole)]);
        }

        return response()->json(['User have  not permission for this operation.']);

    }

    /**
     * @group User
     * Display the specified UserRole using provided id.
     *
     * @param \App\Models\UserRole $userRole
     * @return \Illuminate\Http\Response
     */
    public function show(UserRole $userRole) {
        $id = auth()->user()->id;

        $user = User::find($id);
        if ($user->user_role->role_slug == 'admin') {
            return new UserRoleResource($userRole);
        }
        return response()->json(['User have  not permission for this operation.']);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\UserRole $userRole
     * @return \Illuminate\Http\Response
     */
    public function edit(UserRole $userRole) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\UserRole $userRole
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UserRole $userRole) {
        //
    }

    /**
     * @group User
     * Remove the specified UserRole from storage.
     *
     * @param \App\Models\UserRole $userRole
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserRole $userRole) {
        $id = auth()->user()->id;

        $user = User::find($id);
        if ($user->user_role->role_slug == 'admin') {
            $userRole->delete();
            return response()->json(['User role deleted.']);
        }

        return response()->json(['User have  not permission for this operation.']);

    }
}
