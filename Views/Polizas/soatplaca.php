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
    width: 200px;
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
</style>
<div id="cover-spin"></div>
<div id="contentAjax"></div>
<main class="app-content">
    <div class="row">
        <div class="col-md-12">
            <div class="tile">
                <div class="tile-body" id="tile">
                    <!-- Radio que se utilizara en algunos formularios -->
                    <h4 class="login-head text-info text-center mb-3"></i>COTIZADOR SOAT</h4>
                    <h5 class="text-center ">¿Tienes la placa del vehículo?</h5>

                    <div id="radio">
                        <div class="form-group col-md-12" style="display: flex; justify-content: center;">
                            <label for="" class="label-radio text-center"><input type="radio" name="tiene_placa_2"
                                    class="radius-input" value="si" checked>Si</label>
                            <label for="" class="label-radio text-center"><input type="radio" name="tiene_placa_2"
                                    class="radius-input" value="no">No</label>
                        </div>
                    </div>

                    <!-- Formulario para cotizar con la placa. -->
                    <form class="login-form" id="f_soat_placa" name="f_soat_placa" action="f_soat_placa">
                       
                        <div class="row">
                        
                            <div class="col-md-6 col-sm-12  form-group">
                                <label>Ingresa la placa del vehiculo </label>
                                <div class="input-group flex-nowrap">
                                    <input type="text" class="form-control" id="placa" name="placa"
                                        placeholder="Ingresa la placa." aria-label="Placa"
                                        aria-describedby="addon-wrapping">
                                </div>
                            </div>

                            <div class="col-md-6 col-sm-12 form-group">
                                <label>Número de Documento</label>
                                <div class="input-group flex-nowrap">
                                    <input type="text" class="form-control" id="numero_documento"
                                        name="numero_documento" placeholder="Ingrese su numero de documento"
                                        aria-label="numero_documento" aria-describedby="addon-wrapping">
                                </div>
                            </div>
                        </div>


                        <label for="" class="text-center text-danger" id="error"></label>

                        <div class="form-group mt-3" style="overflow:auto;">
                            <div style="float:center;" class="text-center">
                                <button type="submit" id="btnSiguiente" class="btn btn-enviar btn-warning"> COTIZAR
                                </button>
                            </div>
                        </div>
                    </form>

                    <div class="wrapper fadeInDown">
                        <div id="formContent">

                            <form method="post" id="idCotizacion">
                                <div class="form-group">
                                    <div id="contenClase"></div>
                                    <div id="contenTpServicio"></div>
                                    <div id="contenPasajeros"></div>
                                    <div id="contenTonelada"></div>
                                    <div id="contenCilindraje"></div>
                                    <div id="contenEdad"></div>

                                    <div class="form-group mt-3" style="overflow:auto;">
                                        <div style="float:center;" class="text-center">
                                            <button type="submit" class="btn btn-enviar btn-warning"
                                                onclick="fnBtnConsulCotiz();">
                                                COTIZAR </button>
                                        </div>
                                    </div>
                                    <!-- <button type="submit" onclick="fnBtnConsulCotiz();"> coti </button> -->
                                    <span id="btnLoader"></span>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</main>
<?php
footerAdmin($data);
?>