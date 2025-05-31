DROP TABLE IF EXISTS Incidencia;
DROP TABLE IF EXISTS Estudiante;
DROP TABLE IF EXISTS Grupo;
DROP TABLE IF EXISTS Subcategoria;
DROP TABLE IF EXISTS Categoria;
DROP TABLE IF EXISTS Semestre;

CREATE TABLE Semestre (
  idSemestre INT AUTO_INCREMENT PRIMARY KEY,
  periodo VARCHAR(50) NOT NULL
);

CREATE TABLE Categoria (
  idCategoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  refSemestre INT NOT NULL,
  FOREIGN KEY (refSemestre) REFERENCES Semestre(idSemestre)
);

CREATE TABLE Subcategoria (
  idSubcategoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  refCategoria INT NOT NULL,
  FOREIGN KEY (refCategoria) REFERENCES Categoria(idCategoria)
);

CREATE TABLE Grupo (
  idGrupo INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  proyecto1 VARCHAR(100),
  proyecto2 VARCHAR(100),
  refSemestre INT NOT NULL,
  FOREIGN KEY (refSemestre) REFERENCES Semestre(idSemestre)
);

CREATE TABLE Estudiante (
  idEstudiante INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  refGrupo INT NOT NULL,
  FOREIGN KEY (refGrupo) REFERENCES Grupo(idGrupo)
);

CREATE TABLE Incidencia (
  idIncidencia INT AUTO_INCREMENT PRIMARY KEY,
  semana INT,
  observacion TEXT,
  refGrupo INT NOT NULL,
  refCategoria INT NOT NULL,
  refSubcategoria INT NOT NULL,
  fechaCreacion DATETIME,
  FOREIGN KEY (refGrupo) REFERENCES Grupo(idGrupo),
  FOREIGN KEY (refCategoria) REFERENCES Categoria(idCategoria),
  FOREIGN KEY (refSubcategoria) REFERENCES Subcategoria(idSubcategoria)
);
