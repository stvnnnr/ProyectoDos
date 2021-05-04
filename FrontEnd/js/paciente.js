// función  que se ejecuta cuando inicar la pagina
function mounted() {
  let user = JSON.parse(window.localStorage.getItem("user"));
  $("#name-user-login").html(`${user.nombre} ${user.apellido}`);
  $("#type-user-login").html(`${user.user_name}`);
}

// función  borrar el usuario y manda a login
function logout() {
  window.localStorage.removeItem("user");
  window.location.href = "../login.html";
}

function crearCita() {
  let user = JSON.parse(window.localStorage.getItem("user"));
  var data = {
    idpaciente: user.usuario_name,
    fecha: $("#datetime").val(),
    motivo: document.getElementById("motivo").value,
  };

  var url = `https://proyectodosipc1back.herokuapp.com/store-cita`;

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      console.log(response.status);
      if (response.status == 200) {
        getCitas();
      }
      if (response.status == 201) {
        document.getElementById("alert-cita").style.display = "inline";
        setTimeout(() => {
          document.getElementById("alert-cita").style.display = "none";
        }, 5000);
      }
    })
    .catch(function (error) {
      console.log("");
    });
}

function getCitas() {
  let user = JSON.parse(window.localStorage.getItem("user"));
  var url = `https://proyectodosipc1back.herokuapp.com/paciente-citas/${user.usuario_name}`;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      let data = response;

      var table = "<table class='table shadow-sm'>";
      table += `<tr>
          <th scope="col" class="text-muted">Fecha</th>
          <th scope="col" class="text-muted">Motivo</th>
          <th scope="col" class="text-muted">Status</th>
        </tr>`;
      for (i = 0; i < data.length; i++) {
        table += "<tr>";
        var row = data[i];
        var cells = row;
        for (const prop in cells) {
          if (prop != "idpaciente" && prop != "iddoctor" && prop != "statusdoctor") {
            table += "<td>";
            table += cells[prop];
            table += "</td>";
          }
        }
        table += "</tr>";
      }
      table += "</table>";
      $("#table-citas").html(table);
    })
    .catch(function (error) {
      console.log(error);
    });
}
