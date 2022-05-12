<?php

namespace App\Http\Requests\Planes;

use Illuminate\Foundation\Http\FormRequest;

class PlanesRequest extends FormRequest
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
            'cantidad'                 => ['required','integer'],
            'precio'               => ['required','integer'],
        ];
    }

    public function messages()
    {
        return [
            'nombre.required'                  => 'Debes ingresar un nombre.',
            'cantidad.required'                => 'Debes ingresar una cantidad.',
            'cantidad.integer'                 => 'Debe ser un numero.',
            'precio.required'              => 'Debes ingresar un precio.',
            'precio.integer'                 => 'Debe ser un numero.',
        ];
    }
}
