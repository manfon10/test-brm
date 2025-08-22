import { Router } from "express";

import {
  deleteProductValidator,
  makeCreateProductController,
  makeDeleteProductByIdController,
  makeGetAllProductsController,
  makeGetProductByIdController,
  makeUpdateProductByIdController,
  routeAdapter,
  createProductValidator,
  updateProductValidator,
  getProductValidator,
  PermissionHandler,
} from "../../infraestructure";
import { Permission } from "../../domain";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    /**
     * @api {get} /products Obtener todos los productos
     * @apiName GetAllProducts
     * @apiGroup Products
     * @apiVersion 1.0.0
     *
     * @apiHeader {String} Authorization Bearer token de acceso.
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR..."
     *     }
     *
     * @apiSuccess {Array} products Lista de productos.
     *
     * @apiSuccessExample {json} Respuesta exitosa:
     *   HTTP/1.1 200 OK
     *   {
     *     "message": "Products retrieved successfully",
     *     "statusCode": 200,
     *     "body": [
     *       {
     *         "id": 1,
     *         "batch_number": "AGB456",
     *         "name": "Escritorio",
     *         "price": 1250000,
     *         "quantity_available": 30,
     *         "entry_date": "2025-08-21T19:52:13.037Z"
     *       }
     *     ]
     *   }
     */
    router.get(
      "/",
      PermissionHandler.validatePermission(Permission.GET_PRODUCTS),
      routeAdapter(makeGetAllProductsController())
    );

    /**
     * @api {get} /products/:id Obtener un producto por id
     * @apiName GetProductById
     * @apiGroup Products
     * @apiParam {Number} id ID único del producto (en la URL).
     * @apiVersion 1.0.0
     *
     * @apiHeader {String} Authorization Bearer token de acceso.
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR..."
     *     }
     *
     * @apiSuccess {Object} product Detalles del producto.
     *
     * @apiSuccessExample {json} Respuesta exitosa:
     *   HTTP/1.1 200 OK
     *   {
     *     "message": "Product retrieved successfully",
     *     "statusCode": 200,
     *     "body": {
     *       "id": 1,
     *       "batch_number": "AGB456",
     *       "name": "Escritorio",
     *       "price": 1250000,
     *       "quantity_available": 30,
     *       "entry_date": "2025-08-21T19:52:13.037Z"
     *     }
     *   }
     * @apiErrorExample {json} Producto no encontrado:
     *   HTTP/1.1 400 Bad Request
     *   {
     *     "name": "BadRequestError",
     *     "error": "Product not found"
     *   }
     */
    router.get(
      "/:id",
      PermissionHandler.validatePermission(Permission.GET_PRODUCT),
      getProductValidator.validate,
      routeAdapter(makeGetProductByIdController())
    );

    /**
     * @api {delete} /products/:id Elimina un producto por id
     * @apiName DeleteProductById
     * @apiGroup Products
     * @apiParam {Number} id ID único del producto (en la URL).
     * @apiVersion 1.0.0
     *
     * @apiHeader {String} Authorization Bearer token de acceso.
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR..."
     *     }
     *
     * @apiSuccess {Object} product Respuesta exitosa.
     *
     * @apiSuccessExample {json} Respuesta exitosa:
     *   HTTP/1.1 200 OK
     *   {
     *     "message": "Product deleted successfully",
     *     "statusCode": 200,
     *   }
     * @apiErrorExample {json} Producto no encontrado:
     *   HTTP/1.1 400 Bad Request
     *   {
     *     "name": "BadRequestError",
     *     "error": "Product not found"
     *   }
     */
    router.delete(
      "/:id",
      PermissionHandler.validatePermission(Permission.DELETE_PRODUCT),
      deleteProductValidator.validate,
      routeAdapter(makeDeleteProductByIdController())
    );

    /**
     * @api {patch} /products/:id Actualizar un Producto
     * @apiName UpdateProduct
     * @apiGroup Products
     * @apiParam {Number} id ID único del producto (en la URL).
     * @apiVersion 1.0.0
     *
     * @apiHeader {String} Authorization Bearer token de acceso.
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR..."
     *     }
     *
     * @apiBody {String} batch_number Número de lote.
     * @apiBody {String} name Nombre del producto.
     * @apiBody {String} price Precio del producto.
     * @apiBody {String} quantity_available Cantidad disponible del producto.
     *
     * @apiSuccess {Object} product Detalles del producto actualizado.
     *
     * @apiSuccessExample {json} Respuesta exitosa:
     *   HTTP/1.1 200 OK
     *   {
     *     "message": "Product updated successfully",
     *     "statusCode": 201,
     *     "body": {
     *       "id": 4,
     *       "batch_number": "AGBa486",
     *       "name": "Silla",
     *       "price": 456000,
     *       "quantity_available": 14,
     *       "entry_date": "2025-08-21T23:36:08.730Z"
     *     }
     *   }
     *
     * @apiErrorExample {json} Número de lote existe:
     *   HTTP/1.1 400 Bad Request
     *   {
     *     "name": "BadRequestError",
     *     "error": "Batch number already exists"
     *   }
     */
    router.patch(
      "/:id",
      PermissionHandler.validatePermission(Permission.UPDATE_PRODUCT),
      updateProductValidator.validate,
      routeAdapter(makeUpdateProductByIdController())
    );

    /**
     * @api {post} /products Registro de Producto
     * @apiName RegisterProduct
     * @apiGroup Products
     * @apiVersion 1.0.0
     *
     * @apiHeader {String} Authorization Bearer token de acceso.
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR..."
     *     }
     *
     * @apiBody {String} batch_number Número de lote.
     * @apiBody {String} name Nombre del producto.
     * @apiBody {String} price Precio del producto.
     * @apiBody {String} quantity_available Cantidad disponible del producto.
     *
     * @apiSuccess {Object} product Detalles del producto creado.
     *
     * @apiSuccessExample {json} Respuesta exitosa:
     *   HTTP/1.1 201 Created
     *   {
     *     "message": "Product created successfully",
     *     "statusCode": 201,
     *     "body": {
     *       "id": 4,
     *       "batch_number": "AGBa486",
     *       "name": "Silla",
     *       "price": 456000,
     *       "quantity_available": 14,
     *       "entry_date": "2025-08-21T23:36:08.730Z"
     *     }
     *   }
     *
     * @apiErrorExample {json} Número de lote existe:
     *   HTTP/1.1 400 Bad Request
     *   {
     *     "name": "BadRequestError",
     *     "error": "Batch number already exists"
     *   }
     */
    router.post(
      "/",
      PermissionHandler.validatePermission(Permission.CREATE_PRODUCT),
      createProductValidator.validate,
      routeAdapter(makeCreateProductController())
    );

    return router;
  }
}
