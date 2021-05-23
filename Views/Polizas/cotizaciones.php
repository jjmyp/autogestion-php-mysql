<?php
headerAdmin($data);
?>

<style>
  .tile {
    padding: 20px 30px 10px 14px !important;
  }

  .app-title {
    display: block !important;
  }

  .btn-radius {
    border-radius: 20px;
  }

  .main {
    width: 50%;
    margin: 50px auto;
  }

  .dataTables_filter {
    display: none;
  }

  .has-search .form-control {
    padding-left: 2.375rem;
  }

  .has-search .form-control-feedback {
    position: absolute;
    z-index: 2;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: #aaa;
  }

  .unir-pri .form-control {
    border-radius: 35px 0px 0px 35px;
    border-right: 0px;
  }

  .unir-med .form-control {
    border-radius: 0px;
    border-right: 0px;
  }

  .unir-ult .btn {
    border-radius: 0px 35px 35px 0px;
  }
</style>
<div id="contentAjax"></div>
<main class="app-content">
  <div class="app-title">
    <h5 class="text-info text-center pt-3">
      <i class="<?php echo $data['page_icon']; ?>"></i><?= $data['page_title']; ?>
    </h5>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="tile">
        <div class="tile-body mt-3 ml-3">
          <div class="row">
            <div class="col-9 col-md-4 p-0 unir-pri">
              <div class="has-search">
                <span class="fa fa-search form-control-feedback" id="icon-search"></span>
                <input type="text" class="form-control" id="filter" name="filter" placeholder="Placa, cedula">
              </div>
            </div>
            <div class="col-2 col-md-2 p-0 unir-ult">
              <button type="button" id="filter_cotizacion" class="btn btn-info">Filtrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <div class="tile">
        <div class="tile-body mt-3 ml-3">
          <div class="row mt-4">
            <div class="table-responsive">
              <table class="table table-hover table-bordered display nowrap" style="width:100%" id="tableCotizaciones">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Fecha</th>
                    <th>Placa</th>
                    <th>Cliente</th>
                    <th>Vehiculo</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody id="tBodyCotizacion"></tbody>
              </table>
              <div class="d-flex justify-content-center mt-2">
                <button id="btnCotizarNuevo" class="btn btn-radius btn-info text-center">Cotizar nuevo vehiculo</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</main>
<!-- Modal -->
<div class="modal fade" id="ModalCotizarTodoRiesgo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-info" id="exampleModalLabel">Cotizar todo riesgo</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="formConsultaCotizacion">
          <div class="row">
            <div class="form-group col-md-12 col-sm-12">
              <label for="">Placa<strong class="text-danger">*</strong></label>
              <input class="form-control" type="text" name="placa" id="placa" placeholder="Placa">
            </div>
            <div class="form-group col-md-6 col-sm-12">
              <label for="">Tipo de documento <strong class="text-danger">*</strong> </label>
              <select class="form-control" name="tipo_documento" id="tipo_documento">
                <option value="" hidden="1">Tipo de documento</option>
                <option value="1">CC</option>
                <option value="2">NIT</option>
                <option value="3">CE</option>
                <option value="4">TI</option>
                <option value="5">PP</option>
              </select>
            </div>
            <div class="form-group col-md-6 col-sm-12">
              <label for="">Numero de documento<strong class="text-danger">*</strong></label>
              <input class="form-control" type="text" name="identificacion" id="identificacion" placeholder="Numero de documento">
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-6 col-sm-12">
              <label for="">Fecha de nacimiento <strong class="text-danger">*</strong></label>
              <input class="form-control" type="date" name="fecha_nacimiento" id="fecha_nacimiento" placeholder="Fecha de nacimiento">
            </div>
            <div class="form-group col-md-6 col-sm-12">
              <label for="">Genero<strong class="text-danger">*</strong> </label>
              <select class="form-control" name="genero" id="genero">
                <option value="" hidden="1">Genero</option>
                <option value="1">Masculino</option>
                <option value="2">Femenino</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-6 col-sm-12">
              <label for="">Nombres<strong class="text-danger">*</strong></label>
              <input class="form-control" type="text" name="nombres" id="nombres" placeholder="Nombres">
            </div>
            <div class="form-group col-md-6 col-sm-12">
              <label for="">Apellidos<strong class="text-danger">*</strong></label>
              <input class="form-control" type="text" name="apellidos" id="apellidos" placeholder="Apellidos">
            </div>
          </div>
          <div class="d-flex justify-content-center mt-2">
            <button id="btnConsultar" class="btn btn-radius w-50 btn-warning text-center">Consultar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
<?php footerAdmin($data); ?>