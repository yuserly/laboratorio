<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
    
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
    
    <title>LODEVUELVO</title>

    <style>
        @font-face {

font-family: fuente1;

src: url("{{asset('fonts/Gotham-Bold.otf')}}");

}

@font-face {

font-family: fuente2;

src: url('{{asset('fonts/AmazonEmber_Rg.ttf')}}');
}
h1{

font-family: fuente1!important;

font-weight: bold;

}

h5, h4, h6, span, button, a, small, input, button, p{

font-family: fuente2!important;

}
nav{
background-color: #080404;
max-height: 100px!important;
-webkit-box-shadow: 0px 4px 8px 1px #000000; 
box-shadow: 0px 4px 8px 1px #000000;
}
nav ul li a{
color: #FFF!important;
}

.btn-add{
        color: #04a28d;
        border-color: #04a28d;
        font-size: 1rem;
        border-radius: 5px;
        padding-left: 5px;
        padding-right: 5px;
    }
    .btn-add:hover{
        color: #FFF;
        background-color: #04a28d;
        border-color: #04a28d;
    }

    .mercadopago-button{

        color: #0eeaaf !important;
        border-color: #04a28d !important;
        font-size: 1.5rem !important;
        border-radius: 30px !important;
        padding-left: 50px !important;
        padding-right: 50px !important;
        background-color: #000 !important;
        font-weight: bold !important;
        width: 100% !important;


    }

    .mercadopago-button:hover{
        color: #0eeaaf !important ;
    }

    .tables td:last-child {
    width: 100%;
}
    </style>
</head>
<body>

    <nav class="navbar navbar-expand-lg navbar-light nav_top_movil d-md-none d-lg-none">

        <div class="container d-flex justify-content-center">
            <div class="row">
                <div class="col-md-12">
                    <a class="navbar-brand" href="/">
    
                        <img style="position: relative;top: 30px;" alt="" class="img-fluid" src="{{asset('images/landing/logo.png')}}" width="165" />
    
                    </a>
                </div>
            </div>
            
    
        </div>
    
    </nav>
    
    <nav class="navbar navbar-expand-lg navbar-light nav_top_pc d-none d-md-block d-lg-block">
        
        <div class="container d-flex justify-content-start">
            <div class="row">
                <div class="col-md-12">
                    <a class="navbar-brand" href="/">
    
                        <img style="position: relative;top: 30px;" alt="" class="img-fluid" src="{{asset('images/landing/logo.png')}}" width="165" />
    
                    </a>
                </div>
            </div>
            
    
        </div>
    
    </nav>

    <br><br>
<section class="banner1 mt-5" style="overflow: hidden;">

    <div class="container">

        <div class="row justify-content-center mt-3 mb-3">

            <div class="col-md-7 text-center">

                <h1 style="color:  #04d28c;font-size: 3rem;font-weight: bold;line-height: 0.9">Pagar mi compra</h1>

                <br>

            </div>

        </div>

        

        <div class="row justify-content-center">
        	<div class="col-md-6">
        		<h6 class="mb-5">Detalles de mi compra</h6>

                <table class="table ">
                    <thead>
                        <tr>
                            <th>Nombre Alumno</th>
                            <th>Colegio</th>
                            <th>Curso</th>
                            <th>Plan</th>

                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($venta->detalleventa as $detalle )
                        <tr>
                            <td>{{$detalle->nombre}}</td>
                            <td>{{$detalle->colegio}}</td>
                            <td>{{$detalle->curso}}</td>
                            <td>{{$venta->plan->nombre}} {{$venta->plan->cantidad}} Etiquetas</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
                        

        	</div>
        </div>

        <div class="row justify-content-center">
        	<div class="col-md-6">
        		<h6 class="mb-5">Direccion de envio</h6>

                <table class="table ">
                    <thead>
                        <tr>
                            <th>Direccón</th>
                            <th>Región</th>
                            <th>Comuna</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{$venta->apoderado->direccion}}</td>
                            <td>{{$venta->apoderado->region}}</td>
                            <td>{{$venta->apoderado->comuna}}</td>
                        </tr>
                    </tbody>
                </table>
                   
        	</div>
            
        </div>

        <div class="row justify-content-center">
            
        	<div class="col-md-6">
        		<h6 class="mb-5">Totales</h6>

                <table class="table">
                    <thead>
                        <tr>
                            <th>Neto</th>
                            <th>Envio</th>
                            <th>IVA</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{$venta->monto}}</td>
                            <td>3800</td>
                            <td>{{$venta->iva}}</td>
                            <td>{{$venta->total}}</td>
                        </tr>
                    </tbody>
                </table>

               
                   
        	</div>
            
        </div>

        <div class="row justify-content-center">
        	<div class="col-md-6">

                <a href="{{url('modificar-compra/'.$venta->codigo.'')}}">Modificar compra</a>
    
            </div>
            
        </div>


        

        <div class="row justify-content-center mt-4 mb-5">

        	<div class="col-xs-6 col-md-4 ">

                <div class="cho-container d-flex justify-content-center"></div>

        	</div>

        </div>

    </div>

    <hr style="-webkit-box-shadow: -1px -11px 45px 20px rgba(14,234,175,0.44); box-shadow: -1px -11px 45px 20px rgba(14,234,175,0.44);height: 0px!important;border:none!important;">

</section>
    

    @php

        require base_path('vendor/autoload.php');
        MercadoPago\SDK::setAccessToken(config('services.mercadopago.token'));

        $preference = new MercadoPago\Preference();

        $preference->back_urls = array(
                    "success" => "http://lodevuelvo.cp/compra-exitosa",
                    "failure" => "http://lodevuelvo.cp/error-compra",
                    "pending" => "http://lodevuelvo.cp/pagopendiente"
                );

                $preference->auto_return = "approved";


        // Crea un ítem en la preferencia
        $item = new MercadoPago\Item();
        $item->title = $venta->plan->nombre;
        $item->quantity = 1;
        $item->unit_price = $venta->total;
        $datos[] = $item;
        // $preference->items = array($item);
        // agregar el envio
        // $item = new MercadoPago\Item();
        // $item->title = 'Envío';
        // $item->quantity = 1;
        // $item->unit_price = 3800;
        // $datos[] = $item;
        $preference->items = $datos;

        $preference->save();


    @endphp

    {{-- SDK MercadoPago.js V2 --}}
    <script src="https://sdk.mercadopago.com/js/v2"></script>




    <script>

        $(document).ready(function(){

            
            datos = {

                '_method': 'POST',

                'id_venta':'{{$venta->id_venta}}',

                'idmercado': '{{$preference->id}}'

            }

            $.ajax({

                type:"POST",

                url:'/api/updateidmercadopago',

                data: datos,

                success: function(respuesta){

                    console.log(respuesta)

                },

                error:function(){

                    alert("Hay un error");

                }

                });
        })



        // Agrega credenciales de SDK
          const mp = new MercadoPago("{{config('services.mercadopago.key')}}", {
                locale: 'es-CL'
          });

          // Inicializa el checkout
          mp.checkout({
              preference: {
                  id: '{{$preference->id}}'
              },
              render: {
                    container: '.cho-container', // Indica el nombre de la clase donde se mostrará el botón de pago
                    label: 'Pagar', // Cambia el texto del botón de pago (opcional)
              }
        });
        </script>



</body>
</html>
