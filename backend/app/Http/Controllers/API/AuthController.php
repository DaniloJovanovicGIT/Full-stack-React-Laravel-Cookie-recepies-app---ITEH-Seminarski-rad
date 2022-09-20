<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserRole;
use App\Rules\UserRoleExsist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller {

    /**
     * @group Authentication
     *
     * Creating new account
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|string|max:255|email|unique:users',
            'password' => 'required|string|min:5'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'error' => strval($validator->errors())]);
        }

        $user_role_id = UserRole::where('role_slug', 'viewer')->firstOrFail()->id;
        $user = User::create([
            'name' => $request->name,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'user_role_id' => $user_role_id,
            'password' => Hash::make($request->password)
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['message' => 'New user successfully created.', 'data' => $user, 'access_token' => $token,
            'token_type' => 'Bearer', 'success' => true, 'user_type' => 'viewer', 'user_id' => $user->id]);
    }

    /**
     * @group Authentication
     *
     * Creating new account without getting access token
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */

    public function registerBezTokena(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|string|max:255|email|unique:users',
            'password' => 'required|string|min:5'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'error' => strval($validator->errors())]);
        }

        $user_role_id = UserRole::where('role_slug', 'viewer')->firstOrFail()->id;
        $user = User::create([
            'name' => $request->name,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'user_role_id' => $user_role_id,
            'password' => Hash::make($request->password)
        ]);

        return response()->json(['message' => 'New user successfully created.', 'data' => $user,
            'success' => true, 'user_type' => 'viewer', 'user_id' => $user->id]);
    }

    /**
     * @group Authentication
     *
     * Login on application
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request) {

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $userRole = DB::table('users')
            ->join('user_roles', 'users.user_role_id', '=', 'user_roles.id')
            ->select('user_roles.role_slug')
            ->where('users.id', '=', $user->id)
            ->get();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['message' => 'Successfully logged in ' . $user->name . " " . $user->lastname,
            'access_token' => $token, 'token_type' => 'Bearer', 'success' => true,
            'user_type' => $userRole, 'user_id' => $user->id]);

    }
    /**
     * @group Authentication
     *
     * Logout
     *
     *
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request) {
        auth()->user()->tokens()->delete();
        return response()->json(['message' => 'Successfully logged out', 'success' => true]);
    }
}
