<?php
headerAdmin($data);
?>
<style>
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
  table tbody tr ul.dtr-details {
    width: 100%;
  }
  table tbody tr ul.dtr-details li span.dtr-title {
    width: 50% !important;
  }
  table tbody tr ul.dtr-details li span.dtr-data {
    width: 50% !important;
  }
</style>
<div id="contentAjax"></div>
<main class="app-content">
  <div class="app-title">

    <div>
      <h5 class="text-info">
        <i class="<?php echo $data['page_icon']; ?>"></i><?php echo $data['page_title']; ?>
        <!-- <button class="btn btn-info" type="button" onclick="openModal()"><i class="fa fa-plus-circle" aria-hidden="true"></i>Nuevo rol</button> -->
      </h5>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="tile">
        <div class="tile-body">
          <div class="row">
            <div class="col-5 col-md-3 p-0 unir-pri">
              <div class="has-search">
                <span class="fa fa-search form-control-feedback" id="icon-search"></span>
                <input type="text" class="form-control" name="filter" placeholder="placa, poliza, cedula">
              </div>
            </div>
            <div class="col-5 col-md-3 p-0 unir-med">
              <select name="ramo" class="form-control" id="ramo">
                <option value="">Ramo</option>
              </select>
            </div>
            <div class="col-2 col-md-2 p-0 unir-ult">
              <button type="button" id="filter_cartera" class="btn btn-info">Filtrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="tile">
        <div class="tile-body">
          <div class="table-responsive">
            <table class="table table-hover table-bordered display nowrap w-100" id="tableCarteras">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Póliza</th>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Placa</th>
                  <th># días</th>
                  <th>Estado de cartera</th>
                  <th>Tipo de documento</th>
                  <th>Documento de identidad</th>
                  <th>Ramo</th>
                  <th>Aseguradora</th>
                  <th>Vigencia desde</th>
                  <th>Vigencia hasta</th>
                  <th>Valor póliza</th>
                  <th>Forma de pago</th>
                  <th>Nombre financiera</th>
                  <th>Cuotas</th>
                  <th>Estado póliza</th>
                  <th>Fecha de pago</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
<?php footerAdmin($data); ?>