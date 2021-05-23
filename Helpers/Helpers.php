<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use Facebook\Facebook;
use Facebook\Exceptions\FacebookResponseException;
use Facebook\Exceptions\FacebookSDKException;

// Load Composer's autoloader
require 'vendor/autoload.php';

//Url
function base_url()
{
    return BASE_URL;
}
function media()
{
    return BASE_URL . 'Assets/';
}

function FacebookClient(){
    
    $facebook = new Facebook(array(
        'app_id' => FACEBOOK_APP_ID,
        'app_secret' => FACEBOOK_APP_SECRET,
        'default_graph_version' => FACEBOOK_GRAPH_VERSION,
        'persistent_data_handler' => 'session'
    ));
    
    $helper = $facebook->getRedirectLoginHelper();
    $permissions = ['email'];
    $helper->getLoginUrl(FACEBOOK_REDIRECT_URL, $permissions);
    $helper->getAccessToken();
    // try {
    //     $profileRequest = $facebook->get('/me?fields=name,first_name,last_name,email,link,gender,locale,picture');
    //     $arrResponse = $profileRequest->getGraphNode()->asArray();
    // } catch(FacebookResponseException $e) {
    //     $arrResponse =  array('statusc' => 'error', 'message' => $e->getMessage());      
        
    // } catch(FacebookSDKException $e) {
    //     $arrResponse =  array('statusc' => 'error', 'message' => $e->getMessage());      
    // }
    
    // $response = array('helper' => $helper, 'user_profile' => $arrResponse);

    return $helper;
}

function ReadBinary($url){
    $filename = $url; 
    $handle = fopen($filename, "rb"); 
    $contents = fread($handle, filesize($filename)); 
    return $contents;
}

function FacebookGetProfile($param){
    try {
        $profileRequest = $param->get('/me?fields=name,first_name,last_name,email,link,gender,locale,picture');
        $fbUserProfile = $profileRequest->getGraphNode()->asArray();
        return $fbUserProfile;
    } catch(FacebookResponseException $e) {
        echo 'Graph returned an error: ' . $e->getMessage();
        session_destroy();
        // Redirigir usuario a la página de inicio de sesión de la aplicación
        header("Location: ./");
        exit;
    } catch(FacebookSDKException $e) {
        echo 'Facebook SDK returned an error: ' . $e->getMessage();
        exit;
    }
}

function GoogleClient($url){
    $google_client = new Google_Client();
    $google_client->setApplicationName(GOOGLE_APPLICATION_NAME);
    $google_client->setDeveloperKey(GOOGLE_API_KEY);
    $google_client->setApprovalPrompt(false);
    //Set the OAuth 2.0 Client ID
    $google_client->setClientId(GOOGLE_APP_ID);
    $google_client->setAccessType("offline");
    $google_client->setApprovalPrompt('force');
    //Set the OAuth 2.0 Client Secret key
    $google_client->setClientSecret(GOOGLE_APP_SECRET);
    //Set the OAuth 2.0 Redirect URI
    $google_client->setRedirectUri($url);
    $google_client->addScope('email');
    $google_client->addScope('profile');
    return $google_client;
}

function GoogleService($google){
    $google_service = new Google_Service_Oauth2($google);
    return $google_service;
}

function headerAdmin($data = "")
{
    $view_header = "Views/Partials/header_admin.php";
    require_once($view_header);
}
function footerAdmin($data = "")
{
    $view_footer = "Views/Partials/footer_admin.php";
    require_once($view_footer);
}
//Formatear array
function dep($data)
{
    $format = print_r('<pre>');
    $format .= print_r($data);
    $format .= print_r('<pre>');
    return $format;
}

function PeticionTruoraImage($url, $data){
    $curl = curl_init();

    // $file = array( 'file' => $data );

    curl_setopt_array($curl, array(
      CURLOPT_URL => $url,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'PUT',
      CURLOPT_POSTFIELDS => $data,
      CURLOPT_HTTPHEADER => array(
        'Content-Type: image/jpeg'
      ),
    ));
    
    $response = curl_exec($curl);
    
    curl_close($curl);

    return $response;
}

function PeticionTruora($url, $data = null, $header = '')
{
    if ($header) {
        $contentType = '';
        switch ($header) {
            case 'ctfd':
                $contentType = 'Content-Type: multipart/form-data';
                break;
            case 'ctap':
                $contentType = 'Content-Type: application/json; charset=UTF-8';
                break;
            case 'ctxb':
                $contentType = 'application/x-binary';
                break;
        }
        $headers = array(
            $contentType,
            'Truora-API-Key: ' . TRUORA_API_KEY
        );

        $ch = curl_init($url);

        if ($data != null) {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        }

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $respuesta = curl_exec($ch);

        curl_close($ch);
    } else {
        $respuesta  = array(
            'status' => 'error',
            'msg' => 'Para poder enviar la peticion se necesitan las cabeceras'
        );
    }
    return $respuesta;
}


function getPermisos(int $idmodulo){
    require_once ("Models/PermisosModel.php");
    $objPermisos = new PermisosModel();
    $idrol = $_SESSION['userData']['rol_id'];
    $arrPermisos = $objPermisos->ObtenerPermisosModulo($idrol);
    $permisos = '';
    $permisosMod = '';
    if(count($arrPermisos) > 0 ){
        $permisos = $arrPermisos;
        $permisosMod = isset($arrPermisos[$idmodulo]) ? $arrPermisos[$idmodulo] : "";
    }
    $_SESSION['permisos'] = $permisos;
    $_SESSION['permisosMod'] = $permisosMod;
}


function sessionUser(int $idpersona){
    require_once ("Models/LoginModel.php");
    $objLogin = new LoginModel();
    $request = $objLogin->SesionLoginModel($idpersona);
    return $request;
}
function getModal(string $nameModal, $data)
{
    $view_modal = "Views/Partials/Modals/{$nameModal}.php";
    require_once $view_modal;
}
function tiempo_a_decimal($hora)
{
    $HoraArr = explode(':', $hora);
    $hora_decimal = ($HoraArr[0] * 60) + ($HoraArr[1]) + ($HoraArr[2] / 60);
    return $hora_decimal;
}
function decimal_a_tiempo($decimal)
{
    $horas = floor($decimal / 60);
    $minutos = floor($decimal % 60);
    $segundos = $decimal - (int)$decimal;
    $segundos = round($segundos * 60);
    return str_pad($horas, 2, "0", STR_PAD_LEFT) . ":" . str_pad($minutos, 2, "0", STR_PAD_LEFT) . ":" . str_pad($segundos, 2, "0", STR_PAD_LEFT);
}
function validar_festivos($fecha)
{
    $timestamp = strtotime($fecha);
    $weekday = date("l", $timestamp);
    if ($weekday == "Saturday" or $weekday == "Sunday") {
        return true;
    } else {
        return false;
    }
}
function validar_fecha($fecha)
{
    $valores = explode('-', $fecha);
    if (count($valores) == 3 && checkdate($valores[1], $valores[0], $valores[2])) {
        return true;
    }
    return false;
}
function validar_nombre_usuario($nombre)
{
    return preg_match('/^[a-z\d_]{4,28}$/i', $nombre);
}
function validar_nombre_completo($nombre)
{
    return preg_match('/^[a-zñÑáéíóú\d_\s]{4,28}$/i', $nombre);
}
function validar_telefono($telefono)
{
    return preg_match('/^[0-9]{10,10}$/', $telefono);
}
function validar_email($email)
{
    return preg_match('/^[^0-9][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[@][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,4}$/', $email);
}
function validar_fecha_v2($fecha)
{
    return preg_match('/^(\d\d\/\d\d\/\d\d\d\d){1,1}$/', $fecha);
}
function validar_web($url)
{
    if (strlen($url) > 0)
        return preg_match('/^[http:\/\/|www.|https:\/\/]/i', $url);
}
function validar_requerido($texto)
{
    return !(trim($texto) == '');
}
function validar_entero($numero)
{
    return filter_var($numero, FILTER_VALIDATE_INT);
}


function VerificarDatos($data, $no_requerido = null)
{
    if (is_array($data)) {
        foreach ($data as  $key => $value) {
            $datos = limpiar_cadena($value);
            if (!empty($no_requerido)) {
                if (!in_array($key, $no_requerido)) {
                    if (empty($value)) {
                        $arrError[] =  'El campo ' . $key . ' es obligatorio para el registro';
                    }
                }
            } else {
                if (empty($value)) {
                    $arrError[] =  'El campo ' . $key . ' es obligatorio para el registro';
                }
            }
            $arrSuccess[$key] = $datos;
        }
        if (isset($arrError[0])) {
            $arrResponse = $arrError;
        } else {
            $arrResponse = $arrSuccess;
        }
    } else {
        $arrResponse = array('error' => 'La variable debe ser tipo Array');
    }
    return $arrResponse;
}

function limpiar_cadena($string): String
{
    $string = trim($string);
    $string = stripslashes($string);
    $string = str_ireplace("<script>", "", $string);
    $string = str_ireplace("</script>", "", $string);
    $string = str_ireplace("<script src>", "", $string);
    $string = str_ireplace("<script type=>", "", $string);
    $string = str_ireplace("SELECT * FROM", "", $string);
    $string = str_ireplace("DELETE FROM", "", $string);
    $string = str_ireplace("INSERT INTO", "", $string);
    $string = str_ireplace("UPDATE", "", $string);
    $string = str_ireplace("SELECT COUNT(*) FROM", "", $string);
    $string = str_ireplace("DROP TABLE", "", $string);
    $string = str_ireplace("OR '1'='1'", "", $string);
    $string = str_ireplace('OR "1"="1"', "", $string);
    $string = str_ireplace("OR ´1´=´1´", "", $string);
    $string = str_ireplace("OR 'a'='a'", "", $string);
    $string = str_ireplace("OR ´a´=´a´", "", $string);
    $string = str_ireplace('OR "a"="a"', "", $string);
    $string = str_ireplace("is NULL; --", "", $string);
    $string = str_ireplace("LIKE '", "", $string);
    $string = str_ireplace('LIKE "', "", $string);
    $string = str_ireplace("LIKE ´", "", $string);
    $string = str_ireplace("<?php", "", $string);
    $string = str_ireplace("<?php", "", $string);
    $string = str_ireplace("<?", "", $string);
    $string = str_ireplace("¿>", "", $string);
    $string = str_ireplace("==", "", $string);
    $string = str_ireplace("[", "", $string);
    $string = str_ireplace("]", "", $string);
    $string = str_ireplace("^", "", $string);
    $string = str_ireplace("--", "", $string);
    return $string;
}

function eliminar_archivo(string $name)
{
    unlink('Assets/images/uploads/' . $name);
}

function generar_contrasena($longitud = 10)
{
    $contrasena = "";
    $cadena = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijqlmnopqrstuvwxyz1234567890";
    $longitud_cadena = strlen($cadena);
    for ($i = 1; $i <= $longitud; $i++) {
        $pos = rand(0, $longitud_cadena - 1);
        $contrasena .= substr($cadena, $pos, 1);
    }
    return $contrasena;
}

function token()
{
    $r1 = bin2hex(random_bytes(10));
    $r2 = bin2hex(random_bytes(10));
    $r3 = bin2hex(random_bytes(10));
    $r4 = bin2hex(random_bytes(10));
    $token = $r1 . "-" . $r2 . "-" . $r3 . "-" . $r4;
    return $token;
}

function formato_moneda($cantidad)
{
    $cantidad = number_format($cantidad, 2, SPM, SPD);
    return $cantidad;
}



function verificar_token($token)
{
    require_once("Models/InvitacionRegistroModel.php");
    $objToken = new InvitacionRegistroModel();
    $arrResponse = $objToken->ObtenerToken($token);
    return $arrResponse;
}

function actualizar_token($token){
    require_once("Models/InvitacionRegistroModel.php");
    $objToken  = new InvitacionRegistroModel();
    $arrResponse = $objToken->ActualizarToken($token);
    return $arrResponse;
}


function enviar_correo_electronico2($data)
{
    $mail = new PHPMailer(true);

    //Tell PHPMailer to use SMTP
    $mail->isSMTP();
    //Set the hostname of the mail server
    $mail->Host = SENDER_HOST;
    //Set the SMTP port number - likely to be 25, 465 or 587
    $mail->Port = SENDER_PORT;
    //Whether to use SMTP authentication
    $mail->SMTPAuth = true;
    //Secure
    $mail->SMTPSecure = 'ssl';
    //Username to use for SMTP authentication
    $mail->Username = SENDER_EMAIL;
    //Password to use for SMTP authentication
    $mail->Password = SENDER_PASSWORD;
    //Set who the message is to be sent from
    $mail->setFrom(SENDER_EMAIL, SENDER_COMPANY_NAME);
    //Set an alternative reply-to address
    // $mail->addReplyTo('info@grupoasistencia.com', 'Magic');
    //Set who the message is to be sent to
    $mail->addAddress($data['correo_electronico'], $data['nombre']);
    //Set the subject line
    $mail->Subject = $data['asunto']; //Hola
    $mail->SMTPOptions = array(
          'ssl' => array(
              'verify_peer' => false,
              'verify_peer_name' => false,
              'allow_self_signed' => true
        )
    );
    include "Views/Partials/Email/" . $data['template'] . ".php";

    $mail->Body = $data['mensaje']; // Mensaje a enviar

    $mail->msgHTML($template, __DIR__);

    $enviar = $mail->send();
    
    return $enviar;
}

function enviar_correo_electronico($data, $template)
{
    $asunto = $data['asunto'];
    $emailDestino = $data['email'];
    $empresa = SENDER_COMPANY_NAME;
    $remitente = SENDER_EMAIL;
    $de = "MIME-Version: 1.0\r\n";
    $de .= "Content-type: text/html; charset=UTF-8\r\n";
    $de .= "From: {$empresa} <{$remitente}>\r\n";
    ob_start();
    require_once("Views/Partials/Email/" . $template . ".php");
    $mensaje = ob_get_clean();
    $send = mail($emailDestino, $asunto, $mensaje, $de);
    return $send;
}

function subir_imagen($imagen, $nombrearchivo, $ruta)
{
    //Ruta de la carpeta donde se guardarán las imagenes
    $path = $ruta;

    //Parámetros optimización, resolución máxima permitida
    $max_ancho = 1280;
    $max_alto = 900;

    if ($imagen['type'] == 'image/png' || $imagen['type'] == 'image/jpeg' || $imagen['type'] == 'image/gif') {

        $medidasimagen = getimagesize($imagen['tmp_name']);
        //Si las imagenes tienen una resolución y un peso aceptable se suben tal cual
        if ($medidasimagen[0] < 1280 && $imagen['size'] < 100000) {
            move_uploaded_file($imagen['tmp_name'], $path . $nombrearchivo);
        }
        //Si no, se generan nuevas imagenes optimizadas
        else {
            //Redimensionar
            $rtOriginal = $imagen['tmp_name'];
            if ($imagen['type'] == 'image/jpeg') {

                $original = imagecreatefromjpeg($rtOriginal);
                $grados =  80;
                // Rotar
                $rotar = imagerotate($original, $grados, 0);
                // Imprimir
                imagejpeg($rotar, $path . $nombrearchivo);
            } else if ($imagen['type'] == 'image/png') {
                $original = imagecreatefrompng($rtOriginal);
            } else if ($imagen['type'] == 'image/gif') {
                $original = imagecreatefromgif($rtOriginal);
            }

            list($ancho, $alto) = getimagesize($rtOriginal);

            $x_ratio = $max_ancho / $ancho;
            $y_ratio = $max_alto / $alto;

            if (($ancho <= $max_ancho) && ($alto <= $max_alto)) {
                $ancho_final = $ancho;
                $alto_final = $alto;
            } elseif (($x_ratio * $alto) < $max_alto) {
                $alto_final = ceil($x_ratio * $alto);
                $ancho_final = $max_ancho;
            } else {
                $ancho_final = ceil($y_ratio * $ancho);
                $alto_final = $max_alto;
            }
            $lienzo = imagecreatetruecolor($ancho_final, $alto_final);
            imagecopyresampled($lienzo, $original, 0, 0, 0, 0, $ancho_final, $alto_final, $ancho, $alto);
            $cal = 8;

            if ($imagen['type'] == 'image/jpeg') {
                imagejpeg($lienzo, $path . $nombrearchivo);
            } else if ($imagen['type'] == 'image/png') {
                imagepng($lienzo, $path . $nombrearchivo);
            } else if ($imagen['type'] == 'image/gif') {
                imagegif($lienzo, $path . $nombrearchivo);
            }

            return $nombrearchivo;
        }
    } else {
        return false;
    }
}
function peticion_sga($url, $method, $postfields = NULL)
{
    $curl = curl_init();

    $header = array(
        "sga-token: ".SGA_API_KEY
    );

    if(isset($postfields['image'])){
        $header[] = "ContentType: multipart/form-data";
    }

    curl_setopt_array($curl, array(
        CURLOPT_URL => SGA_URL.$url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_POSTFIELDS => $postfields,
        CURLOPT_HTTPHEADER => $header
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    return $response;
}

function Cotizar(String $url, String $xml, String $method, $DoYouHaveCertificates = false, array $certificates = null)
{
    //Instanciando un nuevo objeto cliente para consumir el webservice
    $client = new nusoap_client($url, true);
    $client->response_timeout = 800;
    $client->soap_defencoding = 'UTF-8';
    $client->decode_utf8 = false;

    //El codigo que vale oro.
    $client->setUseCURL(true); // Inicializa los CURL y Verifique si hay datos de configuración para el Certificado.
    $client->useHTTPPersistentConnection(); // Una sola conexión TCP para enviar y recibir múltiples solicitudes/respuestas.
    $client->setCurlOption(CURLOPT_SSL_VERIFYHOST, 1); // Valida que el Host donde apunta el servicio sea el correcto, de lo contrario la conexión falla.
    $client->setCurlOption(CURLOPT_SSL_VERIFYPEER, 1); // Valida que el Certificado es auténtico, de lo contrario la conexión falla.
    // $client->setCurlOption(CURLOPT_RETURNTRANSFER, 1); // Configura el CURL para devolver los datos en lugar de imprimirlos en el navegador.
    // $client->setCurlOption(CURLOPT_SSLVERSION, 1); // Establece la version que soporta el Certificado SSL.

    if ($DoYouHaveCertificates) {
        $client->setCredentials('', '', 'certificate', $certificates);
    }

    //Llamamos el método y realizamos la petición pasandole el XML
    $rs = $client->send($xml, $method);

    $xml_response = json_encode($rs);

    $xml_convertido = json_decode($xml_response, true);

    // $respuesta = array('xml_request' => $xml, 'xml_response' => $xml_response);



    //Si ocurre algún error al consumir el Web Service
    if ($client->fault) {
        $arrResponse = json_encode($rs, JSON_UNESCAPED_UNICODE);
    } else {  // Chequea errores
        $err = $client->getError();
        
        if ($err) { // Muestra el error
           
        
                $arrResponse = json_encode(array('status' => 'error', 'message' => 'Tiempo de respuesta agotado, intenta de nuevo.' ), JSON_UNESCAPED_UNICODE);
        
                        
        } else {
            $arrResponse = json_encode(array('status' => 'success', 'message' => 'Placa cotizada exitosamente', 'result' => $xml_convertido), JSON_UNESCAPED_UNICODE);
        }
    }

    echo $arrResponse;
}