<?php
headerAdmin($data);
getModal('modalMensajeTexto', $data);
?>
<style>
    #formRegistro {
        background-color: #ffffff;
        margin: 10px auto;
        padding: 40px 40px 0px 40px;
        width: 70%;
        min-width: 400px;
    }

    input.invalid {
        background-color: #ffdddd;
    }

    button {
        background-color: #4CAF50;
        color: #ffffff;
        border: none;
        padding: 10px 20px;
        font-size: 17px;
        cursor: pointer;
    }

    button:hover {
        opacity: 0.8;
    }

    .btn {
        border-radius: 20px 20px 20px 20px;
        width: 250px;
    }

    .btn-white {
        border: 1px solid whitesmoke;
    }

    .delete {
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 8px;
        border: 1px solid #2d9fd9;
        color: #000;
        width: 40px;
        height: 40px;
        margin: 9px;
        padding-left: 1px;
        text-align: center;
    }

    .delete:focus {
        outline: none;
        border: 1px solid #ec8932;
    }

    #formCodigoVerificacion {
        background-color: #ffffff;
        margin: 10px auto;
        padding: 40px;
        width: 35%;
        min-width: 355px;
    }

    .text-gray {
        color: #7A7A7A;
    }
</style>

<body>
    <div id="cover-spin"></div>
    <form id="formRegistro" name="formRegistro">
        <div class="logo">
            <center><img src="<?= media(); ?>/images/logo.png" width="200px" alt="Mi seuguro digital" srcset=""></center>
        </div>
        <div class=" mt-4">
            <h4 class="text-center text-info">CREA TU CUENTA</h4>
            <div style="float:center;" class="text-center mt-4">
                <a href="<?= $data['google']->createAuthUrl(); ?>" class="btn btn-white h5">
                    <img width="20px" src="<?= media(); ?>/images/icon-google.png" alt="Google" srcset="">
                    <strong class="text-info p-1">REGISTRATE CON GOOGLE</strong>
                </a>
                <!-- <a href=" // $data['facebook']->getLoginUrl(FACEBOOK_REDIRECT_URL, ['email']); " class="btn btn-white h5">
                <img width="20px" src=" //media(); /images/icon-facebook.png" alt="Facebook" srcset="">
                <strong class="text-info p-1">REGISTRATE CON FACEBOOK</strong>  -->
                </a>
            </div>
            <hr>
            <label for="" class="text-info h6">Los campos con asterisco son obligatorios</label><br><br>
            <div class="row">
                <div class="form-group col-md-12 col-sm-12">
                    <label for="">Clave de registro <strong class="text-danger">*</strong> </label>
                    <input class="form-control" type="text" name="clave_registro" id="clave_registro" placeholder="Clave de registro" autofocus>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-6 col-sm-12">
                    <label for="">Nombres <strong class="text-danger">*</strong> </label>
                    <input class="form-control" type="text" name="nombre" id="nombre" placeholder="Nombre">
                </div>
                <div class="form-group col-md-6 col-sm-12">
                    <label for="">Apellidos <strong class="text-danger">*</strong></label>
                    <input class="form-control" type="text" name="apellido" id="apellido" placeholder="Apellido">
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-6 col-sm-12">
                    <label for="">Tipo de documento <strong class="text-danger">*</strong></label>
                    <select class="form-control" name="tipo_documento" id="tipo_documento"></select>
                </div>
                <div class="form-group col-md-6 col-sm-12">
                    <label for="">Numero de documento <strong class="text-danger">*</strong></label>
                    <input class="form-control" onkeypress="return validar_numeros(event)" type="tel" name="identificacion" id="identificacion" placeholder="#Documento">
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 form-group">
                    <label for="">Fecha de Nacimiento</label>
                    <div class="row" >
                        <div class="col-xs-4 col-sm-4 col-md-4 conten-dia mb-3" >
                            <select class="form-control fecha-nacimiento" name="dia_nacimiento" id="dia_nacimiento" required>
                                <option value="">Dia</option>
                                <?php
                                for ($i = 1; $i <= 31; $i++) {
                                    if (strlen($i) == 1) { ?>
                                        <option value="<?php echo "0" . $i ?>"><?php echo "0" . $i ?></option><?php
                                                                                                            } else { ?>
                                        <option value="<?php echo $i ?>"><?php echo $i ?></option><?php
                                                                                                            }
                                                                                                        }
                                                                                                    ?>
                            </select>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 conten-mes mb-3" >
                            <select class="form-control fecha-nacimiento" name="mes_nacimiento" id="mes_nacimiento" required>
                                <option value="">Mes</option>
                                <option value="01">Enero</option>
                                <option value="02">Febrero</option>
                                <option value="03">Marzo</option>
                                <option value="04">Abril</option>
                                <option value="05">Mayo</option>
                                <option value="06">Junio</option>
                                <option value="07">Julio</option>
                                <option value="08">Agosto</option>
                                <option value="09">Septiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
                            </select>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 conten-anio" >
                            <select class="form-control fecha-nacimiento" name="anio_nacimiento" id="anio_nacimiento" required>
                                <option value="">Año</option>
                                <?php
                                for ($j = 1920; $j <= 2021; $j++) {
                                ?><option value="<?php echo $j ?>"><?php echo $j ?></option><?php
                                                                                                                            }
                                                                                                                                ?>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6 col-sm-12">
                    <label for="">Genero <strong class="text-danger">*</strong></label>
                    <select class="form-control" name="genero" id="genero">
                        <option value="" disabled selected>Genero</option>
                        <option value="F">Femenino</option>
                        <option value="M">Masculino</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-6 col-sm-12">
                    <label for="">Dirección <strong class="text-danger">*</strong></label>
                    <input class="form-control" type="text" name="direccion" id="direccion" placeholder="Direccion">
                </div>
                <div class="form-group col-md-6 col-sm-12">
                    <label for="">Ciudad <strong class="text-danger">*</strong></label>
                    <select class="form-control select2_id" name="ciudad" id="ciudad"></select>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-6 col-sm-12">
                    <label for="">Telefono <strong class="text-danger">*</strong></label>
                    <input class="form-control" type="tel" onkeypress="return validar_numeros(event)" name="telefono" id="telefono" placeholder="Telefono">
                </div>
                <div class="form-group col-md-6 col-sm-12">
                    <label for="">Celular <strong class="text-danger">*</strong></label>
                    <input class="form-control" type="tel" onkeypress="return validar_numeros(event)" name="celular" id="celular" placeholder="Celular">
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-12 col-sm-12">
                    <label for="">Correo Electronico <strong class="text-danger">*</strong></label>
                    <input class="form-control" type="email" name="correo_electronico" id="correo_electronico" placeholder="Correo electronico">
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-6 col-sm-12">
                    <label for="">Contraseña <strong class="text-danger">*</strong></label>
                    <input class="form-control" type="password" name="contrasena" id="contrasena" placeholder="Contraseña">
                </div>
                <div class="form-group col-md-6 col-sm-12">
                    <label for="">Confirmar contraseña <strong class="text-danger">*</strong></label>
                    <input class="form-control" type="password" name="confirmar_contrasena" id="confirmar_contrasena" placeholder="Confirmar contraseña">
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-12 col-sm-12">
                    <div class="col-xs-offset-3 col-md-offset-3 col-xs-9">
                        <label class="checkbox-inline">
                            <input type="checkbox" name="acepto_termino" id="acepto_termino" value="acepto_termino">Acepto términos, condiciones y politica de datos
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-3" style="overflow:auto;">
            <div style="float:center;" class="text-center">
                <button type="submit" id="btnSiguiente" class="btn btn-warning">Siguiente</button>
            </div>
        </div>
    </form>

    <?php footerAdmin($data); ?>