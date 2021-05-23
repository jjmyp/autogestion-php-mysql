<!-- Modal -->
<div class="modal fade" data-backdrop="static" data-keyboard="false" id="ModalVerificarDocumento" tabindex="-1"
    role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <form id="f_documento_frontal" name="f_documento_frontal">
                    <div id="logo" class="logo">
                        <center><img src="<?= media(); ?>/images/logo.png" width="200px" alt="" srcset=""></center>
                    </div>
                    <div id="div-vc" style="float:center;">
                        <h4 class="text-center">Selecciona un dispositivo</h4>
                        <div>
                            <select class="form-control" name="listaDeDispositivos" id="listaDeDispositivos"></select>
                            <!-- <button id="boton">Tomar foto</button> -->
                            <p class="text-center" id="estado"></p>
                        </div>
                        <br>
                        <video class="text-center" muted="muted" id="video"></video>
                        <canvas class="text-center" id="canvas" width="200" height="200"
                            style="display: none; float:center;"></canvas>

                    </div>
                    <div class="row">
                        <div>
                            <img id="ver" src=" " class="img-responsive">

                        </div>
                        <p class="text-center" id="informacion"></p>
                        <input type="text" id="response" name="response" class="form-control" />
                                 <h4 class="text-centar"> DOCUMENTO FRONTAL</h4>
                    </div>

                    <div class=" d-flex justify-content-center mb-3">
                        <button class="text-center" id="boton">Volver a tomar</button>
                        <button class="text-center" id="prueba">prueba</button>
                    </div>
                    <div class=" d-flex justify-content-center mb-3">
                        <button id="botonsiguiente" class="btn-block btn btn-warning">SIGUIENTE</button>
                    </div>
                </form>

              
            </div>
        </div>
    </div>
</div>