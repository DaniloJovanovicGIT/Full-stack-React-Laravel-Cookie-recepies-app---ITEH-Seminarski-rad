<?php

namespace App\Http\Resources;

use App\Models\CoffeePost;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class CoffeePostCommentResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = 'Coffee_post_comment';

    public function toArray($request) {
        return [
            'id' => $this->resource->id,
            'comment_content' => $this->resource->comment_content,
            'post_id' => new CoffeePostResource(CoffeePost::find($this->resource->post_id)),
            'user_id' => new UserResource(User::find($this->resource->user_id)),
            'created_at' => $this->resource->created_at,
            'updated_at' => $this->resource->updated_at
        ];
    }
}
