<?php

namespace App\Http\Resources;

use App\Models\UserRole;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = 'user';

    public function toArray($request) {
        return [
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            'lastname' => $this->resource->lastname,
            'email' => $this->resource->email,
            'user_role_id' => new UserRoleResource(UserRole::find($this->resource->user_role_id)),
            'created_at' => $this->resource->created_at,
            'updated_at' => $this->resource->updated_at
        ];
    }
}
