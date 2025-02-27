import { Router } from 'express';
import {body, param} from 'express-validator';
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvalability, updatedProeduct } from './handlers/product';
import { handleInputErrors } from './middleware';
import Product from './models/Product.model';

const router = Router()
/**
 * @swagger
 * components:
 *    schemas:
 *      Product:
 *        type: object
 *        properties:
 *          id:
 *              type: integer
 *              description: The Product ID
 *              example: 1
 *          name:
 *              type: string
 *              description: The Product name
 *              example: Monitor Curvo de 50 pulgadas
 *          price:
 *              type: number
 *              description: The Product price
 *              example: 300
 *          availability:
 *              type: boolean
 *              description: The Product availability
 *              example: true
 * 
 * 
 */   

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a lis of products
 *          responses: 
 *              200:
 *                  description: Successful response
 *                  content:
 *                    application/json:
 *                      schema:
 *                        type: array
 *                        items:
 *                          $ref: '#/components/schemas/Product'
 * 
 */

//Routing
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by Id
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product ti retrive
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad Request - Invalid ID
 * 
 */

router.get('/:id', 
  param('id').isInt().withMessage('Id no válido'),
  handleInputErrors,
  getProductsById
)

/**
 * @swagger
 * /api/products:
 *    post:
 *        summary: Creates a new product
 *        tags:
 *            - Products
 *        description: Returns a new record in the database
 *        requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                        name:
 *                            type: string
 *                            example: "Monitor Curvo 49 pulgadas"
 *                        price:
 *                            type: number
 *                            example: 399
 *        responses:
 *            201:
 *                description: Successful response
 *                content:
 *                    application/json:
 *                        schema:
 *                        $ref: '#/components/schemas/Product'
 *            400:
 *                description: Bad request - invalid input data
 */
router.post('/', 
  
  //validación
  body('name')
  .notEmpty().withMessage('El nombre del producto no puede ir vacío'),
  body('price')
    .isNumeric().withMessage('Valor no válido ')
    .notEmpty().withMessage('El precio del producto no puede ir vacío')
    .custom(value=>value>0).withMessage('Precio no válido'),
  handleInputErrors,
  createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *        - Products
 *      desription: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrive
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo de 49 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                               type: boolean
 *                               example: true
 *      responses:
 *        200:
 *          description: Successful response
 *          content:
 *              application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/Product'
 *        400:
 *          description: Bad request - Invalid ID or Invalid data
 *        404:
 *          description: Product Not found
 *          
 * 
 */

router.put('/:id', 
  param('id').isInt().withMessage('Id no válido'),
  body('name')
  .notEmpty().withMessage('El nombre del producto no puede ir vacío'),
  body('price')
    .isNumeric().withMessage('Valor no válido ')
    .notEmpty().withMessage('El nombre del producto no puede ir vacío')
    .custom(value=>value>0).withMessage('Precio no válido'),
  body('availability')
  .isBoolean().withMessage('Valor para disponibilidad no válido'),
  handleInputErrors,  
  updatedProeduct
)

/**
 * @swagger
 * /api/products/{id}:
 *    patch:
 *        summary: Updates a product with user input
 *        tags:
 *            - Products
 *        description: Returns the updated product
 *        parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrieve
 *            required: true
 *            schema:
 *                type: integer
 *        responses:
 *            200:
 *                description: Successful response
 *                content:
 *                    application/json:
 *                        schema:
 *                        $ref: '#/components/schemas/Product'
 *            400:
 *                description: Bad request - Invalid ID
 *            404:
 *                description: Product Not found
 *          
 * 
 */

router.patch('/:id', 
  param('id').isInt().withMessage('Id no válido'),
  handleInputErrors,
  updateAvalability
)


/**
 * @swagger
 * /api/products/{id}:
 *    delete:
 *        summary: Delete a product by a given ID
 *        tags: 
 *            - Products
 *        description: Returns a confirmation message
 *        parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *        responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: 'Producto eliminado'
 *              400:
 *                  description: Bad request - Invalid ID
 *              404:
 *                  description: Product Not found
 *        
 * 
 */
router.delete('/:id', 
  param('id').isInt().withMessage('Id no válido'),
  handleInputErrors,
  deleteProduct
)

export default router