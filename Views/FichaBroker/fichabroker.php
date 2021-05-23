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
  <div class="row" id="filtro">
    <div class="col-md-12">
      <div class="tile">
        <div class="tile-body">
          <div class="row">
            <div class="col-9 col-md-4 p-0 pl-4 unir-pri">
              <div class="has-search">
                <span class="fa fa-search form-control-feedback" id="icon-search"></span>
                <input type="text" class="form-control" name="filter" placeholder="Nombre, doc identificación, celular">
              </div>
            </div>
            <div class="col-2 col-md-2 p-0 unir-ult">
              <button type="button" id="filter_broker" class="btn btn-info">Filtrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row" id="tabla">
    <div class="col-md-12">
      <div class="tile">
        <div class="tile-body">
          <div class="table-responsive">
            <table class="table table-hover table-bordered display nowrap w-100" id="tableBrokers">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Tipo Identificación</th>
                  <th>Identificación</th>
                  <th>Fecha de nacimiento</th>
                  <th>Sexo</th>
                  <th>Dirección</th>
                  <th>Ciudad</th>
                  <th>Telefono</th>
                  <th>Celular</th>
                  <th>Correo electronico</th>
                  <th>Monto máximo</th>
                  <th>Saldo</th>
                  <th>Cupo máximo</th>
                  <th>Estado</th>
                  <th>Causal de bloqueo</th>
                  <th>Canal</th>
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
  <div class="row" id="info">
    <div class="col-md-12">
      <div class="tab-content">
        <div class="tab-pane active" id="user-settings">
          <div class="tile user-settings">
            <h4 class="line-head">Información</h4>
            <form action="" id="form_edit">
              <div class="row">
                <div class="col-md-4 col-sm-12 mb-2">
                  <label>Nombres</label>
                  <input class="form-control" value="" type="text" name="nombres" id="nombres">
                  <input type="hidden" name="id" id="id">
                </div>
                <div class="col-md-4 col-sm-12 mb-2">
                  <label>Apellidos</label>
                  <input class="form-control" value="" type="text" name="apellidos" id="apellidos">
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 col-sm-12 mb-2">
                  <label>Tipo documento</label>
                  <select class="form-control" name="tipo_documento" id="tipo_documento">
                    <option value="" disabled selected>Tipo Documento</option>
                  </select>
                </div>
                <div class="col-md-4 col-sm-12 mb-2">
                  <label>Identificacion</label>
                  <input class="form-control" value="" type="text" name="identificacion" id="identificacion">
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 col-sm-12 mb-2">
                  <label>Fecha de nacimiento</label>
                  <input class="form-control" type="date" value="" name="fecha_nacimiento" id="fecha_nacimiento">
                </div>
                <div class="clearfix"></div>
                <div class="col-md-4 col-sm-12 mb-2">
                  <label>Genero</label>
                  <select class="form-control" name="genero" id="genero">
                    <option value="" disabled selected>Genero</option>
                  </select>
                </div>
              </div>
              <div class="row ">
                <div class="col-md-4 col-sm-12 mb-2">
                  <label>Dirección</label>
                  <input class="form-control" type="text" value="" name="direccion" id="direccion">
                </div>
                <div class="col-md-4 col-sm-12 mb-2">
                  <label>Ciudad</label>
                  <select class="form-control select2_id" name="ciudad" id="ciudad"></select>
                </div>
              </div>
              <div class="row ">
                <div class="col-md-8 col-sm-12 mb-2">
                  <label>Telefono</label>
                  <input class="form-control" value="" type="text" name="telefono" id="telefono">
                </div>
                <div class="col-md-8 col-sm-12 mb-2">
                  <label>Celular</label>
                  <input class="form-control" value="" type="text" name="celular" id="celular">
                </div>
              </div>
              <div class="row ">
                <div class="col-md-8 col-sm-12 mb-2">
                  <label>Correo electronico</label>
                  <input class="form-control" value="" type="text" name="correo_electronico" id="correo_electronico">
                </div>
              </div>
              <div class="row ">
                <div class="col-md-8 col-sm-12 mb-2">
                  <label>Monto máximo</label>
                  <input class="form-control" value="" type="text" name="monto_maximo" id="monto_maximo">
                </div>
                <div class="col-md-8 col-sm-12 mb-2">
                  <label>Cupo máximo</label>
                  <input class="form-control" value="" type="text" name="cupo_maximo" id="cupo_maximo">
                </div>
              </div>
              <div class="row ">
                <div class="col-md-8 col-sm-12 mb-2">
                  <label>Estado</label>
                  <select class="form-control" name="estado" id="estado"></select>
                </div>
                <div class="col-md-8 col-sm-12 mb-2">
                  <label>Causal bloqueo</label>
                  <select class="form-control" name="causal_bloqueo" id="causal_bloqueo"></select>
                </div>
              </div>
              <div class="row ">
                <div class="col-md-8 col-sm-12 mb-2">
                  <label>Canal</label>
                  <select class="form-control" name="canal" id="canal"></select>
                </div>
              </div>
              <div class="d-flex justify-content-center mt-4">
                <button type="button" class="btn btn-radius btn-danger mr-3" id="cancelar_form_Edit">Cancelar</button>
                <button type="submit" class="btn btn-radius btn-warning">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
<!-- Modal -->
<div class="modal fade" id="modalConfirmacion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Confirmación</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ¿Desea actualizar esta información?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" id="aceptar">Aceptar</button>
      </div>
    </div>
  </div>
</div>
<?php footerAdmin($data); ?>