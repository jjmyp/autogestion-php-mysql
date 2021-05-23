<?php
headerAdmin($data);
?>
<style>
   body {
      font-family: sans-serif;
   }


   .delete {
      -webkit-border-radius: 20px;
      -moz-border-radius: 20px;
      border-radius: 8px;
      border: 1px solid #2d9fd9;
      color: #000;
      width: 40px;
      height: 40px;
      margin: 9px;
      padding-left: 1px;
      text-align: center;
   }

   .delete:focus {
      outline: none;
      border: 1px solid #ec8932;
   }

   #formCodigoVerificacion {
      background-color: #ffffff;
      margin: 10px auto;
      padding: 40px;
      width: 35%;
      min-width: 400px;
   }

   .btn {
      border-radius: 20px 20px 20px 20px;
      width: 250px;
   }

   .text-gray {
      color: #7A7A7A;
   }
</style>

<body>
   <form id="formCodigoVerificacion" name="formCodigoVerificacion">
      <div class="logo">
         <center><img src="<?= media(); ?>/images/logo.png" width="200px" alt="" srcset=""></center>
      </div>
      <div style="float:center;">
         <h4 class="text-center text-info mt-4">VERIFICACIÓN CELULAR</h4><br>
         <h5 class="text-center text-gray  mt-1">Ingresa el codigo de verificacion de 6 digitos enviado a tu celular</h5>
         <div class=" d-flex justify-content-center">
            <input type="tel" class="delete" data-id="1" id="codigo1" maxlength="1" onkeypress="return validar_numeros(event)" onkeyup="if (this.value.length == this.getAttribute('maxlength')) codigo2.focus()" />
            <input type="tel" class="delete" data-id="2" id="codigo2" maxlength="1" onkeypress="return validar_numeros(event)" onkeyup="if (this.value.length == this.getAttribute('maxlength')) codigo3.focus()" />
            <input type="tel" class="delete" data-id="3" id="codigo3" maxlength="1" onkeypress="return validar_numeros(event)" onkeyup="if (this.value.length == this.getAttribute('maxlength')) codigo4.focus()" />
            <input type="tel" class="delete" data-id="4" id="codigo4" maxlength="1" onkeypress="return validar_numeros(event)" onkeyup="if (this.value.length == this.getAttribute('maxlength')) codigo5.focus()" />
            <input type="tel" class="delete" data-id="5" id="codigo5" maxlength="1" onkeypress="return validar_numeros(event)" onkeyup="if (this.value.length == this.getAttribute('maxlength')) codigo6.focus()" />
            <input type="tel" class="delete" data-id="6" id="codigo6" maxlength="1" onkeypress="return validar_numeros(event)" />
         </div>
         <p class="text-center">El codigo fue enviado al numero <input type="text" readonly class="form-control text-center" id="celular_seleccionado"> </p>
         <p class="text-left">¿No recibiste el SMS?</p>
         <a href="#" id="btnReenviarSMS" class="text-left text-info">Re-enviar el SMS</a><br>
         <a href="#" id="btnCambiarCelular" class="text-left text-info">Cambiar el numero telefonico</a>
      </div>
      <div class=" d-flex justify-content-center mt-3">
         <button type="submit" id="nextBtn" class="btn-block btn btn-warning">Verificar</button><br>
      </div>
      <p class="text-center">Para finalizar el registro de cuenta hemos enviado un link a tu <strong class="text-info">correo electronico</strong></p>
   </form>
   <?php footerAdmin($data); ?>