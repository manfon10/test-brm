import { Router } from "express";
import { PermissionHandler } from "../../infraestructure/http/middlewares/permission.handler";

import {
  makeGetAllMyInvoicesController,
  makeGetInvoiceByIdController,
  routeAdapter,
  getInvoiceValidator,
} from "../../infraestructure";
import { Permission } from "../../domain";

export class InvoiceRoutes {
  static get routes(): Router {
    const router = Router();

    /**
     * @api {get} /invoices/my Obtener todos mis facturas
     * @apiName GetAllMyInvoices
     * @apiGroup Invoices
     * @apiVersion 1.0.0
     *
     * @apiHeader {String} Authorization Bearer token de acceso.
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR..."
     *     }
     *
     * @apiSuccess {Array} invoices Lista de facturas.
     *
     * @apiSuccessExample {json} Respuesta exitosa:
     *   HTTP/1.1 200 OK
     *   {
     *       "message": "Invoices retrieved successfully",
     *       "statusCode": 200,
     *       "body": [
     *           {
     *               "id": 2,
     *               "invoice_number": "c0170359-76de-42f3-a3e9-7dab570d1b01",
     *               "issue_date": "2025-08-21T22:19:39.583Z",
     *               "total_amount": 1706000,
     *               "order": {
     *                   "id": 6,
     *                   "created_order": "2025-08-21T22:19:39.501Z",
     *                   "items": [
     *                       {
     *                           "id": 7,
     *                           "quantity": 1,
     *                           "unit_price": 1250000,
     *                           "subtotal": 1250000,
     *                           "product": {
     *                               "id": 1,
     *                               "batch_number": "AGB456",
     *                               "name": "Escritorio",
     *                               "price": 1250000,
     *                               "quantity_available": 30,
     *                               "entry_date": "2025-08-21T19:52:13.037Z"
     *                           }
     *                       },
     *                       {
     *                           "id": 8,
     *                           "quantity": 1,
     *                           "unit_price": 456000,
     *                           "subtotal": 456000,
     *                           "product": null
     *                       }
     *                   ],
     *                   "client": {
     *                       "id": 1,
     *                       "names": "Johan Manuel",
     *                       "last_names": "Daza Fonseca",
     *                       "email": "manueldazafon@gmail.com",
     *                       "role": "admin"
     *                   }
     *               }
     *           }
     *       ]
     *   }
     */
    router.get(
      "/my",
      PermissionHandler.validatePermission(Permission.GET_MY_INVOICES),
      routeAdapter(makeGetAllMyInvoicesController())
    );

    /**
     * @api {get} /invoices/:id Obtener factura por numero de factura
     * @apiName GetInvoiceById
     * @apiGroup Invoices
     * @apiParam {Number} id ID único de de la factura (en la URL).
     * @apiVersion 1.0.0
     *
     * @apiHeader {String} Authorization Bearer token de acceso.
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR..."
     *     }
     *
     * @apiSuccess {Array} invoices Lista de facturas.
     *
     * @apiSuccessExample {json} Respuesta exitosa:
     *   HTTP/1.1 200 OK
     *   {
     *       "message": "Invoice retrieved successfully",
     *       "statusCode": 200,
     *       "body": {
     *           "id": 2,
     *           "invoice_number": "c0170359-76de-42f3-a3e9-7dab570d1b01",
     *           "issue_date": "2025-08-21T22:19:39.583Z",
     *           "total_amount": 1706000,
     *           "order": {
     *               "id": 6,
     *               "created_order": "2025-08-21T22:19:39.501Z",
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
     *               "client": {
     *                   "id": 1,
     *                   "names": "Johan Manuel",
     *                   "last_names": "Daza Fonseca",
     *                   "email": "manueldazafon@gmail.com",
     *                   "role": "admin"
     *               }
     *           }
     *   }
     */
    router.get(
      "/:id",
      PermissionHandler.validatePermission(Permission.GET_INVOICE),
      getInvoiceValidator.validate,
      routeAdapter(makeGetInvoiceByIdController())
    );

    return router;
  }
}
