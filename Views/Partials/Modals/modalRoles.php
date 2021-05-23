<!-- Modal agregar roles -->
<div class="modal fade" id="modalRoles" tabindex="-1" role="dialog" aria-labelledby="modalAgregarRolesLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable" role="document">
    <div class="modal-content">
      <form id="formAgregarRol" name="formAgregarRol">
        <div class="modal-header">
          <h5 class="modal-title" id="modalAgregarRolesLabel">Nuevo rol</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <input type="hidden" name="idRol" id="idRol">
            <div class="form-group">
              <label class="control-label">Nombre rol</label>
              <input class="form-control" type="text" name="txtRol" id="txtRol" placeholder="Ingresa el rol">
            </div>
            <div class="form-group">
              <label class="control-label">Descripcion</label>
              <input class="form-control" type="text" name="txtObservacion" id="txtObservacion" placeholder="Ingresa la descripcion del rol">
            </div>
            <div class="form-group selectEstado"></div>
        </div>
        <div class="modal-footer">
          <button id="btnActionForm" type="submit" class="btn btn-info"><i class="fa fa-fw fa-lg fa-check-circle" ></i><span id="btnText">Guardar</span></button>        
          <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fa fa-fw fa-lg fa-times-circle"></i>Cerrar</button>
        </div>
      </form>
    </div>
  </div>
</div>
