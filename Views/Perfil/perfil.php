<?php headerAdmin($data); ?>
<style>
  .btn-radius {
    border-radius: 20px;
  }

  /* Extra small devices (portrait phones, less than 576px) */
  @media (min-width: 0.98px) {
    .user .profile .info {
      width: 500px;
    }
  }

  /* Small devices (landscape phones, less than 768px) */
  @media (min-width: 767.98px) {
    .user .profile .info {
      width: 500px;
    }
  }

  /* Medium devices (tablets, less than 992px) */
  @media (min-width: 991.98px) {
    .user .profile .info {
      width: 350px;
    }
  }

  /* Large devices (desktops, less than 1200px) */
  @media (min-width: 1199.98px) {
    .user .profile .info {
      width: 350px;
    }
  }

  .avatar-wrapper {
    position: relative;
    height: 200px;
    width: 200px;
    margin: 50px auto;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 1px 1px 15px -5px black;
    transition: all 0.3s ease;
  }

  .avatar-wrapper:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  .avatar-wrapper:hover .profile-pic {
    opacity: 0.5;
  }

  .avatar-wrapper .profile-pic {
    height: 100%;
    width: 100%;
    transition: all 0.3s ease;
  }

  .avatar-wrapper .profile-pic:after {
    font-family: FontAwesome;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    font-size: 190px;
    background: #ecf0f1;
    color: #fff;
    text-align: center;
  }

  .avatar-wrapper .upload-button {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .avatar-wrapper .upload-button .fa-camera-retro {
    position: absolute;
    font-size: 100px;
    top: 50px;
    left: 5px;
    right: 0px;
    text-align: center;
    opacity: 0;
    transition: all 0.3s ease;
    color: #fff;
  }

  .avatar-wrapper .upload-button:hover .fa-camera-retro {
    opacity: 0.9;
  }
</style>
<main class="app-content">
  <form name="formEditarPerfil" id="formEditarPerfil" enctype="multipart/form-data">
    <div class="row user">
      <div class="col-md-12">
        <div class="profile">
          <div class="info">
            <div class="avatar-wrapper">
              <?php
              $picture = media() . 'images/default-image.png';
              if (!empty($_SESSION['userData']['imagen_perfil'])) {
                $picture = media() . 'images/' . $_SESSION['userData']['imagen_perfil'];
              }
              ?>
              <img class="profile-pic" src="<?= $picture; ?>" />
              <div class="upload-button">
                <i class="fa fa-camera-retro" aria-hidden="true"></i>
              </div>
              <input class="file-upload" name="file-upload" id="file-upload" type="file" accept="image/*" />
            </div>

          </div>
          <div class="cover-image"></div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="tile p-0">
          <ul class="nav flex-column nav-tabs user-tabs">
            <!-- <li class="nav-item"><a class="nav-link active" href="#user-timeline" data-toggle="tab">Información</a></li> -->
            <li class="nav-item"><a class="nav-link" href="#user-settings" data-toggle="tab">Configuraciones</a></li>
          </ul>
        </div>
      </div>
      <div class="col-md-9">
        <div class="tab-content">
          <div class="tab-pane active" id="user-settings">
            <div class="tile user-settings">
              <h4 class="line-head">Información</h4>
              <div class="row">
                <div class="col-md-4 col-sm-12 mb-2">
                  <label>Tipo documento</label>
                  <input class="form-control" readonly value="<?= $_SESSION['userData']['tipo_documento'] ?>" type="text">
                </div>
                <div class="col-md-4 col-sm-12 mb-2">
                  <label>Identificacion</label>
                  <input class="form-control" readonly value="<?= $_SESSION['userData']['identificacion'] ?>" type="text">
                </div>
              </div>
              <div class="row ">
                <div class="col-md-8 col-sm-12 mb-2">
                  <label>Correo electronico</label>
                  <input class="form-control" readonly value="<?= $_SESSION['userData']['correo_electronico'] ?>" type="text">
                </div>
              </div>
              <div class="row ">
                <div class="col-md-4 col-sm-12 mb-2">
                  <label>Nombres</label>
                  <input class="form-control" readonly value="<?= $_SESSION['userData']['nombre'] ?>" type="text" name="nombres" id="nombres">
                </div>
                <div class="col-md-4 col-sm-12 mb-2">
                  <label>Apellidos</label>
                  <input class="form-control" readonly value="<?= $_SESSION['userData']['apellido'] ?>" type="text" name="apellidos" id="apellidos">
                </div>
              </div>
              <div class="row">
                <div class="col-md-8 col-sm-12 mb-2">
                  <label>Fecha de nacimiento</label>
                  <input class="form-control" type="date" value="<?= $_SESSION['userData']['fecha_nacimiento'] ?>" name="fecha_nacimiento" id="fecha_nacimiento">
                </div>
                <div class="clearfix"></div>
                <div class="col-md-8 col-sm-12 mb-2">
                  <label>Genero</label>
                  <select class="form-control" name="genero" id="genero">
                    <option value="" disabled selected>Genero</option>
                    <option value="F" <?= $_SESSION['userData']['genero'] == 'F' ? ' selected="selected"' : ''; ?>>Femenino</option>
                    <option value="M" <?= $_SESSION['userData']['genero'] == 'M' ? ' selected="selected"' : ''; ?>>Masculino</option>
                  </select>
                </div>
              </div>
              <div class="row ">
                <div class="col-md-4 col-sm-12 mb-2">
                  <label>Dirección</label>
                  <input class="form-control" type="text" value="<?= $_SESSION['userData']['direccion'] ?>" name="direccion" id="direccion">
                </div>
                <div class="col-md-4 col-sm-12 mb-2">
                  <input type="hidden" name="ciudad_id" id="ciudad_id" value="<?= $_SESSION['userData']['ciudades_id'] ?>">
                  <label>Ciudad</label>
                  <select class="form-control select2_id" name="ciudad" id="ciudad"></select>
                </div>
              </div>
              <div class="row ">
                <div class="col-md-8 col-sm-12 mb-2">
                  <label>Telefono</label>
                  <input class="form-control" readonly value="<?= $_SESSION['userData']['telefono'] ?>" type="text" name="telefono" id="telefono">
                </div>
                <div class="col-md-8 col-sm-12 mb-2">
                  <label>Celular</label>
                  <input class="form-control" readonly value="<?= $_SESSION['userData']['celular'] ?>" type="text" name="celular" id="celular">
                </div>
              </div>
              <div class="d-flex justify-content-center mt-4">
                <button type="submit" class="btn btn-radius btn-warning" type="button"><i class="fa fa-fw fa-lg fa-check-circle"></i> Guardar cambios</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</main>
<?php footerAdmin($data); ?>