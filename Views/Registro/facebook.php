<?php

use Facebook\Facebook;
use Facebook\Exceptions\FacebookResponseException;
use Facebook\Exceptions\FacebookSDKException;

$facebook = new Facebook(array(
    'app_id' => FACEBOOK_APP_ID,
    'app_secret' => FACEBOOK_APP_SECRET,
    'default_graph_version' => FACEBOOK_GRAPH_VERSION,
    'persistent_data_handler' => 'session'
));
$helper = $facebook->getRedirectLoginHelper();
$permissions = ['email']; // optional

try {

    $accessToken = $helper->getAccessToken();
    
} catch (facebookResponseException $e) {
    // When Graph returns an error
    echo 'Graph returned an error: ' . $e->getMessage();
    exit;
} catch (FacebookSDKException $e) {
    // When validation fails or other local issues
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
}

if (isset($_SESSION['facebook_access_token'])) {
    $facebook->setDefaultAccessToken($_SESSION['facebook_access_token']);
} else {
    // getting short-lived access token
    $_SESSION['facebook_access_token'] = (string) $accessToken;
    // OAuth 2.0 client handler
    $oAuth2Client = $facebook->getOAuth2Client();
    // Exchanges a short-lived access token for a long-lived one
    $longLivedAccessToken = $oAuth2Client->getLongLivedAccessToken($_SESSION['facebook_access_token']);
    $_SESSION['facebook_access_token'] = (string) $longLivedAccessToken;
    // setting default access token to be used in script
    $facebook->setDefaultAccessToken($_SESSION['facebook_access_token']);
}
// redirect the user to the profile page if it has "code" GET variable

// getting basic info about user
try {
    $profile_request = $facebook->get('/me?fields=name,first_name,last_name,email');
    $requestPicture = $facebook->get('/me/picture?redirect=false&height=200'); //getting user picture
    $picture = $requestPicture->getGraphUser();
    $profile = $profile_request->getGraphUser();
    $id = $profile->getProperty('id');           // To Get Facebook ID
    $correo_electronico = $profile->getProperty('email');    //  To Get Facebook email
    $nombre = $profile->getProperty('first_name');    //  To Get Facebook email
    $apellido = $profile->getProperty('last_name');    //  To Get Facebook email
    // $fbpic = "<img src='" . $picture['url'] . "' class='img-rounded'/>";
    // # save the user nformation in session variable
    // $_SESSION['fb_id'] = $fbid . '</br>';
    // $_SESSION['fb_name'] = $fbfullname . '</br>';
    // $_SESSION['fb_email'] = $fbemail . '</br>';
    // $_SESSION['fb_pic'] = $fbpic . '</br>';
} catch (FacebookResponseException $e) {
    // When Graph returns an error
    echo 'Graph returned an error: ' . $e->getMessage();
    session_destroy();
    // redirecting user back to app login page
    header("Location: ./");
    exit;
} catch (FacebookSDKException $e) {
    // When validation fails or other local issues
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
}


// // Token de acceso de corta duración en sesión
// $_SESSION['facebook_access_token'] = (string) $accessToken;

// // Controlador de cliente OAuth 2.0 ayuda a administrar tokens de acceso
// $oAuth2Client = $data['facebook']->getOAuth2Client();

// // Intercambia una ficha de acceso de corta duración para una persona de larga vida
// $longLivedAccessToken = $oAuth2Client->getLongLivedAccessToken($_SESSION['facebook_access_token']);
// $_SESSION['facebook_access_token'] = (string) $longLivedAccessToken;

// // Establecer token de acceso predeterminado para ser utilizado en el script
// $data['facebook']->setDefaultAccessToken($_SESSION['facebook_access_token']);

// $fbUserData = array(
//     'oauth_provider'=> 'facebook',
//     'oauth_uid'     => $facebook_account_info['id'],
//     'first_name'    => $facebook_account_info['first_name'],
//     'last_name'     => $facebook_account_info['last_name'],
//     'email'         => $facebook_account_info['email'],
//     'gender'        => $facebook_account_info['gender'],
//     'locale'        => $facebook_account_info['locale'],
//     'picture'       => $facebook_account_info['picture']['url'],
//     'link'          => $facebook_account_info['link']
// );


headerAdmin($data);
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
        min-width: 400px;
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
            <h4 class="text-center text-info">COMPLETA TUS DATOS</h4>
            <img src="<?= $picture['url']; ?>" style="border-radius: 50%; display: block;margin-left: auto; margin-right: auto; width: 150px"  alt="">
            <hr>
            <label for="" class="text-info h6">Los campos con asterisco son obligatorios</label><br><br>
            <div class="row">
                <input type="hidden" name="imagen" id="imagen" value="<?= $facebook_account_info['picture']['url']; ?>">
                <input type="hidden" name="google_account" id="google_account" value="1">
                <div class="form-group col-md-6 col-sm-12">
                    <label for="">Nombres<strong class="text-danger">*</strong> </label>
                    <input class="form-control" type="text" readonly="" value="<?= $nombre; ?>" name="nombre" id="nombre" placeholder="Nombre" autofocus>
                </div>
                <div class="form-group col-md-6 col-sm-12">
                    <label for="">Apellidos<strong class="text-danger">*</strong></label>
                    <input class="form-control" type="text" readonly="" name="apellido" value="<?= $apellido; ?>" id="apellido" placeholder="Apellido">
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-12 col-sm-12">
                    <label for="">Correo Electronico <strong class="text-danger">*</strong></label>
                    <input class="form-control" readonly value="<?= $correo_electronico; ?>" type="email" name="correo_electronico" id="correo_electronico" placeholder="Correo electronico">
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-12 col-sm-12">
                    <label for="">Clave de registro <strong class="text-danger">*</strong> </label>
                    <input class="form-control" type="text" name="clave_registro" id="clave_registro" placeholder="Clave de registro" autofocus>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-6 col-sm-12">
                    <label for="">Tipo de documento <strong class="text-danger">*</strong></label>
                    <select class="form-control" name="tipo_documento" id="tipo_documento"></select>
                </div>
                <div class="form-group col-md-6 col-sm-12">
                    <label for="">Numero de documento <strong class="text-danger">*</strong></label>
                    <input class="form-control" onkeypress="return validar_numeros(event)" type="tel" name="documento" id="documento" placeholder="#Documento">
                </div>
            </div>

            <div class="row">
                <div class="form-group col-md-6 col-sm-12">
                    <label for="">Fecha de nacimiento <strong class="text-danger">*</strong></label>
                    <input placeholder="Fecha de nacimiento" class="form-control" type="date" id="fecha_nacimiento" name="fecha_nacimiento">
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
                    <div class="col-xs-offset-3 col-md-offset-3 col-xs-9">
                        <label class="checkbox-inline">
                            <input type="checkbox" name="acepto_termino" id="acepto_termino" value="acepto_termino">Acepto términos, condiciones y politica de datos
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </form>

    <div class="mb-3" style="overflow:auto;">
        <div style="float:center;" class="text-center">
            <button type="submit" id="btnSiguiente" class="btn btn-warning">Siguiente</button>
        </div>
    </div>

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
                                <input type="tel" class="delete" data-id="1" id="codigo1" maxlength="1" onkeypress="return validar_numeros(event)" onkeyup="if (this.value.length == this.getAttribute('maxlength')) codigo2.focus()" />
                                <input type="tel" class="delete" data-id="2" id="codigo2" maxlength="1" onkeypress="return validar_numeros(event)" onkeyup="if (this.value.length == this.getAttribute('maxlength')) codigo3.focus()" />
                                <input type="tel" class="delete" data-id="3" id="codigo3" maxlength="1" onkeypress="return validar_numeros(event)" onkeyup="if (this.value.length == this.getAttribute('maxlength')) codigo4.focus()" />
                                <input type="tel" class="delete" data-id="4" id="codigo4" maxlength="1" onkeypress="return validar_numeros(event)" onkeyup="if (this.value.length == this.getAttribute('maxlength')) codigo5.focus()" />
                                <input type="tel" class="delete" data-id="5" id="codigo5" maxlength="1" onkeypress="return validar_numeros(event)" onkeyup="if (this.value.length == this.getAttribute('maxlength')) codigo6.focus()" />
                                <input type="tel" class="delete" data-id="6" id="codigo6" maxlength="1" onkeypress="return validar_numeros(event)" />
                            </div>
                            <p class="text-center">El codigo fue enviado al numero <input type="text" readonly class="form-control text-center" id="celular_seleccionado"> </p>
                            <p class="text-left">¿No recibiste el SMS?</p>
                            <a href="#" id="btnReenviarSMS" class="text-left text-info">Re-enviar el SMS</a><br>
                            <a href="#" id="btnCambiarCelular" class="text-left text-info">Cambiar el numero telefonico</a>
                        </div>
                        <div class=" d-flex justify-content-center mt-3">
                            <a href="<?= base_url() ?>login" id="btnFinish" class="btn-block btn btn-warning" style="display:none">Finalizar</a>
                        </div>
                    </form>
                    <div class=" d-flex justify-content-center mb-3">
                        <button type="button" id="nextBtn" class="btn-block btn btn-warning">Verificar</button><br>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php footerAdmin($data); ?>