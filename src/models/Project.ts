// Importamos mongoose y sus tipos
// `Schema` se usa para definir la estructura del documento
// `Document` es la clase base que representa un documento en MongoDB
import mongoose, { Schema, Document, PopulatedDoc, Types} from "mongoose";
import { ITask } from "./Task";


export interface IProject extends Document {
  projectName: string;   // Nombre del proyecto
  clientName: string;    // Nombre del cliente
  description: string;   // Descripción del proyecto
  tasks: PopulatedDoc<ITask & Document>[]
};

// 🧱 Definimos el esquema de Mongoose (la estructura del documento en MongoDB)
// Aquí especificamos los campos, tipos y validaciones
const ProjectSchema: Schema = new Schema({
  projectName: {
    type: String,    // El valor debe ser de tipo texto
    required: true,  // Obligatorio (no se puede guardar un proyecto sin nombre)
    trim: true,      // Elimina espacios al inicio y final
  },
  clientName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  tasks: [
    {
      type: Types.ObjectId,
      ref: 'Task'
    }
  ]
}, {timestamps: true});

// 🧠 Creamos el modelo de Mongoose
// `mongoose.model()` vincula el esquema con una colección en MongoDB
// El primer parámetro 'Project' es el nombre del modelo
// MongoDB lo pluraliza automáticamente → colección "projects"
const Project = mongoose.model<IProject>("Project", ProjectSchema);

// 🚀 Exportamos el modelo para poder usarlo en controladores, rutas, etc.
// Ejemplo: Project.find(), Project.create(), Project.updateOne(), etc.
export default Project;

// -----------------------------

// import mongoose, { Schema, Document } from "mongoose";

// // Tipado de TypeScript (para autocompletado y validaciones)
// export type TicketType = Document & {
//   title: string;
//   description: string;
//   clientName: string;
//   assignedTo?: string;       // Quién lo atiende (opcional)
//   status: "Pending" | "In Progress" | "Solved" | "Closed"; // Estados posibles
//   priority?: "Low" | "Medium" | "High"; // Nivel de prioridad (opcional)
//   createdAt: Date;
//   updatedAt: Date;
// };

// // Estructura del documento en MongoDB
// const TicketSchema: Schema = new Schema(
//   {
//     title: { type: String, required: true, trim: true },       // Nombre o asunto del ticket
//     description: { type: String, required: true, trim: true }, // Descripción del problema
//     clientName: { type: String, required: true, trim: true },  // Quién reporta
//     assignedTo: { type: String, trim: true },                  // Persona asignada
//     status: {                                                  // Estado actual
//       type: String,
//       enum: ["Pending", "In Progress", "Solved", "Closed"],
//       default: "Pending",
//     },
//     priority: {                                                // Prioridad (baja, media, alta)
//       type: String,
//       enum: ["Low", "Medium", "High"],
//       default: "Medium",
//     },
//   },
//   {
//     timestamps: true, // 🔥 Agrega automáticamente createdAt y updatedAt
//   }
// );

// // Crea el modelo en la base de datos
// const Ticket = mongoose.model<TicketType>("Ticket", TicketSchema);
// export default Ticket;
