import json#importamos json que nos servira de mucho
from flask import Flask, request, jsonify#importamos las librerias requeridas para una app web
from flask_cors import CORS, cross_origin#importamos las librerias requeridas para una app web
from Admin import Admin#importamos la clase admin
from Doctor import Doctor#importamos la clase Doctor
from Paciente import Paciente#importamos la clase Pacientes
from Enfermera import Enfermera#importamos la clase Enfermeras
from Medicina import Medicina#importamos la clase Medicina
from Cita import Cita #importamos la clase Medicina


#Inicializamos la aplicación Web
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#creo los arreglos de todos los usuarios que usaran la aplicación
pacientes = []
enfermeras = []
doctores = []
admin = Admin("Carlos", "Campaneros", "admin", "1234")
medicamentos = []
users = []
citas = []
countCita = 0

@app.route('/')
def inicio():
    return "steven"

#Metodo web de el login
@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        params = json.loads(request.data)

        users = params['user']
        passwords = params['password']

        if admin.usuario_name == users:
            if admin.contrasena == passwords:
                 return jsonify({"status": 200, "mensaje": "Credenciales correctas", "data": True, "user": admin.__dict__,"user_type":"Admin"})

        for docs in doctores:
            if users == docs.usuario_name:
                if passwords == docs.contrasena:
                    return jsonify({"status": 200, "mensaje": "Credenciales correctas","data":True,"user":docs.__dict__,"user_type":"Doctor"})
                else:
                    return jsonify({"status": 200, "mensaje": "Credenciales incorrectas","data":False})

        for paci in pacientes:
            if users == paci.usuario_name:
                if passwords == paci.contrasena:
                    return jsonify({"status": 200, "mensaje": "Credenciales correctas","data":True,"user":paci.__dict__,"user_type":"Paciente"})
                else:
                    return jsonify({"status": 200, "mensaje": "Credenciales incorrectas","data":False})
        
        for enfe in enfermeras:
            if users == enfe.usuario_name:
                if passwords == enfe.contrasena:
                    return jsonify({"status": 200, "mensaje": "Credenciales correctas","data":True,"user":enfe.__dict__,"user_type":"Enfermera"})
                else:
                    return jsonify({"status": 200, "mensaje": "Credenciales incorrectas","data":False})

        return jsonify({"status": 200, "mensaje": "Credenciales incorrectas", "data": False})

#Metodo registrar nuevo usuario, solamente paciente
@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        params = json.loads(request.data)

        nuevo_paciente = Paciente(params['nombre'],params['apellido'],params['birthday'],params['sexo'],params['user_name'],params['password'],params['telefono'])
        pacientes.append(nuevo_paciente)
        return jsonify({"status": 200, "mensaje": "Usuario creado correctamente"})


#############################################################################################################


#Metodo cargan masiva pacientes
@app.route('/carga-pacientes', methods=['POST'])
def cargaPacientes():
    if request.method == 'POST':
        params = json.loads(request.data)
        for paci in params:
            pacientes.append(Paciente(paci[0], paci[1], paci[2], paci[3], paci[4], paci[5], paci[6]))            
        return jsonify({"status": 200})

#Metodo cargan masiva doctores
@app.route('/carga-doctores', methods=['POST'])
def cargaDoctores():
    if request.method == 'POST':
        params = json.loads(request.data)
        for docs in params:
            doctores.append(Doctor(docs[0], docs[1], docs[2], docs[3], docs[4], docs[5], docs[6], docs[7]))
        return jsonify({"status": 200})

#Metodo cargan masiva enfermeras
@app.route('/carga-enfermeras', methods=['POST'])
def cargaEnfermeras():
    if request.method == 'POST':
        params = json.loads(request.data)
        for enfer in params:
            enfermeras.append(Enfermera(enfer[0], enfer[1], enfer[2], enfer[3], enfer[4], enfer[5], enfer[6]))            
        return jsonify({"status": 200})

#Metodo cargan masiva medicinas
@app.route('/carga-medicinas', methods=['POST'])
def cargaMedicinas():
    if request.method == 'POST':
        params = json.loads(request.data)
        for medi in params:
            medicamentos.append(Medicina(medi[0], medi[1], medi[2], medi[3]))            
        return jsonify({"status": 200})


#############################################################################################################


#para hacer obtener el paciente a utilizar
@app.route('/pacientes', methods=['GET'])
def getPacientes():
    if request.method == 'GET':
        return json.dumps([ob.__dict__ for ob in pacientes])

#para hacer obtener el doctor a utilizar
@app.route('/doctores', methods=['GET'])
def getDoctores():
    if request.method == 'GET':
        return json.dumps([ob.__dict__ for ob in doctores])

#para hacer obtener la enfermera a utilizar
@app.route('/enfermeras', methods=['GET'])
def getEnfermeras():
    if request.method == 'GET':
        return json.dumps([ob.__dict__ for ob in enfermeras])

#para hacer obtener la medicina a utilizar
@app.route('/medicinas', methods=['GET'])
def getMedicinas():
    if request.method == 'GET':
        return json.dumps([ob.__dict__ for ob in medicamentos])

#para hacer obtener el paciente para la cita a utilizar
@app.route('/paciente-citas/<usuario>', methods=['GET'])
def getPacienteCitas(usuario):
    if request.method == 'GET':
        mecitas = []
        for cita in citas:
            if cita.idpaciente == usuario:
                mecitas.append(cita)

        return json.dumps([ob.__dict__ for ob in mecitas])


#para hacer obtener la enfermera las citas disponibles a utilizar
@app.route('/enfermera-citas/<status>', methods=['GET'])
def getEnfermeraCitas(status):
    if request.method == 'GET':
        mecitas = []
        for cita in citas:
            if cita.status == status:
                mecitas.append(cita)

        return json.dumps([ob.__dict__ for ob in mecitas])
#############################################################################################################


#ver pacientes
@app.route('/ver-paciente', methods=['POST'])
def getPaciente():
    if request.method == 'POST':
        params = json.loads(request.data)
        return jsonify({"data": pacientes[params].__dict__})

#ver Doctores
@app.route('/ver-doctor', methods=['POST'])
def getDoctor():
    if request.method == 'POST':
        params = json.loads(request.data)
        return jsonify({"data": doctores[params].__dict__})

#ver enfermeras
@app.route('/ver-enfermera', methods=['POST'])
def getEnfermera():
    if request.method == 'POST':
        params = json.loads(request.data)
        return jsonify({"data": enfermeras[params].__dict__})

#ver medicinas
@app.route('/ver-medicina', methods=['POST'])
def getMedicina():
    if request.method == 'POST':
        params = json.loads(request.data)
        return jsonify({"data": medicamentos[params].__dict__})


#############################################################################################################


#editar pacientes
@app.route('/edit-paciente', methods=['POST'])
def editPaciente():
    if request.method == 'POST':
        params = json.loads(request.data)
        edit_paciente = Paciente(params['nombre'],params['apellido'],params['birthday'],params['sexo'],params['user_name'],params['password'],params['telefono'])
        pacientes[params['index']] = edit_paciente

        return jsonify({"status": 200})

#editar doctores
@app.route('/edit-doctores', methods=['POST'])
def editDoctor():
    if request.method == 'POST':
        params = json.loads(request.data)
        edit_doctor = Doctor(params['nombre'],params['apellido'],params['birthday'],params['sexo'],params['user_name'],params['password'],params['speciality'],params['telefono'])
        doctores[params['index']] = edit_doctor

        return jsonify({"status": 200})

#editar enfermera
@app.route('/edit-enfermera', methods=['POST'])
def editEnfermera():
    if request.method == 'POST':
        params = json.loads(request.data)
        edit_enfermera= Enfermera(params['nombre'],params['apellido'],params['birthday'],params['sexo'],params['user_name'],params['password'],params['telefono'])
        enfermeras[params['index']] = edit_enfermera

        return jsonify({"status": 200})

#editar medicina
@app.route('/edit-medicina', methods=['POST'])
def editMedicina():
    if request.method == 'POST':
        params = json.loads(request.data)
        edit_medicina= Medicina(params['nombre'],params['precio'],params['descripcion'],params['cantidad'])
        medicamentos[params['index']] = edit_medicina

        return jsonify({"status": 200})


#############################################################################################################


#eliminar pacientes
@app.route('/delete-paciente', methods=['POST'])
def deletePaciente():
    if request.method == 'POST':
        params = json.loads(request.data)
        pacientes.pop(params)
        return jsonify({"status": 200})

#eliminar doctores
@app.route('/delete-doctor', methods=['POST'])
def deleteDoctor():
    if request.method == 'POST':
        params = json.loads(request.data)
        doctores.pop(params)
        return jsonify({"status": 200})

#eliminar enfermera
@app.route('/delete-enfermera', methods=['POST'])
def deleteEnfermera():
    if request.method == 'POST':
        params = json.loads(request.data)
        enfermeras.pop(params)
        return jsonify({"status": 200})

#eliminar medicina
@app.route('/delete-medicina', methods=['POST'])
def deleteMedicina():
    if request.method == 'POST':
        params = json.loads(request.data)
        medicamentos.pop(params)
        return jsonify({"status": 200})


#eliminar cita
@app.route('/status-cita', methods=['POST'])
def statusCita():
    if request.method == 'POST':
        params = json.loads(request.data)
        x = 0
        for cita in citas:
            if cita.idpaciente == params["idpaciente"]:
                if cita.status == "Pendiente":
                    setattr(cita, "status", params['status'])
                    if params['status'] == 'Aceptada':
                        setattr(cita, "iddoctor", params['iddoctor'])
                    citas[x] =  cita
            x = x + 1
            
        return jsonify({"status": 200})

###############################################################################################################3
#Metodo para aceptar citas, etc
@app.route('/store-cita', methods=['POST'])
def StoreCita():
    if request.method == 'POST':
        params = json.loads(request.data)
        count = 0
        for cita in citas:
            if cita.idpaciente == params['idpaciente']:
                if cita.status == "Pendiente" or cita.status == "Aceptada":
                    count = count + 1
        if count == 0:
            nueva_cita = Cita(params['idpaciente'],params['fecha'],params['motivo'], "Pendiente", "0")
            citas.append(nueva_cita)
            return jsonify({"status": 200, "mensaje": "Cita creada"})
        else:
            return jsonify({"status": 201, "mensaje": "Tienes una cita pendiente o aceptada"})

#correr app
if __name__ == '__main__':
    app.run(port=5000, debug=True)
