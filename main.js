let usuarios = [];
let carrito = [];

async function peticion(url) {
  const respuesta = await fetch(url);
  if (respuesta.ok) {
    const info = await respuesta.json();
    return info;
  } else {
    return [];
  }
}

let jsonImagenes = "/productos.json"

function cargarUsuarioActual() {
  const usuarioActual = localStorage.getItem("usuarioActual");
  return usuarioActual ? JSON.parse(usuarioActual) : null;
}

function guardarUsuarioActual(usuario) {
  localStorage.setItem("usuarioActual", JSON.stringify(usuario));
}

function agregarCarritoACompras(usuario) {
  usuario.compras = usuario.compras.concat(carrito);
  
  const index = usuarios.findIndex(u => u.correo === usuario.correo);
  if (index !== -1) {
    usuarios[index] = usuario;
  }
  
  guardarUsuariosEnLocalStorage();
  guardarUsuarioActual(usuario); 
  carrito.length = 0; 
  actualizarCarrito();
}

function guardarUsuariosEnLocalStorage(){
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function cargarUsuariosDeLocalStorage(){
  const usuariosGuardados = localStorage.getItem("usuarios");
  if (usuariosGuardados) {
    usuarios = JSON.parse(usuariosGuardados);
  }
}

function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
}

function inicializarUsuario() {
  cargarUsuariosDeLocalStorage();
  const usuarioActual = cargarUsuarioActual();
  if (usuarioActual) {
    if (!usuarios.some(u => u.correo === usuarioActual.correo)) {
      usuarios.push(usuarioActual);
      guardarUsuariosEnLocalStorage();
    }
  }
}

function mostrarProductos(productos) {
  const contenedor = document.getElementById("store__container");
  contenedor.innerHTML = ""; 

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
          cantidad: 1,
        });
      } else {
        productoExistente.cantidad++;
      }
      actualizarCarrito();
    });
  });
}

async function trayendoImagenes() {
  inicializarUsuario();
  cargarCarritoDeLocalStorage();

  const productos = await peticion(jsonImagenes);
  mostrarProductos(productos);

  const busquedaInput = document.getElementById("busqueda");
  busquedaInput.addEventListener("input", function () {
    const filtro = busquedaInput.value.toLowerCase();
    const productosFiltrados = productos.filter((producto) =>
      producto.categoria.toLowerCase().includes(filtro)
    );
    mostrarProductos(productosFiltrados);
  });
}

function actualizarCarrito() {
  let total = 0;
  const carritoContenedor = document.getElementById("carrito");
  carritoContenedor.innerHTML = "";

  carrito.forEach(function (item, index) {
    const divContainerProducto = document.createElement("div");
    divContainerProducto.classList.add("plantillaCarrito");
    divContainerProducto.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}" width="150px" />
      <div class="opcionesCarrito">
        <h2>${item.nombre}</h2>
        <p class="cantidad">${item.cantidad}</p>
        <h2 class="precio">${item.precio * item.cantidad}$</h2>
        <div class="contenedorBotonesCarrito">
          <button class="botonesCarrito btnPlus">+</button>
          <button class="botonesCarrito btnMinus">-</button>
        </div>
      </div>`;

    carritoContenedor.append(divContainerProducto);
    total += item.precio * item.cantidad;

    const btnPlus = divContainerProducto.querySelector(".btnPlus");
    const btnMinus = divContainerProducto.querySelector(".btnMinus");
    const textoCantidad = divContainerProducto.querySelector(".cantidad");

    btnPlus.addEventListener("click", function () {
      item.cantidad++;
      textoCantidad.innerText = item.cantidad;
      actualizarCarrito();
    });

    btnMinus.addEventListener("click", function () {
      if (item.cantidad > 1) {
        item.cantidad--;
      } else {
        carrito.splice(index, 1);
      }
      actualizarCarrito();
    });
  });
  
  const totalText = document.createElement("h1");
  totalText.innerText = `Total: ${total}$ `;
  carritoContenedor.append(totalText);

  const divFinalOptions = document.createElement("div");
  divFinalOptions.classList.add("divFinalOptions")
  divFinalOptions.innerHTML = `<button class="botonesCarrito" id="btnDelete">Delete</button><button class="botonesCarrito" id="btnBuy">Buy</button>`;
  carritoContenedor.append(divFinalOptions);
  
  const btnDelete = document.getElementById("btnDelete");
  btnDelete.addEventListener("click", function(){
    borrarTodo()
  })
  const btnBuy = document.getElementById("btnBuy");
  btnBuy.addEventListener("click", function(){
    const usuarioActual = cargarUsuarioActual();
    if (usuarioActual) {
      agregarCarritoACompras(usuarioActual);
      alert("Compra realizada con éxito");
    } else {
      alert("No se encontró un usuario activo. Inicie sesión para comprar.");
    }
  })

  function borrarTodo(){
    carrito.length = 0;
    actualizarCarrito();
  }

  guardarCarritoEnLocalStorage();
}

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

document.addEventListener("DOMContentLoaded", function() {
  trayendoImagenes();
});