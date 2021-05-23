<?php
headerAdmin($data);
?>
<style>
@media only screen and (max-width: 700px) {
    video {
        max-width: 100%;
    }
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

.img {
    max-width: 100%;
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
                    <h4 class="login-head text-info text-center"></i>Foto</h4>
                    <!-- tomar video. -->
                    <div class="login-form" id="f_video" name="f_video" action="#">

                        <!-- <div class="video-wrap text-center">
                            <video id="video" playsinline autoplay> </video>
                        </div>

                        <div class="controller text-center ">
                            <button id="snap">Capture</button>
                            <button id="snap" onclick="SaveImage()">save</button>
                            <button id="enviar">Enviar Foto!</button>
                        </div>

                        <p id="estado"></p>
                        <canvas id="canvas" width="200" height="200"></canvas> -->


                        <div id="div-vc" style="float:center;">
                        <h4>Selecciona un dispositivo</h4>
                        <div>
                            <select name="listaDeDispositivos" id="listaDeDispositivos"></select>
                            <button id="boton">Tomar foto</button>
                            <p id="estado"></p>
                        </div>
                        <br>
                        <video muted="muted" id="video"></video>
                        <canvas id="canvas" width="200" height="200" style="display: none;"></canvas>

                    </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
<?php footerAdmin($data); ?>