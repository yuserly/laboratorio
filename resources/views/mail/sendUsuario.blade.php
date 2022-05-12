<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="viewport" content="width=device-width" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body style="margin:0px; background: #f8f8f8; ">
<div width="100%" style="background: #f8f8f8; padding: 0px 0px; font-family:arial; line-height:28px; height:100%;  width: 100%; color: #514d6a;">
  <div style="max-width: 700px; padding:50px 0;  margin: 0px auto; font-size: 14px">
    <table border="0" cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 20px">
      <tbody>
        <tr>
          <td style="vertical-align: top; padding-bottom:30px;" align="center">
            <a href="http://novakimen.cl" target="_blank">
                <img src="https://novakimen.cl/web/images/logo.png" width="40%" alt="">
            <br/>
          </td>
        </tr>
      </tbody>
    </table>
    <div style="padding: 40px; background: #fff;">
      <table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
        <tbody>
          <tr>
            <td><b>Estimado(a)</b> {{$send_nombres}} {{$send_apellidos}}<br>
              <p>Ha recibo un nuevo correo mediante RESERVAS NOVAKIMEN WEB.</p>
              <hr>
              @if($send_estado == 1)
                <p>Le informamos que se le ha creado un nuevo usuario, con el que podra tener acceso mediante las siguientes credenciales.</p>
              @elseif($send_estado == 2)
              <p>Le informamos que se ha acutualizado su contraseña, le entregamos a continuación sus nueva credenciale:</p>
              @endif
              <p><b>Usuario</b>: {{$send_correo}}</p>
              <p><b>Contraseña</b>: {{$send_password}}</p>
              <hr>
              <p>Sus credenciales son de total cuidado personal, le aconsejamos eliminar este correo para evitar que esta información pueda ser vista por otro usuario.</p>

              <a href="mailto:{{$send_correo}}" style="display: inline-block; padding: 11px 30px; margin: 20px 0px 30px; font-size: 15px; color: #fff; background: #00c0c8; border-radius: 60px; text-decoration:none;"> Ingreso Plataforma </a>

              
              <p>Muchas Gracias.</p> 
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="text-align: center; font-size: 12px; color: #b2b2b5; margin-top: 20px">
      <p><a href="https://www.novakimen.cl" target="_blank">NOVAKIMEN</a><br>        
    </div>
  </div>
</div>
</body>
</html>
