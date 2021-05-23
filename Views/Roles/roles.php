<?php 
headerAdmin($data);
getModal('modalRoles', $data);
?>
<div id="contentAjax"></div>
<main class="app-content">
  <div class="app-title">
  
    <div>
      <h5 class="text-info">
        <i class="<?php echo $data['page_icon']; ?>"></i><?php echo $data['page_title']; ?>
        <button class="btn btn-info" type="button" onclick="openModal()"><i class="fa fa-plus-circle" aria-hidden="true"></i>Nuevo rol</button>
      </h5>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="tile">
        <div class="tile-body">
          <div class="table-responsive">
            <table class="table table-hover table-bordered display nowrap" id="tableRoles">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Rol</th>
                  <th>Observacion</th>
                  <th>Fecha creación</th>
                  <th>Fecha actualización</th>
                  <th>Estado</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
<?php footerAdmin($data); ?>
