// 'use strict';

// const video = document.getElementById('video');
// const snap = document.getElementById("snap");
// const canvas = document.getElementById('canvas');
// const estado = document.getElementById("estado");

// console.log(canvas);
// const errorMsgElement = document.querySelector('span#errorMsg');

// const constraints = {
// audio: false,
// video: {
// width: 400, height: 300,
// }
// };

// // Acceso a la webcam
// async function init() {
// try {
// const stream = await navigator.mediaDevices.getUserMedia(constraints);
// handleSuccess(stream);
// const stream_2 = await navigator.getUserMedia.getContext(constraints);
// handleSuccess(stream_2);
// } catch (e) {
// }
// }
// // Correcto!
// function handleSuccess(stream) {
// window.stream = stream;
// video.srcObject = stream;

// }
// // Load init
// init();

// // Dibuja la imagen
// var context = canvas.getContext('2d');
// snap.addEventListener("click", function() {
//     context.src = canvas.toDataURL("../scanerfoto"); 
// context.drawImage(video, 0, 0, 200, 200);
// console.log(context);
// var f =canvas.toDataURL();
// console.log(f+'-'+"estoy en f")
// estado.innerHTML = "Enviando foto. Por favor, espera...";
// var xhr = new XMLHttpRequest();
// $.ajax({
//     data: {
//         f: f
//     },
//     type: "POST",
//     url: "../scanerfoto/guardar_foto.php",
//     success: function (data) {
//     alert(data);
//     xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xhr.send(encodeURIComponent(f)); //Codificar y enviar

//     },
// });

// //var f =canvas.toDataURL(); //Esta es la foto, en base 64
// estado.innerHTML = "Enviando foto. Por favor, espera...";
// var xhr = new XMLHttpRequest();
// xhr.open("POST", "../scanerfoto/guardar_foto.php", true);
// xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// xhr.send(encodeURIComponent(f)); //Codificar y enviar


// xhr.onreadystatechange = function() {
//     if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
//         console.log("La foto fue enviada correctamente");
//         console.log(xhr);
//         $estado.innerHTML = "Foto guardada con éxito. Puedes verla <a target='_blank' href='../../../scanerfoto'" + xhr.responseText + "'> aquí</a>";
//     }
// }

// });

/*
    Tomar una fotografía y guardarla en un archivo v3
    @date 2018-10-22
    @author parzibyte
    @web parzibyte.me/blog
*/
function tieneSoporteUserMedia() {
	return !!(navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia)
}
function _getUserMedia() {
	return (navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia).apply(navigator, arguments);
}
 
// Declaramos elementos del DOM
const $video = document.querySelector("#video"),
	$canvas = document.querySelector("#canvas"),
	$boton = document.querySelector("#boton"),
	$estado = document.querySelector("#estado"),
	$listaDeDispositivos = document.querySelector("#listaDeDispositivos");
 
// La función que es llamada después de que ya se dieron los permisos
// Lo que hace es llenar el select con los dispositivos obtenidos
const llenarSelectConDispositivosDisponibles = () => {
 
	navigator
		.mediaDevices
		.enumerateDevices()
		.then(function (dispositivos) {
			const dispositivosDeVideo = [];
			dispositivos.forEach(function (dispositivo) {
				const tipo = dispositivo.kind;
				if (tipo === "videoinput") {
					dispositivosDeVideo.push(dispositivo);
				}
			});
 
			// Vemos si encontramos algún dispositivo, y en caso de que si, entonces llamamos a la función
			if (dispositivosDeVideo.length > 0) {
				// Llenar el select
				dispositivosDeVideo.forEach(dispositivo => {
					const option = document.createElement('option');
					option.value = dispositivo.deviceId;
					option.text = dispositivo.label;
					$listaDeDispositivos.appendChild(option);
					console.log("$listaDeDispositivos => ", $listaDeDispositivos)
				});
			}
		});
}
 
(function () {
	// Comenzamos viendo si tiene soporte, si no, nos detenemos
	if (!tieneSoporteUserMedia()) {
		alert("Lo siento. Tu navegador no soporta esta característica");
		$estado.innerHTML = "Parece que tu navegador no soporta esta característica. Intenta actualizarlo.";
		return;
	}
	//Aquí guardaremos el stream globalmente
	let stream;
 
 
	// Comenzamos pidiendo los dispositivos
	navigator
		.mediaDevices
		.enumerateDevices()
		.then(function (dispositivos) {
			// Vamos a filtrarlos y guardar aquí los de vídeo
			const dispositivosDeVideo = [];
 
			// Recorrer y filtrar
			dispositivos.forEach(function (dispositivo) {
				const tipo = dispositivo.kind;
				if (tipo === "videoinput") {
					dispositivosDeVideo.push(dispositivo);
				}
			});
 
			// Vemos si encontramos algún dispositivo, y en caso de que si, entonces llamamos a la función
			// y le pasamos el id de dispositivo
			if (dispositivosDeVideo.length > 0) {
				// Mostrar stream con el ID del primer dispositivo, luego el usuario puede cambiar
				mostrarStream(dispositivosDeVideo[0].deviceId);
			}
		});
 
 
 
	const mostrarStream = idDeDispositivo => {
		_getUserMedia(
			{
				video: {
					// Justo aquí indicamos cuál dispositivo usar
					deviceId: idDeDispositivo,
				}
			},
			function (streamObtenido) {
				// Aquí ya tenemos permisos, ahora sí llenamos el select,
				// pues si no, no nos daría el nombre de los dispositivos
				llenarSelectConDispositivosDisponibles();
 
				// Escuchar cuando seleccionen otra opción y entonces llamar a esta función
				$listaDeDispositivos.onchange = () => {
					// Detener el stream
					if (stream) {
						stream.getTracks().forEach(function (track) {
							track.stop();
						});
					}
					// Mostrar el nuevo stream con el dispositivo seleccionado
					mostrarStream($listaDeDispositivos.value);
				}
 
				// Simple asignación
				stream = streamObtenido;
 
				// Mandamos el stream de la cámara al elemento de vídeo
				$video.srcObject = stream;
				$video.play();
 
				//Escuchar el click del botón para tomar la foto
				$boton.addEventListener("click", function () {
 
					//Pausar reproducción
					$video.pause();
 
					//Obtener contexto del canvas y dibujar sobre él
					let contexto = $canvas.getContext("2d");
					$canvas.width = $video.videoWidth;
					$canvas.height = $video.videoHeight;
					contexto.drawImage($video, 0, 0, $canvas.width, $canvas.height);
 
					let foto = $canvas.toDataURL(); //Esta es la foto, en base 64
					$estado.innerHTML = "Enviando foto. Por favor, espera...";
					fetch("./guardar_foto.php", {
						method: "POST",
						body: encodeURIComponent(foto),
						headers: {
							"Content-type": "application/x-www-form-urlencoded",
						}
					})
						.then(resultado => {
							// A los datos los decodificamos como texto plano
							return resultado.text()
						})
						.then(nombreDeLaFoto => {
							// nombreDeLaFoto trae el nombre de la imagen que le dio PHP
							console.log("La foto fue enviada correctamente");
							$estado.innerHTML = `Foto guardada con éxito. Puedes verla <a target='_blank' href='./${nombreDeLaFoto}'> aquí</a>`;
						})
 
					//Reanudar reproducción
					$video.play();
				});
			}, function (error) {
				console.log("Permiso denegado o error: ", error);
				$estado.innerHTML = "No se puede acceder a la cámara, o no diste permiso.";
			});
	}
})();