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
  evento.preventDefault();
  agregarMision();
});

botonBorrar.addEventListener("click", borrarTodo);
botonSubir.addEventListener("click", subirServidor);
botonBajar.addEventListener("click", bajarServidor);

function agregarMision() {
  const nuevaMision = {
    id: Date.now(),
    titulo: campoTitulo.value.trim(),
    descripcion: campoDescripcion.value.trim(),
    dificultad: campoDificultad.value,
    recompensa: Number(campoRecompensa.value)
  };

  misiones.push(nuevaMision);
  alert("Se ha añadido una nueva misión");
  mostrarMisiones();
  guardarMisiones();

  formulario.reset();
}

function mostrarMisiones() {
  lista.innerHTML = "";
  if (misiones.length === 0) {
    listaVacia.textContent = "Todavía no hay misiones.";
  } else {
    listaVacia.textContent = "";
  }

  misiones.forEach(mision => {
    mostrarMision(mision);
  });
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

  const btnEditar = document.createElement("button")
  btnEditar.id = "btnEditar"
  btnEditar.textContent = "Editar"
  btnEditar.addEventListener("click",()=>{
     console.log("Editar misión:", mision.id);
     editar(mision.id)
  })

  const btnBorrar = document.createElement("button")
  btnBorrar.id = "btnBorrar"
  btnBorrar.textContent = "Borrar"
  btnBorrar.addEventListener("click",()=>{
    console.log("Borrar misión:", mision.id);
    borrar(mision.id)})


  elemento.appendChild(titulo);
  elemento.appendChild(descripcion);
  elemento.appendChild(dificultad);
  elemento.appendChild(recompensa);
  elemento.appendChild(btnEditar);
  elemento.appendChild(btnBorrar);

  lista.appendChild(elemento);
}

function guardarMisiones() {
  localStorage.setItem("misiones", JSON.stringify(misiones));
}

function cargarMisiones() {
  const misionesGuardadas = localStorage.getItem("misiones");
  if (misionesGuardadas != null) {
    misiones = JSON.parse(misionesGuardadas);
  } else {
    misiones = [];
  }
}

function borrarTodo() {
  localStorage.removeItem("misiones");
  misiones = [];
  mostrarMisiones();
}

async function subirServidor() {
  const misionesLocales = JSON.parse(localStorage.getItem('misiones')) || [];

  try {
    const respuesta = await fetch('/quests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(misionesLocales)
    });

    if (!respuesta.ok) throw new Error('Error al subir');
    
    const datos = await respuesta.json();
    alert(datos.mensaje || '¡Misiones guardadas en el servidor!');

    borrarTodo()
    cargarMisiones()
    mostrarMisiones()

  } catch (error) {
    console.error('Error al subir:', error);
    alert('No se pudieron subir las misiones');
  }
}

async function bajarServidor() {
  try {
    const respuesta = await fetch('/quests');
    if (!respuesta.ok) throw new Error('Error al descargar');

    const misionesServidor = await respuesta.json();

    // Actualiza localStorage, la variable local misiones y refresca la vista
    localStorage.setItem('misiones', JSON.stringify(misionesServidor));
    cargarMisiones(); 
    mostrarMisiones(); 

    alert('¡Misiones descargadas del servidor!');
  } catch (error) {
    console.error('Error al bajar:', error);
    alert('No se pudieron descargar las misiones');
  }
}

async function editar(id){
  
  let mision = misiones.find(m=>m.id== id)

  const titulo = prompt('Nuevo titulo:', mision.titulo)

  mision.titulo = titulo.trim()
  
  try {
    const respuesta = await fetch(`quest/${id}`,{
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mision)
    })

    localStorage.setItem("misiones",JSON.stringify(misiones))
    guardarMisiones()
    mostrarMisiones()

  } catch(err){
    console.error("Error al editar la mision")
  }
  
}

async function borrar(id){
  let misionesActualizadas = misiones.filter(m=>m.id!=id)

   try{
    const res = await fetch(`quest/${id}`,{
      method:'DELETE'
    })

    localStorage.setItem("misiones",JSON.stringify(misionesActualizadas))
    misiones = misionesActualizadas
    guardarMisiones()
    mostrarMisiones()

  } catch (err){
    console.error("Error al borrar la mision")
  }
}
cargarMisiones();
mostrarMisiones();