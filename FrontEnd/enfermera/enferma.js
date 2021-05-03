function mounted() {
  let user = JSON.parse(window.localStorage.getItem("user"));
  $("#name-user-login").html(`${user.nombre} ${user.apellido}`);
  $("#type-user-login").html(`${user.usuario_name}`);
  getCitasPendientes();
  getCitasAceptadas()
}

// función  borrar el usuario y manda a login
function logout() {
  window.localStorage.removeItem("user");
  window.location.href = "../login.html";
}

function getCitasPendientes() {
  var url = `http://localhost:5000/enfermera-citas/Pendiente`;

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
          if (prop != "idpaciente" && prop != "iddoctor" && prop != "status") {
            table += "<td>";
            table += cells[prop];
            table += "</td>";
          }
        }
        table += `<th scope="col">
        <button class="btn btn-light text-muted mr-2" 
        data-bs-toggle="modal" data-bs-target="#aceptar-cita" onclick="selectCita('${row["idpaciente"]}', '${row["iddoctor"]}')">Aceptar</button>
        <button class="btn btn-light text-muted mr-2" onclick="rechazaCita('${row["idpaciente"]}', '${row["iddoctor"]}' )">Rechazar</button>
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

function getCitasAceptadas() {
    var url = `http://localhost:5000/enfermera-citas/Aceptada`;
  
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
            if (prop != "idpaciente" && prop != "iddoctor" && prop != "status") {
              table += "<td>";
              table += cells[prop];
              table += "</td>";
            }
          }
          table += "</tr>";
        }
        table += "</table>";
        $("#table-citas-aceptadas").html(table);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  

function getDoctores() {
    var url = `http://localhost:5000/doctores`;
  
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(function (response) {
        let data = response;
  
        var select = "<select id='select-cita-doctores'>";
        for (i = 0; i < data.length; i++) {
          var row = data[i];
          var cells = row;
          select += `<option value="${cells.usuario_name}">${cells.nombre} ${cells.apellido}</option>`;
        }
        select += "</select>";
        $("#select-doctores").html(select);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

var selectidpaciente = "";
var selectiddoctor = "";

function selectCita(idpaciente, iddoctor = "") {
  selectidpaciente = idpaciente;
  selectiddoctor = iddoctor;
  getDoctores()
}


function rechazaCita(idpaciente, iddoctor) {
    changeStatusCita(idpaciente, iddoctor, "Rechazado");
}
function aceptarCita() {
    selectiddoctor = document.getElementById("select-cita-doctores").value
    changeStatusCita(selectidpaciente, selectiddoctor, "Aceptada");
}
function changeStatusCita(idpaciente, iddoctor, status) {
  let data = {
    idpaciente: idpaciente,
    iddoctor: iddoctor,
    status: status,
  };
  fetch("http://localhost:5000/status-cita", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
        console.log(response);
        getCitasPendientes()
    })
    .catch(function (error) {
      console.log(error);
    });
}
