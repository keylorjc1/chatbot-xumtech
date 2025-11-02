import {Router} from 'express'
import {body, param} from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErros } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { projectExists } from '../middleware/project'
import Task from '../models/Task'
import { taskExists } from '../middleware/task'

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

router.param('projectId', projectExists)

router.post('/:projectId/tasks',
        body('name')
    .notEmpty().withMessage('The name of the Project is required'),
        body('description')
    .notEmpty().withMessage('The Description is required'),
    handleInputErros,
    TaskController.createTask
)

router.get('/:projectId/tasks',
    TaskController.getProjectTasks
)

router.param('taskId', taskExists )

router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID not valid'),
    handleInputErros,
    TaskController.getTaskById
)
router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID not valid'),
            body('name')
    .notEmpty().withMessage('The name of the Project is required'),
        body('description')
    .notEmpty().withMessage('The Description is required'),
    handleInputErros,
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID not valid'),
    handleInputErros,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('ID not valid'),
    body('status')
    .notEmpty().withMessage('The state is required'),
    handleInputErros,
    TaskController.updateStatus
)
export default router