class Cita():
    idpaciente = ""
    fecha = ""
    status = ""
    motivo = ""
    iddoctor = ""
    statusdoctor = ""

    def __init__(self , idpaciente, fecha, motivo, status, iddoctor, statusdoctor):
        self.idpaciente = idpaciente
        self.fecha = fecha
        self.motivo = motivo
        self.status = status
        self.iddoctor = iddoctor
        self.statusdoctor = statusdoctor