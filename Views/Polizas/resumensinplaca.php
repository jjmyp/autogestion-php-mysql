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
</style>
<div id="cover-spin"></div>
<div id="contentAjax"></div>
<main class="app-content">
    <div class="app-title">
        <h5 class="text-info text-center pt-3">
          <i class="<?php echo $data['page_icon']; ?>"></i><?= $data['page_title']; ?>
        </h5>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="tile">
                <div class="tile-body" id="tile">
                    <!-- Radio que se utilizara en algunos formularios -->

                    <!-- Formulario de cotizacion sin placa -->

                    <div class="container">
                        <div class="cotizasoat-container">
                            <form role="form" id="cotizasoat-form">
                                <div id="contenCotizacion"></div>
                            </form>
                        </div>
                    </div>

                    <div class="wrapper fadeInDown">
                        <div id="formContent">
                            <div id="contenCotizacion"></div>
                            <!-- Footer -->
                            <div id="formFooter"><?php date_default_timezone_set ("America/Bogota"); ?>
                            </div>
                        </div>
                    </div>

                    <div class="form-group mt-3" style="overflow:auto;">
                        <div style="float:center;" class="text-center">
                            <a href="<?= base_url().'polizas/soatplaca'; ?>" id="btnSiguiente" class="btn btn-enviar btn-warning"> NUEVA COTIZACION
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</main>
<?php footerAdmin($data); ?>