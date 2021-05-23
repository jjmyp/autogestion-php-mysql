<?php
headerAdmin($data);
?>

<style>
    .conten-conocesPlaca {
        padding-top: 5px;
    }

    #contenCeroKM {
        display: none;
    }

    .conten-ceroKM {
        padding-top: 5px;
    }

    .conten-dia {
        padding-right: 0px !important;
    }

    .conten-mes {
        padding-right: 0px !important;
        padding-left: 0px !important;
    }

    .conten-anio {
        padding-left: 0px !important;
    }

    /* .fecha-nacimiento {
    width: 96%;
    padding: 8px 0px;
    border-radius: 2px;
    border-color: #ebebeb;
    background-color: #E8E8E8 !important;
} */

    .fecnacimiento.select2-container .select2-selection--single {
        width: 96%;
        height: 34px !important;
        background-color: #E8E8E8 !important;
    }

    .fecnacimiento.select2-container--bootstrap .select2-selection--single .select2-selection__rendered {
        padding-top: 5px;
    }

    .fecnacimiento.select2-container--bootstrap .select2-selection--single .select2-selection__arrow b {
        border-color: #000000 transparent transparent;
    }



    .nomAseg,
    .apeAseg {
        padding-bottom: 0px;
    }

    #contenBtnConsultarPlaca {
        padding-top: 25px;
    }

    #headerAsegurado {
        display: none;
    }

    #formularioVehiculo {
        display: none;
    }

    #headerFormVeh {
        padding-top: 15px;
    }

    .row-formVehManual {
        border-bottom: solid #dedede;
    }

    .form-consulVeh {
        padding-top: 20px;
    }

    #loaderVehiculo {
        padding-top: 25px;
    }

    .btnConsultarVeh {
        padding-top: 25px;
    }


    #formularioResumen {
        display: block;
    }

    .row-aseg {
        border-bottom: solid #dedede;
    }

    #masAsegurado {
        text-align: right;
    }

    #menosAsegurado {
        display: none;
        text-align: right;
    }

    #masVehiculo {
        display: none;
        text-align: right;
    }

    #menosVehiculo {
        text-align: right;
    }

    #masAgrOferta {
        display: none;
        text-align: right;
    }

    #menosAgrOferta {
        text-align: right;
    }

    .form-resumAseg {
        padding-top: 15px;
    }

    #resumenVehiculo {
        display: none;
    }

    #headerVehiculo {
        padding-top: 20px;
    }

    .row-veh {
        border-bottom: solid #dedede;
    }

    .form-resumVeh {
        padding-top: 15px;
    }


    .dpto.select2-container .select2-selection--single {
        height: 35px !important;
    }

    .dpto.select2-container--bootstrap .select2-selection--single .select2-selection__rendered {
        padding-top: 4px;
    }

    .dpto.select2-container--bootstrap .select2-selection--single .select2-selection__arrow b {
        border-color: #000000 transparent transparent;
    }


    .ciudad.select2-container .select2-selection--single {
        height: 35px !important;
    }

    .ciudad.select2-container--bootstrap .select2-selection--single .select2-selection__rendered {
        padding-top: 4px;
    }

    .ciudad.select2-container--bootstrap .select2-selection--single .select2-selection__arrow b {
        border-color: #000000 transparent transparent;
    }


    .conten-oneroso {
        padding-top: 5px;
    }

    #contenBenefOneroso {
        display: none;
    }

    #contenBtnCotizar {
        display: none;
    }

    .conten-cotizar {
        padding-top: 15px;
    }

    #contenRecotizarYAgregar {
        display: none;
    }

    .recotizarYAgregar {
        padding-top: 30px;
    }

    #formularioCotizacionManual {
        display: none;
    }

    .form-agregarOferta {
        padding-top: 15px;
    }

    .agregar-oferta {
        padding-top: 0px;
    }

    .row-agregar {
        border-bottom: solid #dedede;
    }

    .btnAgregar {
        padding-top: 25px;
        padding-bottom: 15px;
    }

    #contenParrilla {
        display: none;
    }

    .form-parrilla {
        padding-top: 20px;
        padding-bottom: 10px;
    }

    .row-parrilla {
        border-bottom: solid #dedede;
    }


    .card-ofertas {
        margin: 1% 0% 1% 0%;
        background-color: #fff;
        box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 44%);
        border-radius: 0.5em;
    }

    .list-group {
        padding-left: 0;
        margin: 15px 0px;
    }

    .list-group-item {
        padding: 5px 5px;
        margin-bottom: -5px;
        border: 0px solid #ddd;
    }

    .badge {
        display: inline-block;
        min-width: 10px;
        padding: 3px 7px;
        font-size: 13px;
        font-weight: 600;
        line-height: 1;
        color: #000000;
        text-align: left !important;
        background-color: rgb(255, 255, 255);
        border-radius: 10px;
    }

    .oferta-logo img {
        width: 100px;
        height: auto;
        margin-top: 45px;
        margin-left: 25px;
    }

    .oferta-header {
        padding-top: 24px;
    }

    .entidad {
        font-size: 16px;
        font-weight: 600;
        color: #24b5d6;
    }

    .precio {
        font-size: 16px;
        font-weight: 600;
    }

    .title-precio {
        font-size: 12px;
        font-weight: 700;
    }

    .selec-oferta {
        padding-top: 35px;
        text-align: right
    }

    .selec-oferta label {
        font-size: 16px;
        font-weight: 600;
        color: #3c8dbc;
    }

    .recom-oferta {
        padding-top: 35px;
        text-align: right
    }

    .recom-oferta label {
        font-size: 16px;
        font-weight: 600;
        color: #3c8dbc;
    }

    .verpdf-oferta {
        padding-top: 60px;
        text-align: center
    }



    @media only screen and (min-width: 768px) {}



    @media only screen and (min-width: 320px) and (max-width: 736px) {

        .nomAseg,
        .apeAseg {
            padding-bottom: 10px;
        }

        #loaderVehiculo {
            padding-top: 0px;
            padding-bottom: 10px;
        }

        .btnConsultarVeh {
            padding-top: 0px;
        }

        .agregar-oferta {
            padding-top: 10px;
        }

        .card-ofertas {
            margin: 10% 0% 10% 0%;
        }

        .list-group-item {
            padding: 6px 20px;
        }

        .oferta-logo img {
            width: 100px;
            height: auto;
            display: block;
            margin: 30px auto;
        }

        .oferta-header {
            padding-top: 0px;
            margin-top: -15px;
            text-align: center;
        }

        .selec-oferta {
            padding-top: 10px;
            text-align: center
        }

        .recom-oferta {
            padding-top: 15px;
            padding-bottom: 30px;
            text-align: center
        }

        .verpdf-oferta {
            padding-top: 0px;
            padding-bottom: 30px;
            text-align: center
        }

        .recotizarYAgregar {
            padding-top: 0px;
        }

        .btnAgregar {
            padding-top: 10px;
        }


    }

    .select2-container--bootstrap .select2-selection--single {
        padding: 0px !important;
    }
</style>
<div id="cover-spin"></div>
<div id="contentAjax"></div>
<main class="app-content">
    <div class="app-title">
        <h5 class="text-info text-center">
            <i class="<?php echo $data['page_icon']; ?>"></i><?php echo $data['page_title']; ?>
        </h5>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="tile">
                <div class="tile-body mt-3 ml-3">
                    <div class="box">


                        <div class="box-body">

                            <div id="formularioResumen">

                                <!-- FORMULARIO RESUMEN ASEGURADO -->
                                <form method="Post" id="formResumAseg">
                                    <div id="resumenAsegurado">
                                        <div class="col-lg-12" id="headerAsegurado">
                                            <div class="row row-aseg">
                                                <div class="col-xs-12 col-sm-6 col-md-3">
                                                    <label for="">DATOS DEL ASEGURADO</label>
                                                </div>
                                                <div class="col-xs-12 col-sm-6 col-md-3">
                                                </div>
                                                <div class="col-xs-12 col-sm-6 col-md-3">
                                                </div>
                                                <div class="col-xs-12 col-sm-6 col-md-3">
                                                    <div id="masAsegurado">
                                                        <p id="masA">Ver mas <i class="fa fa-plus-square-o"></i></p>
                                                    </div>
                                                    <div id="menosAsegurado">
                                                        <p id="menosA">Ver menos <i class="fa fa-minus-square-o"></i></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="DatosAsegurado">
                                            <div class="col-lg-12 form-resumAseg">
                                                <div class="row">

                                                    <div class="col-xs-12 col-sm-6 col-md-3" id="contenSuperiorPlaca">
                                                        <div class="row">
                                                            <div class="col-xs-12 col-sm-6 col-md-6 form-group" id="conocesPlaca">
                                                                <input type="hidden" name="txtIdUsuario" id="txtIdUsuario" value="<?= $_SESSION['userData']['id'] ?>">
                                                                <label>Conoces la Placa?</label>
                                                                <div class="conten-conocesPlaca">
                                                                    <label for="Si">Si</label>
                                                                    <input type="radio" name="conocesPlaca" id="txtConocesLaPlacaSi" value="Si" checked>&nbsp;&nbsp;&nbsp;&nbsp;
                                                                    <label for="No">No</label>
                                                                    <input type="radio" name="conocesPlaca" id="txtConocesLaPlacaNo" value="No" required>
                                                                </div>
                                                            </div>
                                                            <div class="col-xs-12 col-sm-6 col-md-6 form-group" id="contenPlaca">
                                                                <label for="placaVeh">Placa</label>
                                                                <input type="text" minlength="6" placeholder="Placa" maxlength="6" class="form-control" id="placaVeh" required>
                                                            </div>
                                                            <div class="col-xs-12 col-sm-6 col-md-6 form-group" id="contenCeroKM">
                                                                <label>Vehiculo 0 KM?</label>
                                                                <div class="conten-ceroKM">
                                                                    <label for="Si">Si</label>
                                                                    <input type="radio" name="ceroKM" id="txtEsCeroKmSi" value="Si" required>&nbsp;&nbsp;&nbsp;&nbsp;
                                                                    <label for="No">No</label>
                                                                    <input type="radio" name="ceroKM" id="txtEsCeroKmNo" value="No" checked>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <input type="hidden" name="idClientes" id="idClientes">
                                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                        <label for="tipoDocumentoID">Tipo de Documento</label>
                                                        <select class="form-control" id="tipoDocumentoID" required>
                                                            <option value="" hidden="1">Tipo de documento</option>
                                                            <option value="1">Cedula de ciudadania</option>
                                                            <option value="2">NIT</option>
                                                            <option value="3">Cédula de extranjería</option>
                                                            <option value="4">Tarjeta de identidad</option>
                                                            <option value="5">Pasaporte</option>
                                                            <option value="6">Carné diplomático</option>
                                                            <option value="7">Sociedad extranjera sin NIT en Colombia</option>
                                                            <option value="8">Fideicomiso</option>
                                                            <option value="9">Registro civil de nacimiento</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                        <label for="numDocumentoID">No. Documento</label>
                                                        <input type="text" maxlength="10" class="form-control" placeholder="No. Documento" id="numDocumentoID" required>
                                                    </div>

                                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                        <label for="txtNombres">Nombre Completo</label>
                                                        <div class="row">
                                                            <div class="col-xs-12 col-sm-6 col-md-6 nomAseg">
                                                                <input type="text" class="form-control" name="nombres" id="txtNombres" placeholder="Nombres" required>
                                                            </div>
                                                            <div class="col-xs-12 col-sm-6 col-md-6 apeAseg">
                                                                <input type="text" class="form-control" name="apellidos" id="txtApellidos" placeholder="Apellidos" required>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                        <label for="">Fecha de Nacimiento</label>
                                                        <div class="row" style="padding-left: 15px;">
                                                            <div class="col-xs-4 col-sm-4 col-md-4 conten-dia mb-3" style="padding: 0px !important;">
                                                                <select class="form-control fecha-nacimiento" name="dianacimiento" id="dianacimiento" required>
                                                                    <option value="">Dia</option>
                                                                    <?php
                                                                    for ($i = 1; $i <= 31; $i++) {
                                                                        if (strlen($i) == 1) { ?>
                                                                            <option value="<?php echo "0" . $i ?>"><?php echo "0" . $i ?></option><?php
                                                                                                                                                } else { ?>
                                                                            <option value="<?php echo $i ?>"><?php echo $i ?></option><?php
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        ?>
                                                                </select>
                                                            </div>
                                                            <div class="col-xs-4 col-sm-4 col-md-4 conten-mes mb-3" style="padding: 0px !important;">
                                                                <select class="form-control fecha-nacimiento" name="mesnacimiento" id="mesnacimiento" required>
                                                                    <option value="">Mes</option>
                                                                    <option value="01">Enero</option>
                                                                    <option value="02">Febrero</option>
                                                                    <option value="03">Marzo</option>
                                                                    <option value="04">Abril</option>
                                                                    <option value="05">Mayo</option>
                                                                    <option value="06">Junio</option>
                                                                    <option value="07">Julio</option>
                                                                    <option value="08">Agosto</option>
                                                                    <option value="09">Septiembre</option>
                                                                    <option value="10">Octubre</option>
                                                                    <option value="11">Noviembre</option>
                                                                    <option value="12">Diciembre</option>
                                                                </select>
                                                            </div>
                                                            <div class="col-xs-4 col-sm-4 col-md-4 conten-anio" style="padding: 0px !important;">
                                                                <select class="form-control fecha-nacimiento" name="anionacimiento" id="anionacimiento" required>
                                                                    <option value="">Año</option>
                                                                    <?php
                                                                    for ($j = 1920; $j <= 2021; $j++) {
                                                                    ?><option value="<?php echo $j ?>"><?php echo $j ?></option><?php
                                                                                                                            }
                                                                                                                                ?>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                        <label for="genero">Genero</label>
                                                        <select class="form-control" id="genero" required>
                                                            <option value="" hidden="1">Genero</option>
                                                            <option value="1">Masculino</option>
                                                            <option value="2">Femenino</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                        <label for="estadoCivil">Estado Civil</label>
                                                        <select class="form-control" id="estadoCivil" required>
                                                            <option value="" hidden="1">Estado Civil</option>
                                                            <option value="1">Soltero (a)</option>
                                                            <option value="2">Casado (a)</option>
                                                            <option value="3">Viudo (a)</option>
                                                            <option value="4">Divorciado (a)</option>
                                                            <option value="5">Unión Libre</option>
                                                            <option value="6">Separado (a)</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group" id="contenBtnConsultarPlaca">
                                                        <button class="btn btn-info btn-block" id="btnConsultarPlaca">Siguiente</button>
                                                    </div>

                                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                        <div id="loaderPlaca"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <!-- FORMULARIO VEHICULO MANUAL -->
                                <form method="Post" id="formVehManual">
                                    <div id="formularioVehiculo">
                                        <div class="col-lg-12" id="headerFormVeh">
                                            <div class="row row-formVehManual">
                                                <div class="col-xs-12 col-sm-6 col-md-3">
                                                    <label for="">CONSULTA MANUAL DEL VEHICULO</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-12 form-consulVeh">
                                            <div class="row">

                                                <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                    <label for="clase">Clase Vehículo</label>
                                                    <select class="form-control" name="clase" id="clase" required="">
                                                        <option value="" hidden="1">Seleccione la Clase</option>
                                                        <option value="AUTOMOVIL">AUTOMOVIL</option>
                                                        <option value="BUS">BUS</option>
                                                        <option value="CAMIONETA">CAMIONETA</option>
                                                        <option value="FURGONETA">FURGONETA</option>
                                                        <option value="MOTOCARRO">MOTOCARRO</option>
                                                        <option value="MOTOS">MOTOS</option>
                                                        <option value="PESADO">PESADO</option>
                                                        <option value="PICKUP">PICKUP</option>
                                                    </select>
                                                </div>
                                                <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                    <label for="Marca">Marca Vehículo</label>
                                                    <select class="form-control" name="Marca" id="Marca" required></select>
                                                </div>

                                                <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                    <label for="linea">Modelo Vehículo</label>
                                                    <div class="input-group">
                                                        <div class="input-group-addon">
                                                            <div id="loadingModelo"></div>
                                                        </div>
                                                        <select class="form-control" name="edad" id="edad" required></select>
                                                    </div>
                                                </div>

                                                <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                    <label for="linea">Linea Vehículo</label>
                                                    <select class="form-control" name="linea" id="linea" required></select>
                                                </div>

                                                <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                    <div id="referenciados"></div>
                                                </div>
                                                <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                    <div id="referenciatres"></div>
                                                </div>

                                                <div class="col-xs-12 col-sm-6 col-md-3">
                                                    <div id="loaderVehiculo"></div>
                                                </div>
                                                <div class="col-xs-12 col-sm-6 col-md-3 form-group btnConsultarVeh">
                                                    <button class="btn btn-warning btn-block" id="btnConsultarVeh">Consultar Vehículo</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <!-- FORMULARIO RESUMEN VEHICULO -->
                                <form method="Post" id="formResumVeh">
                                    <div id="resumenVehiculo">
                                        <div class="col-lg-12" id="headerVehiculo">
                                            <div class="row row-veh">
                                                <div class="col-xs-12 col-sm-6 col-md-3">
                                                    <label for="">DATOS DEL VEHICULO</label>
                                                </div>
                                                <div class="col-xs-12 col-sm-6 col-md-3">
                                                </div>
                                                <div class="col-xs-12 col-sm-6 col-md-3">
                                                </div>
                                                <div class="col-xs-12 col-sm-6 col-md-3">
                                                    <div id="masVehiculo">
                                                        <p id="masVeh">Ver mas <i class="fa fa-plus-square-o"></i></p>
                                                    </div>
                                                    <div id="menosVehiculo">
                                                        <p id="menosVeh">Ver menos <i class="fa fa-minus-square-o"></i></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="DatosVehiculo">
                                            <div class="col-lg-12 form-resumVeh">
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                        <label for="txtPlacaVeh">Placa</label>
                                                        <input type="text" class="form-control" id="txtPlacaVeh" placeholder="" disabled>
                                                    </div>
                                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                        <label for="txtClaseVeh">Clase</label>
                                                        <input type="text" class="form-control" id="txtClaseVeh" placeholder="" disabled>
                                                    </div>
                                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                        <label for="txtMarcaVeh">Marca</label>
                                                        <input type="text" class="form-control classMarcaVeh" id="txtMarcaVeh" placeholder="" disabled>
                                                    </div>
                                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                        <label for="txtModeloVeh">Modelo</label>
                                                        <input type="text" class="form-control" id="txtModeloVeh" placeholder="" disabled>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                        <label for="txtReferenciaVeh">Línea</label>
                                                        <input type="text" class="form-control classReferenciaVeh" id="txtReferenciaVeh" placeholder="" disabled>
                                                    </div>
                                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                        <label for="txtFasecolda">Fasecolda</label>
                                                        <input type="text" class="form-control" id="txtFasecolda" placeholder="" required>
                                                    </div>
                                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                        <label for="txtValorFasecolda">Valor Asegurado</label>
                                                        <input type="text" class="form-control" id="txtValorFasecolda" placeholder="" required>
                                                    </div>
                                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                        <label for="txtTipoUsoVehiculo">Tipo de Uso</label>
                                                        <select class="form-control" id="txtTipoUsoVehiculo" required>
                                                            <option value=""></option>
                                                            <option value="Particular" selected>Particular</option>
                                                            <option value="Trabajo">Trabajo</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                        <label for="txtTipoServicio">Tipo de Servicio</label>
                                                        <select class="form-control" id="txtTipoServicio" required>
                                                            <option value=""></option>
                                                            <option value="14" selected>Particular</option>
                                                            <option value="11">Publico Municipal</option>
                                                            <option value="12">Publico Intermunicipal</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                        <label for="DptoCirculacion">Departamento de Circulación</label>
                                                        <select class="form-control" id="DptoCirculacion" required>
                                                            <option value=""></option>
                                                            <option value="1">Amazonas</option>
                                                            <option value="2">Antioquia</option>
                                                            <option value="3">Arauca</option>
                                                            <option value="4">Atlántico</option>
                                                            <option value="5">Barranquilla</option>

                                                            <option value="6">Bogotá</option>
                                                            <option value="7">Bolívar</option>
                                                            <option value="8">Boyacá</option>
                                                            <option value="9">Caldas</option>
                                                            <option value="10">Caquetá</option>

                                                            <option value="11">Casanare</option>
                                                            <option value="12">Cauca</option>
                                                            <option value="13">Cesar</option>
                                                            <option value="14">Chocó</option>
                                                            <option value="15">Córdoba</option>

                                                            <option value="16">Cundinamarca</option>
                                                            <option value="17">Guainía</option>
                                                            <option value="18">La Guajira</option>
                                                            <option value="19">Guaviare</option>
                                                            <option value="20">Huila</option>

                                                            <option value="21">Magdalena</option>
                                                            <option value="22">Meta</option>
                                                            <option value="23">Nariño</option>
                                                            <option value="24">Norte de Santander</option>
                                                            <option value="25">Putumayo</option>

                                                            <option value="26">Quindío</option>
                                                            <option value="27">Risaralda</option>
                                                            <option value="28">San Andrés</option>
                                                            <option value="29">Santander</option>
                                                            <option value="30">Sucre</option>

                                                            <option value="31">Tolima</option>
                                                            <option value="32">Valle del Cauca</option>
                                                            <option value="33">Vaupés</option>
                                                            <option value="34">Vichada</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                        <label for="ciudadCirculacion">Ciudad de Circulación</label>
                                                        <select class="form-control" id="ciudadCirculacion" required></select>
                                                        <div id="listaCiudades"></div>
                                                    </div>

                                                    <div class="col-xs-12 col-sm-6 col-md-3">
                                                        <div class="row">
                                                            <div class="col-xs-5 col-sm-5 col-md-5 form-group">
                                                                <label>Es Oneroso?</label>
                                                                <div class="conten-oneroso">
                                                                    <label for="Si">Si</label>
                                                                    <input type="radio" name="oneroso" id="esOnerosoSi" value="Si">&nbsp;&nbsp;&nbsp;&nbsp;
                                                                    <label for="No">No</label>
                                                                    <input type="radio" name="oneroso" id="esOnerosoNo" value="No" required>
                                                                </div>
                                                            </div>
                                                            <div class="col-xs-7 col-sm-7 col-md-7 form-group" id="contenBenefOneroso">
                                                                <label for="benefOneroso">Beneficiario</label>
                                                                <input type="text" class="form-control" id="benefOneroso">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div id="contenBtnCotizar">
                                        <div class="col-lg-12 conten-cotizar">
                                            <div class="row">
                                                <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                    <button class="btn btn-info btn-block" id="btnCotizar">Cotizar Ofertas</button>
                                                </div>
                                                <div class="col-xs-12 col-sm-6 col-md-3 form-group">
                                                    <div id="loaderOferta"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                            </div>

                            <!-- CAMPOS OCULTOS PARA OPTENER LA INFORMACION-->
                            <div style="display: none;">
                                <label>Celular Asegurado</label>
                                <input type="text" name="celularAseg" id="celularAseg" value="3122464876">
                                <label>Email Asegurado</label>
                                <input type="text" name="emailAseg" id="emailAseg" value="tecnologia@grupoasistencia.com">
                                <label>Direccion Asegurado</label>
                                <input type="text" name="direccionAseg" id="direccionAseg" value="CALLE 70 7T2-16">
                                <label>ClaseVehiculo</label>
                                <input type="text" name="CodigoClase" id="CodigoClase">
                                <label>MarcaVehiculo</label>
                                <input type="text" name="CodigoMarca" id="CodigoMarca">
                                <label>LineaVehiculo</label>
                                <input type="text" name="CodigoLinea" id="CodigoLinea">
                                <label>LimiteRCESTADO</label>
                                <input type="text" name="LimiteRC" id="LimiteRC" value="6">
                                <label>CoberturaEstado</label>
                                <input type="text" name="CoberturaEstado" id="CoberturaEstado" value="1">
                                <label>ValorAccesorios</label>
                                <input type="text" name="ValorAccesorios" id="ValorAccesorios" value="0">
                                <label>CodigoVerificacion</label>
                                <input type="text" name="CodigoVerificacion" id="CodigoVerificacion" value="0">
                                <label>AniosSiniestro</label>
                                <input type="text" name="AniosSiniestro" id="AniosSiniestro" value="0">
                                <label>AniosAsegurados</label>
                                <input type="text" name="AniosAsegurados" id="AniosAsegurados" value="0">
                                <label>NivelEducativo</label>
                                <input type="text" name="NivelEducativo" id="NivelEducativo" value="4">
                                <label>Estrato</label>
                                <input type="text" name="Estrato" id="Estrato" value="3">
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
    </div>
</main>
<?php footerAdmin($data); ?>