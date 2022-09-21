<?php

namespace App\Http\Controllers;

use App\Http\Resources\CakePostCommentCollection;
use App\Http\Resources\CakePostCommentResource;
use App\Models\CakePost;
use App\Models\CakePostComment;
use App\Models\UserRole;
use App\Rules\CakePostExists;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CakePostCommentController extends Controller {
    /**
     * @group Comments
     * Display a listing of all comments.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        return new CakePostCommentCollection(CakePostComment::all());
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
            'post_id' => ['required', 'integer', new cakePostExists()]
        ]);

        if ($validator->fails()) {
            return response()->json(['success'=>false,'error'=>strval($validator->errors())]);
        }

        $userID = auth()->user()->id;

        $cakePostComment = CakePostComment::create([
            'comment_content' => $request->comment_content,
            'post_id' => $request->post_id,
            'user_id' => $user_id
        ]);

        return response()->json(['success'=>true,'message' => 'Cake post comment post saved.', 'comment' => new CakePostCommentResource($cakePostComment)]);
    }

    /**
     * @group Comments
     * Display the specified resource.
     *
     * @param \App\Models\CakePostComment $cakePostComment
     * @return \Illuminate\Http\Response
     */
    public function show(CakePostComment $cakePostComment) {
        return new CakePostCommentResource($cakePostComment);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\CakePostComment $cakePostComment
     * @return \Illuminate\Http\Response
     */
    public function edit(CakePostComment $cakePostComment) {
        //
    }

    /**
     *
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\CakePostComment $cakePostComment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CakePostComment $cakePostComment) {
        //
    }

    /**
     * @group Comments
     * Remove the specified comment from storage.
     *
     * @param \App\Models\CakePostComment $cakePostComment
     * @return \Illuminate\Http\Response
     */
    public function destroy(CakePostComment $cakePostComment) {
        $user = auth()->user();
        $user_role = UserRole::find($user->user_role_id);

        if ($cakePostComment->user_id != $user->id && !$user_role->role_capability && $user_role->role_slug !== 'admin') {
            return response()->json(['You have not any permissions to do that!']);
        }

        $cakePostComment->delete();
        return response()->json(['Cake post comment deleted.']);
    }
}
