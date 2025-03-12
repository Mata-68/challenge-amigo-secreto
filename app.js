// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación.
// Aquí deberás desarrollar la lógica para resolver el problema.

let listaAmigos = JSON.parse(localStorage.getItem("listaAmigos")) || [];
let asignaciones = {};
let jugadorActual = "";

// Cargar la lista de amigos al iniciar
window.onload = function () {
    actualizarLista();
};

// Función para agregar un amigo (Administrador)
function agregarAmigo() {
    let input = document.getElementById("amigo");
    let nombre = input.value.trim();
    if (nombre === "") {
        alert("Por favor, ingrese un nombre válido.");
        return;
    }
    if (listaAmigos.includes(nombre)) {
        alert("Este nombre ya está en la lista.");
        return;
    }
    listaAmigos.push(nombre);
    localStorage.setItem("listaAmigos", JSON.stringify(listaAmigos));
    actualizarLista();
    input.value = "";
}

// Función para actualizar la lista en pantalla
function actualizarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    listaAmigos.forEach((nombre) => {
        let item = document.createElement("li");
        item.textContent = nombre;
        lista.appendChild(item);
    });
}

// Función para eliminar el último amigo ingresado (Administrador)
function eliminarAmigo() {
    if (listaAmigos.length === 0) {
        alert("No hay nombres para eliminar.");
        return;
    }
    listaAmigos.pop();
    localStorage.setItem("listaAmigos", JSON.stringify(listaAmigos));
    actualizarLista();
}

// Función para verificar si el jugador está en la lista
function verificarJugador() {
    let input = document.getElementById("jugadorNombre");
    let nombre = input.value.trim();
    if (listaAmigos.includes(nombre)) {
        jugadorActual = nombre;
        document.getElementById("draw-button").disabled = false;
        alert("Bienvenido, " + nombre + "! Puedes realizar el sorteo.");
    } else {
        alert("Tu nombre no está en la lista. Pide al administrador que te agregue.");
    }
}

// Función para sortear un amigo secreto
function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert("Deben haber al menos dos participantes para realizar el sorteo.");
        return;
    }
    let copiaLista = [...listaAmigos];
    let resultado = {};
    
    listaAmigos.forEach((nombre) => {
        let posibles = copiaLista.filter((n) => n !== nombre);
        if (posibles.length === 0) {
            alert("No se pudo completar el sorteo. Intente nuevamente.");
            return;
        }
        let indice = Math.floor(Math.random() * posibles.length);
        resultado[nombre] = posibles[indice];
        copiaLista.splice(indice, 1);
    });
    
    asignaciones = resultado;
    mostrarResultadoJugador();
}

// Función para mostrar solo el amigo secreto del jugador actual
function mostrarResultadoJugador() {
    let lista = document.getElementById("resultado");
    lista.innerHTML = "";
    if (jugadorActual in asignaciones) {
        let item = document.createElement("li");
        item.textContent = `Tu amigo secreto es: ${asignaciones[jugadorActual]}`;
        lista.appendChild(item);
    } else {
        alert("No se encontró un amigo secreto para este jugador. Intente nuevamente.");
    }
}
