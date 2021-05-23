<!-- Modal -->
<div class="modal fade" data-backdrop="static" data-keyboard="false" id="ModalFotoBase" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <form name="formFotoBase" id="formFotoBase" enctype="multipart/form-data">
                    <div class="justify-content-center d-flex">
                        <img src="<?= media() . 'images/logo.png' ?>" alt="" width="200px">
                    </div>
                    <div id="viewImage">
                        <div class="ml-4 mt-1 mb-4 mr-4">
                            <div class="mt-3 profile">
                                <div class="info ">
                                    <div class="avatar-wrapper  bg-info">
                                        <img id="profile-pic3" class="profile-pic" src="" />
                                        <div id="upload-button-foto-base" class="upload-button">
                                            <i class="fa fa-camera-retro" aria-hidden="true"></i>
                                        </div>
                                        <input class="file-upload" name="foto_base" id="foto_base" onchange="readURL(this,'#profile-pic3');" type="file" accept="image/*" />
                                    </div>
                                </div>
                                <div class="cover-image"></div>
                            </div>
                        </div>
                    </div>
                    <div class="letters justify-content-center d-flex">
                        <i class="fa fa-camera" class="text-secondary"></i>
                        <h6 class="text-secondary">Toma de foto rostro</h6>
                    </div>
                    <div class="letters justify-content-center d-flex">
                        <i class="fa fa-camera" class="text-secondary"></i>
                        <h6 class="text-secondary">Foto cedula ambos lados</h6>
                    </div>
                    <div class="mt-5">
                        <h6 class="text-info">Tips para un buen registro</h6>
                    </div>
                    <div>
                        <h6 class="text-secondary">1. Permitir el acceso a la camara</h6>
                        <h6 class="text-secondary">2. Limpia el lente de la camara</h6>
                        <h6 class="text-secondary">3. Evita luces brillantes</h6>
                    </div>
                    <div class="justify-content-center d-flex">
                        <button type="submit" id="btnNextFotoBase" class="btn btn-warning">Siguiente</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</div>