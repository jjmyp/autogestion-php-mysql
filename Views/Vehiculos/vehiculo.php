<?php
headerAdmin($data);
?>
<style>
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

    .unir-med>.select2-container--default .select2-selection--single {
        border-radius: unset !important;
    }

    .unir-med>.select2-container .select2-selection--single {
        height: 37px !important;
    }

    .unir-med .form-control {
        border-radius: 0px;
        border-right: 0px;
    }

    .unir-ult .btn {
        border-radius: 0px 35px 35px 0px;
    }

    table tbody tr ul.dtr-details {
        width: 100%;
    }

    table tbody tr ul.dtr-details li span.dtr-title {
        width: 50% !important;
    }

    table tbody tr ul.dtr-details li span.dtr-data {
        width: 50% !important;
    }

    @media only screen and (min-width: 320px) and (max-width: 736px) and (orientation: portrait) {

        .centerResponsive {
            text-align: center !important;
        }
    }

    @media only screen and (min-width: 320px) and (max-width: 736px) {
        .centerResponsive {
            text-align: center !important;
        }
    }
</style>
<div id="contentAjax"></div>
<main class="app-content">
    <div class="app-title">
        <div>
            <h5 class="text-info text-center pt-3">
                <i class="<?php echo $data['page_icon']; ?> "></i><?php echo $data['page_title']; ?>
            </h5>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="tile">
                <div class="tile-body">
                    <div class="row">
                        <div class="col-9 col-md-3 p-0 unir-pri">
                            <div class="has-search">
                                <span class="fa fa-search form-control-feedback" id="icon-search"></span>
                                <input value="FQN80C" type="text" class="form-control" name="filter" placeholder="Placa ">
                            </div>
                        </div>
                        <div class="col-2 col-md-2 p-0 unir-ult">
                            <button type="button" id="filter_vehiculo" class="btn btn-info">Filtrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="tile">
                <div class="tile-body">
                    <div class="table-responsive">
                        <table class="table table-hover table-bordered display nowrap w-100" id="tableVehiculos">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Placa</th>
                                    <th>Marca</th>
                                    <th>Linea</th>
                                    <th>Ver mas</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div id="bs-accordion" class="col-md-12">
            <div class="tile">
                <div class="tile-body">
                    <div class="bs-example">
                        <div class="accordion" id="accordionExample">
                            <div class="card">
                                <div class="card-header centerResponsive" id="headingOne">
                                    <h2 class="mb-0">
                                        <button type="button" class="btn btn-link collapsed" data-toggle="collapse" data-target="#datosTomador">
                                            <h4 class="text-info">Información general del vehiculo</h4>
                                        </button>
                                    </h2>
                                </div>
                                <div id="datosTomador" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="form-group col-md-6 col-sm-12">
                                                <label for="">Capacidad de carga </label>
                                                <input class="form-control" readonly type="text" name="capacidad_carga" id="capacidad_carga" placeholder="Capacidad de carga">
                                            </div>
                                            <div class="form-group col-md-6 col-sm-12">
                                                <label for="">Capacidad de pasajeros </label>
                                                <input class="form-control" readonly type="text" name="capacidad_pasajeros" id="capacidad_pasajeros" placeholder="Capacidad de pasajeros">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="form-group col-md-4 col-sm-12">
                                                <label for="">Numero de chasis</label>
                                                <input class="form-control" readonly type="text" name="numero_chasis" id="numero_chasis" placeholder="Numero chasis">
                                            </div>
                                            <div class="form-group col-md-4 col-sm-12">
                                                <label for="">Numero de motor</label>
                                                <input class="form-control" readonly type="text" name="numero_motor" id="numero_motor" placeholder="Numero motor">
                                            </div>
                                            <div class="form-group col-md-4 col-sm-12">
                                                <label for="">Numero vin</label>
                                                <input class="form-control" readonly type="text" name="numero_vin" id="numero_vin" placeholder="Numero vin">
                                            </div>
                                        </div>

                                        <div class="row">

                                            <div class="form-group col-md-6 col-sm-12">
                                                <label for="">Codigo fasecolda </label>
                                                <input class="form-control" readonly type="text" name="codigo_fasecolda" id="codigo_fasecolda" placeholder="Codigo fasecolda">
                                            </div>

                                            <div class="form-group col-md-6 col-sm-12">
                                                <label for="">Clase de vehiculo </label>
                                                <input class="form-control" readonly type="text" name="clase_vehiculo" id="clase_vehiculo" placeholder="Clase de vehiculo">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="form-group col-md-6 col-sm-12">
                                                <label for="">Marca del vehiculo </label>
                                                <input class="form-control" readonly type="text" name="marca_vehiculo" id="marca_vehiculo" placeholder="Marca del vehiculo">
                                            </div>
                                            <div class="form-group col-md-6 col-sm-12">
                                                <label for="">Modelo de vehiculo (Año)</label>
                                                <input class="form-control" readonly type="text" onkeypress="return validar_numeros(event)" name="modelo_vehiculo" id="modelo_vehiculo" placeholder="Modelo" pattern="" pattern="[0-9]{3,4}" maxlength="4">
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="form-group col-md-6 col-sm-12">
                                                <label for="">Linea del vehiculo </label>
                                                <input class="form-control" readonly type="text" name="linea_vehiculo" id="linea_vehiculo" placeholder="Linea del vehiculo">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="form-group col-md-6 col-sm-12">
                                                <label for="">Valor asegurado </label>
                                                <input class="form-control" readonly type="text" onkeypress="return validar_numeros(event)" name="valor_asegurado" id="valor_asegurado" placeholder="Valor asegurado">
                                            </div>
                                            <div class="form-group col-md-6 col-sm-12">
                                                <label for="">Tipo de servicio </label>
                                                <input class="form-control" readonly type="text" name="tipo_servicio" id="tipo_servicio" placeholder="Tipo de servicio">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="form-group col-md-6 col-sm-12">
                                                <label for="">Ciudad de circulacion</label>
                                                <input class="form-control" readonly type="text" name="ciudad_circulacion" id="ciudad_circulacion" placeholder="Ciudad de circulacion">
                                            </div>
                                            <div class="form-group col-md-4 col-sm-12">
                                                <label for="">Tipo de combustible</label>
                                                <input class="form-control" readonly type="text" name="tipo_combustible" id="tipo_combustible" placeholder="Tipo de combustible">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header centerResponsive" id="headingTwo">
                                    <h2 class="mb-0">
                                        <button type="button" class="btn btn-link" data-toggle="collapse" data-target="#collapseTwo">
                                            <h4 class="text-info text-center">Información del propietario, interesados</h4>
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapseTwo" class="collapse " aria-labelledby="headingTwo" data-parent="#accordionExample">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="form-group col-md-6 col-sm-12">
                                                <label for="">Tipo de documento </label>
                                                <input class="form-control" readonly type="text" name="tipDoc" id="tipDoc" placeholder="Apellido">
                                            </div>
                                            <div class="form-group col-md-6 col-sm-12">
                                                <label for="">Numero de documento </label>
                                                <input class="form-control" readonly type="text" onkeypress="return validar_numeros(event)" name="identificacion" id="identificacion" placeholder="Numero de documento">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="form-group col-md-6 col-sm-12">
                                                <label for="">Nombre </label>
                                                <input class="form-control" readonly type="text" name="nombres" id="nombres" placeholder="Nombre">
                                            </div>
                                            <div class="form-group col-md-6 col-sm-12">
                                                <label for="">Apellido </label>
                                                <input class="form-control" readonly type="text" name="apellidos" id="apellidos" placeholder="Apellido">
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="form-group col-md-6 col-sm-12">
                                                <label for="">Genero </label>
                                                <input class="form-control" readonly type="text" name="genero" id="genero" placeholder="Apellido">
                                            </div>
                                            <div class="form-group col-md-6 col-sm-12">
                                                <label for="">Fecha de nacimiento </label>
                                                <input class="form-control" readonly type="date" name="fecha_nacimiento" id="fecha_nacimiento" placeholder="Fecha de nacimiento">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="form-group col-md-6 col-sm-12">
                                                <label for="">Estado civil </label>
                                                <input class="form-control" readonly type="text" name="estadoCivil" id="estadoCivil" placeholder="Apellido">
                                            </div>
                                            <div class="form-group col-md-6 col-sm-12">
                                                <label for="">Numero de telefono </label>
                                                <input class="form-control" readonly type="tel" onkeypress="return validar_numeros(event)" name="numero_telefonico" id="numero_telefonico" placeholder="Numero de telefono">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="form-group col-md-6 col-sm-12">
                                                <label for="">Dirección </label>
                                                <input class="form-control" readonly type="text" name="direccion" id="direccion" placeholder="Dirección">
                                            </div>
                                            <div class="form-group col-md-6 col-sm-12">
                                                <label for="">Correo electronico </label>
                                                <input class="form-control" readonly type="email" name="correo_electronico" id="correo_electronico" placeholder="Correo electronico">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header centerResponsive" id="headingThree">
                                    <h2 class="mb-0">
                                        <button type="button" class="btn btn-link" data-toggle="collapse" data-target="#collapseThree">
                                            <h4 class="text-info text-center">Pólizas SOAT</h4>
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapseThree" class="collapse " aria-labelledby="headingThree" data-parent="#accordionExample">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div style=" overflow: scroll;">
                                                    <table style="font-size: 10px; width:100%; text-align: center; " class="table table-bordered table-striped table-sm" id="tablePolizasSoat">

                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header centerResponsive" id="heading4">
                                    <h2 class="mb-0">
                                        <button type="button" class="btn btn-link" data-toggle="collapse" data-target="#collapse4">
                                            <h4 class="text-info text-center">Pólizas Todo Riesgo y Responsabilidad civil</h4>
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapse4" class="collapse " aria-labelledby="heading4" data-parent="#accordionExample">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div style=" overflow: scroll;">
                                                    <table style="font-size: 10px; width:100%; text-align: center; " class="table table-bordered table-striped table-sm" id="tablePolizasTrRespoCivil">

                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header centerResponsive" id="heading5">
                                    <h2 class="mb-0">
                                        <button type="button" class="btn btn-link" data-toggle="collapse" data-target="#collapse5">
                                            <h4 class="text-info text-center">Otros Vencimientos</h4>
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapse5" class="collapse " aria-labelledby="heading5" data-parent="#accordionExample">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div style=" overflow: scroll;">
                                                    <table style="font-size: 10px; width:100%; text-align: center; " class="table table-bordered table-striped table-sm" id="tableOtrosVencimientos">

                                                    </table>
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
        </div>
</main>
<?php footerAdmin($data); ?>