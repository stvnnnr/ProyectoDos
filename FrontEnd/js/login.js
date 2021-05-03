document.getElementById('login_button').addEventListener("click", pulsar, false);

function pulsar() {
    var usuario = document.getElementById('usuario').value
    var password = document.getElementById('password').value

    if (usuario != "" && password != "") {
        var url = 'https://proyectodosipc1back.herokuapp.com/login';
        var data = { "user": usuario, "password": password };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(function (response) {
                if (response.data) {
                    switch (response.user_type) {
                        case 'Admin':
                            window.location.href = "admin.html"
                            break;
                        case 'Doctor':
                            window.location.href = "./doctor/doctor.html"
                            break;
                        case 'Paciente':
                            window.location.href = "./paciente/paciente.html"
                            break;
                        case 'Enfermera':
                            window.location.href = "./enfermera/enfermera.html"
                            break;
                        default:
                            break;
                    }
                    window.localStorage.setItem('user', JSON.stringify(response.user));
                } else {
                    console.log("Credenciales Incorrectas");
                    alert("No metiste los datos que eran papi")
                }
            })
            .catch(function (error) {
                alert("No metiste los datos que eran papi")
                console.log(error)
            })
    } else {
        alert("Debes llenar todos los campos")
    }
}