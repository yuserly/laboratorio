<?php

namespace App\Http\Requests\Colegios;

use Illuminate\Foundation\Http\FormRequest;

class ColegiosRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'nombre'                   => ['required'],
            'direccion'                 => ['required']
        ];
    }

    public function messages()
    {
        return [
            'nombre.required'                  => 'Debes ingresar un nombre.',
            'direccion.required'                => 'Debes ingresar una dirección.'
        ];
    }
}
