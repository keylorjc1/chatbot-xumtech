import type {Request, Response} from 'express'
import Project from '../models/Project'

export class ProjectController {

        static createProject = async (req: Request, res: Response) => {
        
            const project = new Project(req.body)

            try {
                await project.save()
                res.send('Proyecto Creado Correctamente')
            } catch (error) {
                console.log(error)
            }
    }

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({})
            res.json(projects)
        } catch (error) {
            console.log(error);
        }
    }
static getProjectById = async (req: Request, res: Response): Promise<void> => {
        const {id} = req.params
        try {
            const project = await  Project.findById(id)
 
            if(!project){
                const error= new Error('Project not found')
                res.status(400).json({error: error.message})
                return
            }
            res.json(project)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Server Error' }); 
        }
    }   
}

// import type { Request, Response } from 'express';
// import Ticket from '../models/Ticket';

// export class TicketController {

//   // Crear ticket
//   static createTicket = async (req: Request, res: Response) => {
//     const ticket = new Ticket(req.body);

//     try {
//       await ticket.save();
//       res.status(201).json({ message: 'Ticket created successfully', ticket });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error creating ticket', error });
//     }
//   };

//   // Obtener todos los tickets
//   static getAllTickets = async (req: Request, res: Response) => {
//     try {
//       const tickets = await Ticket.find();
//       res.json(tickets);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error fetching tickets', error });
//     }
//   };
// }
