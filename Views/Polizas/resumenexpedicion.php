<?php
headerAdmin($data);
// Modal.
// getModal('modalDocumento', $data);
 //getModal('modalMensajeTexto', $data);
?>
<style>
}

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

.btn {
    border-radius: 20px 20px 20px 20px;
    width: 250px;
}

.sinborde {
    border: none;
    outline: 0px;
    width: 100px;
}

.btn-white {
    border: 1px solid whitesmoke;
}

.delete {
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 8px;
    border: 1px solid #2d9fd9;
    color: #000;
    width: 40px;
    height: 40px;
    margin: 9px;
    padding-left: 1px;
    text-align: center;
}

.delete:focus {
    outline: none;
    border: 1px solid #ec8932;
}

#formCodigoVerificacion {
    background-color: #ffffff;
    margin: 10px auto;
    padding: 40px;
    width: 35%;
    min-width: 350px;
}
</style>
<div id="cover-spin"></div>
<div id="contentAjax"></div>
<main class="app-content">
    <div class="row">
        <div class="col-md-12">
            <div class="tile">
                <h4 class="login-head text-info text-center form-group">EXPEDICION SOAT</h4>

                <form id="f_resumen_expedicion">

                    <!-- 1 y 2 -->
                    <div class="col-md-12 col-sm-12 form-group ">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                            style="border-color: #CED0D4; border-width: 1px; border-style: solid; border-radius: 1.3em; padding-top: 15px; padding-bottom:15px;">
                           

                            <div class="row">
                                <div style="text-align: left;" class="col-md-12">
                                    <div class="col-md-12">
                                        <div style="border-width: 1px; border-bottom-style: solid; border-color: #CED0D4;"
                                            class="row">
                                            <div>
                                            <a class="login-head text-info" align="justify"><strong> Resumen De Datos:</strong></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- fila 1 Marca_Linea y Placa  -->
                            <div style="padding-top: 15px; text-align: left;" class="row">
                                <div class="col-6">
                                    <i class="fa fa-truck text-warning" aria-hidden="true"></i>
                                    <input type="text" class=" sinborde " id="marca_linea" name="marca_linea" readonly>
                                    <!-- <input type="text" class=" sinborde " id="marca_linea" name="marca_linea"> -->
                                </div>

                                <div class="col-6">
                                    <i class="fa fa-window-maximize text-warning" aria-hidden="true"></i>
                                    <input type="text" class="sinborde " id="placa" name="placa" readonly>
                                </div>
                            </div>

                            <!-- fila 2 Modelo y Cilindraje -->
                            <div style="padding-top: 15px; text-align: left;" class="row">
                                <div class="col-6 ">
                                    <i class="fa fa-calendar text-warning " aria-hidden="true"></i>
                                    <input type="text" class=" sinborde" id="modelo" name="modelo" readonly>
                                </div>

                                <div class="col-6 ">
                                    <i class="fa fa-wrench text-warning" aria-hidden="true"></i>
                                    <input type="text" class=" sinborde" id="cilindraje" name="cilindraje" readonly>
                                </div>
                            </div>

                            <!-- fila 3 Usuario Identificacion -->
                            <div style="padding-top: 15px;" class="row">
                                <div class="col-6 ">
                                    <i class="fa fa-user-circle-o text-warning " aria-hidden="true"></i>
                                    <input type="text" class=" sinborde" id="nombre" name="nombre" readonly>
                                </div>

                                <div class="col-6 ">
                                    <i class="fa fa-address-card-o text-warning" aria-hidden="true"></i>
                                    <input type="text" class=" sinborde" id="identificacion" name="identificacion" readonly>
                                </div>
                            </div>

                            <!-- fila 4 Direccion y Email -->
                            <div style="padding-top: 15px;" class="row">
                                <div class="col-6 ">
                                    <i class="fa fa-home text-warning " aria-hidden="true"></i>
                                    <input type="text" class=" sinborde" id="direccion" name="direccion" readonly>
                                </div>

                                <div class="col-6 ">
                                    <i class="fa fa-envelope-o text-warning " aria-hidden="true"></i>
                                    <input type="text" class=" sinborde" id="celular" name="celular" readonly>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div class="col-md-12 col-sm-12 form-group">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 "
                            style="border-color: #CED0D4; border-width: 1px; border-style: solid; border-radius: 1.3em; padding-top: 15px; padding-bottom:15px;">

                            <div class="row">
                                <div style="text-align: left;" class="col-md-12">
                                    <div class="col-md-12">
                                        <div style="border-width: 1px; border-bottom-style: solid; border-color: #CED0D4;"
                                            class="row">
                                            <div>
                                                <a href="#" id="datep" class="textoDpreguntas"><strong> Fecha de
                                                        Renovación:</strong></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>




                            <div style="padding-top: 15px;" id="cont1"> </div>

                            <div style="display: block; padding-bottom: 15px; text-align: left;" id="con2">
                                <a href="#" id="datep" class="textoDpreguntas"><strong>Fecha de Renovación:</strong></a>
                                <input type="text" style="width: 94px !important;" class="form-contro4" name="fechaNac"
                                    id="txtFechaNac" placeholder="Fecha de vencimiento">
                            </div>
                            <div class="row">
                                <div class="col-md-12" style="text-align: left; padding-bottom: 4px;">
                                    <p class="textoNota" align="justify"><strong>Nota:</strong> Recuerde que una vez
                                        emitido el SOAT, NO se podrá cambiar la fecha de vigencia.</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <!-- 3 y 4 -->
                    <div class="col-md-12 col-sm-12 form-group">
                        <div style="border-color: #CED0D4; border-width: 1px; border-style: solid; border-radius: 1.3em; padding-top: 15px; padding-bottom:15px;"
                            class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                            <div class="row">
                                <div style="text-align: left;" class="col-md-12">
                                    <div class="col-md-12">
                                        <div style="border-width: 1px; border-bottom-style: solid; border-color: #CED0D4;"
                                            class="row">
                                            <div>
                                                <a class="textoAP" align="justify"
                                                    style="color:#00d1d2;"><strong>¿Quieres enviar a tu
                                                        cliente mayor cobertura ?</strong></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div style="padding-top: 15px;" class="row">
                                <div class="col-md-12">
                                    <div class="radiobotonesAP" style="font-size: 15px; padding-bottom: 13px;">
                                        <p align="justify" class="">
                                            <strong
                                                style="padding-top: 10px; margin-bottom: 0px; word-spacing: 0.5pt;">Amplía
                                                tu cobertura</strong> de Accidentes Personales en
                                            <strong>$1.320.000
                                            </strong>pesos ingresando la fecha de nacimiento. <strong>¿Deseas
                                                este
                                                beneficio?</strong>
                                            <input type="radio" id="yesFechaTomador" name="PolizaAp" value="Si">Sí
                                            <input type="radio" id="NotFechaTomador" name="PolizaAp" value="No"
                                                checked=""> No
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div style="display: none;" id="MostrarFechaNacimientoTomador">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group input-group">
                                            <input type="date" class="form-control" name="fecha_nacimiento"
                                                id="fecha_nacimiento">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div style="padding-bottom: 2px;" class="col-md-12">
                                    <p align="justify" class="textoNota"><strong>Nota:</strong> El beneficio
                                        aplica
                                        solo para el tomador del SOAT.</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="col-md-12 col-sm-12 form-group">
                        <div style="border-color: #CED0D4; border-width: 1px; border-style: solid; border-radius: 1.3em; padding-top: 15px; padding-bottom:15px;"
                            class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                            <div class="row">
                                <div style="text-align: left;" class="col-md-12">
                                    <div class="col-md-12">
                                        <div style="border-width: 1px; border-bottom-style: solid; border-color: #CED0D4;"
                                            class="row">
                                            <div>
                                                <a class="login-head text-info" align="justify"><strong>Confirma el
                                                        correo electronico:</strong></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style="padding-top: 15px;" class="row">
                                <div class="col-md-12 col-sm-12 form-group">
                                    <input type="email" class="form-control" id="correo" name="correo"
                                        placeholder="CORREO ELECTRONICO">
                                </div>
                                <div class="col-md-12 col-sm-12 form-group">
                                    <input type="email" class="form-control" id="confirmar_correo"
                                        name="confirmar_correo" placeholder="CONFIRMAR CORREO ELECTRONICO">
                                </div>
                            </div>

                        </div>
                    </div>

                </form>

                <div id="buttons-oprions" class="d-flex justify-content-center mt-2">
                    <button type="button" class="btn-block btn btn-warning" id="expedir"
                        name="expedir">EXPEDIR</button><br>
                </div>
            </div>
        </div>
    </div>
</main>
<?php footerAdmin($data); ?>