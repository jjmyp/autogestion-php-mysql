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
        width: 135px;
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
                <div class="tile-body">
                    <!-- Formulario Expedir soat-->
                    <form name="f_soat_expedicion" id="f_soat_expedicion">
                        <h4 class="login-head text-info text-center"></i>EXPEDICION SOAT</h4>

                        <div class="row">
                            <div class="form-group col-md-12">
                                <h5 class="login-head "></i>Llenar campos del asegurado.</h5>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 col-sm-12 form-group">
                                <input type="text" class="form-control" readonly id="nombre" name="nombre" placeholder="NOMBRE" text-center>
                            </div>

                            <div class="col-md-6 col-sm-12 form-group ">
                                <input type="text" class="form-control" readonly id="apellido" name="apellido" placeholder="APELLIDO" text-center>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-2 form-group  ">
                                <input type="text" readonly name="tipo_documento" id="tipo_documento" class="form-control" />
                            </div>

                            <div class="col-md-4 ">
                                <input type="text" readonly name="identificacion" id="identificacion" class="form-control" />
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-md-6 col-sm-12 form-group ">
                                <input type="text" class="form-control" id="celular" name="celular" placeholder="Celular" text-center>
                            </div>
                            <div class="col-md-6 col-sm-12 form-group">
                                <input type="text" class="form-control" id="correo_electronico" name="correo_electronico" placeholder="Correo Electrónico" text-center>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 col-sm-12 form-group ">
                                <input type="text" class="form-control" id="direccion" name="direccion" placeholder="Dirección" text-center>
                            </div>

                            <div class="col-md-6 col-sm-12 mb-4 form-group ">
                                <select class="form-control" name="ciudad" id="ciudad">
                                    <option class=" form-control" value="" hidden="0"> CALI - VALLE DEL CAUCA</option>
                                </select>
                            </div>

                        </div>

                        <div class="row">
                            <div class="form-group col-md-12 mb-3 text-center">
                                <h6 class="login-head"></i>POR FAVOR CONFIRMA LA INFORMACIÓN TRIBUTARIA:</h6>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 col-sm-12 text-center">
                                <div class="col-xs-offset-6 col-md-offset-6 col-xs-9">
                                    <label class="checkbox-inline">
                                        Declarante IVA(antes régimen común) <input type="radio" name="acepto_termino" id="acepto_termino" value="acepto_termino">
                                    </label>
                                </div>
                            </div>
                            <div class=" col-md-12 col-sm-12 text-center">
                                <div class="col-xs-offset-3 col-md-offset-3 col-xs-9">
                                    <label class="checkbox-inline">
                                        No declarante IVA(antes régimen simplificado) <input type="radio" name="acepto_termino" id="acepto_termino" value="acepto_termino">
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-md-12 col-sm-12  text-center ">
                                <div class="col-xs-offset-3 col-md-offset-3 col-xs-9">
                                    <label class="checkbox-inline ">
                                        <h6 class="login-head "> <input type="checkbox" name="acepto_termino" id="acepto_termino" value="acepto_termino" required> Acepto términos, condiciones y tratamiento de datos</h6>
                                    </label>
                                </div>
                            </div>
                        </div>


                        <div class="form-group mt-3" style="overflow:auto;">
                            <div style="float:center;" class="float-left ">
                                <button type="button" id="btn_atras" class="btn btn-enviar btn-warning " onclick="pasar_atras();"> <i class="fa fa-arrow-circle-left "></i> ATRAS </button>
                            </div>
                            <div style="float:center;" class=" float-right">
                                <button type="submit" id="btn_siguiente" class="btn btn-enviar btn-warning " >SIGUIENTE <i class=" fa fa-arrow-circle-right "></i> </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</main>
<?php footerAdmin($data); ?>