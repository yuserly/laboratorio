
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

    <title>Document</title>

    {{-- @font-face {

        font-family: fuentePDF;

         src: url("{{asset('fonts/AmazonEmber_Rg.ttf')}}");

    } --}}
    <style>
        .page-break {
            page-break-after: always;
        }
        table, th, td {
          border: 1px solid black; border-collapse: collapse;
          width: 100%;
        }
        td {
          text-align: center;vertical-align: middle;
        }
        body {
          font-family: "Roboto";
          font-size: 10px;
          font-weight: bold;
        }
        .margintext{
            margin-top:10px !important;
        }
        p{
            text-transform: capitalize;
            font-size: 15px;
        }

        body h2{
            text-align: center;
        }
        </style>
</head>
<body style="font-family:'Amazon',font-size: 10px; font-weight: bold;">

    <h2 style="line-height: 0.3 !important;"> {{$url_qr[0]["apoderado"]}} </h2>

    <h2 style="line-height: 0.3 !important;"> {{$url_qr[0]["direccion"]}} </h2>

    <table class="default" style="border:none !important">

        @php
        $cont = 1;
        @endphp

        @foreach($url_qr as $item)
        @if($cont == 1) <tr> @endif
            <td style="border: none !important; border-collapse: collapse; padding: 5px;">
                <div style="border: 2px solid rgb(4, 210, 140); border-radius:5px;width:100%; height:100px;  white-space: nowrap; padding: 5px;">

                    <div align="center" style="width:40%; margin-top:2px; background:black; height:92px ;border-radius:5px;">

                        <img align="center" class="margintext" src="{{public_path($item["img"])}}" style="border-radius:5px; border: 1px solid #fff; margin-left:2px; object-fit:cover" height="65" width="65"  alt="...">


                        <span style="color:#fff; font-size: 13px; line-height: 1 !important;">Scan me</span>
                        <br>
                        <br>

                    </div>

                @if($item["nombre"])
                <br>
                <div style="width:50%; margin-top:-92px; margin-left:42%; text-align:left; white-space: nowrap;">
                    <p style="font-weight:900 !important; font-family:'gotham' !important; font-style:'font-style: bold'; !important; line-height: 0.3 !important; ">{{$item["nombre"]}}</p>
                    <p style="font-weight:900 !important; font-family:'gotham' !important; font-style:'font-style: bold'; !important; line-height: 0.4!important; ">{{$item["apellido"]}}</p>
                    <p style="font-weight:900 !important; font-family:'gotham' !important; font-style:'font-style: bold'; !important; line-height: 0.4 !important; ">{{$item["curso"]}}</p>
                    <span align="center" style="font-size: 11px; font-family:'gotham' !important; margin-right:2px;">www.lodevuelvo.cl</span>
                </div>


                <div style="width:5%; margin-top:-200px; margin-left:95%" >
                    <img src="{{public_path('images/landing/logo.png')}}" width="35" style="margin-top:-112px;"  alt="...">

                </div>
                @else
                <div style="width:50%; margin-top:-92px; margin-left:42%; text-align:left; white-space: nowrap;">
                <h3 align="center" >_________________</h3>
                <h3 align="center" >_________________</h3>
                <h3 align="center" >_________________</h3>
                <span align="center" style="font-size: 11px; font-family:'gotham' !important; margin-right:2px;">www.lodevuelvo.cl</span>
                </div>
                <div style="width:5%; margin-top:-200px; margin-left:95%" >
                    <img src="{{public_path('images/landing/logo.png')}}" width="35" style="margin-top:-10px;"  alt="...">

                </div>

                @endif



                </div>


            </td>
        @if($cont == 3) </tr> @endif
        @if($cont != 3)
            @php $cont++ @endphp
        @else
            @php $cont = 1 @endphp
        @endif
        @endforeach

    </table>

    <h2 style="line-height: 0.3 !important;"> {{$url_qr[0]["codigoventa"]}} </h2>

</body>
</html>
