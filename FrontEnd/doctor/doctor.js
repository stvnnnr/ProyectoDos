var user = JSON.parse(window.localStorage.getItem("user"));
// función  borrar el usuario y manda a login
function logout() {
  window.localStorage.removeItem("user");
  window.location.href = "../login.html";
}

function mounted() {
  let user = JSON.parse(window.localStorage.getItem("user"));
  $("#name-user-login").html(`${user.nombre} ${user.apellido}`);
  $("#type-user-login").html(`${user.usuario_name}`);
  getCitas();
}
function getCitas() {
  getCitasPendientes();
  getCitasAsignadas();
  getCitasAceptadas();
}
function getCitasPendientes() {
  var url = `https://proyectodosipc1back.herokuapp.com/enfermera-citas/Pendiente`;

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
              <th scope="col" class="text-muted"></th>
            </tr>`;
      for (i = 0; i < data.length; i++) {
        table += "<tr>";
        var row = data[i];
        var cells = row;
        for (const prop in cells) {
          if (
            prop != "idpaciente" &&
            prop != "iddoctor" &&
            prop != "status" &&
            prop != "statusdoctor"
          ) {
            table += "<td>";
            table += cells[prop];
            table += "</td>";
          }
        }
        table += `<th scope="col">
          <button class="btn btn-light text-muted mr-2" onclick="changeStatusCita('${row["idpaciente"]}', 'Aceptada')">Aceptar</button>
          <button class="btn btn-light text-muted mr-2" onclick="changeStatusCita('${row["idpaciente"]}', 'Rechazada' )">Rechazar</button>
          </th>`;
        table += "</tr>";
      }
      table += "</table>";
      $("#table-citas-pendientes").html(table);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function selectCita(idpaciente, iddoctor) {
  selectidpaciente = idpaciente;
}

function getCitasAsignadas() {
  var url = `https://proyectodosipc1back.herokuapp.com/doctor-citas/${user.usuario_name}/${false}`;

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
              <th scope="col" class="text-muted"></th>
            </tr>`;
      for (i = 0; i < data.length; i++) {
        table += "<tr>";
        var row = data[i];
        var cells = row;
        for (const prop in cells) {
          if (
            prop != "idpaciente" &&
            prop != "iddoctor" &&
            prop != "status" &&
            prop != "statusdoctor"
          ) {
            table += "<td>";
            table += cells[prop];
            table += "</td>";
          }
        }
        table += `<th scope="col">
        <button class="btn btn-light text-muted mr-2" onclick="changeStatusCita('${row["idpaciente"]}', 'Aceptada')">Aceptar</button>
        <button class="btn btn-light text-muted mr-2" onclick="changeStatusCita('${row["idpaciente"]}', 'Rechazada' )">Rechazar</button>
        </th>`;
        table += "</tr>";
      }
      table += "</table>";
      $("#table-citas-asignadas").html(table);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getCitasAceptadas() {
  var url = `https://proyectodosipc1back.herokuapp.com/doctor-citas/${user.usuario_name}/${true}`;

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
              <th scope="col" class="text-muted"></th>
            </tr>`;
      for (i = 0; i < data.length; i++) {
        table += "<tr>";
        var row = data[i];
        var cells = row;
        for (const prop in cells) {
          if (
            prop != "idpaciente" &&
            prop != "iddoctor" &&
            prop != "status" &&
            prop != "statusdoctor"
          ) {
            table += "<td>";
            table += cells[prop];
            table += "</td>";
          }
        }
        table += `<td><input class="form-check-input" type="checkbox" ${
          row["status"] == "Completada" ? "checked" : ""
        } ${
          row["status"] == "Completada" ? "disabled" : ""
        } value="${status}" id="${row["idpaciente"]}${i}" oninput="changeStatusCitaDoctor('${
          row["idpaciente"]
        }', '${row["idpaciente"]}${i}')"></td>`;

        table += "</tr>";
      }
      table += "</table>";
      $("#table-citas-aceptadas").html(table);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function changeStatusCita(idpaciente, status) {
  let data = {
    idpaciente: idpaciente,
    iddoctor: user.usuario_name,
    status: status,
  };
  fetch("https://proyectodosipc1back.herokuapp.com/status-cita-doctor", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      console.log(response);
      getCitas();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function changeStatusCitaDoctor(idpaciente) {
  let data = {
    idpaciente: idpaciente,
  };
  fetch("https://proyectodosipc1back.herokuapp.com/statusdoctor-cita", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      console.log(response);
      getCitas();
    })
    .catch(function (error) {
      console.log(error);
    });
}
