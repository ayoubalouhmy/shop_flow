<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'order_id'       => ['required', 'exists:orders,id'],
            'provider'       => ['required', 'string', 'in:stripe,paypal,cash_on_delivery'],
            'transaction_id' => ['required', 'string', 'unique:payments,transaction_id'],
        ];
    }
}
