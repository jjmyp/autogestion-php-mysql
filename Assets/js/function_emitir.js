//variable global necesarios para emitir xml
var tipo_documento = "";
var celular = "";
var email = "";
var direccion = "";
const account_id = document.getElementById("accountId_referidor").value;
const identificacion = document.getElementById("identificacion_referidor")
  .value;
const celular_referidor = document.getElementById("celular_referidor").value;
const contador_expedicion = document.getElementById("contador_expedicion")
  .value;
$(document).ready(function () {
  $(".video").hide();
  $("#successValidation").hide();
  $("#successValidationFaceId").hide();
  $("#imageVerificar").hide();

  const cotizar_soat_placa = JSON.parse(
    localStorage.getItem("cotizar_soat_placa")
  );
  const datosemision = JSON.parse(localStorage.getItem("datosemision"));
  const storecorreo = JSON.parse(localStorage.getItem("storecorreo"));
  console.log(localStorage.getItem("cotizar_soat_placa"));
  console.log(localStorage.getItem("datosemision"));

  // if(cotizacion === null || cotizacion === undefined){
  //     window.location = base_url+ 'polizas/soatplaca'
  //   }
  $("#valor_total").html(
    new Intl.NumberFormat().format(
      cotizar_soat_placa.Body.Cliente.CotizacionesAsociadas.Cotizacion
        .ValorToltal
    )
  );
  //$("#valor_total").html(cotizar_soat_placa.Body.Cliente.CotizacionesAsociadas.Cotizacion.ValorToltal);
  $("#nombre").val(
    cotizar_soat_placa.Body.Cliente.Cliente_TYPE.PersonaDetalle.Persona
      .DatosBasicos.NombreCompleto
  );
  $("#placa").val(cotizar_soat_placa.Body.Vehiculo.Placa);

  const marca = cotizar_soat_placa.Body.Vehiculo.Marca;
  const linea = cotizar_soat_placa.Body.Vehiculo.Linea;
  const marca_linea = marca + "  -  " + linea;
  $("#marca").val(marca_linea);
  $("#numero_documento").val(
    cotizar_soat_placa.Body.Cliente.Cliente_TYPE.PersonaDetalle.Persona
      .Identificacion.Identificacion
  );

  // Datos necesarios para emitir xml
  tipo_documento =
    cotizar_soat_placa.Body.Cliente.Cliente_TYPE.PersonaDetalle.Persona
      .Identificacion.TipoIdentificacion;
  celular = datosemision.celular;
  email = storecorreo.correo_electronico;
  direccion = datosemision.direccion;
});

function emitir() {
  var placa = document.getElementById("placa").value;
  var numero_documento = document.getElementById("numero_documento").value;
  $.ajax({
    data: {
      placa: placa,
      numero_documento: numero_documento,
      tipo_documento: tipo_documento,
      celular: celular,
      email: email,
    },
    method: "POST",
    url: base_url + "polizas/emitirsoat",
    dataType: "JSON",
    beforeSend: function () {
      $("#cover-spin").show(0);
    },
    success: function (response) {
      $("#cover-spin").hide(0);
      console.log("ajax emision");
      console.log(response);
      if (response.status === "success") {
        var Exception_FlagException = response.result.Header.FlagException;
        if (Exception_FlagException != "true") {
          Message(response.message, response.status);
          console.log("entro");
          // var formapago = $('#forma_pago').val();
          var formapago = $("input:radio[name=foma_pago]:checked").val();

          // Descomponemos el nombre completo

          const nombre_completo = response.result.Body.SOAT.DatosSoat.DatoSoat.Propietario.Persona.DatosBasicos.NombreCompleto.split(
            " "
          );
          const countSplit = nombre_completo.length;

          var primer_nombre = "";
          var primer_apellido = "";
          var segundo_apellido = "";
          var segundo_nombre = "";

          if (countSplit == 2) {
            primer_nombre = nombre_completo[0];
            primer_apellido = nombre_completo[1];
            segundo_apellido = "";
            segundo_nombre = "";
          } else if (countSplit == 3) {
            primer_nombre = nombre_completo[0];
            primer_apellido = nombre_completo[1];
            segundo_apellido = nombre_completo[2];
            segundo_nombre = "";
          } else {
            primer_nombre = nombre_completo[0];
            segundo_nombre = nombre_completo[1];
            primer_apellido = nombre_completo[2];
            segundo_apellido = nombre_completo[3];
          }

          const primer_nombres1 = primer_nombre;
          const segundo_nombre2 = segundo_nombre;
          const primer_apellido1 = primer_apellido;
          const segundo_apellido2 = segundo_apellido;

          $.ajax({
            url: base_url + "polizas/SaveEmission",
            method: "POST",
            data: {
              emision: response.result,
              datos: {
                primer_nombre: primer_nombres1,
                segundo_nombre: segundo_nombre2,
                primer_apellido: primer_apellido1,
                segundo_apellido: segundo_apellido2,
                direccion: direccion,
                formapago: formapago,
              },
            },
            dataType: "JSON",
            success: function (responsedata) {
              console.log(responsedata);
              $.ajax({
                url: base_url + "polizas/UpdateExpedicionUsuario",
                method: "POST",
                data: {
                  datos: "prueba",
                },
                dataType: "JSON",
                success: function (responseUpdate) {
                  console.log(responseUpdate);
                },
              });
              //JSON.stringfy Sirve para guardar un objeto
              localStorage.setItem(
                "emitir_soat_placa",
                JSON.stringify(response.result)
              );
              window.location = base_url + "polizas/resumenventa";
            },
          });
        } else {
          document.querySelector("#error").innerHTML =
            "Ocurrió un error en la transacción, por favor diríjase a cualquiera de nuestras sucursales de AXA Colpatria a nivel Nacional\n No se encuentra una consulta Runt previa para la cotización. " +
            '<a target="_blank" href="https://www.axacolpatria.co/portal/Red/cid/23/Sucursales-Seguros-y-Capitalizacion-Colpatria">Listado sucursales AXAcolpatria</a>';
        }
      } else {
        Message(response.message, "danger");
      }
    },
  });
  return true;
}


//FUNCIONES INICIALES

document.addEventListener("DOMContentLoaded", function () {
  window.stepper = new Stepper(document.querySelector(".bs-stepper"));
});

//MODAL -> FACE ID
$(document).on("change", "#video", function (evt) {
  document.getElementById("upload-faceid").style.display = "none";
  var $source = $("#video_here");
  $(".video").show();
  $source[0].src = URL.createObjectURL(this.files[0]);
  $source.parent()[0].load();
});

$("#upload-button").on("click", function () {
  $("#cedula_frontal").click();
});

$("#upload-button2").on("click", function () {
  $("#cedula_trasera").click();
});

$("#upload-button-foto-base").on("click", function () {
  $("#foto_base").click();
});

$("#upload-button-faceid").on("click", function () {
  $("#video").click();
});

$("#video").on("change", function () {
  $("#btnValidateFaceId").prop("disabled", false);
});

$("#cedula_frontal").on("change", function () {
  $("#botonsiguiente").prop("disabled", false);
});

$("#cedula_trasera").on("change", function () {
  $("#btnEnviarValidacion").prop("disabled", false);
});


//->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-
//->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PHOTO BASE<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-
//->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-
//SUBIR FOTO BASE PARA LA VALIDACION

$("#formFotoBase").on("submit", function (e) {
  e.preventDefault();
  var formData = new FormData(this);
  var enrollment_faceid = JSON.parse(localStorage.getItem("enrollment_faceid"));
  formData.append("file_upload_link", enrollment_faceid.file_upload_link);
  $.ajax({
    url: base_url + "polizas/FileUploadLinkFaceId",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    dataType: "JSON",
    beforeSend: function () {
      $("#cover-spin").show(0);
    },
    success: function (data) {
      console.log("FACEID-UPLOAD-PHOTO-BASE", data);
      $("#cover-spin").hide(0);
      $("#ModalFotoBase").modal("hide");
      //Document Validation
      $("#ModalVerificarDocumento").modal("show");
      $.ajax({
        url: base_url + "polizas/EnrollmentDocument",
        type: "POST",
        data: {
          prueba: "prueba",
        },
        dataType: "JSON",
        success: function (data) {
          console.log("DOCUMENT-CREATE-ENROLLMENT", data);
          localStorage.setItem("enrollment_document", JSON.stringify(data));
        },
      });
    },
  });
});



//->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-
//->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PHONE VALIDATION<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-
//->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-
//Abrir modal y enviar validacion de mensaje de texto

$("#btnValidarCodigo").on("click", function (e) {
  e.preventDefault();
  emitir();
  console.log("Ultimo paso");
});

function PhoneValidation() {
  $("#ModalVerificarFaceId").modal("hide");
  $("#ModalVerificarCelular").modal("show");
  setTimeout(() => {
    $("#codigo1").focus();
  }, 500);
  jQuery.ajax({
    url: base_url + "polizas/InscripcionPhone/",
    method: "POST",
    data: {
      celular: celular_referidor,
      account_id: account_id,
      identificacion: identificacion,
    },
    dataType: "JSON",
    success: function (response2) {
      console.log(response2);
      jQuery.ajax({
        url: base_url + "polizas/ValidacionPhone/",
        method: "POST",
        data: {
          account_id: account_id,
        },
        dataType: "JSON",
        success: function (response3) {
          console.log(response3);
          localStorage.setItem("validation_id", response3.validation_id);
        },
        error: function (err) {
          console.log("Error " + err);
        },
      });
    },
    error: function (err) {
      console.log("Error " + err);
    },
  });
}
//Registrar usuario
$("#btnRegistrarUsuario").on("click", function (event) {
  event.preventDefault();

  var codigo1 = document.querySelector("#codigo1").value,
    codigo2 = document.querySelector("#codigo2").value,
    codigo3 = document.querySelector("#codigo3").value,
    codigo4 = document.querySelector("#codigo4").value,
    codigo5 = document.querySelector("#codigo5").value,
    codigo6 = document.querySelector("#codigo6").value;

  if (
    codigo1 == "" ||
    codigo2 == "" ||
    codigo3 == "" ||
    codigo4 == "" ||
    codigo5 == "" ||
    codigo6 == ""
  ) {
    Message("Los digitos no pueden ir vacios", "warning");
  } else {
    // //Esto se comenta
    // $("#div-vc").hide();
    // $("#btnRegistrarUsuario").hide();
    // $('#imageVerificar').show();
    // $("#btnValidarCodigo").show();
    token =
      codigo1 +
      "" +
      codigo2 +
      "" +
      codigo3 +
      "" +
      codigo4 +
      "" +
      codigo5 +
      "" +
      codigo6;
    const validation_id = localStorage.getItem("validation_id");
    $.ajax({
      url: base_url + "polizas/VerificarValidacionPhone/",
      method: "POST",
      data: {
        account_id: account_id,
        validation_id: validation_id,
        token: token,
        type: "phone-verification",
        question_id: "identity-questions",
      },
      dataType: "JSON",
      beforeSend: function () {
        $("#cover-spin").show(0);
      },
      success: function (objData) {
        $("#cover-spin").hide(0);
        if (objData.validation_status == undefined) {
          if (objData.http_code == 400) {
            Message(
              "La validación ya no está disponible, porfavor reenvie nuevamente el codigo.",
              "danger"
            );
          } else {
            Message("No se encontraron coincidencias", "danger");
          }
        } else {
          if (objData.validation_status == "success") {
            localStorage.removeItem("validation_id");
            $("#div-vc").hide();
            $("#imageVerificar").show();
            $("#btnRegistrarUsuario").hide();
            $("#btnValidarCodigo").show();
          } else {
            Message("Codigo incorrecto", "danger");
          }
        }
      },
    });
  }
});

// Funcion para eliminar los datos de los codigos
$(document).on("keyup", "input.delete", function (e) {
  var idInput = $(this).data("id") - 1;
  if (e.keyCode == 8) {
    $("#codigo" + idInput).focus();
  }
});

//Reenviar mensaje de texto
$("#btnReenviarSMS").on("click", function () {
  localStorage.removeItem("validation_id");
  $.ajax({
    url: base_url + "polizas/ValidacionPhone/",
    method: "POST",
    data: {
      account_id: account_id,
    },
    dataType: "JSON",
    success: function (objData) {
      localStorage.setItem("validation_id", objData.validation_id);
      document.getElementById("codigo1").value = "";
      document.getElementById("codigo2").value = "";
      document.getElementById("codigo3").value = "";
      document.getElementById("codigo4").value = "";
      document.getElementById("codigo5").value = "";
      document.getElementById("codigo6").value = "";
      document.getElementById("codigo1").focus();
    },
  });
});

//->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-
//->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>DOCUMENT VALIDATION<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-
//->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-

$("#btnExpedir").on("click", function () {
  if (contador_expedicion == 1) {
    PhoneValidation();
  } else {
    $("#ModalFotoBase").modal("show");

    $.ajax({
      url: base_url + "polizas/CreateEnrollmentFaceId",
      type: "POST",
      data: {
        prueba: "prueba",
      },
      dataType: "JSON",
      success: function (data) {
        console.log("FACEID-CREATE-ENROLLMENT", data);

        localStorage.setItem("enrollment_faceid", JSON.stringify(data));
      },
    });
  }
});

$("#botonsiguiente").on("click", function () {
  var cedula_frontal = $("#cedula_frontal")[0].files.length;
  if (cedula_frontal === 0) {
    alert("Archivo esta vacio");
  } else {
    stepper.next();
    $.ajax({
      url: base_url + "polizas/CreateValidationDocument",
      type: "POST",
      data: {
        prueba: "prueba",
      },
      dataType: "JSON",
      success: function (data) {
        localStorage.setItem("validation_document", JSON.stringify(data));
      },
    });
  }
});

$("#document_validation").on("submit", function (e) {
  e.preventDefault();
  var cedula_trasera = $("#cedula_trasera")[0].files.length;
  var cedula_frontal = $("#cedula_frontal")[0].files.length;
  if (cedula_trasera === 0) {
    Message('El archivo de la cedula trasera no se encuentra', 'danger');
  } else if(cedula_frontal === 0){
    Message('El archivo de la cedula frontal no se encuentra', 'danger');
  }else{    
    var validation = JSON.parse(localStorage.getItem("validation_document"));
    const formData = new FormData(this);
    var front_url = validation.instructions.front_url;
    var reverse_url = validation.instructions.reverse_url;
    formData.append("front_url", front_url);
    formData.append("reverse_url", reverse_url);

    $.ajax({
      url: base_url + "polizas/UploadDocument",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      dataType: "JSON",
      beforeSend: function () {
        $("#cover-spin").show(0);
      },
      success: function (data) {
        console.log("DOCUMENT-UPLOAD-FRONT-REVERSE", data);
        GetValidation(validation.validation_id, "document");
      },
    });
  }
});



//->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-
//->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>FACE RECOGNITION<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-
//->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-
$("#btnNextFaceId").on("click", function (e) {
  e.preventDefault();

  $("#ModalVerificarDocumento").modal("hide");
  $("#ModalVerificarFaceId").modal("show");

  $.ajax({
    url: base_url + "polizas/CreateValidationFaceId",
    type: "POST",
    data: {
      prueba: "prueba",
    },
    dataType: "JSON",
    success: function (data) {
      console.log("FACEID-CREATEVALIDATION", data);
      localStorage.setItem("validation_faceid", JSON.stringify(data));
    },
  });
});


$("#faceid_validation").on("submit", function (e) {
  e.preventDefault();
  var validation = JSON.parse(localStorage.getItem("validation_faceid"));
  const formData = new FormData(this);

  var file_upload_link = validation.instructions.file_upload_link;

  formData.append("file_upload_link_video", file_upload_link);

  $.ajax({
    url: base_url + "polizas/FileUploadVideoFaceId",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    dataType: "JSON",
    beforeSend: function () {
      $("#cover-spin").show(0);
    },
    success: function (data) {
      console.log("FACEID-UPLOAD-VIDEO", data);
      GetValidation(validation.validation_id, "faceid");
    },
  });
});

$('#btnNextMsg').on('click', function(){
  PhoneValidation();
})



function GetValidation(validation_id, type) {
  $.ajax({
    url: base_url + "polizas/GetValidationDocument",
    method: "POST",
    data: { validation_id: validation_id },
    global: false,
    async: false,
    dataType: "JSON",
    success: function (objData) {
      if (objData.validation_status === "pending") {
        setTimeout(() => {
          GetValidation(validation_id, type);
        }, 3000);
      } else if (objData.validation_status === "failure") {
        $("#cover-spin").hide(0);
        Message("La validacion del documento expiro", "danger");
      } else if (objData.validation_status === "success") {
        $("#cover-spin").hide(0);
        if (type == "document") {
          Message("Documento validado con exito", "success");
          $(".bs-stepper").hide();
          $("#imageValidacion").show();
          $("#successValidation").show();
        } else if (type == "faceid") {
          Message("FaceId validado con exito", "success");
          $("#upload-faceid").hide();
          $("#successValidationFaceId").show();
          $('.video').hide();
        }
      }
    },
  });
}

function readURL(input, img) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $(img).attr("src", e.target.result);
      // console.log(e.target.result)
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function establecerVisibilidadImagen(id, visibilidad) {
  var img = document.getElementById(id);
  img.style.visibility = visibilidad ? "visible" : "hidden";
}
