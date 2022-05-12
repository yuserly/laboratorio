<?php

namespace App\Http\Requests\AdminColegio;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AdminColegioRequest extends FormRequest
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
            'nombres'                   => ['required'],
            'apellidos'                 => ['required'],
            'email'                     =>['required', 'email',Rule::unique('users')->ignore($this->user_id), 'max:200']
        ];
    }

    public function messages()
    {
        return [
            'nombres.required'                  => 'Debes ingresar un nombre.',
            'apellidos.required'                => 'Debes ingresar un apellido.',
            'email.required'                    => 'Debes ingresar un email.',
            'email.email'                       => 'Debe ser un email valido.',
            'email.unique'                      => 'El email ya se encuentra registrado.',
            'email.max'                         => 'Correo electronico no puede exceder los 200 caracteres.',
        ];
    }
}
