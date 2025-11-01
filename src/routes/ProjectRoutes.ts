import {Router} from 'express'
import {body} from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'

const router = Router()

router.post('/', 
    body('projectName')
    .notEmpty().withMessage('The name of the Project is required'),
    body('clientName')
    .notEmpty().withMessage('The name of the Client is required'),
        body('description')
    .notEmpty().withMessage('The Description is required'),
    ProjectController.createProject
)
router.get('/',ProjectController.getAllProjects)

export default router