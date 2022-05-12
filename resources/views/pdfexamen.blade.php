
 <!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
        <style>
        @page {
                margin: 0cm 0cm;
            }

            body {
                margin-top: 2cm;
                margin-left: 2cm;
                margin-right: 2cm;
                margin-bottom: 2cm;
            }
            header {
                position: fixed;
                top: 0cm;
                left: 0cm;
                right: 0cm;
                height: 2cm;
                margin-left: 2cm;
                margin-right: 2cm;
                margin-top: 1cm;
                color: #18a096
            }
            footer {
                position: fixed;
                bottom: 0cm;
                left: 0cm;
                right: 0cm;
                height: 10cm;

                margin-left: 2cm;
                margin-right: 2cm;
                margin-bottom: 1cm;
                color: #18a096;


                line-height: 5px;
            }

            footer h5{
                text-align: center;

            }

    </style>
    </head>
    <body>
        <header>
            <table class="default" style="border:none !important; margin-top:5px; width:100%">
                <tr>
                    <td style="width: 40%">
                        <img src="../public/images/isotipo.png" style="margin-left:20px" height="100" width="100" />
                    </td>

                    <td style="width: 50%">
                        <img src="../public/images/logo.png" style="margin-left:70px; margin-top:10px"  width="50%" />
                        <h5>CLINICA DE SALUD INTEGRAL & ESTETICA</h5>
                    </td>
                </tr>

                <tr>
                    <td>
                        <h5>NOMBRE: {{$examen->paciente['nombres']}} {{$examen->paciente['apellidos']}}</h5>
                        <h5>RUT: {{$examen->paciente['rut']}}</h5>
                        <h5>EDAD: {{$examen->paciente['edad']}}</h5>
                    </td>
                </tr>
            </table>

            <br>
            <br>
            <br>
        </header>
        <br>

        <footer>

            <table style=" margin-top:120px; width:100%">

                <tr>
                    <td style="width: 50%"></td>
                    <td style="width: 50%">

                        <div style="width: 100%; color: #000" align="center">

                            <img src="../public/storage/{{$examen->profesional['firma']}}" style="margin-left:20px" height="100" width="100" />


                            <hr style="color: #000; margin-bottom:10px">

                            <h5>  {{$examen->profesional['nombres']}} {{$examen->profesional['apellidos']}} </h5>

                        </div>

                    </td>
                </tr>
            </table>

            <hr style="color:#eee">

            <h5> Castellón 336, Concepción / 41-3600617 - Call Center +56 921730836 </h5>

            <h5> Carrera 471 - Coronel / 44 - 3060359 </h5>

        </footer>

        <main >

            @foreach ($examen->examenorden as $item)

                <img src="../public/images/isotipo.png" style="opacity: 0.1;
                        position: fixed; width:8cm; height:8cm; bottom: 10cm; left:7cm" height="40%" width="50%" />

                    <table class="default" style="border:none !important; margin-top:100px; width:100%">

                    <br>

                    <tr>
                        <td style="width: 100%">
                            <h5 style="margin-left:70%;"> FECHA {{$examen->fecha}} </h5>
                        </td>
                    </tr>
                    <br>

                    <tr>

                        <table style=" margin-top:5px; width:100%">

                                <tr>
                                    <td> <strong style="text-transform: uppercase"> {{$item->examen->nombre}}</strong> </td>
                                </tr>

                                <hr style="color:#eee">

                                    <tr>

                                        <table style=" margin-top:5px; width:100%">
                                            <thead>
                                                <tr>
                                                    <th style="width: 50%">Examen</th>
                                                    <th style="width: 20%">Resultado</th>
                                                    <th style="width: 30%">Valores Referenciales</th>
                                                </tr>
                                            </thead>
                                            <tbody style="text-align: center">
                                                @foreach ($item->resultados as $item1)

                                                <tr>
                                                    <td>{{$item1->analisis->nombre}}</td>
                                                    <td>{{$item1->valor}}</td>

                                                    @php
                                                        $mayor = ">";
                                                        $menor = "<";
                                                    @endphp


                                                    @if( count($item1->analisis->valoresreferenciales) > 0 )
                                                        <td>
                                                            <ul>

                                                                @foreach ($item1->analisis->valoresreferenciales as $item2)
                                                                <li>{{$item2->valor_minimo}} {{$menor}} {{$item2->tipo}} {{$mayor}} {{$item2->valor_maximo}}</li>
                                                                @endforeach
                                                            </ul>
                                                        </td>
                                                    @else
                                                            <td>-</td>
                                                    @endif
                                                </tr>

                                                @endforeach

                                            </tbody>
                                        </table>

                                    </tr>

                                </table>

                            </tr>
                    </table>

                    <div style="page-break-after:always;"></div>


            @endforeach

        </main>


    </body>
</html>
