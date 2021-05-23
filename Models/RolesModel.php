<?php
//============================================================+
// Carpeta: Models
// Nombre del archivo   : RolesModel.php
// Inicio       : 2020-11-01
// Ultima actualizacion : 2020-11-19
//
// Description : Gestion con la base de datos
//
// Author: Jairo Rivera Ordoñez
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer5@grupoasistencia.com
//============================================================+
class RolesModel extends MySQL
{
    private $intIdrol;
    private $strRol;
    private $strObservacion;
    private $strEstado;

    public function __construct(){
        parent::__construct();
    }
    
    public function AgregarRolModel(string $rol, string $observacion){
        $this->strRol = $rol;
        $this->strObservacion = $observacion;
        $ExisteRol = $this->SelectAll("SELECT * FROM roles where rol = '{$this->strRol}'");
        if (empty($ExisteRol)) {
            $consulta =  "INSERT INTO roles(rol, observacion) VALUES(?, ?)";
            $arrInformacion = array($this->strRol, $this->strObservacion);
            $peticion = $this->Insert($consulta, $arrInformacion);
            $respuesta = $peticion;            
        }else{
            $respuesta = "exist";
        }
        return $respuesta;
    }

    public function ObtenerRolModel(string $id){
        $this->intIdrol = $id;
        $consulta = "SELECT id, rol, observacion, fecha_creacion, fecha_actualizacion, estado FROM roles WHERE id = '{$this->intIdrol}'";
        $peticion = $this->Select($consulta);
        return $peticion;
    }

    public function ObtenerRolesModel(){
        $consulta = "SELECT id, rol, observacion, fecha_creacion, fecha_actualizacion, estado FROM roles";
        $peticion = $this->SelectAll($consulta);
        return $peticion;
    }

    public function ActualizarRolModel(int $id, string $rol, string $observacion, string $estado){
        $this->intIdrol = $id;
        $this->strRol = $rol;
        $this->strObservacion = $observacion;
        $this->strEstado = $estado;
        $ExisteRol = $this->SelectAll("SELECT * FROM roles where rol = '{$this->strRol}' AND id NOT IN('{$this->intIdrol}')");
        if (empty($ExisteRol)) {            
            $consulta = "UPDATE roles SET rol = ?, observacion = ?, estado = ?  WHERE id = $this->intIdrol";
            $arrInformacion = array($this->strRol, $this->strObservacion, $this->strEstado);
            $peticion = $this->Update($consulta, $arrInformacion);
            $respuesta = $peticion;
        }else{
            $respuesta = 'exist';
        }
        return $respuesta;
    }

    public function EliminarRolModel(int $id){
        $this->intIdrol = $id;
        $ExisteUsuarioConRol = $this->SelectAll("SELECT * FROM usuarios WHERE roles_id = $this->intIdrol"); 
        if (empty($ExisteUsuarioConRol)) {
            if (!empty($this->intIdrol)) {
                try {                 
                    $consulta = "DELETE FROM roles WHERE id = $this->intIdrol";
                    $this->Delete($consulta);
                    $respuesta = 'success';
                } catch (PDOException $e) {
                    $respuesta = 'error';
                }
            }else{
                $respuesta = 'error';
            }
        }else{
            $respuesta = 'exist';
        }
        return $respuesta;
    }
}
