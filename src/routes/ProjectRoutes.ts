import {Router} from 'express'
import {body, param} from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErros } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { projectExists } from '../middleware/project'

const router = Router()

router.post('/', 
    body('projectName')
    .notEmpty().withMessage('The name of the Project is required'),
    body('clientName')
    .notEmpty().withMessage('The name of the Client is required'),
        body('description')
    .notEmpty().withMessage('The Description is required'),
    handleInputErros,
    ProjectController.createProject
)
router.get('/',ProjectController.getAllProjects)

router.get('/:id',
    param('id').isMongoId().withMessage('ID not valid'),
    handleInputErros,
    ProjectController.getProjectById
)

router.put('/:id',
    param('id').isMongoId().withMessage('ID not valid'),
        body('projectName')
    .notEmpty().withMessage('The name of the Project is required'),
    body('clientName')
    .notEmpty().withMessage('The name of the Client is required'),
        body('description')
    .notEmpty().withMessage('The Description is required'),
    handleInputErros,
    ProjectController.updateProject
)

router.delete('/:id',
    param('id').isMongoId().withMessage('ID not valid'),
    handleInputErros,
    ProjectController.deleteProject
)

router.post('/:projectId/tasks',
    projectExists,
    TaskController.createTask
)

export default router