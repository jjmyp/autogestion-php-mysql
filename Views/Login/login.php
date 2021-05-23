<?php
headerAdmin($data);
?>
<style>
    [class*="col-"] {
        padding: 0 !important;
    }
    .row-sinmargin{
        margin: 0 !important;
        
    }
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
    <form id="formLogin" class="login-form" action="#">
      <h4 class="login-head text-info text-center"></i>Ingresa a tu cuenta</h4>
      <div class="input-group mb-3">
        <span class=" btn-inputs text-center"><i class="fa-4x fa fa-user "></i></span>
        <input type="email" class="form-control" name="correo" id="correo" placeholder="Correo" aria-label="Correo" aria-describedby="basic-addon1">
      </div>
      <div class="input-group mb-5 mt-1">
        <span class=" btn-inputs text-center"><i class="fa-4x fa fa-lock"></i></span>
        <input type="password" class="form-control" name="contrasena" id="contrasena" placeholder="Contraseña" aria-label="Contraseña" aria-describedby="basic-addon1">
      </div>
      <div style="float:center;" class="text-center mt-1">
        <a href="<?= $data['google']->createAuthUrl(); ?>" class="btn btn-white h5"><img width="20px" src="<?= media(); ?>/images/icon-google.png" alt="Google" srcset=""><strong class="text-info p-1">Ingresa con Google</strong> </a>
        <!-- <a href="#" class="btn btn-white h5"><img width="20px" src="<?= media(); ?>/images/icon-facebook.png" alt="Facebook" srcset="">
            <strong class="text-info p-1">Ingresa con Facebook</strong> 
        </a> -->
      </div>
      <div class="mt-3" style="overflow:auto;">
        <div style="float:center;" class="text-center">
          <button type="submit" id="btnSiguiente" class="btn btn-enviar btn-warning">Iniciar Sesión</button>
        </div>
      </div>
      <div class="mt-4 ">
        <p class="semibold-text mb-2 text-center "><a href="#" data-toggle="flip">¿Olvidaste tu contraseña?</a></p>
      </div>
    </form>

    <form id="formRecuperarContrasena" class="forget-form">
      <h5 class="login-head text-info">Recupera tu contraseña</h5>
      <div class="form-group">
        <label class="control-label">Escribe tu correo electrónico registrado</label>
        <input class="form-control" type="text" name="correo_electronico" id="correo_electronicos" placeholder="Correo">
      </div>
      <p class="control-label text-center mt-1"> A tu correo electrónico llegara un link para &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong class="text-info">cambiar la contraseña</strong> </p>
      <div class="mt-3 mb-3" style="overflow:auto;">
        <div style="float:center;" class="text-center">
          <button type="submit" id="btnCambiarContrasena" class="btn btn-enviar btn-warning">Enviar</button>
        </div>
      </div><br>
      <div class="form-group">
        <p class="semibold-text mb-0"><a href="#" data-toggle="flip"><i class="fa fa-angle-left fa-fw"></i>Atras</a></p>
      </div>
    </form>

  </div>
</section>

<footer class="row row-sinmargin text-center">
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