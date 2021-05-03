class Cita():
    idpaciente = ""
    fecha = ""
    status = ""
    motivo = ""
    iddoctor = ""

    def __init__(self , idpaciente, fecha, motivo, status, iddoctor):
        self.idpaciente = idpaciente
        self.fecha = fecha
        self.motivo = motivo
        self.status = status
        self.iddoctor = iddoctor