document.getElementById('registrar_button').addEventListener("click", pulsar, false);

function pulsar() {
    var nombre = document.getElementById('nombre').value
    var apellido = document.getElementById('apellido').value
    var birthday = document.getElementById('birthday').value
    var sexo = document.getElementById('sexo').value
    var user_name = document.getElementById('user_name').value
    var password = document.getElementById('password').value
    var telefono = document.getElementById('telefono').value

    if (nombre != null && apellido != null && birthday != "" && sexo != "" && user_name != "" && password != "") {
        var url = 'http://localhost:5000/register';
        var data = { "nombre": nombre, "apellido": apellido, "birthday": birthday, "sexo": sexo, "user_name": user_name, "password": password, "telefono": telefono };


        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(function (response) {
                alert("Usuario Creado con exito, inicia sesión")
                window.location.href = "login.html"
            })
            .catch(function (error) {
                console.log(error)
            })



    } else {
        alert("Debes llenar todos los campos")
    }

}