<?php
headerAdmin($data);
?>
<style>
  .btn-enviar {
    border-radius: 20px 20px 20px 20px;
    width: 250px;
  }

  .btn-white {
    border-radius: 20px 20px 20px 20px;
  }

  .btn-inputs {
    width: 39px;
    border-radius: 50%;
    margin-right: 15px;
    background-color: #67b5fb;
    vertical-align: middle;
    text-justify: auto;
  }

  .fa-4x {
    font-size: 25px;
    color: white;
    padding-top: 6px;
  }

  .form-control {
    border-radius: 8px 8px 8px 8px;
    border-bottom-left-radius: 8px !important;
    border-top-left-radius: 8px !important;
  }

  .action-btn-wrapper {
    position: relative;
  }

  .fixed-action-btn.my-custom-btn {
    position: absolute;
    right: 0px;
    top: 23px;
    padding-top: 15px;
    margin-bottom: 0;
  }



/* Extra small devices (portrait phones, less than 576px) */
@media (min-width: 0.98px) { 
  .login-content{
    min-height: 83vh !important;
  }
}
/* Small devices (landscape phones, less than 768px) */
@media (min-width: 767.98px) { 
  .login-content{
    min-height: 83vh !important;
  }
 }

/* Medium devices (tablets, less than 992px) */
@media (min-width: 991.98px) { 
  .login-content{
    min-height: 90vh !important;
  }
}

/* Large devices (desktops, less than 1200px) */
@media (min-width: 1199.98px) { 
  .login-content{
    min-height: 90vh !important;
  }
}

</style>
<section class="login-content">
  <div class="logo">
    <img src="<?= media(); ?>/images/logo.png" width="200px" alt="">
  </div>
  <div class="login-box">


    <form id="formRecuperarContrasena" class="login-form">
      <h5 class="login-head text-info">Restablecer contraseña</h5>
      <input type="hidden" name="email" id="email" value="<?= $data['email'] ?>">
      <input type="hidden" name="token" id="token" value="<?= $data['token'] ?>">
      <input type="hidden" name="id" id="id" value="<?= $data['id'] ?>">
      <div class="form-group">
        <label class="control-label">Ingresa tu nueva contraseña</label>
        <input class="form-control" type="password" name="contrasena" id="contrasena" placeholder="Contraseña">
      </div>
      <div class="form-group">
        <label class="control-label">Confirma tu nueva contraseña</label>
        <input class="form-control" type="password" name="confirmar_contrasena" id="confirmar_contrasena" placeholder="Confirmar contraseña">
      </div>
      <div class="mt-3 mb-3" style="overflow:auto;">
        <div style="float:center;" class="text-center">
          <button type="submit" id="btnSiguiente" class="btn btn-enviar btn-warning">Actualizar contraseña</button>
        </div>
      </div>
    </form>
  </div>
</section>

<footer class="row text-center">
  <span class="col"></span>
  <a style="color:#000; text-decoration: none" href="https://misegurodigital.com/DocTerminosCondiciones/Aviso-de-privacidad-misegurodigital.pdf" class="col-lg-2 col-md-12 col-sm-12">Aviso de privacidad</a>
  <a style="color:#000; text-decoration: none" href="https://misegurodigital.com/DocTerminosCondiciones/Politica-de-proteccion-de-datos-misegurodigital.pdf" class="col-lg-2 col-md-12 col-sm-12">Politica de proteccion de datos</a>
  <a style="color:#000; text-decoration: none" href="" class="col-lg-2 col-md-12 col-sm-12">(57)3156090468</a>
  <a style="color:#000; text-decoration: none" href="mailto:movil@misegurodigital.com" class="col-lg-2 col-md-12 col-sm-12">soporte@misegurodigital.com</a>
  <div class="col-lg-2 col-md-12 col-sm-12" style="overflow:auto;">
    <div style="float:center;">
      <img src="<?= media(); ?>/images/grupoasistencia.png" width="100px" alt="">
      <img src="<?= media(); ?>/images/ccce.png" width="100px" alt="">
    </div>
  </div>
  <span class="col"></span>

</footer>

<?php footerAdmin($data); ?>