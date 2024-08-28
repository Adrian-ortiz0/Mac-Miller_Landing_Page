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

// Funciones

async function trayendoImagenes() {
  const productos = await peticion(jsonImagenes);
  const contenedor = document.getElementById("store__container");

  productos.forEach((producto) => {
    const subContenedor = document.createElement("div");
    subContenedor.classList.add("productos__store");
    subContenedor.id = "0" + producto.id;
    subContenedor.innerHTML = `
      <img src="${producto.imagen}" alt="t1" />
      <button class="botonsitos">Agregar al carrito</button>`;

    contenedor.append(subContenedor);

    const boton = subContenedor.querySelector(".botonsitos");
    boton.addEventListener("click", function () {
      const productoExistente = carrito.find((item) => item.id === producto.id);
      if (!productoExistente) {
        carrito.push({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          categoria: producto.categoria,
          imagen: producto.imagen,
        });
      } else {
        console.log("El producto ya está en el carrito");
      }
      console.log("Carrito actual:", carrito);
      actualizarCarrito();
    });
  });

  const verCarrito = document.getElementById("carritoBtn");

  verCarrito.addEventListener("click", function () {
    const carritoContenedor = document.getElementById("carrito");

    if (!carritoContenedor.classList.contains("carrito-active")) {
      carritoContenedor.classList.remove("carrito");
      carritoContenedor.classList.add("carrito-active");
      actualizarCarrito();
    } else {
      carritoContenedor.classList.remove("carrito-active");
      carritoContenedor.classList.add("carrito");
    }
  });
}

function actualizarCarrito() {
  let total = 0;
  const carritoContenedor = document.getElementById("carrito");
  carritoContenedor.innerHTML = "";

  carrito.forEach(function (item) {
    const divContainerProducto = document.createElement("div");
    divContainerProducto.classList.add("plantillaCarrito");
    divContainerProducto.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}" width="150px" />
      <div class="opcionesCarrito">
        <h2>${item.nombre}</h2>
        <p class="cantidad">1</p>
        <h2>${item.precio}$</h2>
        <div class="contenedorBotonesCarrito">
          <button class="botonesCarrito btnPlus">+</button>
          <button class="botonesCarrito btnMinus">-</button>
          <button class="botonesCarrito buyBtn">Buy</button>
          <button class="botonesCarrito deleteBtn">Delete</button>
        </div>
      </div>`;
    carritoContenedor.append(divContainerProducto);
    total += item.precio;
  });
  const totalText = document.createElement("h1");
  totalText.innerText = `Total: ${total}$`;
  carritoContenedor.append(totalText);
}

const totalText = document.createElement("h2");
const contenedorCarrito = document.getElementById("carrito");
totalText.innerText = "Total: 0$";
contenedorCarrito.append(totalText);

trayendoImagenes();
