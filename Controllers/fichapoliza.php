<?php
//============================================================+
// Carpeta: Controllers
// Nombre del archivo   : fichapoliza.php
// Inicio       : 2021-02-04
// Ultima actualizacion : 
//
// Description : Permitirá ver las polizas que los comerciales hayan ingresado al sitema
//
// Author: Jose Carlos Avila
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer2@grupoasistencia.com
//============================================================+
class FichaPoliza extends Controllers
{
    public function __construct()
    {
        session_start();
        if (!isset($_SESSION['login'])) {
            header('Location: ' . base_url());
        }
        getPermisos(6);
        parent::__construct();
    }

    public function FichaPoliza()
    {
        $data['page_id'] = 1;
        $data['page_tag'] = 'FichaPoliza';
        $data['page_title'] = 'Consulta tus negocios';
        $data['page_name'] = 'Pagina principal';
        $data['page_functions_js'] = 'function_ficha_poliza.js';
        $data['page_header'] = 1;
        $this->views->getView($this, "fichapoliza", $data);
    }



    public function ConsultarTypes()
    {

        $datoBusqueda = limpiar_cadena($_POST['codigo']);

        $arrInformacion = $this->model->ConsultarTypes($datoBusqueda);

        $select = "";
        $select .= "<option selected disabled> </option>";
        foreach ($arrInformacion as $key => $value) {
            $select .= "<option value=" . $value->tipos_id . ">" . strtoupper($value->descripcion_tipos) . "</option>";
        }

        echo $select;
        die();
    }



    public function ConsultarNegocios()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {

            $datoBusqueda = limpiar_cadena($_POST['datoBusqueda']);
            $ramoBusqueda = limpiar_cadena($_POST['ramoBusqueda']);

            // $arrRespuesta = "";

            // if (empty($datoBusqueda)) {             //Caundo el dato está vacio

            //     $arrRespuesta = array('status' => 'success', 'msg' => 'Recuerda que debes ingresar información para consultar');
            // } else {                //Caundo el dato no está vacio

                $arrInformacion = $this->model->ConsultarNegocios($datoBusqueda, $ramoBusqueda);

                if (empty($arrInformacion)) {       //Cuando la busqueda sea vacia

                    $arrRespuesta = array('status' => 'warning', 'msg' => 'Datos no encontrados');
                } else {                        // Si la busqueda trae datos

                    $arrRespuesta = array('status' => 'success', 'data' => $arrInformacion);
                    // $arrRespuesta = array('status' => 'success', 'data' => "1212");
                }
            // }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }

        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }



    public function ConsultarRemision()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {

            $datoBusqueda = limpiar_cadena($_POST['datoBusqueda']);
            // $arrRespuesta = "";

            if (empty($datoBusqueda)) {             //Caundo el dato está vacio

                $arrRespuesta = array('status' => 'success', 'msg' => 'Recuerda que debes ingresar información para consultar');
            } else {                //Caundo el dato no está vacio

                $arrInformacion = $this->model->ConsultarRemision($datoBusqueda);

                if (empty($arrInformacion)) {       //Cuando la busqueda sea vacia

                    $arrRespuesta = array('status' => 'warning', 'msg' => 'Datos no encontrados');
                } else {                        // Si la busqueda trae datos

                    $arrRespuesta = array('status' => 'success', 'data' => $arrInformacion);
                    // $arrRespuesta = array('status' => 'success', 'data' => "1212");
                }
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }

        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }



    public function ConsultaGeneralRemision()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {

            $datoBusqueda = limpiar_cadena($_POST['datoBusqueda']);
            // $arrRespuesta = "";

            if (empty($datoBusqueda)) {             //Caundo el dato está vacio

                $arrRespuesta = array('status' => 'success', 'msg' => 'Recuerda que debes ingresar información para consultar');
            } else {                //Caundo el dato no está vacio

                $arrInformacion = $this->model->ConsultaGeneralRemision($datoBusqueda);

                if (empty($arrInformacion)) {       //Cuando la busqueda sea vacia

                    $arrRespuesta = array('status' => 'warning', 'msg' => 'Datos no encontrados');
                } else {                        // Si la busqueda trae datos

                    $arrRespuesta = array('status' => 'success', 'data' => $arrInformacion);
                    // $arrRespuesta = array('status' => 'success', 'data' => "1212");
                }
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }

        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }



    public function ConsultarSiniestrosPoliza()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {

            $datoBusqueda = limpiar_cadena($_POST['datoBusqueda']);
            // $arrRespuesta = "";

            if (empty($datoBusqueda)) {             //Caundo el dato está vacio

                $arrRespuesta = array('status' => 'success', 'msg' => 'Recuerda que debes ingresar información para consultar');
            } else {                //Caundo el dato no está vacio

                $arrInformacion = $this->model->ConsultarSiniestrosPoliza($datoBusqueda);

                if (empty($arrInformacion)) {       //Cuando la busqueda sea vacia

                    $arrRespuesta = array('status' => 'warning', 'msg' => 'Datos no encontrados');
                } else {                        // Si la busqueda trae datos

                    $arrRespuesta = array('status' => 'success', 'data' => $arrInformacion);
                    // $arrRespuesta = array('status' => 'success', 'data' => "1212");
                }
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }

        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }



    public function ConsultarArchivosPoliza()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {

            $datoBusqueda = limpiar_cadena($_POST['datoBusqueda']);
            // $arrRespuesta = "";

            if (empty($datoBusqueda)) {             //Caundo el dato está vacio

                $arrRespuesta = array('status' => 'success', 'msg' => 'Recuerda que debes ingresar información para consultar');
            } else {                //Caundo el dato no está vacio

                $arrInformacion = $this->model->ConsultarArchivosPoliza($datoBusqueda);

                if (empty($arrInformacion)) {       //Cuando la busqueda sea vacia

                    $arrRespuesta = array('status' => 'warning', 'msg' => 'Datos no encontrados');
                } else {                        // Si la busqueda trae datos

                    $arrRespuesta = array('status' => 'success', 'data' => $arrInformacion);
                    // $arrRespuesta = array('status' => 'success', 'data' => "1212");
                }
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }

        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }



    public function AddDocument()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {

            $tipoDocumento = $_POST['tipoDocumento'];
            $poliza_id = $_POST['hiddenKey'];
            $archivo = $_FILES['file-input'];

            if (empty($archivo)) {             //Caundo el dato está vacio

                $arrRespuesta = array('status' => 'success', 'msg' => 'Recuerda que debes ingresar un documento para guardarlo');
            } else {                //Caundo el dato no está vacio

                $arrInformacion = $this->model->AddDocument($tipoDocumento, $poliza_id, $archivo);

                if (empty($arrInformacion)) {       //Cuando la busqueda sea vacia

                    $arrRespuesta = array('status' => 'warning', 'msg' => 'Datos no encontrados');
                } else {                        // Si la busqueda trae datos

                    $arrRespuesta = array('status' => 'success', 'data' => $arrInformacion);
                    // $arrRespuesta = array('status' => 'success', 'data' => "1212");
                }
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }

        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }
}
