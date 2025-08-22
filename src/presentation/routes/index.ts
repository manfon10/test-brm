import { Router } from "express";

import { OrderRoutes } from "./order.routes";
import { AuthRoutes } from "./auth.routes";
import { ProductRoutes } from "./product.routes";
import { InvoiceRoutes } from "./invoice.routes";

import { authAdapter } from "../../infraestructure";

export class AppRoutes {
  public static get routes(): Router {
    const router = Router();

    router.use("/auth", AuthRoutes.routes);

    router.use(authAdapter.verifyToken);

    router.use("/orders", OrderRoutes.routes);
    router.use("/products", ProductRoutes.routes);
    router.use("/invoices", InvoiceRoutes.routes);

    return router;
  }
}
