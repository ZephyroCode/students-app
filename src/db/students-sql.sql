DROP TABLE IF EXISTS Estudiantes;

CREATE TABLE "Estudiantes" (
	CI INTEGER PRIMARY KEY,
	Nombres_Alumno TEXT NOT NULL,
	Apellidos_Alumno TEXT NOT NULL,
	Seccion_Alumno INT,
	SEXO TEXT NOT NULL
);