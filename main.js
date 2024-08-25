let carrito = [];

const cabeceras = new Headers();
cabeceras.set("Content-Type", "application/json");
cabeceras.set("Content-Encoding", "br");

async function peticion(url) {
  const respuesta = await fetch(url);
  if (respuesta.ok) {
    const info = await respuesta.json();
    return info;
  } else {
    return [];
  }
}

//--------------------------------------------------------------------------------------------------------------------//

//JSON imagenes

let jsonImagenes = "/productos.json";

//--------------------------------------------------------------------------------------------------------------------//

// Functiones - onClick

const carritoBtn = document.getElementById("carritoBtn");
carritoBtn.onclick = function () {
  abrirCarrito();
};

//--------------------------------------------------------------------------------------------------------------------//

// Funciones

async function trayendoImagenes() {
  const imagenes = await peticion(jsonImagenes);
  const contenedor = document.getElementById("store__container");
  imagenes.forEach((imagen) => {
    const subContenedor = document.createElement("div");
    subContenedor.id = "0" + imagen.id;
    subContenedor.innerHTML = `<img src=${imagen.imagen} alt="t1" />
        <button class="botonsitos">Agregar al carrito</button>`;
    contenedor.append(subContenedor);
    const boton = subContenedor.querySelector(".botonsitos");
    boton.addEventListener("click", function () {
      agregarAlCarrito();
    });
  });
}

async function agregarAlCarrito() {
  console.log("añadido");
}

function abrirCarrito() {
  const carrito = document.getElementById("carrito");
  if (!carrito.classList.contains("carrito-active")) {
    carrito.classList.remove("carrito");
    carrito.classList.add("carrito-active");
  } else {
    carrito.classList.remove("carrito-active");
    carrito.classList.add("carrito");
  }
}

trayendoImagenes();
