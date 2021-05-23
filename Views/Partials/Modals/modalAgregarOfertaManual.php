<!-- Modal Permisos -->
<div class="modal fade" id="modalAgregarOfertaTr" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
        <div id="formAgregarOfertaTr" name="formAgregarOfertaTr">
            <div class="modal-header">
                <h5 class="modal-title h4" >Agregar oferta manual</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">X</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="col-md-12">
                  <div class="title">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-3">
                                    <label>Valor prima</label>
                                    <input type="text" id="valorTotal" class="form-control">
                                </div>
                                <div class="col-md-3">
                                    <label>Aseguradora</label>
                                    <select class="form-control" id="aseguradora">
                                        <option value="" hidden="1">Aseguradora</option>
                                        <option value="Seguros del Estado">Seguros del Estado</option>
                                        <option value="Seguros Bolivar">Seguros Bolivar</option>
                                        <option value="Axa Colpatria">Axa Colpatria</option>
                                        <option value="HDI Seguros">HDI Seguros</option>
                                        <option value="SBS Seguros">SBS Seguros</option>
                                        <option value="Allianz">Allianz Seguros</option>
                                        <option value="Equidad">Equidad Seguros</option>
                                        <option value="Mapfre">Seguros Mapfre</option>
                                        <option value="Liberty">Liberty Seguros</option>
                                        <option value="Previsora">Previsora Seguros</option>
                                        <option value="Solidaria">Solidaria</option>
                                        <option value="Sura">Seguros Sura</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Producto</label>
                                    <input type="text" id="nomProducto" class="form-control">
                                </div>
                                <div class="col-md-3">
                                    <label>Numero Cotización</label>
                                    <input type="text" id="numCotizacion" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-3">
                                    <label>Valor RC ($100.000.000)</label>
                                    <input type="text" id="valorRC" class="form-control">
                                </div>
                                <div class="col-md-3">
                                    <label>Cubrimiento Perdidas Total </label>
                                    <input type="text" id="valorPerdidaTotal" class="form-control">
                                </div>
                                <div class="col-md-3">
                                    <label>Cubrimiento Perdidas Parcial</label>
                                    <input type="text" id="valorPerdidaParcial" class="form-control">
                                </div>
                                <div class="col-md-3">
                                    <label>Conductores Elegidos</label>
                                    <input type="text" id="conductoresElegidos" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-3">
                                    <label>Servicio de Grua</label>
                                    <select class="form-control" id="servicioGrua">
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                  </div>
                </div>
            </div>
            <div class="modal-footer justify-content-center">
                <div class="text-center">
                  <button class="btn btn-info"><i class="fa fa-fw fa-lg fa-check-circle" aria-hidden="true" id="btnAgregarCotizacion"></i> Guardar oferta</button>
                  <button class="btn btn-danger" type="button" data-dismiss="modal"><i class="app-menu__icon fas fa-sign-out-alt" aria-hidden="true"></i> Salir</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</div>