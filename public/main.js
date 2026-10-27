

// Referencias a los elementos de la interfaz.
const formulario = document.querySelector("#formulario-mision");
const campoTitulo = document.querySelector("#titulo");
const campoDescripcion = document.querySelector("#descripcion");
const campoDificultad = document.querySelector("#dificultad");
const campoRecompensa = document.querySelector("#recompensa");
const lista = document.querySelector("#lista-misiones");
const listaVacia = document.querySelector("#lista-vacia");
const mensaje = document.querySelector("#mensaje");
const botonBorrar = document.querySelector("#borrar-todo");
const botonSubir = document.querySelector("#subir-servidor");
const botonBajar = document.querySelector("#bajar-servidor");
let misiones = [];


formulario.addEventListener("submit", (evento) => {
  evento.preventDefault(); // Evita que el formulario recargue la página.
  agregarMision();
});

botonBorrar.addEventListener("click", borrarTodo);

function agregarMision() {
  // TODO
  // crear objeto misión, incluir los valores de los campos y un id único
}

function mostrarMisiones() {
  lista.innerHTML = "";
  if (misiones.length === 0) {
    listaVacia.textContent = "Todavía no hay misiones.";
  } else {
    listaVacia.textContent = "";
  }

  // TODO: Recorre el array misiones y llama a mostrarMision(mision)
  // para cada misión.
}

function mostrarMision(mision) {
  const elemento = document.createElement("li");

  const titulo = document.createElement("h3");
  titulo.textContent = mision.titulo;

  const descripcion = document.createElement("p");
  descripcion.textContent = mision.descripcion;

  const dificultad = document.createElement("p");
  dificultad.className = "datos-mision";
  dificultad.textContent = "Dificultad: " + mision.dificultad;

  const recompensa = document.createElement("p");
  recompensa.className = "datos-mision";
  recompensa.textContent = "Recompensa: " + mision.recompensa;

  elemento.appendChild(titulo);
  elemento.appendChild(descripcion);
  elemento.appendChild(dificultad);
  elemento.appendChild(recompensa);

  lista.appendChild(elemento);
}

function guardarMisiones() {
}

function cargarMisiones() {
}

function borrarTodo() {
}

cargarMisiones();
mostrarMisiones();
