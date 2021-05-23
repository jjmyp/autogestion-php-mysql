$(document).ready(function () {
    var tableRoles;
    const formAgregarRol = document.querySelector('#formAgregarRol')
    //Llamada de informacion de roles
    $('#tableRoles').DataTable({
        colReorder: true,
        responsive: true,
        ajax: {
            url: base_url + 'roles/ObtenerRolesController/',
            dataSrc: ''
        },
        language: {
            url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json'
        },
        columns: [
            { data: 'consecutivo' },
            { data: 'rol' },
            { data: 'observacion' },
            { data: 'fecha_creacion' },
            { data: 'fecha_actualizacion' },
            { data: 'estado' },
            { data: 'opciones' }
        ],
        resonsieve: true,
        bDestroy: true,
        iDisplayLength: 10,
        order: [[0, 'desc']]
    });
    //Formulario para agregar nuevo rol
    $(formAgregarRol).on('submit', function (e) {
        e.preventDefault()
        var intIdrol = document.querySelector('#idRol').value;
        var strRol = document.querySelector('#txtRol').value;
        var strObservacion = document.querySelector('#txtObservacion').value;

        if (strRol == '' || strObservacion == '') {
            Message('Recuerda que los campos con asterisco son requeridos', 'warning')
        } else {
            $.ajax({
                url: base_url + 'roles/AgregarRolController',
                method: 'POST',
                data: new FormData(this),
                processData: false,
                contentType: false,
                dataType: 'JSON',
                success: function (objData) {
                    if (objData.status == 'success') {
                        $('#modalRoles').modal('hide')
                        Reload(tableRoles)
                        formAgregarRol.reset()
                        Message(objData.msg, objData.status)
                        Reload('#tableRoles')
                    } else if (objData.status == 'warning') {
                        Message(objData.msg, objData.status)
                    } else {
                        Message(objData.msg, objData.status)
                    }
                }
            })

        }
    })
})

window.addEventListener('load', function () {
}, false);

//Abrir modal de roles
function openModal() {
    document.querySelector('#idRol').value = ""
    document.querySelector('#modalAgregarRolesLabel').innerHTML = "Nuevo Rol";
    document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
    document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
    document.querySelector('#btnText').innerHTML = "Guardar";
    document.querySelector('#formAgregarRol').reset()
    $("#txtEstado").remove();
    $("#labelEstado").remove();
    $('#modalRoles').modal('show');
}
//funcion Editar Rol
function fntEditarRol(id) {
    document.querySelector('#modalAgregarRolesLabel').innerHTML = "Actualizar Rol";
    document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
    document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
    document.querySelector('#btnText').innerHTML = "Actualizar";
    $.ajax({
        url: base_url + 'roles/ObtenerRolController/' + id,
        type: 'GET',
        dataType: 'JSON',
        success: function (objData) {
            if (objData.status == 'success') {
                document.querySelector('#idRol').value = objData.data.id
                document.querySelector('#txtRol').value = objData.data.rol
                document.querySelector('#txtObservacion').value = objData.data.observacion
                if (objData.data.estado == 'ACTIVO') {
                    var optionSelect = `
                                <option value="ACTIVO" selected class="notBlock">Activo</option>
                                <option value="INACTIVO" class="notBlock">Inactivo</option>
                            `
                } else {
                    var optionSelect = `
                                <option value="ACTIVO" class="notBlock">Activo</option>
                                <option value="INACTIVO" selected class="notBlock">Inactivo</option>
                            `
                }
                var htmlSelect = `
                            <label id="labelEstado">Estado</label>
                            <select name="txtEstado" id="txtEstado" class="form-control">
                                ${optionSelect}
                            </select>
                        `
                document.querySelector('.selectEstado').innerHTML = htmlSelect
                $('#modalRoles').modal('show')
            } else {
                Message(objData.msg, objData.status)
            }
        }
    })

}

//Funcion Eliminar Rol
function fntEliminarRol(id) {
    
    Swal.fire({
      title: "Eliminar rol",
      text: "¿Realmente quiere eliminar el rol?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, cancelar!",
      closeOnConfirm: true,
      closeOnCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: base_url + "roles/EliminarRolController",
          method: "POST",
          data: { idRol: id },
          dataType: "JSON",
          success: function (objData) {
            if (objData.status == "success") {
              Message(objData.msg, objData.status);
              Reload("#tableRoles");
            } else if (objData.status == "warning") {
              Message(objData.msg, objData.status);
            } else {
              Message(objData.msg, objData.status);
            }
          },
        });
      }
    });
}

//funcion mostrar permisos
function fntPermisos(id) {
    $.ajax({
        url: base_url + 'permisos/ObtenerPermisosRolController/' + id,
        type: 'GET',
        dataType: 'HTML',
        success: function (objData) {
            document.querySelector('#contentAjax').innerHTML = objData
            $('#modalPermisos').modal('show')
            document.querySelector('#formPermisos').addEventListener('submit', fntGuardarPermiso, false)
        }
    })
}

//Funcion registrar permisos
function fntGuardarPermiso(event) {
    event.preventDefault()
    $.ajax({
        url: base_url + 'permisos/AgregarPermisosController',
        method: 'POST',
        data: new FormData(document.querySelector('#formPermisos')),
        processData: false,
        contentType: false,
        dataType: 'JSON',
        success: function (objData) {
            if (objData.status == 'success') {
                Message(objData.msg, objData.status);
                Reload(tableRoles)
                $('#modalPermisos').modal('hide')
            } else if (objData.status == 'warning') {
                Message(objData.msg, objData.status);
            } else {
                Message(objData.msg, objData.status);
            }
        }
    })
}