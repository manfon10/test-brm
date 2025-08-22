import { Response, NextFunction } from "express";

import { Permission, permissionsByRole } from "../../../domain";
import { AppError, HttpRequest } from "../../../shared";

export class PermissionHandler {
  static validatePermission = (permission: Permission) => {
    return (req: HttpRequest, _res: Response, next: NextFunction) => {
      const { role } = req.user!;

      if (role) {
        const permissions = permissionsByRole[role as keyof typeof permissionsByRole];

        if (permissions.includes(Permission.ALL_PERMISSIONS) || permissions.includes(permission)) {
          return next();
        }

        next(AppError.unauthorized("You don't have access to this resource."));
      }
    };
  };
}
