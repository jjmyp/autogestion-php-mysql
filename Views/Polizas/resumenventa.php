<?php
headerAdmin($data);
?>
<style>
    .trans {
        width: 400px;
        display: flex;
        justify-content: center;
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
        width: 250px;
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

    .btn1 {
        border-radius: 20px 20px 20px 20px;
        width: 150px;
    }



    .sinborde {
        border: none;
        outline: 0px;
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
</style>
<div id="cover-spin"></div>
<div id="contentAjax"></div>
<main class="app-content">
    <div class="row">
        <div class="col-md-12">
            <div class="tile">
                <div class="tile-body" id="tile">
                    <!-- Radio que se utilizara en algunos formularios -->
                    <div class="text-center form-group">
                        <img src="https://www.grupoasistencia.com/autogestionpro/Assets/images/feliz4.png" class="img-circle" alt="Cinque Terre" width="100" height="100" align="center">
                    </div>

                    <h4 class=" text-center form-group">! Genial, el SOAT ha sido expedido con exito y fue enviado al cliente ¡</h4>

                    <div class="panel-body form-group">
                        <div class="col-sm-6" class="inline">
                            <label>Numero Poliza</label>
                            <input class="sinborde" name="numero_Poliza" id="numero_Poliza" type="text" readonly>
                        </div>
                    </div>


                    <!-- Formulario para cotizar con la placa. -->
                    <form class="login-form " id="f_resumen_venta" name="f_resumen_venta" action="#">

                        <div class="col-8">
                            <h4 class="login-head text-info ">Resumen venta</h4>
                        </div>

                        <div class="row ">
                            <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                <label class="col-sm-2 col-form-label">Placa</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="placa" name="placa" readonly>
                                </div>
                            </div>

                            <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                <label class="col-sm-2 col-form-label">Marca</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="marca" name="marcca" readonly>
                                </div>
                            </div>

                            <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                <label class="col-sm-2 col-form-label">linea</label>
                                <div class="col-sm-10 ">
                                    <input type="text" class="form-control" id="linea" name="linea" readonly>
                                </div>
                            </div>

                            <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                <label class="col-sm-8 col-form-label">Tipo Combustible</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control conborde" id="tipocombustible" name="tipocombustible" readonly>
                                </div>
                            </div>
                        </div>

                        <div class="panel-heading form-group">
                            <div class="row">
                                <div class="col-11">
                                    <button type="button" style="float:right" class="btn-warning btn-sm  " id="DatosVehiculo">Ver mas</button>
                                </div>
                            </div>
                        </div>


                        <hr style="width:80%  form-group">

                        <div class="panel-body form-group">
                            <div class="collapse multi-collapse" id="multiCollapseExample1">

                                <div class="col-8">
                                    <h4 class="login-head text-info ">Datos Persona</h4>
                                </div>

                                <div class="row">
                                    <!-- FORMULARIO DATOS DE LAS PERSONAS -->
                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-2 col-form-label">Nombre</label>
                                        <div class="col-sm-10 ">
                                            <input type="text" class="form-control" id="nombre" name="nombre" readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Tipo Identificacion</label>
                                        <div class="col-sm-10 ">
                                            <input type="text" class="form-control" id="TipoIdentificacion" name="TipoIdentificacion" readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-2 col-form-label">Identificacion</label>
                                        <div class="col-sm-10 ">
                                            <input type="text" class="form-control" id="Identificacion" name="Identificacion" readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-2 col-form-label">Email</label>
                                        <div class="col-sm-10 ">
                                            <input type="text" class="form-control" id="email" name="email" readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-2 col-form-label">Celular</label>
                                        <div class="col-sm-10 ">
                                            <input type="text" class="form-control" id="celular" name="celular" readonly>
                                        </div>
                                    </div>
                                </div>

                                <hr style="width:80%">

                                <div class="col-8">
                                    <h4 class="login-head text-info ">Datos Vehiculo</h4>
                                </div>

                                <div class="row">
                                    <!--DATOS DEL VEHICULO EMITIDOS-->
                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Placa</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="Placalista" name="Placalista" readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Numero Motor</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="numeromotor" name="numeromotor" readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Numero Chasis</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="numerochasis" name="numerochasis" readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Marca</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="marcalista" name="marcalista" readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Linea</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="linealista" name="linealista" readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Modelo</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="modelo" name="modelo" readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Cilindraje</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="cilindraje" name="cilindraje" readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Tipo Servico</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="servicio" name="servicio" readonly>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Clase</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="clase" name="clase" readonly>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Capacidad Carga</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="capacidadcarga" name="capacidadcarga" readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Capacidad Pasajeros</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="capacidadtotalpasajeros" name="capacidadtotalpasajeros" readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Numero Vin</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="numerovin" name="numerovin" readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Carroceria</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="tipocarroceria" name="tipocarroceria " readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Tipo Combustible</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="lis_tipoCombustible" name="lis_tipoCombustible " readonly>
                                        </div>
                                    </div>

                                </div>
                                <hr style="width:80%">

                                <div class="col-8">
                                    <h4 class="login-head text-info ">Datos Emision </h4>
                                </div>

                                <div class="row">

                                    <!--DATOS DE LA VIGENCIA EMITIDA-->
                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Fecha Creacion</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="fechacreacion" name="fechacreacion" readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Fecha Inicio</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="fechainicio" name="fechainicio" readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Fecha Final</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="fechafinal" name="fechafinal" readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-12 col-form-label">Valor Contribucion FOSYGA</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="ValorContribucionFOSYGA" name="ValorContribucionFOSYGA" readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Imprima</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="ImpPrima" name="ImpPrima" readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Imprima Total</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="ImpPrimaTotal" name="ImpPrimaTotal" readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Tasa RUNT</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="tasarunt" name="tasarunt" readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Valor Descuento</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="ValorDescuento" name="ValorDescuento" readonly>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Descuento Ley</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="ValorDescuentoLey" name="ValorDescuentoLey" readonly>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Descuento Total</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde" id="ValorDescuentoTotal" name="ValorDescuentoTotal" readonly>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-3 form-group  ">
                                        <label class="col-sm-8 col-form-label">Valor a Pagar</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control conborde  form-group" id="ValorPagarDescuento" name="ValorPagarDescuento " readonly>
                                        </div>
                                    </div>
                                </div>

                               
                            </div>
                        </div>
                        <div class="text-center form-group ">
                                    <button type="button" id="" class="btn btn-warning btn-responsive form-group" onclick="CotizarOtro();">Cotizar o Expedir otro SOAT</button>
                                    <button type="button" id="" class="btn btn-info btn-responsive form-group" onclick="menuprincipal();">Volver al menu principal</button>
                                    <a href="https://clientes.axacolpatria.co/descargar-soat" target="_blank" class="btn btn-success btn-responsive form-group">Descarga tu SOAT</a>
                                </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</main>
<?php footerAdmin($data); ?>