<?php
headerAdmin($data);
?>
<style>
    #divInfoCliente,
    #tablesSeguimientos {
        display: none;
    }

    .search-bar {
        position: relative;
        width: 100%;
    }

    .search-bar .search-icon {
        position: absolute;
        width: 50px;
        height: 46px;
        align-items: center;
        justify-content: center;
        top: 0;
        display: flex;
        font-size: 20px;
        color: #888888;
    }

    .search-bar input {
        height: 46px;
        width: 100%;
        border: 1px solid transparent;
        border-radius: 8px;
        padding: 0 50px;
        outline: 0;
        box-shadow: 0 0 0 0 rgb(136 136 136 / 0%);
        /* font-size: 18px; */
        font: normal 16px Google Sans, Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
        transition: box-shadow .3s;
        background-color: #F1F3F4;
    }

    .search-bar input:focus {
        background: rgba(255, 255, 255, 1);
        border: 1px solid transparent;
        -webkit-box-shadow: 0 1px 1px 0 rgb(65 69 73 / 30%), 0 1px 3px 1px rgb(65 69 73 / 15%);
        box-shadow: 0 1px 1px 0 rgb(65 69 73 / 30%), 0 1px 3px 1px rgb(65 69 73 / 15%);
    }


    .search-bar>::placeholder {
        color: #888888;
        opacity: 1;
    }


    .CardHeader {
        border: unset;
        background-color: unset;
        text-align: center;
        height: 40px;
    }

    .labelCardHeader {
        font-weight: bold;
        font-size: 14px;
        color: #67b5f8;
        cursor: pointer;
    }

    .displaDesktop,
    .labelFechaNacimientoDesktop {
        display: unset;
    }

    textarea {
        resize: none;
    }

    .labelfechaNaciResponsive {
        display: none;
    }


    /* Css para el input filtro estandar */

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


    table.dataTable.dtr-inline.collapsed>tbody>tr[role="row"]>td.dtr-control:before,
    table.dataTable.dtr-inline.collapsed>tbody>tr[role="row"]>th.dtr-control:before {
        background-color: #67b5f8 !important;
    }

    table.dataTable.dtr-inline.collapsed>tbody>tr.parent>td.dtr-control:before,
    table.dataTable.dtr-inline.collapsed>tbody>tr.parent>th.dtr-control:before {
        background-color: #d33333 !important;
    }

    table.dataTable>tbody>tr.child {
        text-align: left;
    }

    table.dataTable>tbody>tr.child ul.dtr-details {
        width: 100%;
    }

    @media only screen and (min-width: 320px) and (max-width: 736px) and (orientation: portrait) {
        .tableResponsive {
            width: 100%;
        }

        .labelInput {
            display: unset;
        }

        /*.displaDesktop,*/
        /*.labelFechaNacimientoDesktop {*/
        /*    display: none;*/
        /*}*/

        .labelfechaNaciResponsive {
            display: unset;
        }


    }

    @media only screen and (min-width: 320px) and (max-width: 736px) {
        .tableResponsive {
            width: 100%;
        }

        .labelInput {
            display: unset;
        }

        /*.displaDesktop,*/
        /*.labelFechaNacimientoDesktop {*/
        /*    display: none;*/
        /*}*/

        .labelfechaNaciResponsive {
            display: unset;
        }


    }
</style>


<main class="app-content">
    <div class="app-title">
        <div>
            <h5 class="text-info" id="page_title">
                <i class="<?php echo $data['page_icon']; ?>"></i><?php echo $data['page_title']; ?>
            </h5>
        </div>
    </div>

    <!-- MODULO CONSULTA CLIENTE -->
    <div class="row" id="divFomurlarioConsulta">
        <div class="col-lg-12 mt-2" id="divTableInformacion">
            <div class="card">
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-9 col-md-4 p-0 pl-4 unir-pri">
                            <div class="has-search">
                                <span class="fa fa-search form-control-feedback" id="icon-search"></span>
                                <input type="text" class="form-control" id="buscarClienteProspecto" name="buscarClienteProspecto" placeholder="Cédula, Nombre, Placa, Póliza" autocomplete="off">
                            </div>
                        </div>
                        <div class="col-2 col-md-2 p-0 unir-ult">
                            <button onclick="buscarClienteProspecto()" type="button" id="filterinput" class="btn btn-info">Filtrar</button>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <div style=" overflow: scroll;">
                                <table style="font-size: 10px; width:100%; text-align: center; " class="table table-bordered table-striped table-sm" id="tableUsuarios">

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- MODULO FICHA CLIENTE -->
    <div class="row" id="divInfoCliente">
        <div class="col-lg-12 mt-2">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12 col-md-3 mb-2">
                            <label class="labelInput displaDesktop"> Nombres </label>
                            <input disabled placeholder="Nombres" type="text" class="form-control" id="nombres" name="nombres" autocomplete="off">
                            <input type="hidden" id="hiddenKey" name="hiddenKey">
                        </div>
                        <div class="col-6 col-md-2">
                            <label class="labelInput displaDesktop"> Tipo Documento </label>
                            <select disabled class="form-control" id="tipoIdentificacion" name="tipoIdentificacion">
                                <option hidden selected>TI</option>
                            </select>
                        </div>
                        <div class="col-6 col-md-2 mb-2">
                            <label class="labelInput displaDesktop"> # Documento </label>
                            <input disabled placeholder="#Documento" type="number" class="form-control" id="numDocumento" name="numDocumento" autocomplete="off">
                        </div>
                        <div class="col-6 col-md-2 mb-2">
                            <label class="labelInput displaDesktop"> Sexo </label>
                            <select disabled class="form-control" id="sexo" name="sexo">
                                <option hidden selected>Sexo</option>
                            </select>
                        </div>
                        <div class="col-6 col-md-2 mb-2">
                            <label class="labelInput displaDesktop">Fecha de Nacimiento</label>
                            <input disabled placeholder="Fecha Nacimiento" type="date" class="form-control" id="fechaNacimiento" name="fechaNacimiento" autocomplete="off">
                        </div>
                        <div class="col-12 col-md-2 mb-2">
                            <label class="labelInput displaDesktop"> Correo </label>
                            <input disabled placeholder="Correo Electronico" type="text" class="form-control" id="correo" name="correo" autocomplete="off">
                        </div>
                        <div class="col-6 col-md-2 mb-2">
                            <label class="labelInput displaDesktop"> Telefono 1 </label>
                            <input disabled placeholder="Telefono 1" type="number" class="form-control" id="telefono1" name="telefono1" autocomplete="off">
                        </div>
                        <div class="col-6 col-md-2 mb-2">
                            <label class="labelInput displaDesktop"> Telefono 2 </label>
                            <input disabled placeholder="Telefono 2" type="number" class="form-control" id="telefono2" name="telefono2" autocomplete="off">
                        </div>
                        <div class="col-6 col-md-2 mb-2">
                            <label class="labelInput displaDesktop"> Canal </label>
                            <select disabled class="form-control" id="canal" name="canal">
                                <option hidden selected>Canal</option>
                            </select>
                        </div>
                        <!-- <div class="col-6 col-md-2 mb-2">
                            <label class="labelInput displaDesktop"> Estado </label>
                            <select class="form-control" id="estado" name="estado">
                                <option hidden selected>Estado</option>
                            </select>
                        </div> -->

                        <div class="col-12 col-md-12 mb-2 mt-2 text-center">
                            <label style="font-weight: bold;">Información Ubicación</label>
                        </div>
                        <div class="col-6 col-md-2 mb-2">
                            <label class="labelInput displaDesktop"> Dirección </label>
                            <input disabled placeholder="Dirección" type="text" class="form-control" id="direccion" name="direccion" autocomplete="off">
                        </div>
                        <div class="col-6 col-md-2 mb-2">
                            <label class="labelInput displaDesktop"> Ciudad </label>
                            <select disabled class="form-control" id="ciudad" name="ciudad">
                                <option hidden selected>Ciudad</option>
                            </select>
                        </div>

                        <div id="accordion" class="col-12">
                            <div class="card col-12 p-0" style="border: unset;">
                                <div class="card-header CardHeader" id="headingZero" class="collapsed" data-toggle="collapse" data-target="#collapseZero" aria-expanded="false" aria-controls="collapseZero">
                                    <label class="labelCardHeader">Programar Seguimiento</label>
                                    <i class="labelCardHeader fa fa-search-plus" aria-hidden="true"></i>


                                </div>

                                <div id="collapseZero" class="collapse" aria-labelledby="headingZero" data-parent="#accordion">
                                    <div class="card-body p-0">
                                        <div class="row">


                                            <div class="col-6 col-md-2 mb-2">
                                                <label class="labelInput displaDesktop">Asunto seguimiento</label>
                                                <select class="form-control" id="asuntoSeguimiento" name="asuntoSeguimiento"></select>
                                            </div>
                                            <div class="col-6 col-md-2 mb-2">
                                                <label class="labelInput displaDesktop">Producto campaña</label>
                                                <select class="form-control" id="productoCampania" name="productoCampania"></select>
                                            </div>
                                            <div class="col-12 col-md-4 mb-2">
                                                <div class="row">
                                                    <div class="col-6 col-md-6">
                                                        <label class="labelInput displaDesktop">Fecha Seguimiento</label>
                                                        <input type="date" class="form-control" id="fechaSeguimiento" name="fechaSeguimiento" autocomplete="off">
                                                    </div>
                                                    <div class="col-6 col-md-6">
                                                        <label class="labelInput displaDesktop"> Hora Seguimiento </label>
                                                        <select class="form-control" id="horaSeguimiento" name="horaSeguimiento"></select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-4 mb-4">
                                                <label class="labelInput displaDesktop"> Comentario seguimiento </label>
                                                <textarea placeholder="Registrar Comentario" class="form-control" name="observacionesSeguimiento" id="observacionesSeguimiento" rows="3"></textarea>
                                            </div>

                                            <div class="col-12 col-md-2 mb-4">
                                                <button id="btnAddSeguimiento" onclick="addSeguimiento()" style="background-color: #FE7C21; border-radius: 5em; color: white;" class="btn btn-block">Guardar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card col-12 p-0" style="border: unset;">
                                <div class="card-header CardHeader" id="headingFive" class="collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                    <label class="labelCardHeader">Seguimientos Relacionados con el cliente</label>
                                    <i class="labelCardHeader fa fa-search-plus" aria-hidden="true"></i>

                                </div>

                                <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordion">
                                    <div class="card-body p-0">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div style=" overflow: scroll;">
                                                    <table style="font-size: 10px; width:100%; text-align: center; " class="table table-bordered table-striped table-sm" id="tableSeguimientos">

                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card col-12 p-0" style="border: unset;">
                                <div class="card-header CardHeader" id="headingOne" class="collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    <label class="labelCardHeader">Documentos Relacionados con el cliente</label>
                                    <i class="labelCardHeader fa fa-search-plus" aria-hidden="true"></i>

                                </div>

                                <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div class="card-body p-0">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div style=" overflow: scroll;">
                                                    <table style="font-size: 10px; width:100%; text-align: center; " class="table table-bordered table-striped table-sm" id="tableArchivos">

                                                    </table>
                                                </div>
                                            </div>
                                            <div class="col-md-12 text-right mt-3">
                                                <button type="button" id="btnAddFile" onclick="addFileCustomer()" style="background-color: #FE7C21; border-radius: 5em; color: white;" class="btn">Subir Archivo</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card col-12 p-0" style="border: unset;">
                                <div class="card-header CardHeader" id="headingTwo" class="collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <label class="labelCardHeader">Vehiculos relacionados al cliente</label>
                                    <i class="labelCardHeader fa fa-search-plus" aria-hidden="true"></i>

                                </div>
                                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                    <div class="card-body p-0">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div style=" overflow: scroll;">
                                                    <table style="font-size: 10px; width:100%; text-align: center; " class="table table-bordered table-striped table-sm" id="tableVehiculos">

                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card col-12 p-0" style="border: unset;">
                                <div class="card-header CardHeader" id="headingThree" class="collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    <label class="labelCardHeader">Seguros relacionados al cliente</label>
                                    <i class="labelCardHeader fa fa-search-plus" aria-hidden="true"></i>

                                </div>
                                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                    <div class="card-body p-0">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div style=" overflow: scroll;">
                                                    <table style="font-size: 10px; width:100%; text-align: center; " class="table table-bordered table-striped table-sm" id="tableSeguros">

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
    </div>


</main>
<?php footerAdmin($data); ?>