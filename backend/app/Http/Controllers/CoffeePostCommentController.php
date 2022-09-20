<?php

namespace App\Http\Controllers;

use App\Http\Resources\CoffeePostCommentCollection;
use App\Http\Resources\CoffeePostCommentResource;
use App\Models\CoffeePost;
use App\Models\CoffeePostComment;
use App\Models\UserRole;
use App\Rules\CoffeePostExsists;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CoffeePostCommentController extends Controller {
    /**
     * @group Comments
     * Display a listing of all comments.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        return new CoffeePostCommentCollection(CoffeePostComment::all());
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
     * @group Comments
     * Store a newly created comment in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $user_id = auth()->user()->id;

        $validator = Validator::make($request->all(), [
            'comment_content' => 'required|string|max:255',
            'post_id' => ['required', 'integer', new CoffeePostExsists()]
        ]);

        if ($validator->fails()) {
            return response()->json(['success'=>false,'error'=>strval($validator->errors())]);
        }

        $userID = auth()->user()->id;

        $coffeePostComment = CoffeePostComment::create([
            'comment_content' => $request->comment_content,
            'post_id' => $request->post_id,
            'user_id' => $user_id
        ]);

        return response()->json(['success'=>true,'message' => 'Coffee post comment post saved.', 'comment' => new CoffeePostCommentResource($coffeePostComment)]);
    }

    /**
     * @group Comments
     * Display the specified resource.
     *
     * @param \App\Models\CoffeePostComment $coffeePostComment
     * @return \Illuminate\Http\Response
     */
    public function show(CoffeePostComment $coffeePostComment) {
        return new CoffeePostCommentResource($coffeePostComment);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\CoffeePostComment $coffeePostComment
     * @return \Illuminate\Http\Response
     */
    public function edit(CoffeePostComment $coffeePostComment) {
        //
    }

    /**
     *
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\CoffeePostComment $coffeePostComment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CoffeePostComment $coffeePostComment) {
        //
    }

    /**
     * @group Comments
     * Remove the specified comment from storage.
     *
     * @param \App\Models\CoffeePostComment $coffeePostComment
     * @return \Illuminate\Http\Response
     */
    public function destroy(CoffeePostComment $coffeePostComment) {
        $user = auth()->user();
        $user_role = UserRole::find($user->user_role_id);

        if ($coffeePostComment->user_id != $user->id && !$user_role->role_capability && $user_role->role_slug !== 'admin') {
            return response()->json(['You have not any permissions to do that!']);
        }

        $coffeePostComment->delete();
        return response()->json(['Coffee post comment deleted.']);
    }
}
