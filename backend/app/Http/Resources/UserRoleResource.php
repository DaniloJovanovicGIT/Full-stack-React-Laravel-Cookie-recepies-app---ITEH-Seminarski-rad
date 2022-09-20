<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserRoleResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = 'role';

    public function toArray($request) {
        return [
            'id' => $this->resource->id,
            'role_name' => $this->resource->role_name,
            'role_slug' => $this->resource->role_slug,
            'role_capability' => $this->resource->role_capability,
            'created_at' => $this->resource->created_at,
            'updated_at' => $this->resource->updated_at
        ];
    }
}
