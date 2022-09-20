<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryCollection;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller {
    /**
     * @group Kategorije
     * Display a listing of all categories.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $categories = Category::all();
        return new CategoryCollection($categories);
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
     * @group Kategorije
     * Store a newly created category in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $id = auth()->user()->id;

        $user = User::find($id);
        if ($user->user_role->role_slug == 'admin') {


            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'slug' => 'required|string|max:255'
            ]);

            if ($validator->fails()) {
                return response()->json(['message'=>$validator->errors()]);
            }

            $category = Category::create([
                'name' => $request->name,
                'slug' => $request->slug,
            ]);

            return response()->json(['success'=>true,'message'=>'Category saved.', new CategoryResource($category)]);
        }
        return response()->json(['success'=>false,'message'=>'You have not any permissions to do that!']);
    }

    /**
     * @group Kategorije
     * Display the specified category.
     *
     * @param \App\Models\Category $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category) {
        return new CategoryResource($category);
    }

    /**
     *
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Category $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Category $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category) {
        //
    }

    /**
     * @group Kategorije
     * Remove the specified category from storage.
     *
     * @param \App\Models\Category $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category) {
        $id = auth()->user()->id;

        $user = User::find($id);
        if ($user->user_role->role_slug == 'admin') {
            $category->delete();
            return response()->json('Category deleted successfully');

        }
        return response()->json(['You have not any permissions to do that!']);
    }
}
