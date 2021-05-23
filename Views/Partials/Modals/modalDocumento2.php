<!-- Modal -->
<div class="modal fade" data-backdrop="static" data-keyboard="false" id="ModalVerificarDocumento" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <form id="document_validation" name="document_validation" enctype="multipart/form-data">
                    <input type="hidden" name="contador_expedicion" id="contador_expedicion" value="<?= $_SESSION['userData']['contador_expedicion']; ?>">
                    <div id="logo" class="logo mb-3">
                        <center><img src="<?= media(); ?>/images/logo.png" width="200px" alt="" srcset=""></center>
                    </div>
                    <div id="successValidation">
                        <div id="imageValidacion" class="d-flex justify-content-center">
                            <img src="<?= media(); ?>/images/cedula_verificada.png" width="300px" alt="">
                        </div>
                        <div class="mt-5 justify-content-center d-flex">
                            <h5 class="text-secondary">
                                Fecha de verificación
                            </h5>                            
                        </div>
                        <div class="justify-content-center d-flex mb-5">
                            <h4 class="text-secondary"><strong><?= date('d F Y'); ?></strong></h4>
                        </div>                        
                        <div class="d-flex justify-content-center mt-5 mb-3">
                            <button type="button" id="btnNextFaceId" class="btn-block btn btn-warning">Continuar</button><br>
                        </div>
                    </div>
                    <div class="bs-stepper">
                        <div class="bs-stepper-header" role="tablist">
                            <!-- your steps here -->
                            <div class="step" data-target="#camara-frontal">
                                <button type="button" class="step-trigger" role="tab" aria-controls="camara-frontal" id="camara-frontal-trigger">
                                    <span class="bs-stepper-circle">1</span>
                                    <span class="bs-stepper-label">Frontal</span>
                                </button>
                            </div>
                            <div class="line"></div>
                            <div class="step" data-target="#camara-trasera">
                                <button type="button" class="step-trigger" role="tab" aria-controls="camara-trasera" id="camara-trasera-trigger">
                                    <span class="bs-stepper-circle">2</span>
                                    <span class="bs-stepper-label">Trasera</span>
                                </button>
                            </div>                            
                        </div>
                        <div class="bs-stepper-content">
                            <!-- your steps content here -->
                            <div id="camara-frontal" class="content" role="tabpanel" aria-labelledby="camara-frontal-trigger">
                                <div class="mt-5 justify-content-center ">
                                    <div id="viewImage">
                                        <div class="ml-4 mt-1 mb-4 mr-4">
                                            <div class="mt-3 profile">
                                                <div class="info ">
                                                    <div class="avatar-wrapper bg-info">
                                                        <img id="profile-pic" class="profile-pic" src="" />
                                                        <div id="upload-button" class="upload-button">
                                                            <i class="fa fa-camera-retro" aria-hidden="true"></i>
                                                        </div>
                                                        <input class="file-upload" name="cedula_frontal" id="cedula_frontal" onchange="readURL(this,'#profile-pic');" type="file" accept="image/*" />
                                                    </div>
                                                </div>
                                                <div class="cover-image"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <h5 id="estado"></h5>
                                    <h4 class="mt-3 text-center text-info">CEDULA FRONTAL</h4>
                                    <h5 class="text-center mt-2 text-secondary mb-3">Si la foto que elegiste se ve clara y legible presionar continuar para tomarle la foto a la parte trasera de la cédula</h5>
                                </div>
                                <div class=" mt-5 d-flex justify-content-center mb-3">
                                    <button id="botonsiguiente" disabled type="button" class="btn-block btn btn-warning">Continuar</button>
                                </div>
                            </div>
                            <div id="camara-trasera" class="content" role="tabpanel" aria-labelledby="camara-trasera-trigger">
                                <div class="mt-5 justify-content-center ">
                                    <div id="viewImage">
                                        <div class="ml-4 mt-1 mb-4 mr-4">
                                            <div class="mt-3 profile">
                                                <div class="info ">
                                                    <div class="avatar-wrapper  bg-info">
                                                        <img id="profile-pic2" class="profile-pic" src="" />
                                                        <div id="upload-button2" class="upload-button">
                                                            <i class="fa fa-camera-retro" aria-hidden="true"></i>
                                                        </div>
                                                        <input class="file-upload" name="cedula_trasera" id="cedula_trasera" onchange="readURL(this,'#profile-pic2');" type="file" accept="image/*" />
                                                    </div>
                                                </div>
                                                <div class="cover-image"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <h5 id="estado"></h5>
                                    <h4 class="mt-3 text-center text-info">CEDULA TRASERA</h4>
                                    <h5 class="text-center mt-2 text-secondary mb-3">Si la foto se ve clara y legible presionar enviar para validar que la información es correcta.</h5>
                                </div>
                                <div class=" mt-5 d-flex justify-content-center mb-3">
                                    <div class="row">
                                        <div class="col-6">
                                            <button type="button" class="btn-block btn btn-info" onclick="stepper.previous()">Atras</button>
                                        </div>
                                        <div class="col-6">
                                            <button type="submit" id="btnEnviarValidacion" disabled class="btn btn-block btn-warning">Enviar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</div>