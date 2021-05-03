class Doctor():
    nombre = ""
    apellido = ""
    birthday = ""
    sexo = ""
    usuario_name = ""
    contrasena = ""
    especialidad = ""
    telefono = ""

    def __init__(self , nombre, apellido, birthday, sexo, usuario_name, contrasena, especialidad, telefono):
        self.nombre = nombre
        self.apellido = apellido
        self.birthday = birthday
        self.sexo = sexo
        self.usuario_name = usuario_name
        self.contrasena = contrasena
        self.especialidad = especialidad
        self.telefono = telefono