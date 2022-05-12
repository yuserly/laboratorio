{{-- <!DOCTYPE html>
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

            /** Define the header rules **/
            header {
                position: fixed;
                top: 0cm;
                left: 0cm;
                right: 0cm;
                height: 2cm;

                /** Extra personal styles **/
                background-color: #03a9f4;
                color: white;
                text-align: center;
                line-height: 1.5cm;
            }

            /** Define the footer rules **/
            footer {
                position: fixed;
                bottom: 0cm;
                left: 0cm;
                right: 0cm;
                height: 2cm;

                /** Extra personal styles **/
                background-color: #03a9f4;
                color: white;
                text-align: center;
                line-height: 1.5cm;
            }

            #watermark {
                position: fixed;

                /**
                    Set a position in the page for your image
                    This should center it vertically
                **/
                bottom:   8cm;
                left:     21.5cm;

                /** Change image dimensions**/
                width:    8cm;
                height:   8cm;

                /** Your watermark should be behind every content**/
                z-index:  -1000;
            }
    </style>
    </head>
    <body>
        <header>
            Our Code World
        </header>

        <footer>
            Copyright &copy; <?php echo date("Y");?>
        </footer>

            <div id="watermark">
                <img src="{{asset('images/isotipo.png')}}" style="opacity: 0.2;" height="100%" width="100%" />
            </div>


        <!-- Envuelva el contenido de su PDF dentro de una etiqueta principal -->

        <main>
            <table class="default" style="border:none !important; margin-top:5px">
                <tr>
                    <td style="text-align: right">
                        fecha
                    </td>
                </tr>
                <tr>
                    <td>
                        <h3>NOMBRE: YUSERLY BRACHO</h3>
                    </td>
                </tr>
                <tr>

                    <td>
                        <h3>RUT: 26928128-6</h3>
                        <h3>EDAD:28</h3>
                    </td>

                </tr>

                <tr>
                    <td>
                        <h3>DIAGNÓSTICO: CXIDSJIFIJOFSNRF RFWJIORWJWIJRW JIWAIJEWRAIJORAWIJOJWR</h3>
                    </td>
                </tr>

                <tr>
                    <td>
                       Rp.

                       <br>

                       <p>
                           Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis corrupti voluptate porro consequatur, ipsam, assumenda, nesciunt commodi officia totam labore itaque debitis quidem accusamus mollitia tempora in perspiciatis magnam minima!
                       </p>
                    </td>
                </tr>

            </table>
        </main>
    </body>
</html>



 --}}


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
                height: 2cm;

                margin-left: 2cm;
                margin-right: 2cm;
                margin-bottom: 1.5cm;
                color: #18a096;


                text-align: center;
                line-height: 5px;
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
            </table>
        </header>
        <br>

        <footer>

            <hr style="color:#eee">

            <h5> Castellón 336, Concepción / 41-3600617 - Call Center +56 921730836 </h5>

            <h5> Carrera 471 - Coronel / 44 - 3060359 </h5>

        </footer>


            <main>

            <img src="../public/images/isotipo.png" style="opacity: 0.1;
            position: fixed; width:8cm; height:8cm; bottom: 10cm; left:7cm" height="40%" width="50%" />

                <table class="default" style="border:none !important; margin-top:5px; width:100%">

                    <br>

                    <tr>
                        <td style="width: 100%">
                            <h5 style="margin-left:70%;"> FECHA {{$receta->fecha}} </h5>
                        </td>
                    </tr>
                    <tr>

                        <td>
                            <h5>NOMBRE: {{$receta->paciente['nombres']}} {{$receta->paciente['apellidos']}}</h5>
                            <h5>RUT: {{$receta->paciente['rut']}}</h5>
                            <h5>EDAD: {{$receta->paciente['edad']}}</h5>
                            <h5>DIAGNÓSTICO: {{$receta->diagnostico}}</h5>
                        </td>


                    </tr>
                    <hr style="color:#eee">
                    <br>

                    <tr>
                        <td>

                           <strong>Rp.</strong>

                           <br>

                           <p>

                            {!! $receta->receta !!}
                           </p>
                        </td>
                    </tr>

                </table>
            </main>
    </body>
</html>
