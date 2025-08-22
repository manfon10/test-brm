import { Permission } from "./permission.enum";

export type Role = "user" | "admin";

export const permissionsByRole: Record<Role, Permission[]> = {
  user: [
    Permission.GET_MY_INVOICES,
    Permission.GET_MY_ORDERS,
    Permission.CREATE_ORDER,
    Permission.GET_INVOICE,
  ],
  admin: [
    Permission.CREATE_PRODUCT,
    Permission.DELETE_PRODUCT,
    Permission.GET_PRODUCTS,
    Permission.GET_MY_PRODUCTS,
    Permission.UPDATE_PRODUCT,
    Permission.GET_ALL_ORDERS,
  ],
};
