<?php

namespace App\Http\Resources\Faqs;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FaqResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->category_id,
            'title' => $this->category_title,
            'desc' => $this->category_desc,
            'iconKey' => $this->icon_key,
            'questions' => [
                [
                    'question' => $this->question,
                    'answer' => $this->answer,
                ],
            ],
        ];
    }
}