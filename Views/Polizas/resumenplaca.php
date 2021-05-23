<?php
headerAdmin($data);
?>
<style>
.label-radio {
    float: left;
    display: inline-block;
    margin: 6px;
    font-size: 20px;
}

.label-radio1 {
    font-size: 20px;
    float: left;
    display: inline-block;
    width: 50%;
}

.radius-input {
    width: 20px;
    height: 20px;
    margin-right: 9px;
}

.btn-enviar {
    border-radius: 20px 20px 20px 20px;
    width: 235px;
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
}

.sinborde {
    border: none;
    outline: 0px;
}

.conborde {
    /* border-color: rgb(255, 144, 0); */
    border-color: orange;
    outline: 0px;
}

.linea {
    display: inline-block;
}
</style>
<div id="cover-spin"></div>
<div id="contentAjax"></div>
<main class="app-content">
    <div class="row">
        <div class="col-md-12">
            <div class="tile">
                <div class="tile-body" id="tile">

                    <!-- Formulario  resumen de la cotizacion con placa-->
                    <div action="" id="f_resumen_placa">
                        <h4 class="login-head text-info text-center ">COTIZADOR SOAT</h4>

                        <div class="row">
                            <div class=" col-md-12">
                                <h4 class="login-head text-info text-center text-warning">Precio Oficial</h4>
                                <h4 class="login-head text-info text-center ">

                                    <h3 class=" text-warning text-center">$ <span type="text"
                                            class=" login-head text-info  text-warning text-center sinborde "
                                            id="valor_total"></span>
                                    </h3>
                                </h4>
                            </div>
                        </div>

                        <!--  -->

                        <!-- <div class="row">

                            <div class="col-xs-12 col-sm-6 col-md-4 form-group">
                                <label class="col-sm-2 col-form-label">Placa</label>

                                <input type="text" class="form-control" id="placa" name="placa" readonly>

                            </div>

                            <div class="col-xs-12 col-sm-6 col-md-4 form-group">
                                <label class="col-sm-2 col-form-label">Marca</label>

                                <input type="text" class="form-control" id="marca" name="marcca" readonly>
                            </div>


                            <div class="col-xs-12 col-sm-6 col-md-4 form-group">
                                <label class="col-sm-2 col-form-label">linea</label>

                                <input type="text" class="form-control" id="linea" name="linea" readonly>
                            </div>


                            <div class="col-xs-12 col-sm-6 col-md-4 form-group">
                                <label class="col-sm-2 col-form-label">Modelo</label>

                                <input type="text" class="form-control" id="modelo" name="modelo" readonly>
                            </div>


                            <div class="col-xs-12 col-sm-6 col-md-4 form-group">
                                <label class="col-sm-2 col-form-label">Cilindraje</label>

                                <input type="text" class="form-control" id="cilindraje" name="cilindraje" readonly>
                            </div>


                            <div class="col-xs-12 col-sm-6 col-md-4 form-group">
                                <label class="col-sm-10 col-form-label">Tipo Combustible</label>

                                <input type="text" class="form-control conborde" id="tipo_combustible"
                                    name="tipo_combustible" readonly>
                            </div>


                            <div class="col-xs-12 col-sm-6 col-md-4 form-group">
                                <label class="col-sm-8 col-form-label">Clase Veh</label>

                                <input type="text" class="form-control" id="clase_vehiculo" name="clase_vehiculo" readonly>
                            </div>


                            <div class="col-xs-12 col-sm-6 col-md-4 form-group">
                                <label class="col-sm-8 col-form-label">Tipo carroceria</label>

                                <input type="text" class="form-control" id="tipo_carroceria" name="tipo_carroceria" readonly>
                            </div>


                            <div class="col-xs-12 col-sm-6 col-md-4 form-group">
                                <label class="col-sm-2 col-form-label">Servicio</label>

                                <input type="text" class="form-control" id="servicio" name="servicio" readonly>
                            </div>


                            <div class="col-xs-12 col-sm-6 col-md-4 form-group">
                                <label class="col-sm-2 col-form-label">Pasajero</label>

                                <input type="text" class="form-control" id="pasajero" name="pasajero" readonly>
                            </div>


                            <div class="col-xs-12 col-sm-6 col-md-4 form-group">
                                <label class="col-sm-2 col-form-label">Carga</label>

                                <input type="text" class="form-control" id="carga" name="carga" readonly>
                            </div>


                            <div class="col-xs-12 col-sm-6 col-md-4 form-group">
                                <label class="col-sm-6 col-form-label"># Motor</label>

                                <input type="text" class="form-control" id="numero_motor" name="numero_motor" readonly>
                            </div>


                            <div class="col-xs-12 col-sm-6 col-md-4 form-group">
                                <label class="col-sm-6 col-form-label"># Chasis</label>

                                <input type="text" class="form-control" id="numero_chasis" name="numero_chasis"readonly>
                            </div>


                            <div class="col-xs-12 col-sm-6 col-md-4 form-group">
                                <label class="col-sm-6 col-form-label"># VIN</label>

                                <input type="text" class="form-control" id="numero_vin" name="numero_vin" readonly>
                            </div>

                        </div> -->


                        <div class="row">

                            
                            <div class="col-md-4 col-xs-12 col-6  form-group">
                                <label class="col-sm-4 col-form-label">Placa</label>
                                <input type="text" class="form-control" id="placa" name="placa" readonly>
                            </div>

                            <div class="col-md-4 col-xs-12 col-6  form-group">
                                <label class="col-sm-4 col-form-label">Marca</label>
                                <input type="text" class="form-control" id="marca" name="marcca" readonly>
                            </div>


                            <div class="col-md-4 col-xs-12 col-6  form-group">
                                <label class="col-4 col-form-label">linea</label>
                                <input type="text" class="form-control" id="linea" name="linea" readonly>
                            </div>


                            <div class="col-md-4 col-xs-12 col-6  form-group">
                                <label class="col-4 col-form-label">Modelo</label>
                                <input type="text" class="form-control" id="modelo" name="modelo" readonly>
                            </div>


                            <div class="col-md-4 col-xs-12 col-6  form-group">
                                <label class="col-4 col-form-label">Cilindraje</label>
                                <input type="text" class="form-control" id="cilindraje" name="cilindraje" readonly>
                            </div>


                            <div class="col-md-4 col-xs-12 col-6  form-group">
                                <label class="col-sm-10 col-form-label">Combustible</label>
                                <input type="text" class="form-control conborde" id="tipo_combustible"
                                    name="tipo_combustible" readonly>
                            </div>



                            <div class="col-xs-12 col-6 col-md-2 form-group">
                                <label class="col-12 col-form-label">Pasajeros</label>
                                <input type="text" class="form-control" id="pasajero" name="pasajero" readonly>
                            </div>

                            <div class="col-xs-12 col-6 col-md-2 ">
                                <label class="col-12 col-form-label">Carga</label>
                                <input type="text" class="form-control" id="carga" name="carga" readonly>
                            </div>


                            <div class="col-md-4 col-xs-12 col-6  form-group">
                                <label class="col-sm-12 col-form-label">Clase Veh</label>
                                <input type="text" class="form-control" id="clase_vehiculo" name="clase_vehiculo"
                                    readonly>
                            </div>

                            <div class="col-md-4 col-xs-12 col-6  form-group">
                                <label class="col-12 col-form-label">Servicio</label>
                                <input type="text" class="form-control" id="servicio" name="servicio" readonly>
                            </div>


                            <div class="col-md-4 col-xs-12 col-6  form-group">
                                <label class="col-sm-12 col-form-label">Carroceria</label>
                                <input type="text" class="form-control" id="tipo_carroceria" name="tipo_carroceria"
                                    readonly>
                            </div>



                            <div class="col-md-4 col-xs-12 col-6  form-group">
                                <label class="col-12 col-form-label"># Chasis</label>
                                <input type="text" class="form-control" id="numero_chasis" name="numero_chasis"
                                    readonly>
                            </div>

                            <div class="col-md-4 col-xs-12 col-6  form-group">
                                <label class="col-12 col-form-label"># Motor</label>
                                <input type="text" class="form-control" id="numero_motor" name="numero_motor" readonly>
                            </div>

                            <div class="col-md-4 col-xs-12 col-6  form-group">
                                <label class="col-12 col-form-label">Fecha Exp</label>
                                <input type="text" class="form-control" name="lis_FechaExpedicion"
                                    id="lis_FechaExpedicion" readonly>
                            </div>

                            <div class="col-md-4 col-xs-12 col-6  form-group">
                                <label class="col-12 col-form-label">Fecha Inicio</label>
                                <input type="text" class="form-control" name="lis_FechaInicio" id="lis_FechaInicio"
                                    readonly>
                            </div>

                            <div class="col-md-4 col-xs-12 col-6  form-group">
                                <label class="col-12 col-form-label">Fecha Final</label>
                                <input type="text" class="form-control" name="lis_FechaFinal" id="lis_FechaFinal"
                                    readonly>
                            </div>


                            <!--  -->

                            <div class="col-md-4 col-xs-12 col-6  form-group">
                                <label class="col-12 col-form-label">Descuento</label>
                                <input type="text" class="form-control" name="lis_ValorDescuento"
                                    id="lis_ValorDescuento" readonly>
                            </div>

                            <div class="col-md-4 col-xs-12 col-6  form-group">
                                <label class="col-12 col-form-label">Descuento Ley</label>
                                <input type="text" class="form-control" name="lis_ValorDescuentoLey"
                                    id="lis_ValorDescuentoLey" readonly>
                            </div>

                            <div class="col-md-4 col-xs-12 col-6  form-group">
                                <label class="col-12 col-form-label">Descuento Total</label>
                                <input type="text" class="form-control" name="lis_ValorDescuentoTotal"
                                    id="lis_ValorDescuentoTotal" readonly>
                            </div>

                            <div class="col-md-4 col-xs-12 col-6  form-group">
                                <label class="col-12 col-form-label">ImpPrima</label>
                                <input type="text" class="form-control" name="lis_ImpPrima" id="lis_ImpPrima" readonly>
                            </div>

                            <div class="col-md-4 col-xs-12 col-6  form-group">
                                <label class="col-12 col-form-label">Tasa RUNT</label>
                                <input type="text" class="form-control" name="lis_TasaRUNT" id="lis_TasaRUNT" readonly>
                            </div>

                            <div class="col-md-4 col-xs-12 col-6   mb-4 form-group">
                                <label class="col-12 col-form-label">Contribuciones</label>
                                <input type="text" class="form-control" name="lis_Contribuciones"
                                    id="lis_Contribuciones" readonly>
                            </div>

                        </div>
                        <h5 class="text-center ">¿Quieres expedir el SOAT?</h5>


                        <div style="overflow:auto;">
                            <!-- <div style="float:center;" class="float-left ">
                                <button type="button" id="btn_atras" class="btn btn-enviar btn-warning "
                                    onclick="atras();"> <i class="fa fa-arrow-circle-left "></i> ATRAS </button>
                            </div> -->
                            <div class="text-center" style="float:center;">
                                <button type="button" id="btn_siguiente" class="btn btn-enviar btn-warning "
                                    onclick="siguiente();">REALIZAR EXPEDICIÓN. <i
                                        class=" fa fa-arrow-circle-right "></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- fin del formulario -->
                </div>
            </div>
        </div>
    </div>
</main>
<?php footerAdmin($data); ?>