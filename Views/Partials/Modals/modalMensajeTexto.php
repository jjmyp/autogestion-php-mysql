<!-- Modal -->
<div class="modal fade" data-backdrop="static" data-keyboard="false" id="ModalVerificarCelular" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <form id="formCodigoVerificacion" autocomplete="off" name="formCodigoVerificacion">
                    <div id="logo" class="logo">
                        <center><img src="<?= media(); ?>/images/logo.png" width="200px" alt="" srcset=""></center>
                    </div>
                    <div id="div-vc" style="float:center;">
                        <h4 class="text-center text-info mt-4">VERIFICACIÓN CELULAR</h4><br>
                        <h5 class="text-center text-gray  mt-1">Ingresa el codigo de verificacion de 6 digitos enviado a tu celular</h5>
                        <div class=" d-flex justify-content-center">
                            <input type="tel" class="delete" data-id="1" id="codigo1" name="codigo1" maxlength="1" required onkeypress="return validar_numeros(event)" onkeyup="if (this.value.length == this.getAttribute('maxlength')) codigo2.focus()" />
                            <input type="tel" class="delete" data-id="2" id="codigo2" name="codigo2" maxlength="1" required onkeypress="return validar_numeros(event)" onkeyup="if (this.value.length == this.getAttribute('maxlength')) codigo3.focus()" />
                            <input type="tel" class="delete" data-id="3" id="codigo3" name="codigo3" maxlength="1" required onkeypress="return validar_numeros(event)" onkeyup="if (this.value.length == this.getAttribute('maxlength')) codigo4.focus()" />
                            <input type="tel" class="delete" data-id="4" id="codigo4" name="codigo4" maxlength="1" required onkeypress="return validar_numeros(event)" onkeyup="if (this.value.length == this.getAttribute('maxlength')) codigo5.focus()" />
                            <input type="tel" class="delete" data-id="5" id="codigo5" name="codigo5" maxlength="1" required onkeypress="return validar_numeros(event)" onkeyup="if (this.value.length == this.getAttribute('maxlength')) codigo6.focus()" />
                            <input type="tel" class="delete" data-id="6" id="codigo6" name="codigo6" maxlength="1" required onkeypress="return validar_numeros(event)" />
                        </div>
                        <p class="text-center">El codigo fue enviado al numero: <span class="text-info" id="celular_strong"></span></p>
                        <p class="text-left"> ¿ No recibiste el SMS ?</p>
                        <a href="#" id="btnReenviarSMS" class="text-left text-info">Re-enviar el SMS</a><br>
                        <?php if ($_GET['route'] !== 'polizas/emitir') { ?>
                        <a href="#" id="btnCambiarCelular" class="text-left text-info">Cambiar el numero telefonico</a>
                        <div class="justify-content-center">
                            <div class="form-group col-md-12 col-sm-12">
                                <input type="hidden" class="form-control text-center" id="celular_seleccionado" name="celular_seleccionado">
                            </div>
                        </div>
                        <?php } ?>
                    </div>
                    <div id="imageVerificar">
                        <img id="numero_verificado_image" width="300px" src="<?= media(); ?>/images/numeroverificado.png">
                    </div>
                    <div class=" d-flex justify-content-center mt-3">
                        <a href="<?= base_url() ?>login" id="btnFinish" class="btn-block btn btn-warning" style="display:none">Finalizar inscripción</a>
                        <a id="btnValidarCodigo" class="btn-block btn btn-warning" style="display:none; color: white;">Siguiente</a>
                    </div>
                    <div class=" d-flex justify-content-center mb-3">
                        <button type="button" id="btnRegistrarUsuario" class="btn-block btn btn-warning">Verificar</button><br>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>