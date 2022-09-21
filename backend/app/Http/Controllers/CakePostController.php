<?php

namespace App\Http\Controllers;

use App\Http\Resources\CakePostCollection;
use App\Http\Resources\CakePostCommentCollection;
use App\Http\Resources\CakePostResource;
use App\Models\CakePost;
use App\Models\CakePostComment;
use App\Models\UserRole;
use App\Rules\CategoryExists;
use App\Rules\CakeExists;
use App\Rules\CakePostExists;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CakePostController extends Controller {
    /**
     * @group Posts
     * Display a listing of all CoffePosts.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $cake_posts = CakePost::all();
        return new CakePostCollection($cake_posts);
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
     * @group Posts
     * Store a newly created CoffePost in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'post_content' => 'required|string',
            'category_id' => ['required', 'integer', new CategoryExists()],
            'cake_id' => ['integer','nullable', new CakeExists()]
        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>'ERROR: Post not saved!','message'=>$validator->errors()]);
        }

        $userID = auth()->user()->id;

        $cakePost = CakePost::create([
            'title' => $request->title,
            'post_content' => $request->post_content,
            'category_id' => $request->category_id,
            'cake_id' => $request->cake_id,
            'user_id' => $userID
        ]);

        return response()->json(['success' => true, 'message' => 'Cake post saved.', new CakePostResource($cakePost)]);
    }

    /**
     * @group Posts
     * Display the specified CoffePost.
     *
     * @param \App\Models\CakePost $cakePost
     * @return \Illuminate\Http\Response
     */
    public function show(CakePost $cakePost) {
        $comments = CakePostComment::all()->where('post_id', '=', $cakePost->id);
        return ['post' => new CakePostResource($cakePost), 'comments' => new CakePostCommentCollection($comments)];
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\CakePost $cakePost
     * @return \Illuminate\Http\Response
     */
    public function edit(CakePost $cakePost) {
        //
    }

    /**
     * @group Posts
     * Update the specified post in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\CakePost $cakePost
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CakePost $cakePost) {
        $user = auth()->user();
        $user_role = UserRole::find($user->user_role_id);

        if ($cakePost->user_id != $user->id && !$user_role->role_capability && $user_role->role_slug !== 'admin') {
            return response()->json(['You have not any permissions to do that!']);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'post_content' => 'required|string',
            'category_id' => ['required', new CategoryExists()],
            'cake_id' => ['integer','nullable', new CakeExists()]
        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>'ERROR: Post not updated!','message'=>$validator->errors()]);
        }

        $cakePost->title = $request->title;
        $cakePost->post_content = $request->post_content;
        $cakePost->category_id = $request->category_id;
        $cakePost->cake_id = $request->cake_id;
        $cakePost->save();

        return response()->json(['success' => true, 'message' => 'Cake post updated.', new CakePostResource($cakePost)]);
    }

    /**
     * @group Posts
     * Remove the specified post from storage.
     *
     * @param \App\Models\CakePost $cakePost
     * @return \Illuminate\Http\Response
     */
    public function destroy(CakePost $cakePost) {
        $user = auth()->user();
        $user_role = UserRole::find($user->user_role_id);

        if ($cakePost->user_id != $user->id && !$user_role->role_capability && $user_role->role_slug !== 'admin') {
            return response()->json(['You have not any permissions to do that!']);
        }

        $cakePost->delete();
        return response()->json(['Cake post deleted.']);

    }

    public function show_newest() {

        $posts = CakePost::all()->take(5);
        return new CakePostCollection($posts);
    }
}
