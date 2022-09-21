<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class CakeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap='cake';
    public function toArray($request)
    {
        return [
            'id'=>$this->resource->id,
            'cake_name'=>$this->resource->cake_name,
            'cake_sort'=>$this->resource->cake_sort,
            'vegan'=>$this->resource->vegan,
            'description'=>$this->resource->description,
            'user_id'=>new UserResource(User::find($this->resource->user_id)),
            'created_at'=>$this->resource->created_at,
            'updated_at'=>$this->resource->updated_at,
        ];
    }
}
