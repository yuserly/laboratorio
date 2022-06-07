
 <!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Orden Examen Paciente {{$examen->paciente['nombres']}} {{$examen->paciente['apellidos']}}</title>
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
                        <h6 style="color:#000; margin: 10px 0px 0px 0xp; padding: 0px 0px 0px 0xp;">NOMBRE: {{$examen->paciente['nombres']}} {{$examen->paciente['apellidos']}} <span style="position: absolute; right: 50px;"> FECHA EMISIÓN: {{$examen->created_at}} </span> </h6>
                        <h6 style="color:#000; margin: 10px 0px 0px 0xp; padding: 0px 0px 0px 0xp;">RUT: {{$examen->paciente['rut']}}</h6>
                        <h6 style="color:#000; margin: 10px 0px 0px 0xp; padding: 0px 0px 0px 0xp;">EDAD: {{$examen->paciente['edad']}} años</h6>
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

                            <img src="../public/storage/{{$examen->emisor['url_firma']}}" style="margin-left:20px" height="100" width="100" />


                            <hr style="color: #000; margin-bottom:10px">

                            <h5>  {{$examen->emisor['nombres']}} {{$examen->emisor['apellidos']}} </h5>

                        </div>

                    </td>
                </tr>
            </table>

            <hr style="color:#eee">

            <h5> Castellón 336, Concepción / 41-3600617 - Call Center +56 921730836 </h5>

            <h5> Carrera 471 - Coronel / 44 - 3060359 </h5>

        </footer>

        <main>



                <img src="../public/images/isotipo.png" style="opacity: 0.2;
                        position: fixed; width:8cm; height:8cm; bottom: 10cm; left:7cm" height="40%" width="50%" />

                    <table class="default" style="border:none !important; margin-top:80px; width:100%">

                    <br>
                        <br>
                        <br>

                    <tr>

                        <table style=" width:100%">

                                {{-- <hr style="color:#eee"> --}}
                                    <tr>


                                        <table style=" width:100%">
                                            <thead style="border-bottom: 1px solid #eee; padding:3px;">
                                                <tr>
                                                    <th style="width: 10%"></th>
                                                    <th style="width: 30%">Tipo de Examén</th>
                                                    <th style="width: 20%">Codigo</th>
                                                    <th style="width: 40%">Examén</th>


                                                </tr>


                                            </thead>



                                            <tbody style="text-align: center;">

                                                @foreach ($examen->examenorden as $item)

                                                <tr><td></td> <td></td> <td></td> <td></td></tr>
                                                <tr><td></td> <td></td> <td></td> <td></td></tr>




                                                <tr>
                                                    <td><input type="checkbox" name="" id=""></td>
                                                <td >  {{$item->examen->tipoexamen->nombre}} </td>

                                                    <td >{{$item->examen->codigo}}</td>
                                                    <td >{{$item->examen->nombre}}</td>

                                                </tr>

                                                    <tr><td></td> <td></td> <td></td> <td></td></tr>

                                                   <tr><td></td> <td></td> <td></td> <td></td></tr>



                                                @endforeach

                                            </tbody>

                                        </table>



                                    </tr>

                                </table>

                            </tr>
                    </table>



        </main>


    </body>
</html>
