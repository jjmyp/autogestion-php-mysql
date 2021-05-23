<?php
headerAdmin($data);
?>
<style>
    .search-bar {
        position: relative;
        width: 100%;
    }

    .search-bar .search-icon {
        position: absolute;
        width: 50px;
        height: 33px;
        align-items: center;
        justify-content: center;
        top: 0;
        display: flex;
        font-size: 20px;
        color: #888888;
    }

    .search-bar input {
        height: 33px;
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

    td.details-control {
        background: url('../Assets/images/plus.svg') no-repeat center center;
        cursor: pointer;
    }


    tr.shown td.details-control {
        background: url('../Assets/images/minus.svg') no-repeat center center;
    }


    #divFichaPoliza {
        display: none;
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

    .colorTituloFechaPopover {
        color: #4737FD;
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

    .unir-med>.select2-container--default .select2-selection--single {
        border-radius: unset !important;
    }

    .unir-med>.select2-container .select2-selection--single {
        height: 37px !important;
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

    @media only screen and (min-width: 320px) and (max-width: 736px) and (orientation: portrait) {}

    @media only screen and (min-width: 320px) and (max-width: 736px) {}
</style>

<main class="app-content">
    <div class="app-title">
        <div>
            <h5 class="text-info" id="page_title">
                <i class="<?php echo $data['page_icon']; ?>"></i><?php echo $data['page_title']; ?>
            </h5>
        </div>
    </div>

    <div class="row" id="divFomurlarioConsulta">

        <!-- MODULO CONSULTA POLIZA -->
        <div class="col-lg-12 mt-2" id="divTableInformacion">
            <div class="card">
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-5 col-md-4 p-0 pl-3 unir-pri">
                            <div class="has-search">
                                <span class="fa fa-search form-control-feedback" id="icon-search"></span>
                                <input type="text" class="form-control" id="buscarNegicio" name="buscarNegicio" placeholder="Placa, Póliza" autocomplete="off">
                            </div>
                        </div>
                        <div class="col-4 col-md-3 p-0 unir-med">
                            <select name="ramo" class="form-control" id="ramo">
                            </select>
                        </div>
                        <div class="col-2 col-md-2 p-0 pr-1 unir-ult">
                            <button onclick="buscarNegicio()" type="button" id="filterinput" class="btn btn-info">Filtrar</button>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <div style=" overflow: scroll;">
                                <table style="font-size: 10px; width:100%; text-align: center; " class="table table-bordered table-striped table-sm" id="tableNegocios">

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- MODULO FICHA POLIZA -->
        <div class="col-lg-12 mt-2" id="divFichaPoliza">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 col-md-4 mb-2">
                            <label class="labelInput"> Documento de identidad </label>
                            <input disabled placeholder="# Documento" type="text" class="form-control" id="Numdocumento" name="Numdocumento" autocomplete="off">
                        </div>
                        <div class="col-sm-12 col-md-4 mb-2">
                            <label class="labelInput"> Nombres </label>
                            <input disabled placeholder="Nombres" type="text" class="form-control" id="nombre" name="nombre" autocomplete="off">
                        </div>
                        <div class="col-sm-12 col-md-4 mb-2">
                            <label class="labelInput"> Ramo </label>
                            <select disabled class="form-control" id="ramoForm" name="ramoForm"></select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-4 mb-2">
                            <label class="labelInput"> Aseguradora </label>
                            <select disabled class="form-control" id="aseguradora" name="aseguradora"></select>
                        </div>
                        <div class="col-sm-12 col-md-4 mb-2">
                            <label class="labelInput"> Vigencia Desde </label>
                            <input disabled placeholder="fechaDesde" type="date" class="form-control" id="fechaDesde" name="fechaDesde" autocomplete="off">
                        </div>
                        <div class="col-sm-12 col-md-4 mb-2">
                            <label class="labelInput"> Vigencia Hasta </label>
                            <input disabled placeholder="fechaHasta" type="date" class="form-control" id="fechaHasta" name="fechaHasta" autocomplete="off">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-4 mb-2">
                            <label class="labelInput"> Broker </label>
                            <input disabled placeholder="Broker" type="text" class="form-control" id="broker" name="broker" autocomplete="off">
                        </div>
                        <div class="col-sm-12 col-md-4 mb-2">
                            <label class="labelInput"> Canal </label>
                            <select disabled class="form-control" id="canal" name="canal"></select>
                        </div>
                        <div class="col-sm-12 col-md-4 mb-2">
                            <label class="labelInput"> Valor Poliza </label>
                            <input disabled placeholder="Valor Poliza" type="number" class="form-control" id="valorPoliza" name="valorPoliza" autocomplete="off">
                        </div>
                    </div>
                    <div>
                    <div class="row">
                        <div class="col-sm-12 col-md-4 mb-2">
                            <label class="labelInput"> Motivo Cancelación </label>
                            <select disabled class="form-control" id="motivoCancelacion" name="motivoCancelacion"></select>
                        </div>
                        <div class="col-sm-12 col-md-4 mb-2">
                            <label class="labelInput"> Fecha Cancelación </label>
                            <input disabled placeholder="fechaCancelacion" type="date" class="form-control" id="fechaCancelacion" name="fechaCancelacion" autocomplete="off">
                        </div>
                    </div>

                    <div id="accordion" class="col-12">
                        
                        <input type="hidden" name="hiddenKey" id="hiddenKey">
                        
                        <div class="card col-12 p-0" style="border: unset;">
                            <div class="card-header CardHeader" id="headingZero" class="collapsed" data-toggle="collapse" data-target="#collapseZero" aria-expanded="false" aria-controls="collapseZero">
                                <label class="labelCardHeader">PAGOS Y CARTERA</label>
                                <i class="labelCardHeader fa fa-search-plus" aria-hidden="true"></i>
                            </div>

                            <div id="collapseZero" class="collapse" aria-labelledby="headingZero" data-parent="#accordion">
                                <div class="card-body p-0">
                                    <div class="row">
                                        <div class="col-4 col-md-2 mb-2">
                                            <label class="labelInput displaDesktop"> Forma de pago </label>
                                        </div>
                                        <div class="col-8 col-md-2 mb-2">
                                            <select disabled class="form-control" id="formaPago" name="formaPago"></select>
                                        </div>
                                        <div class="col-4 col-md-2 mb-2">
                                            <label class="labelInput displaDesktop"> Financiera </label>
                                        </div>
                                        <div class="col-8 col-md-2 mb-2">
                                            <select disabled class="form-control" id="financiera" name="financiera"></select>
                                        </div>
                                        <div class="col-4 col-md-2 mb-2">
                                            <label class="labelInput displaDesktop"> # Cuotas </label>
                                        </div>
                                        <div class="col-8 col-md-2 mb-2">
                                            <select disabled class="form-control" id="cuotas" name="cuotas"></select>
                                        </div>
                                        <div class="col-4 col-md-2 mb-2">
                                            <label class="labelInput displaDesktop"> Estado de Cartera </label>
                                        </div>
                                        <div class="col-8 col-md-2 mb-2">
                                            <input disabled placeholder="Estado Cartera" type="text" class="form-control" id="estCartera" name="estCartera" autocomplete="off">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card col-12 p-0" style="border: unset;">
                            <div class="card-header CardHeader" id="headingOne" class="collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                <label class="labelCardHeader">COMISIONES</label>
                                <i class="labelCardHeader fa fa-search-plus" aria-hidden="true"></i>

                            </div>

                            <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                <div class="card-body p-0">
                                    <div class="row">

                                        <div class="col-4 col-md-2 mb-2">
                                            <label class="labelInput displaDesktop"> Comisión liquidada </label>
                                        </div>
                                        <div class="col-8 col-md-2 mb-2">
                                            <i class="fa fa-check-square fa-2x" style="color: #67B5FB"></i>
                                        </div>
                                        <div class="col-4 col-md-2 mb-2">
                                            <label class="labelInput displaDesktop"> Comisión Pagada </label>
                                        </div>
                                        <div class="col-8 col-md-2 mb-2">
                                            <i class="fa fa-check-square fa-2x" style="color: #67B5FB"></i>
                                        </div>
                                        <div class="col-4 col-md-2 mb-2">
                                            <label class="labelInput displaDesktop"> Valor Comision </label>
                                        </div>
                                        <div class="col-8 col-md-2 mb-2 text-center">
                                            <input placeholder="Valor Comision" type="number" class="form-control" id="valorComision" name="valorComision" autocomplete="off">
                                        </div>
                                        <div class="col-4 col-md-2 mb-2">
                                            <label class="labelInput displaDesktop"> Valor Reversado </label>
                                        </div>
                                        <div class="col-8 col-md-2 mb-2">
                                            <input placeholder="Valor Reversado" type="number" class="form-control" id="valorReversado" name="valorReversado" autocomplete="off">
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card col-12 p-0" style="border: unset;">
                            <div class="card-header CardHeader" id="headingThree" class="collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                <label class="labelCardHeader">SINIESTROS</label>
                                <i class="labelCardHeader fa fa-search-plus" aria-hidden="true"></i>

                            </div>
                            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                <div class="card-body p-0">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div style=" overflow: scroll;">
                                                <table style="font-size: 10px; width:100%; text-align: center; " class="table table-bordered table-striped table-sm" id="tableSiniestros">

                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card col-12 p-0" style="border: unset;">
                            <div class="card-header CardHeader" id="headingFour" class="collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                <label class="labelCardHeader">ARCHIVOS</label>
                                <i class="labelCardHeader fa fa-search-plus" aria-hidden="true"></i>

                            </div>
                            <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordion">
                                <div class="card-body p-0">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div style=" overflow: scroll;">
                                                <table style="font-size: 10px; width:100%; text-align: center; " class="table table-bordered table-striped table-sm" id="tableArchivos">

                                                </table>
                                            </div>
                                        </div>
                                        <div class="col-md-12 text-right mt-3">
                                            <button type="button" id="btnAddFile" onclick="addFilePolice()" style="background-color: #FE7C21; border-radius: 5em; color: white;" class="btn">Subir Archivo</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row justify-content-center d-flex">
                            <div class="col-12 p-0">
                                <a href="<?= base_url().'fichapoliza'?>" class="btn btn-info">Consultar otra ficha</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>


</main>
<?php footerAdmin($data); ?>