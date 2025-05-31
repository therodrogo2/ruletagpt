import express from 'express';
import morgan from 'morgan';
import { PORT, HOST } from './config/config.js';
import semestresRoutes from './routes/semestres.js';
import semestresCategorias from './routes/categorias.js';
import semestresSubCategorias from './routes/subcategorias.js';
import gruposSemestre from './routes/grupos.js';
import estudiantesRoutes from './routes/estudiantes.js';
import estudianteGrupoRouter from "./routes/grupoEstudiante.js";
import crearIncidencia from './routes/incidencias.js';
import obtenerIncidencias from './routes/incidencias.js';
import cors from 'cors';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/semestres', semestresRoutes);

app.use('/api/categorias', semestresCategorias);

app.use('/api/subcategorias', semestresSubCategorias);

app.use('/api/grupos', gruposSemestre); 

app.use('/api/estudiantes', estudiantesRoutes);

app.use("/api/grupoEstudiante", estudianteGrupoRouter);

app.use('/api/incidencias', crearIncidencia); 

app.use('/api/incidencias/semestre/',obtenerIncidencias);



app.listen(PORT, () => {
  console.log(`Backend running at http://${HOST}:${PORT}`);
});
