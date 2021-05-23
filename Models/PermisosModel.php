<?php
//============================================================+
// Carpeta: Models
// Nombre del archivo   : PermisosModel.php
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
class PermisosModel extends MySQL
{
    public $intRolid;
    public $intModuloid;
    public $r;//Read - Leer
    public $w;//Write - Escribir
    public $u;//Update - Actualizar
    public $d;//Delete - Eliminar

    public function __construct(){
        parent::__construct();
    }

    public function ObtenerModulosModel(){
        $consulta = "SELECT * FROM modulos WHERE estado = 'ACTIVO'";
        $peticion = $this->SelectAll($consulta);
        return $peticion;
    }

    public function ObtenerPermisosRolModel(int $idRol){
        $this->intRolid = $idRol;
        $consulta = "SELECT * FROM permisos WHERE roles_id = $this->intRolid";
        $peticion = $this->SelectAll($consulta);
        return $peticion;
    }

    public function AgregarPermisosModel(int $idRol, int $idModulo, int $r, int $w, int $u, int $d){
        $this->intRolid = $idRol;
        $this->intModuloid = $idModulo;
        $this->r = $r;
        $this->w = $w;
        $this->u = $u;
        $this->d = $d;

        $consulta = "INSERT INTO permisos(roles_id, modulos_id, r, w, u, d) VALUES(?,?,?,?,?,?)";
        $arrInformacion = array($this->intRolid, $this->intModuloid, $this->r, $this->w, $this->u, $this->d);
        $peticion = $this->Insert($consulta, $arrInformacion);
        return $peticion;
    }

    public function EliminarPermisosModel(int $idrol){
        $this->intRolid = $idrol;
        $consulta = "DELETE FROM permisos WHERE roles_id = $this->intRolid";
        $peticion = $this->Delete($consulta);
        return $peticion;
    }

    public function ObtenerPermisosModulo(int $idrol){
        $this->intRolid = $idrol;
        $sql = "SELECT p.roles_id,
                       p.modulos_id,
                       m.titulo as modulo,
                       p.r,
                       p.w,
                       p.u,
                       p.d 
                FROM permisos p 
                INNER JOIN modulos m
                ON p.modulos_id = m.id
                WHERE p.roles_id = $this->intRolid";
        $request = $this->SelectAll($sql);
        $arrPermisos = array();
        for ($i=0; $i < count($request); $i++) { 
            $arrPermisos[$request[$i]['modulos_id']] = $request[$i];
        }
        return $arrPermisos;
    }

}
