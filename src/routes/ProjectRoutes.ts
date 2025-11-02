import {Router} from 'express'
import {body, param} from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErros } from '../middleware/validation'

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

export default router

// import { Router } from 'express';
// import { body } from 'express-validator';
// import { TicketController } from '../controllers/TicketController';
// import { handleInputErrors } from '../middleware/validation';

// const router = Router();

// // Crear un ticket
// router.post(
//   '/',
//   body('title').notEmpty().withMessage('The title of the Ticket is required'),
//   body('clientName').notEmpty().withMessage('The name of the Client is required'),
//   body('description').notEmpty().withMessage('The description is required'),
//   body('status').optional().isIn(['Pending', 'In Progress', 'Solved', 'Closed'])
//     .withMessage('Status must be Pending, In Progress, Solved, or Closed'),
//   body('priority').optional().isIn(['Low', 'Medium', 'High'])
//     .withMessage('Priority must be Low, Medium, or High'),
//   handleInputErrors,
//   TicketController.createTicket
// );

// // Obtener todos los tickets
// router.get('/', TicketController.getAllTickets);

// export default router;
