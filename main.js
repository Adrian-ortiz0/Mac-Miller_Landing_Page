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
    subContenedor.classList.add("productos__store");
    subContenedor.id = "0" + imagen.id;
    subContenedor.innerHTML = `<img src=${imagen.imagen} alt="t1" />
        <button class="botonsitos">Agregar al carrito</button>`;
    contenedor.append(subContenedor);
    const boton = subContenedor.querySelector(".botonsitos");
    boton.addEventListener("click", function () {
      agregarAlCarrito(imagen.id);
    });
  });
}

async function agregarAlCarrito(productoId) {
  const imagenes = await peticion(jsonImagenes);
  const producto = imagenes.find(function (item) {
    return item.id === productoId;
  });
  if (producto) {
    carrito.push(producto);
    console.log(`Producto ${producto.nombre} agregado al carrito`);
    console.log(carrito);
    const contenedorCarrito = document.getElementById("carrito");
    const divContainerProducto = document.createElement("div");
    divContainerProducto.classList.add("plantillaCarrito");
    divContainerProducto.innerHTML = `<img src=${producto.imagen} alt="t1" width="150px" />
        <div class="opcionesCarrito">
          <h2>${producto.nombre}</h2>
          <p>1</p>
          <h2>${producto.precio}$</h2>
          <div class="contenedorBotonesCarrito">
            <button class="botonesCarrito" id="btnPlus">+</button>
            <button class="botonesCarrito" id="btnMinus">-</button>
            <button class="botonesCarrito" id="buyBtn">Buy</button>
            <button class="botonesCarrito" id="deleteBtn">Delete</button>
          </div>
        </div>`;
    contenedorCarrito.append(divContainerProducto);
  } else {
    console.log("Producto no encontrado");
  }
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
