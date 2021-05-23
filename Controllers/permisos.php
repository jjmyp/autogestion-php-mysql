<?php
//============================================================+
// Carpeta: Controllers
// Nombre del archivo   : permisos.php
// Inicio       : 2020-11-01
// Ultima actualizacion : 2020-11-19
//
// Description : Modulo para establecer permisos por rol
//
// Author: Jairo Rivera Ordoñez
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer5@grupoasistencia.com
//============================================================+
class Permisos extends Controllers
{
    public function __construct()
    {
        parent::__construct();
    }

    public function ObtenerPermisosRolController(int $idRol)
    {
        $rolid = intval($idRol);
        if ($rolid > 0) {
            $arrModulos = $this->model->ObtenerModulosModel();
            $arrPermisosRol = $this->model->ObtenerPermisosRolModel($idRol);
            /*Las iniciales del arreglo equivalen a: 
                    r: Read - Leer
                    w: Write - Escribir
                    u: Update - Actualizar
                    d: Delete - Eliminar 
                */
            $arrPermisos = array('r' => 0, 'w' => 0, 'u' => 0, 'd' => 0);
            $arrPermisoRol = array('idRol' => $rolid);
            if (empty($arrPermisosRol)) {
                for ($i = 0; $i < count($arrModulos); $i++) {
                    $arrModulos[$i]['permisos'] = $arrPermisos;
                }
            } else {
                for ($i = 0; $i < count($arrModulos); $i++) {
                    $arrPermisos = array('r' => 0, 'w' => 0, 'u' => 0, 'd' => 0);
                    if (isset($arrPermisosRol[$i])) {
                        $arrPermisos =  array(
                            'r' => $arrPermisosRol[$i]['r'],
                            'w' => $arrPermisosRol[$i]['w'],
                            'u' => $arrPermisosRol[$i]['u'],
                            'd' => $arrPermisosRol[$i]['d']
                        );
                    }
                    $arrModulos[$i]['permisos'] = $arrPermisos;
                }
            }
            $arrPermisoRol['modulos'] = $arrModulos;
            getModal("modalPermisos", $arrPermisoRol);
        }
        die();
    }

    public function AgregarPermisosController()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $intIdrol = intval($_POST['idrol']);
            $modulos = $_POST['modulos'];
            $this->model->EliminarPermisosModel($intIdrol);
            foreach ($modulos as $modulo) {
                $idModulo = $modulo['id'];
                $r = empty($modulo['r']) ? 0 : 1;
                $w = empty($modulo['w']) ? 0 : 1;
                $u = empty($modulo['u']) ? 0 : 1;
                $d = empty($modulo['d']) ? 0 : 1;
                $peticion = $this->model->AgregarPermisosModel($intIdrol, $idModulo, $r, $w, $u, $d);
            }
            if ($peticion > 0) {
                $arrRespuesta = array('status' => 'success', 'msg' => 'Permisos asignados correctamente.');
            } else {
                $arrRespuesta = array("status" => 'error', "msg" => 'No es posible asignar los permisos.');
            }
            echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        }
        die();
    }
}
