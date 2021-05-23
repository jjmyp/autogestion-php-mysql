<?php
headerAdmin($data);
getModal('modalAgregarOfertaManual', $data);
?>
<style>
    .shadow {
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1) !important;
    }

    .card-img-top {
        width: 100px !important;
    }

    .animated-checkbox input[type="checkbox"]:checked+.label-text:before {
        color: #67b5f8 !important;
    }

    /* Estilos de la lista de Deducibles - Card Ofertas*/
    .fecha_nacimiento {
        padding: 0px !important;
    }


    .btn {
        border-radius: 20px 20px 20px 20px;
        width: 250px;
    }

    .tile {
        padding: 20px 30px 10px 14px !important;
    }

    .app-title {
        display: block !important;
    }

    .btn-radius {
        border-radius: 20px;
    }

    .main {
        width: 50%;
        margin: 50px auto;
    }

    .dataTables_filter {
        display: none;
    }

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
                    <p>Consulta vehiculo Fasecolda</p>
                    <form name="consultaVehiculoFasecolda" id="consultaVehiculoFasecolda">
                        <div class="row">
                            <div class="form-group col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                <label for="">Placa <strong class="text-danger">*</strong> </label>
                                <input class="form-control" onkeyup="ConvertStringToUppercase(this)" type="text" name="inputPlaca" id="inputPlaca" placeholder="Placa">
                            </div>
                            <div class="form-group col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                <label for="">Tipo de documento <strong class="text-danger">*</strong></label>
                                <select class="form-control" name="inputTipoDocumento" id="inputTipoDocumento">
                                    <option value="" hidden="1">Tipo de identificación</option>
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
                            <div class="form-group col-md-4 col-sm-12">
                                <label for="">Numero de identificación <strong class="text-danger">*</strong> </label>
                                <input class="form-control" onkeypress="return validar_numeros(event)" type="tel" name="inputNumeroIdentificacion" id="inputNumeroIdentificacion" placeholder="Numero de identificación">
                            </div>
                        </div>

                        <label for="">Fecha de nacimiento</label>
                        <div class="row">
                            <div class="form-group col-3 col-md-1 mb-3">
                                <select class="form-control fecha_nacimiento" name="inputDiaNacimiento" id="inputDiaNacimiento">
                                    <option value="" hidden="1">Dia</option>
                                    <?php $cero = '0';
                                    for ($i = 1; $i <= 31; $i++) {
                                        if (strlen($i) != 1) {
                                            $cero = '';
                                        }  ?>
                                        <option value="<?= $cero . $i; ?>"><?= $cero . $i; ?></option>
                                    <?php  } ?>
                                </select>
                            </div>
                            <div class="form-group col-5 col-md-2 mb-3">
                                <select class="form-control fecha_nacimiento" name="inputMesNacimiento" id="inputMesNacimiento">
                                    <option value="" hidden="1">Mes</option>
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
                            <div class="form-group col-4 col-md-2  mb-3">
                                <select class="form-control fecha_nacimiento" name="inputAnoNacimiento" id="inputAnoNacimiento">
                                    <option value="" hidden="1">Año</option>
                                    <?php $ano_actual = date("Y");
                                    for ($i = 1920; $i <= $ano_actual; $i++) {  ?>
                                        <option value="<?= $i; ?>"><?= $i; ?></option>
                                    <?php  } ?>
                                </select>
                            </div>

                        </div>
                        <div class="row">
                            <div class="form-group col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                <label for="">Nombres <strong class="text-danger">*</strong> </label>
                                <input class="form-control" type="text" name="inputNombres" id="inputNombres" placeholder="Nombres">
                            </div>
                            <div class="form-group col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                <label for="">Apellidos <strong class="text-danger">*</strong> </label>
                                <input class="form-control" type="text" name="inputApellidos" id="inputApellidos" placeholder="Apellidos">
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-3">
                                <label for="">Genero</label>
                                <select class="form-control" id="inputGenero" name="inputGenero">
                                    <option value="" hidden="1">Genero</option>
                                    <option value="1">Masculino</option>
                                    <option value="2">Femenino</option>
                                </select>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-3">
                                <label for="">Estado civil</label>
                                <select class="form-control" id="inputEstadoCivil" name="inputEstadoCivil">
                                    <option value="" hidden="1">Estado civil</option>
                                    <option value="1">Soltero (a)</option>
                                    <option value="2">Casado (a)</option>
                                    <option value="3">Viudo (a)</option>
                                    <option value="4">Divorciado (a)</option>
                                    <option value="5">Unión Libre</option>
                                    <option value="6">Separado (a)</option>
                                </select>
                            </div>
                        </div>
                        <div class="justify-content-center d-flex">
                            <button class="btn btn-info" id="btnConsultarVehiculoFasecolda">Consultar datos</button>
                        </div>
                    </form>
                    <p>Consulta vehiculo Manual</p>
                    <form name="consultaVehiculoManual" id="consultaVehiculoManual">
                        <div class="row">
                            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label>Clase Vehículo:</label>
                                    <select type="select" name="inputClaseVehiculo" id="inputClaseVehiculo" class="form-control">
                                        <option value="" hidden="1">Clase del vehículo</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label>Marca Vehículo:</label>
                                    <select type="select" name="inputMarcaVehiculo" id="inputMarcaVehiculo" class="form-control">
                                        <option value="" hidden="1">Marca del vehículo</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label>Modelo Vehículo:</label>
                                    <select type="select" name="inputModeloVehiculo" id="inputModeloVehiculo" class="form-control">
                                        <option value="" hidden="1">Modelo del vehículo</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label>Linea Vehículo:</label>
                                    <select type="select" name="inputLineaVehiculo" id="inputLineaVehiculo" class="form-control">
                                        <option value="" hidden="1">Linea del vehículo</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group" id="referencia1">

                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group" id="referencia2">

                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="d-flex justify-content-center">
                        <button id="btnCotizarProductos" class="btn btn-warning">Cotizar productos</button>
                    </div>


                    <div id="viewProductos">
                        <!-- <div class="card shadow p-3 mb-5 bg-white rounded">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mt-2 d-flex justify-content-center">
                                        <img class="card-img-top shadow-sm p-3 mb-3 bg-white rounded" src="<?= media() ?>images/Aseguradoras/mapfre_color.jpg" alt="Imagen aseguradora">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mt-2 card-body">
                                        <h5 class="card-title text-center"><strong class="text-dark">Mapfre</strong> - Automovil Familiar</h5>
                                        <p class="card-title text-center">Prima <strong class="text-info">$ 540.000</strong> </p>
                                    </div>
                                </div>
                            </div>
                            <span class="border-bottom"></span>
                            <div class="mt-2"></div>
                            <div class="row">
                                <div class="col-md-2">
                                    <div class=" ml-3 mb-2">
                                        <p class="text-left">
                                            <strong class="text-info ">✓ </strong>
                                            Daños a terceros (RC): hasta $1.500 millones
                                            <strong style="color: #082c75" data-toggle="tooltip" data-placement="bottom" title="RC: Reponsabilidad civil. Valor minimo que la aseguradora otorga a un tercero afectado por un accidente de transito.">
                                                <i class="fa fa-info-circle" aria-hidden="true"></i>
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="ml-3 mb-2">
                                        <p class="text-left">
                                            <strong class="text-info">✓ </strong>
                                            Perdida total: Deducible 10% mín. 1 SMMLV
                                            <strong style="color: #082c75" data-toggle="tooltip" data-placement="bottom" title="Aplica cuando roban tu vehiculo o no puede ser reparado y la aseguradora decide indemnizar.">
                                                <i class="fa fa-info-circle" aria-hidden="true"></i>
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="ml-3 mb-2">
                                        <p class="text-left">
                                            <strong class="text-info">✓ </strong>
                                            Perdida parcial: Deducible $1.200.000
                                            <strong style="color: #082c75" data-toggle="tooltip" data-placement="bottom" title="Aplica cuando la aseguradora reemplaza y repara las piezas dañadas o robadas.">
                                                <i class="fa fa-info-circle" aria-hidden="true"></i>
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="ml-3 mb-2">
                                        <p class="text-left">
                                            <strong class="text-danger">X</strong>
                                            Grua: No aplica
                                            <strong style="color: #082c75" data-toggle="tooltip" data-placement="bottom" title="Servicio de remolque para trasladar tu vehiculo al taller, en caso de varada o de accidente.">
                                                <i class="fa fa-info-circle" aria-hidden="true"></i>
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="ml-3 mb-2">
                                        <p class="text-left">
                                            <strong class="text-info">✓ </strong>
                                            Conductor elegido: 5 eventos por vigencia
                                            <strong style="color: #082c75" data-toggle="tooltip" data-placement="bottom" title="Conductor que maneja tu carro y te lleva a casa cuando consumas bebidas alcoholicas.">
                                                <i class="fa fa-info-circle" aria-hidden="true"></i>
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3 mb-4 d-flex justify-content-center">
                                <div class="animated-checkbox">
                                    <label>
                                        <input type="checkbox" name="seleccionar" id="seleccionar"><span class="label-text">Seleccionar</span>
                                    </label>
                                    <label>
                                        <input type="checkbox" name="comparar" id="comparar"><span class="label-text">Comparar</span>
                                    </label>
                                </div>
                            </div>
                        </div> -->
                    </div>

                    <!-- <div class="card shadow p-3 mb-5 bg-white rounded" >
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mt-2 d-flex justify-content-center">
                                    <img class="card-img-top shadow-sm p-3 mb-3 bg-white rounded"  src="<?= media() ?>images/Aseguradoras/mapfre_color.jpg" alt="Imagen aseguradora">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mt-2 card-body">
                                    <h5 class="card-title text-center"><strong class="text-dark">Mapfre</strong> - Automovil Familiar</h5>
                                    <p class="card-title text-center">Prima <strong class="text-info">$ 540.000</strong> </p>
                                </div>
                            </div>
                        </div>
                        <span class="border-bottom"></span>
                        <div class="mt-2"></div>
                        <div class="row">
                            <div class="col-md-2">
                                <div class=" ml-3 mb-2">
                                    <p class="text-left">
                                        <strong class="text-info ">✓ </strong>
                                        Daños a terceros (RC): hasta $1.500 millones
                                        <strong style="color: #082c75" data-toggle="tooltip" data-placement="bottom" title="RC: Reponsabilidad civil. Valor minimo que la aseguradora otorga a un tercero afectado por un accidente de transito.">
                                            <i class="fa fa-info-circle" aria-hidden="true"></i>
                                        </strong>
                                    </p>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="ml-3 mb-2">
                                    <p class="text-left">
                                        <strong class="text-info">✓ </strong>
                                        Perdida total: Deducible 10% mín. 1 SMMLV
                                        <strong style="color: #082c75" data-toggle="tooltip" data-placement="bottom" title="Aplica cuando roban tu vehiculo o no puede ser reparado y la aseguradora decide indemnizar.">
                                            <i class="fa fa-info-circle" aria-hidden="true"></i>
                                        </strong>
                                    </p>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="ml-3 mb-2">
                                    <p class="text-left">
                                        <strong class="text-info">✓ </strong>
                                        Perdida parcial: Deducible $1.200.000
                                        <strong style="color: #082c75" data-toggle="tooltip" data-placement="bottom" title="Aplica cuando la aseguradora reemplaza y repara las piezas dañadas o robadas.">
                                            <i class="fa fa-info-circle" aria-hidden="true"></i>
                                        </strong>
                                    </p>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="ml-3 mb-2">
                                    <p class="text-left">
                                        <strong class="text-danger">X</strong>
                                        Grua: No aplica
                                        <strong style="color: #082c75" data-toggle="tooltip" data-placement="bottom" title="Servicio de remolque para trasladar tu vehiculo al taller, en caso de varada o de accidente.">
                                            <i class="fa fa-info-circle" aria-hidden="true"></i>
                                        </strong>
                                    </p>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="ml-3 mb-2">
                                    <p class="text-left">
                                        <strong class="text-info">✓ </strong>
                                        Conductor elegido: 5 eventos por vigencia
                                        <strong style="color: #082c75" data-toggle="tooltip" data-placement="bottom" title="Conductor que maneja tu carro y te lleva a casa cuando consumas bebidas alcoholicas.">
                                            <i class="fa fa-info-circle" aria-hidden="true"></i>
                                        </strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3 mb-4 d-flex justify-content-center">
                            <div class="animated-checkbox">
                                <label>
                                    <input type="checkbox" name="seleccionar" id="seleccionar"><span class="label-text">Seleccionar</span>
                                </label>
                                <label>
                                    <input type="checkbox" name="comparar" id="comparar"><span class="label-text">Comparar</span>
                                </label>
                            </div>
                        </div>                        
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</main>
<?php footerAdmin($data); ?>