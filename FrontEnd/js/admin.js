var selectPaciente = 0;
var paciente = {};
var selectDoctor = 0;
var doctor = {};
var selectEnfermera = 0;
var enfermera = {};
var selectMedicina = 0;
var medicina = {};


// función  que se ejecuta cuando inicar la pagina
function mounted() {
  let user = JSON.parse(window.localStorage.getItem("user"));
  $("#name-user-login").html(`${user.nombre} ${user.apellido}`);
  $("#type-user-login").html(`${user.usuario_name}`);
}

// función  borrar el usuario y manda a login
function logout() {
  window.localStorage.removeItem("user");
  window.location.href = "login.html"
}


//para el csv
function displayCsvPaci() {
  $("#files").parse({
    config: {
      delimiter: ",",
      complete: displayHTMLTablePaci,
    },
  });
}
function displayCsvDoc() {
  $("#filesDoc").parse({
    config: {
      delimiter: ",",
      complete: displayHTMLTableDoc,
    },
  });
}
function displayCsvEnfer() {
  $("#filesEnfer").parse({
    config: {
      delimiter: ",",
      complete: displayHTMLTableEnfer,
    },
  });
}
function displayCsvMedi() {
  $("#filesMedi").parse({
    config: {
      delimiter: ",",
      complete: displayHTMLTableMedi,
    },
  });
}

//variables donde ira los csv ya parseados
var dataMasivePaci = [];
var dataMasiveDoc = [];
var dataMasiveEnfer = [];
var dataMasiveMedi = [];

//pa la separación de datos
function displayHTMLTablePaci(results) {
  var data = results.data;
  data.splice(0, 1);
  data.splice(data.length - 1, 1);
  dataMasivePaci = data;
}
function displayHTMLTableDoc(results) {
  var data = results.data;
  data.splice(0, 1);
  data.splice(data.length - 1, 1);
  dataMasiveDoc = data;
}
function displayHTMLTableEnfer(results) {
  var data = results.data;
  data.splice(0, 1);
  data.splice(data.length - 1, 1);
  dataMasiveEnfer = data;
}
function displayHTMLTableMedi(results) {
  var data = results.data;
  data.splice(0, 1);
  data.splice(data.length - 1, 1);
  dataMasiveMedi = data;
}

//envia datos de forma masiva
function sendMasiveCvsPaci() {
  fetch("https://proyectodosipc1back.herokuapp.com/carga-pacientes", {
    method: "POST",
    body: JSON.stringify(dataMasivePaci),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      getPacientes();
      $("#carga-pacientes").modal("hide");
    })
    .catch(function (error) {
      console.log(error);
    });
}
function sendMasiveCvsDoc() {
  fetch("https://proyectodosipc1back.herokuapp.com/carga-doctores", {
    method: "POST",
    body: JSON.stringify(dataMasiveDoc),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      getDoctores();
      $("#carga-doctores").modal("hide");
    })
    .catch(function (error) {
      console.log(error);
    });
}
function sendMasiveCvsEnfer() {
  fetch("https://proyectodosipc1back.herokuapp.com/carga-enfermeras", {
    method: "POST",
    body: JSON.stringify(dataMasiveEnfer),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      getEnfermeras();
      $("#carga-enfermeras").modal("hide");
    })
    .catch(function (error) {
      console.log(error);
    });
}
function sendMasiveCvsMedi() {
  fetch("https://proyectodosipc1back.herokuapp.com/carga-medicinas", {
    method: "POST",
    body: JSON.stringify(dataMasiveMedi),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      getMedicinas();
      $("#carga-medicinas").modal("hide");
    })
    .catch(function (error) {
      console.log(error);
    });
}

//obtener los arreglos
function getPacientes() {
  fetch("https://proyectodosipc1back.herokuapp.com/pacientes", {
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
          <th scope="col" class="text-muted">Nombre</th>
          <th scope="col" class="text-muted">Apellido</th>
          <th scope="col" class="text-muted">Fecha</th>
          <th scope="col" class="text-muted">Sexo</th>
          <th scope="col" class="text-muted">Usuario</th>
          <th scope="col" class="text-muted">Contraseña</th>
          <th scope="col" class="text-muted">Teléfono</th>
          <th scope="col" class="text-muted"></th>
        </tr>`;
      for (i = 0; i < data.length; i++) {
        table += "<tr>";
        var row = data[i];
        var cells = row;
        for (const prop in cells) {
          table += "<td>";
          table += cells[prop];
          table += "</td>";
        }
        table += `<th scope="col">
        <button type="button" class="btn btn-light text-muted mr-2" 
        data-bs-toggle="modal" data-bs-target="#ver-paciente" onclick="verPaciente(${i})"><i class="far fa-eye"></i></button>
        <button type="button" class="btn btn-light text-muted mr-2" 
        data-bs-toggle="modal" data-bs-target="#edit-paciente" onclick="verPacienteEdit(${i})"><i class="far fa-edit"></i></button>
        <button type="button" class="btn btn-light text-muted mr-2" 
        data-bs-toggle="modal" data-bs-target="#delete-paciente" onclick="changePaciente(${i})"><i class="fas fa-trash"></i></button>
        </th>`;
        table += "</tr>";
      }
      table += "</table>";
      $("#table-pacientes").html(table);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function getDoctores() {
  fetch("https://proyectodosipc1back.herokuapp.com/doctores", {
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
          <th scope="col" class="text-muted">Nombre</th>
          <th scope="col" class="text-muted">Apellido</th>
          <th scope="col" class="text-muted">Fecha</th>
          <th scope="col" class="text-muted">Sexo</th>
          <th scope="col" class="text-muted">Usuario</th>
          <th scope="col" class="text-muted">Contraseña</th>
          <th scope="col" class="text-muted">Especialidad</th>
          <th scope="col" class="text-muted">Teléfono</th>
          <th scope="col" class="text-muted"></th>
        </tr>`;
      for (i = 0; i < data.length; i++) {
        table += "<tr>";
        var row = data[i];
        var cells = row;
        for (const prop in cells) {
          table += "<td>";
          table += cells[prop];
          table += "</td>";
        }
        table += `<th scope="col">
        <button type="button" class="btn btn-light text-muted mr-2" 
        data-bs-toggle="modal" data-bs-target="#ver-doctor" onclick="verDoctor(${i})"><i class="far fa-eye"></i></button>
        <button type="button" class="btn btn-light text-muted mr-2" 
        data-bs-toggle="modal" data-bs-target="#edit-doctor" onclick="verDoctorEdit(${i})"><i class="far fa-edit"></i></button>
        <button type="button" class="btn btn-light text-muted mr-2" 
        data-bs-toggle="modal" data-bs-target="#delete-doctor" onclick="changeDoctor(${i})"><i class="fas fa-trash"></i></button>
        </th>`;
        table += "</tr>";
      }
      table += "</table>";
      $("#table-doctores").html(table);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function getEnfermeras() {
  fetch("https://proyectodosipc1back.herokuapp.com/enfermeras", {
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
          <th scope="col" class="text-muted">Nombre</th>
          <th scope="col" class="text-muted">Apellido</th>
          <th scope="col" class="text-muted">Fecha</th>
          <th scope="col" class="text-muted">Sexo</th>
          <th scope="col" class="text-muted">Usuario</th>
          <th scope="col" class="text-muted">Contraseña</th>
          <th scope="col" class="text-muted">Teléfono</th>
          <th scope="col" class="text-muted"></th>
        </tr>`;
      for (i = 0; i < data.length; i++) {
        table += "<tr>";
        var row = data[i];
        var cells = row;
        for (const prop in cells) {
          table += "<td>";
          table += cells[prop];
          table += "</td>";
        }
        table += `<th scope="col">
        <button type="button" class="btn btn-light text-muted mr-2" 
        data-bs-toggle="modal" data-bs-target="#ver-enfermera" onclick="verEnfermera(${i})"><i class="far fa-eye"></i></button>
        <button type="button" class="btn btn-light text-muted mr-2" 
        data-bs-toggle="modal" data-bs-target="#edit-enfermera" onclick="verEnfermeraEdit(${i})"><i class="far fa-edit"></i></button>
        <button type="button" class="btn btn-light text-muted mr-2" 
        data-bs-toggle="modal" data-bs-target="#delete-enfermera" onclick="changeEnfermera(${i})"><i class="fas fa-trash"></i></button>
        </th>`;
        table += "</tr>";
      }
      table += "</table>";
      $("#table-enfermeras").html(table);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function getMedicinas() {
  fetch("https://proyectodosipc1back.herokuapp.com/medicinas", {
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
          <th scope="col" class="text-muted w-25">Nombre</th>
          <th scope="col" class="text-muted">Precio</th>
          <th scope="col" class="text-muted">Descripción</th>
          <th scope="col" class="text-muted">Cantidad</th>
          <th scope="col" class="text-muted"></th>
        </tr>`;
      for (i = 0; i < data.length; i++) {
        table += "<tr>";
        var row = data[i];
        var cells = row;
        for (const prop in cells) {
          table += "<td>";
          table += cells[prop];
          table += "</td>";
        }
        table += `<th scope="col">
        <button type="button" class="btn btn-light text-muted mr-2" 
        data-bs-toggle="modal" data-bs-target="#ver-medicina" onclick="verMedicina(${i})"><i class="far fa-eye"></i></button>
        <button type="button" class="btn btn-light text-muted mr-2" 
        data-bs-toggle="modal" data-bs-target="#edit-medicina" onclick="verMedicinaEdit(${i})"><i class="far fa-edit"></i></button>
        <button type="button" class="btn btn-light text-muted mr-2" 
        data-bs-toggle="modal" data-bs-target="#delete-medicina" onclick="changeMedicina(${i})"><i class="fas fa-trash"></i></button>
        </th>`;
        table += "</tr>";
      }
      table += "</table>";
      $("#table-medicinas").html(table);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//ver
function verPaciente(index) {
  fetch("https://proyectodosipc1back.herokuapp.com/ver-paciente", {
    method: "POST",
    body: JSON.stringify(index),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      paciente = response.data;
      data = `                                    
      <label class="text-muted mb-2">Nombre: ${paciente.nombre}</label><br>
      <label class="text-muted mb-2">Apellido: ${paciente.apellido}</label><br>
      <label class="text-muted mb-2">Cumpleaños: ${paciente.birthday}</label><br>
      <label class="text-muted mb-2">Sexo: ${paciente.sexo}</label><br>
      <label class="text-muted mb-2">Usuario: ${paciente.usuario_name}</label><br>
      <label class="text-muted mb-2">Contraseña: ${paciente.contrasena}</label><br>
      <label class="text-muted mb-2">Teléfono: ${paciente.telefono}</label><br>
      `;
      $("#paciente-data").html(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function verDoctor(index) {
  fetch("https://proyectodosipc1back.herokuapp.com/ver-doctor", {
    method: "POST",
    body: JSON.stringify(index),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      doctor = response.data;
      data = `                                    
      <label class="text-muted mb-2">Nombre: ${doctor.nombre}</label><br>
      <label class="text-muted mb-2">Apellido: ${doctor.apellido}</label><br>
      <label class="text-muted mb-2">Cumpleaños: ${doctor.birthday}</label><br>
      <label class="text-muted mb-2">Sexo: ${doctor.sexo}</label><br>
      <label class="text-muted mb-2">Usuario: ${doctor.usuario_name}</label><br>
      <label class="text-muted mb-2">Contraseña: ${doctor.contrasena}</label><br>
      <label class="text-muted mb-2">Especialidad: ${doctor.especialidad}</label><br>
      <label class="text-muted mb-2">Teléfono: ${doctor.telefono}</label><br>
      `;
      $("#doctor-data").html(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function verEnfermera(index) {
  fetch("https://proyectodosipc1back.herokuapp.com/ver-enfermera", {
    method: "POST",
    body: JSON.stringify(index),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      enfermera = response.data;
      data = `                                    
      <label class="text-muted mb-2">Nombre: ${enfermera.nombre}</label><br>
      <label class="text-muted mb-2">Apellido: ${enfermera.apellido}</label><br>
      <label class="text-muted mb-2">Cumpleaños: ${enfermera.birthday}</label><br>
      <label class="text-muted mb-2">Sexo: ${enfermera.sexo}</label><br>
      <label class="text-muted mb-2">Usuario: ${enfermera.usuario_name}</label><br>
      <label class="text-muted mb-2">Contraseña: ${enfermera.contrasena}</label><br>
      <label class="text-muted mb-2">Teléfono: ${enfermera.telefono}</label><br>
      `;
      $("#enfermera-data").html(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function verMedicina(index) {
  fetch("https://proyectodosipc1back.herokuapp.com/ver-medicina", {
    method: "POST",
    body: JSON.stringify(index),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      medicina = response.data;
      data = `                                    
      <label class="text-muted mb-2">Nombre: ${medicina.nombre}</label><br>
      <label class="text-muted mb-2">Precio: ${medicina.precio}</label><br>
      <label class="text-muted mb-2">Descripción: ${medicina.descripcion}</label><br>
      <label class="text-muted mb-2">Cantidad: ${medicina.cantidad}</label><br>
      `;
      $("#medicina-data").html(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//ver pa editar
function verPacienteEdit(index) {
  selectPaciente = index;
  fetch("https://proyectodosipc1back.herokuapp.com/ver-paciente", {
    method: "POST",
    body: JSON.stringify(index),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      paciente = response.data;
      data = `                                    
      <label class="text-muted">Nombre</label><br>
      <input type="text" class="form-control mb-2" id="input-paciente-name" value="${paciente.nombre}" />
      <label class="text-muted">Apellido</label><br>
      <input type="text" class="form-control mb-2" id="input-paciente-apellido" value="${paciente.apellido}" />
      <label class="text-muted">Cumpleaños</label><br>
      <input type="text" class="form-control mb-2" id="input-paciente-birthday" value="${paciente.birthday}" />
      <label class="text-muted">Sexo</label><br>
      <input type="text" class="form-control mb-2" id="input-paciente-sexo" value="${paciente.sexo}" />
      <label class="text-muted">Usuario</label><br>
      <input type="text" class="form-control mb-2" id="input-paciente-usuario_name" value="${paciente.usuario_name}" />
      <label class="text-muted">Contraseña</label><br>
      <input type="text" class="form-control mb-2" id="input-paciente-contrasena" value="${paciente.contrasena}" />
      <label class="text-muted">Teléfono</label><br>
      <input type="text" class="form-control mb-2" id="input-paciente-telefono" value="${paciente.telefono}" />
      `;
      $("#paciente-data-edit").html(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function verDoctorEdit(index) {
  selectDoctor = index;
  fetch("https://proyectodosipc1back.herokuapp.com/ver-doctor", {
    method: "POST",
    body: JSON.stringify(index),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      doctor = response.data;
      data = `                                    
      <label class="text-muted">Nombre</label><br>
      <input type="text" class="form-control mb-2" id="input-doctor-name" value="${doctor.nombre}" />
      <label class="text-muted">Apellido</label><br>
      <input type="text" class="form-control mb-2" id="input-doctor-apellido" value="${doctor.apellido}" />
      <label class="text-muted">Cumpleaños</label><br>
      <input type="text" class="form-control mb-2" id="input-doctor-birthday" value="${doctor.birthday}" />
      <label class="text-muted">Sexo</label><br>
      <input type="text" class="form-control mb-2" id="input-doctor-sexo" value="${doctor.sexo}" />
      <label class="text-muted">Usuario</label><br>
      <input type="text" class="form-control mb-2" id="input-doctor-usuario_name" value="${doctor.usuario_name}" />
      <label class="text-muted">Contraseña</label><br>
      <input type="text" class="form-control mb-2" id="input-doctor-contrasena" value="${doctor.contrasena}" />
      <label class="text-muted">Especialidad</label><br>
      <input type="text" class="form-control mb-2" id="input-doctor-especialidad" value="${doctor.especialidad}" />
      <label class="text-muted">Teléfono</label><br>
      <input type="text" class="form-control mb-2" id="input-doctor-telefono" value="${doctor.telefono}" />
      `;
      $("#doctor-data-edit").html(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function verEnfermeraEdit(index) {
  selectEnfermera = index;
  fetch("https://proyectodosipc1back.herokuapp.com/ver-enfermera", {
    method: "POST",
    body: JSON.stringify(index),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      enfermera = response.data;
      data = `                                    
      <label class="text-muted">Nombre</label><br>
      <input type="text" class="form-control mb-2" id="input-enfermera-name" value="${enfermera.nombre}" />
      <label class="text-muted">Apellido</label><br>
      <input type="text" class="form-control mb-2" id="input-enfermera-apellido" value="${enfermera.apellido}" />
      <label class="text-muted">Cumpleaños</label><br>
      <input type="text" class="form-control mb-2" id="input-enfermera-birthday" value="${enfermera.birthday}" />
      <label class="text-muted">Sexo</label><br>
      <input type="text" class="form-control mb-2" id="input-enfermera-sexo" value="${enfermera.sexo}" />
      <label class="text-muted">Usuario</label><br>
      <input type="text" class="form-control mb-2" id="input-enfermera-usuario_name" value="${enfermera.usuario_name}" />
      <label class="text-muted">Contraseña</label><br>
      <input type="text" class="form-control mb-2" id="input-enfermera-contrasena" value="${enfermera.contrasena}" />
      <label class="text-muted">Teléfono</label><br>
      <input type="text" class="form-control mb-2" id="input-enfermera-telefono" value="${enfermera.telefono}" />
      `;
      $("#enfermera-data-edit").html(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function verMedicinaEdit(index) {
  selectMedicina = index;
  fetch("https://proyectodosipc1back.herokuapp.com/ver-medicina", {
    method: "POST",
    body: JSON.stringify(index),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      medicina = response.data;
      data = `                                    
      <label class="text-muted">Nombre</label><br>
      <input type="text" class="form-control mb-2" id="input-medicina-name" value="${medicina.nombre}" />
      <label class="text-muted">Precio</label><br>
      <input type="text" class="form-control mb-2" id="input-medicina-precio" value="${medicina.precio}" />
      <label class="text-muted">Descripción</label><br>
      <input type="text" class="form-control mb-2" id="input-medicina-descripcion" value="${medicina.descripcion}" />
      <label class="text-muted">Cantidad</label><br>
      <input type="text" class="form-control mb-2" id="input-medicina-cantidad" value="${medicina.cantidad}" />
      `;
      $("#medicina-data-edit").html(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//eliminar objeto
function deletePaciente() {
  fetch("https://proyectodosipc1back.herokuapp.com/delete-paciente", {
    method: "POST",
    body: JSON.stringify(selectPaciente),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      getPacientes();
      $("#delete-paciente").modal("hide");
    })
    .catch(function (error) {
      console.log(error);
    });
}
function deleteDoctor() {
  fetch("https://proyectodosipc1back.herokuapp.com/delete-doctor", {
    method: "POST",
    body: JSON.stringify(selectDoctor),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      getDoctores();
      $("#delete-doctor").modal("hide");
    })
    .catch(function (error) {
      console.log(error);
    });
}
function deleteEnfermera() {
  fetch("https://proyectodosipc1back.herokuapp.com/delete-enfermera", {
    method: "POST",
    body: JSON.stringify(selectEnfermera),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      getEnfermeras();
      $("#delete-enfermera").modal("hide");
    })
    .catch(function (error) {
      console.log(error);
    });
}
function deleteMedicina() {
  fetch("https://proyectodosipc1back.herokuapp.com/delete-medicina", {
    method: "POST",
    body: JSON.stringify(selectMedicina),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      getMedicinas();
      $("#delete-medicina").modal("hide");
    })
    .catch(function (error) {
      console.log(error);
    });
}

//actualizar objeto
function updatePaciente() {
  data = {
    index: selectPaciente,
    nombre: document.getElementById("input-paciente-name").value,
    apellido: document.getElementById("input-paciente-apellido").value,
    birthday: document.getElementById("input-paciente-birthday").value,
    sexo: document.getElementById("input-paciente-sexo").value,
    user_name: document.getElementById("input-paciente-usuario_name").value,
    password: document.getElementById("input-paciente-contrasena").value,
    telefono: document.getElementById("input-paciente-telefono").value,
  };
  fetch("https://proyectodosipc1back.herokuapp.com/edit-paciente", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      getPacientes();
      $("#edit-paciente").modal("hide");
    })
    .catch(function (error) {
      console.log(error);
    });
}
function updateDoctor() {
  data = {
    index: selectDoctor,
    nombre: document.getElementById("input-doctor-name").value,
    apellido: document.getElementById("input-doctor-apellido").value,
    birthday: document.getElementById("input-doctor-birthday").value,
    sexo: document.getElementById("input-doctor-sexo").value,
    user_name: document.getElementById("input-doctor-usuario_name").value,
    password: document.getElementById("input-doctor-contrasena").value,
    speciality: document.getElementById("input-doctor-especialidad").value,
    telefono: document.getElementById("input-doctor-telefono").value,
  };
  fetch("https://proyectodosipc1back.herokuapp.com/edit-doctores", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      getDoctores();
      $("#edit-doctor").modal("hide");
    })
    .catch(function (error) {
      console.log(error);
    });
}
function updateEnfermera() {
  data = {
    index: selectEnfermera,
    nombre: document.getElementById("input-enfermera-name").value,
    apellido: document.getElementById("input-enfermera-apellido").value,
    birthday: document.getElementById("input-enfermera-birthday").value,
    sexo: document.getElementById("input-enfermera-sexo").value,
    user_name: document.getElementById("input-enfermera-usuario_name").value,
    password: document.getElementById("input-enfermera-contrasena").value,
    telefono: document.getElementById("input-enfermera-telefono").value,
  };
  fetch("https://proyectodosipc1back.herokuapp.com/edit-enfermera", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      getEnfermeras();
      $("#edit-enfermera").modal("hide");
    })
    .catch(function (error) {
      console.log(error);
    });
}
function updateMedicina() {
  data = {
    index: selectMedicina,
    nombre: document.getElementById("input-medicina-name").value,
    precio: document.getElementById("input-medicina-precio").value,
    descripcion: document.getElementById("input-medicina-descripcion").value,
    cantidad: document.getElementById("input-medicina-cantidad").value,
  };
  fetch("https://proyectodosipc1back.herokuapp.com/edit-medicina", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      getMedicinas();
      $("#edit-medicina").modal("hide");
    })
    .catch(function (error) {
      console.log(error);
    });
}

//pa los reportes
function reporteEnfer() {
  var element = document.getElementById('table-enfermeras');
  var opt = {
    margin: 0.7,
    filename: 'enfermeras.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}
function reporteDocs() {
  var element = document.getElementById('table-doctores');
  var opt = {
    margin: 0,
    filename: 'doctores.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 1 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}
function reportePaci() {
  var element = document.getElementById('table-pacientes');
  var opt = {
    margin: 0.6,
    filename: 'pacientes.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}
function reporteMedi() {
  var element = document.getElementById('table-medicinas');
  var opt = {
    margin: 1,
    filename: 'medicinas.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}

//saber que objeto estoy seleccionando
function changePaciente(index) {
  selectPaciente = index;
}
function changeDoctor(index) {
  selectDoctor = index;
}
function changeEnfermera(index) {
  selectEnfermera = index;
}
function changeMedicina(index) {
  selectMedicina = index;
}
