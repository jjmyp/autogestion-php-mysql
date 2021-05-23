<!-- Modal -->
<div class="modal fade" data-backdrop="static" data-keyboard="false" id="ModalVerificarFaceId" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <form id="faceid_validation" name="faceid_validation" enctype="multipart/form-data">
                    <input type="hidden" name="contador_expedicion" id="contador_expedicion" value="<?= $_SESSION['userData']['contador_expedicion']; ?>">
                    <div id="logo" class="logo mb-3">
                        <center><img src="<?= media(); ?>/images/logo.png" width="200px" alt="" srcset=""></center>
                    </div>
                    <div id="successValidationFaceId">
                        <div id="imageValidacion" class="d-flex justify-content-center">
                            <img src="<?= media(); ?>/images/faceid_verificado.png" width="300px" alt="">
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
                            <button type="button" id="btnNextMsg" class="btn-block btn btn-warning">Continuar</button><br>
                        </div>
                    </div>
                    <div class="video ml-4">
                        <video width="400" height="300" controls>
                            <source src="mov_bbb.mp4" id="video_here" />
                            Your browser does not support HTML5 video.
                        </video>
                                                <h5 id="estado"></h5>
                        <h4 class="mt-3 text-center text-info">SUBIR VIDEO</h4>
                        <p class="text-center text-secondary">Formatos de video permitido: webm, mp4, avi y mov</p>
                        <h5 class="text-center mt-2 text-secondary mb-3">Si el video que elegiste se ve claro y legible presionar continuar para grabar el video</h5>
                        <div class=" mt-5 d-flex justify-content-center mb-3">
                            <button id="btnValidateFaceId" disabled type="submit" class="btn-block btn btn-warning">Validar</button>
                        </div>
                    </div>
                    <div id="upload-faceid" class="mt-5 ">
                        <div id="viewImage">
                            <div class="ml-4 mt-1 mb-4 mr-4">
                                <div class="mt-3 profile">
                                    <div class="info ">
                                        <div class="avatar-wrapper bg-info">
                                            <img id="profile-pic-faceid" class="profile-pic" src="" />
                                            <div id="upload-button-faceid" class="upload-button">
                                                <i class="fa fa-camera-retro" aria-hidden="true"></i>
                                            </div>
                                            <input class="file-upload" name="video" id="video" type="file" accept="video/*" />
                                        </div>
                                    </div>
                                    <div class="cover-image"></div>
                                </div>
                            </div>
                        </div>


                        <h5 id="estado"></h5>
                        <h4 class="mt-3 text-center text-info">SUBIR VIDEO</h4>
                        <p class="text-center text-secondary">Formatos de video permitido: webm, mp4, avi y mov</p>
                        <h5 class="text-center mt-2 text-secondary mb-3">Si el video que elegiste se ve claro y legible presionar continuar para grabar el video</h5>
                        <div class=" mt-5 d-flex justify-content-center mb-3">
                            <button id="btnValidateFaceId" disabled type="submit" class="btn-block btn btn-warning">Validar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>