//relacionado a los proyectos

import type { Request, Response, NextFunction } from 'express'
import Project, { IProject } from '../models/Project'

declare global {
    namespace Express {
        interface Request {
            project: IProject
        }
    }
}
//toma el project ID desde la URL, si no existe, envia esa respuesa y si no existe va a lanzar el codigo
export async function projectExists( req: Request, res: Response, next: NextFunction ) {
    try {
        const { projectId } = req.params
        const project = await Project.findById(projectId)
        if(!project) {
            const error = new Error('Proyecto no encontrado')
            return res.status(404).json({error: error.message})
        }
        req.project = project
        next()
        //pero si existe envia el siguiente middleware
    } catch (error) {
        res.status(500).json({error: 'Hubo un error'})
    }
}