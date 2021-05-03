function mounted() {
    let user = JSON.parse(window.localStorage.getItem("user"));
    $("#name-user-login").html(`${user.nombre} ${user.apellido}`);
    $("#type-user-login").html(`${user.usuario_name}`);
  }

function logout(){
    window.localStorage.removeItem("user");
    window.location.href = "login.html"
}