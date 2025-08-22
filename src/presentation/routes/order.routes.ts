import { Router } from "express";

import {
  makeCreateOrderController,
  makeGetAllMyOrdersController,
  makeGetAllOrdersController,
  routeAdapter,
  createOrderValidator,
  PermissionHandler,
} from "../../infraestructure";

import { Permission } from "../../domain";

export class OrderRoutes {
  static get routes(): Router {
    const router = Router();

    /**
     * @api {get} /orders/my Obtener todos mis pedidos
     * @apiName GetAllMyOrders
     * @apiGroup Orders
     * @apiVersion 1.0.0
     *
     * @apiHeader {String} Authorization Bearer token de acceso.
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR..."
     *     }
     *
     * @apiSuccess {Array} orders Lista de pedidos.
     *
     * @apiSuccessExample {json} Respuesta exitosa:
     *   HTTP/1.1 200 OK
     *   {
     *       "message": "Orders retrieved successfully",
     *       "statusCode": 200,
     *       "body": [
     *           {
     *               "id": 6,
     *               "total_price": 1706000,
     *               "client": {
     *                   "id": 1,
     *                   "names": "Johan Manuel",
     *                   "last_names": "Daza Fonseca",
     *                   "email": "manueldazafon@gmail.com",
     *                   "role": "admin"
     *               },
     *               "items": [
     *                   {
     *                       "id": 7,
     *                       "quantity": 1,
     *                       "unit_price": 1250000,
     *                       "subtotal": 1250000,
     *                       "product": {
     *                           "id": 1,
     *                           "batch_number": "AGB456",
     *                           "name": "Escritorio",
     *                           "price": 1250000,
     *                           "quantity_available": 30,
     *                           "entry_date": "2025-08-21T19:52:13.037Z"
     *                       }
     *                   },
     *                   {
     *                       "id": 8,
     *                       "quantity": 1,
     *                       "unit_price": 456000,
     *                       "subtotal": 456000,
     *                       "product": null
     *                   }
     *               ],
     *               "invoice": {
     *                   "id": 2,
     *                   "invoice_number": "c0170359-76de-42f3-a3e9-7dab570d1b01",
     *                   "issue_date": "2025-08-21T22:19:39.583Z",
     *                   "total_amount": 1706000
     *               }
     *           }
     *       ]
     *   }
     */
    router.get(
      "/my",
      PermissionHandler.validatePermission(Permission.GET_MY_ORDERS),
      routeAdapter(makeGetAllMyOrdersController())
    );

    /**
     * @api {get} /orders Obtener todos los pedidos
     * @apiName GetAllOrders
     * @apiGroup Orders
     * @apiVersion 1.0.0
     *
     * @apiHeader {String} Authorization Bearer token de acceso.
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR..."
     *     }
     *
     * @apiSuccess {Array} orders Lista de pedidos.
     *
     * @apiSuccessExample {json} Respuesta exitosa:
     *   HTTP/1.1 200 OK
     *   {
     *       "message": "Orders retrieved successfully",
     *       "statusCode": 200,
     *       "body": [
     *           {
     *               "id": 6,
     *               "total_price": 1706000,
     *               "client": {
     *                   "id": 1,
     *                   "names": "Johan Manuel",
     *                   "last_names": "Daza Fonseca",
     *                   "email": "manueldazafon@gmail.com",
     *                   "role": "admin"
     *               },
     *               "items": [
     *                   {
     *                       "id": 7,
     *                       "quantity": 1,
     *                       "unit_price": 1250000,
     *                       "subtotal": 1250000,
     *                       "product": {
     *                           "id": 1,
     *                           "batch_number": "AGB456",
     *                           "name": "Escritorio",
     *                           "price": 1250000,
     *                           "quantity_available": 30,
     *                           "entry_date": "2025-08-21T19:52:13.037Z"
     *                       }
     *                   },
     *                   {
     *                       "id": 8,
     *                       "quantity": 1,
     *                       "unit_price": 456000,
     *                       "subtotal": 456000,
     *                       "product": null
     *                   }
     *               ],
     *               "invoice": {
     *                   "id": 2,
     *                   "invoice_number": "c0170359-76de-42f3-a3e9-7dab570d1b01",
     *                   "issue_date": "2025-08-21T22:19:39.583Z",
     *                   "total_amount": 1706000
     *               }
     *           }
     *       ]
     *   }
     */
    router.get(
      "/",
      PermissionHandler.validatePermission(Permission.GET_ALL_ORDERS),
      routeAdapter(makeGetAllOrdersController())
    );

    /**
     * @api {post} /orders Registro de Orden
     * @apiName RegisterOrder
     * @apiGroup Orders
     * @apiVersion 1.0.0
     *
     * @apiHeader {String} Authorization Bearer token de acceso.
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR..."
     *     }
     *
     * @apiBody {Object[]} items Lista de productos en la orden.
     * @apiBody {Number} items.product_id ID del producto.
     * @apiBody {Number} items.quantity Cantidad solicitada.
     *
     * @apiSuccess {Object} order Detalles de la orden creada.
     *
     * @apiSuccessExample {json} Respuesta exitosa:
     *   HTTP/1.1 201 Created
     *   {
     *       "message": "Order created successfully",
     *       "statusCode": 201,
     *       "body": {
     *           "id": 8,
     *           "total_price": 2500000,
     *           "client": {
     *               "id": 1,
     *               "names": "Johan Manuel",
     *               "last_names": "Daza Fonseca",
     *               "email": "manueldazafon@gmail.com",
     *               "role": "admin"
     *           },
     *           "items": [
     *               {
     *                   "id": 11,
     *                   "quantity": 2,
     *                   "unit_price": 1250000,
     *                   "subtotal": 2500000,
     *                   "product": {
     *                       "id": 1,
     *                       "batch_number": "AGB456",
     *                       "name": "Escritorio",
     *                       "price": 1250000,
     *                       "quantity_available": 30,
     *                       "entry_date": "2025-08-21T19:52:13.037Z"
     *                   }
     *               }
     *           ]
     *       }
     *   }
     */
    router.post(
      "/",
      PermissionHandler.validatePermission(Permission.CREATE_ORDER),
      createOrderValidator.validate,
      routeAdapter(makeCreateOrderController())
    );

    return router;
  }
}
