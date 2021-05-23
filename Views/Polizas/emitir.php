<?php
headerAdmin($data);
getModal('modalDocumento2', $data);
getModal('modalMensajeTexto', $data);
getModal('modalFotoBase', $data);
getModal('modalFaceId', $data);

?>
<style>

    /* PHONE VALIDATION */
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
        min-width: 355px;
    }

    .text-gray {
        color: #7A7A7A;
    }

    .btn-radius {
        border-radius: 20px;
    }


    /* DOCUMENT VALIDATION */

    /* Extra small devices (portrait phones, less than 576px) */
    @media (min-width: 0.98px) {
        .user .profile .info {
            width: 250px;
        }

        .viewImage {
            width: 250px;
        }

        .avatar-wrapper {
            position: relative;
            height: 200px;
            width: 450px;
            margin: 50px auto;
            overflow: hidden;
            box-shadow: 1px 1px 15px -5px black;
            transition: all 0.3s ease;
        }

        .btn {
            border-radius: 20px 20px 20px 20px;
            width: 50px;
        }
    }

    /* Small devices (landscape phones, less than 768px) */
    @media (min-width: 767.98px) {
        .user .profile .info {
            width: 250px;
        }

        .viewImage {
            width: 250px;
        }

        .avatar-wrapper {
            position: relative;
            height: 200px;
            width: 400px;
            margin: 50px auto;
            overflow: hidden;
            box-shadow: 1px 1px 15px -5px black;
            transition: all 0.3s ease;
        }

        .btn {
            border-radius: 20px 20px 20px 20px;
            width: 50px;
        }
    }

    /* Medium devices (tablets, less than 992px) */
    @media (min-width: 991.98px) {
        .user .profile .info {
            width: 250px;
        }

        .viewImage {
            width: 250px;
        }

        .avatar-wrapper {
            position: relative;
            height: 200px;
            width: 400px;
            margin: 50px auto;
            overflow: hidden;
            box-shadow: 1px 1px 15px -5px black;
            transition: all 0.3s ease;
        }
    }

    /* Large devices (desktops, less than 1200px) */
    @media (min-width: 1199.98px) {
        .user .profile .info {
            width: 350px;
        }
    }

    .avatar-wrapper {
        position: relative;
        width: 100%;
        height: 250px;
        /* margin: 50px auto; */
        overflow: hidden;
        box-shadow: 1px 1px 15px -5px black;
        transition: all 0.3s ease;
    }

    .avatar-wrapper:hover {
        transform: scale(1.05);
        cursor: pointer;
    }

    .avatar-wrapper:hover .profile-pic {
        opacity: 0.5;
    }

    .avatar-wrapper .profile-pic {
        width: 250px;
        height: 250px;
        transition: all 0.3s ease;
    }

    .avatar-wrapper .profile-pic:after {
        font-family: FontAwesome;
        content: "";
        top: 0;
        left: 0;
        width: 250px;
        height: 250px;
        position: absolute;
        font-size: 190px;
        background: #ecf0f1;
        color: #fff;
        text-align: center;
    }

    .avatar-wrapper .upload-button {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }

    .avatar-wrapper .upload-button .fa-camera-retro {
        position: absolute;
        font-size: 100px;
        top: 50px;
        left: 5px;
        right: 0px;
        text-align: center;
        opacity: 0;
        transition: all 0.3s ease;
        color: #fff;
    }

    .avatar-wrapper .upload-button:hover .fa-camera-retro {
        opacity: 0.9;
    }

    .btn {
        border-radius: 20px 20px 20px 20px;
        width: 150px;
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
                <div class="tile-body" id="f_emitir" name="f_emitir">

                    <!-- Radio que se utilizara en algunos formularios -->
                    <!-- <h4 class="login-head text-info text-center"></i>COTIZADOR SOAT</h4> -->                
                    <!-- Formulario de cotizacion con placa -->
                    <form class="login-form" id="f_emitir" name="f_emitir" action="#">
                    <input type="hidden" name="contador_expedicion" id="contador_expedicion" value="<?= $_SESSION['userData']['contador_expedicion'] ?>">
                        <input type="hidden" name="prueba" id="prueba" value="0">
                        <input type="hidden" name="identificacion_referidor" id="identificacion_referidor" value="<?= $_SESSION['userData']['identificacion'] ?>">
                        <input type="hidden" name="accountId_referidor" id="accountId_referidor" value="<?= $_SESSION['userData']['account_id'] ?>">
                        <input type="hidden" name="celular_referidor" id="celular_referidor" value="<?= $_SESSION['userData']['celular'] ?>">
                        <div class="row">
                            <div class=" col-md-12">
                                <h4 class="login-head text-info text-warning text-center">Valor a pagar $ <span type="text" class=" login-head text-info  text-warning text-center sinborde " id="valor_total" name="valor_total"></span>
                                </h4>
                            </div>
                        </div>
                        <h4 class=" text-info "></i>Datos asegurado:</h4>

                        <!-- fila 1 nombre y  Placa  -->

                        <div style="padding-top: 15px; text-align: left;" class="row">

                            <div class="col-6 ">
                                <i class="fa fa-truck text-warning" aria-hidden="true"></i>
                                <input type="text" class=" sinborde" id="nombre" name="nombre">
                            </div>

                            <div class="col-6 ">
                                <i class="fa fa-window-maximize text-warning" aria-hidden="true"></i>
                                <input type="text" class=" sinborde" id="placa" name="placa">
                            </div>

                        </div>
                        <!-- fila  marca-linea  y tipo documento -->
                        <div style="padding-top: 15px; text-align: left;" class="row">

                            <div class="col-6 ">
                                <i class="fa fa-user-circle-o text-warning" aria-hidden="true"></i>
                                <input type="text" class=" sinborde" id="marca" name="marca">
                            </div>

                            <div class="col-6 ">
                                <i class="fa fa-address-card-o text-warning" aria-hidden="true"></i>
                                <input type="text" class=" sinborde form-group" id="numero_documento" name="numero_documento">
                            </div>
                        </div>
                        <div class="row">
                            <div class=" col-md-12 ">
                                <h4 class="login-head text-info text-center ">Confirma medio de pago</h4>
                                </h4>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 col-sm-12 text-center">
                                <div class="col-xs-offset-6 col-md-offset-6 col-xs-9 login-head">
                                    <div class="column-label d-inline-block">
                                        <input type="radio" name="foma_pago" id="forma_pago" value="CREDITO">
                                        <label class="checkbox-inline login-head ml-1" style="color: #000000;"> CREDITO</label>
                                    </div>
                                    <div class="column-label d-inline-block ml-3">
                                        <input type="radio" name="foma_pago" id="forma_pago" value="TARJETADECREDITO">
                                        <label class="checkbox-inline login-head ml-1" style="color: #000000;">TARJETA DE CREDITO</label>
                                    </div>
                                    <div class="column-label d-inline-block ml-3">
                                        <input type="radio" name="foma_pago" id="forma_pago" value="PSE">
                                        <label class="checkbox-inline login-head ml-1" style="color: #000000;"> PSE</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div class="form-group mt-3" style="overflow:auto;">
                        <div style="float:center;" class="text-center">
                            <button type="button" id="btnExpedir" class="btn btn-enviar btn-warning"> EXPEDIR </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</main>
<?php footerAdmin($data); ?>