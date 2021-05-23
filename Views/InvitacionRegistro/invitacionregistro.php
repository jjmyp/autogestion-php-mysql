<?php 
headerAdmin($data);
?>
<style>
    .border-4{
        border-width: 3px !important;
        border-radius: 40px !important;
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
        border-bottom-left-radius: 8px !important;
        border-top-left-radius: 8px !important;
    }
</style>
<div id="cover-spin"></div>
<div id="contentAjax"></div>
<main class="app-content">
    

    <div class="row">
        <div class="col-md-12">
            <div class="tile mt-3">
                <div class="tile-body">
                    <form class="login-form mt-3" id="formInvitacionRegistro" name="formInvitacionRegistro" action="#">
                        <h4 class="login-head text-info text-center">Enviar invitación de registro</h4>
                        <label class="control-label">Nombre</label>
                        <div class="input-group mb-3">
                            <span class=" btn-inputs text-center"><i class="fa-4x fa fa-user "></i></span>
                            <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Nombre" aria-label="Correo" aria-describedby="basic-addon1">
                        </div>
                        <label class="control-label">Correo electronico</label>
                        <div class="input-group mb-2">
                            <span class=" btn-inputs text-center"><i class="fa-4x fa fa-envelope-open-o"></i></span>
                            <input type="email" class="form-control" name="correo_electronico" id="correo_electronico" placeholder="Correo electronico" aria-label="Correo" aria-describedby="basic-addon1">
                        </div>
                        <div class="mt-3 mb-3" style="overflow:auto;">
                            <div style="float:center;" class="text-center">
                                <button type="submit" id="btnSiguiente" class="btn btn-enviar btn-warning">ENVIAR</button>
                            </div>
                        </div>
                        <!-- <div class="mt-3" style="overflow:auto;">
                            <div style="float:center;" class="text-center">
                                <button type="button" id="btnModal" class="btn btn-enviar btn-warning">Abrir modal</button>
                            </div>
                        </div> -->
                    </form>
                </div>
            </div>
        </div>
    </div>
</main>
<?php footerAdmin($data); ?>