const carritoBtn = document.getElementById("carritoBtn");
carritoBtn.onclick = function () {
  abrirCarrito();
};

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
