<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EnvioExamen extends Mailable
{
    use Queueable, SerializesModels;

    public $title = "RESEVAS NOVAKIMEN - EXAMEN MEDICO";
    public $nombres;
    public $apellidos;
    protected $pdf;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($nombres, $apellidos,$pdf)
    {
        $this->title = $this->title;
        $this->nombres = $nombres;
        $this->apellidos = $apellidos;
        $this->pdf = $pdf;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        $send_title = $this->title;
        $send_nombres = $this->nombres;
        $send_apellidos = $this->apellidos;

        return $this->view('mail.sendexamen', compact('send_title', 'send_nombres', 'send_apellidos'))
        ->subject($send_title)
        ->attachData($this->pdf->output(), 'examen.pdf');
    }
}
