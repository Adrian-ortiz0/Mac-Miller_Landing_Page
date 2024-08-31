let usuarios = [];

function guardarUsuariosEnLocalStorage() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function cargarUsuariosDeLocalStorage() {
  const usuariosGuardados = localStorage.getItem("usuarios");
  if (usuariosGuardados) {
    usuarios = JSON.parse(usuariosGuardados);
  }
}

function registrarUsuarios() {
  cargarUsuariosDeLocalStorage();
  
  document.addEventListener("DOMContentLoaded", function() {
    const signUpBtn = document.getElementById("signUpBtn");
    const inputEmail = document.getElementById("inputEmail");
    const inputPassword = document.getElementById("inputPassword");
    const expresionRegular = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (signUpBtn && inputEmail && inputPassword) {
      signUpBtn.addEventListener("click", function() {
        if (!expresionRegular.test(inputEmail.value)) {
          alert("Por favor, ingrese un correo válido.");
        } else if (inputPassword.value.length <= 5) {
          alert("La contraseña debe tener más de 5 caracteres.");
        } else {
          usuarios.push({
            correo: inputEmail.value,
            password: inputPassword.value,
            compras: []
          });

          guardarUsuariosEnLocalStorage();
          alert("Usuario registrado con éxito.");
          inputEmail.value = "";
          inputPassword.value = "";
        }
      });
    } else {
      console.error("No se encontraron los elementos de registro.");
    }
  });
}

function logearUsuarios() {
  cargarUsuariosDeLocalStorage();
  
  document.addEventListener("DOMContentLoaded", function() {
    const loginBtn = document.getElementById("loginBtn");
    const inputEmail = document.getElementById("inputEmail");
    const inputPassword = document.getElementById("inputPassword");
  
    if (loginBtn && inputEmail && inputPassword) {
      loginBtn.addEventListener("click", function() {
        const usuarioEncontrado = usuarios.find(usuario => usuario.correo === inputEmail.value);
  
        if (!usuarioEncontrado) {
          alert("Correo no registrado. Por favor, regístrate primero.");
        } else if (usuarioEncontrado.password !== inputPassword.value) {
          alert("Contraseña incorrecta. Inténtalo de nuevo.");
        } else {
          alert("Inicio de sesión exitoso.");
          localStorage.setItem("usuarioActual", JSON.stringify(usuarioEncontrado));
          window.location.href = "/sub_pages/store.html";
        }
  
        inputEmail.value = "";
        inputPassword.value = "";
      });
    } else {
      console.error("No se encontraron los elementos de login.");
    }
  });
}

registrarUsuarios();
logearUsuarios();
