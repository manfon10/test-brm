import { Router } from "express";

import {
  loginValidator,
  makeLoginController,
  makeRefreshTokenController,
  makeRegisterUserController,
  refreshTokenValidator,
  registerValidator,
  routeAdapter,
} from "../../infraestructure";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    /**
     * @api {post} /auth/login Inicio de Sesión
     * @apiName LoginUser
     * @apiGroup Auth
     * @apiVersion 1.0.0
     *
     * @apiBody {String} email Correo del usuario.
     * @apiBody {String} password Contraseña del usuario.
     *
     * @apiSuccess {String} access_token Token de acceso.
     * @apiSuccess {String} refresh_token Token de refresco.
     * @apiSuccess {String} user Datos del usuario.
     *
     * @apiSuccessExample {json} Respuesta exitosa:
     *   HTTP/1.1 200 OK
     *   {
     *     "message": "User logged in successfully",
     *     "statusCode": 201,
     *     "body": {
     *        "access_token": "token_de_acceso",
     *        "refresh_token": "token_de_refresco",
     *        "user": {
     *          "id": 1,
     *          "email": "usuario@example.com",
     *          "names": "Usuario Ejemplo",
     *          "last_names": "Apellido Ejemplo"
     *        }
     *      }
     *   }
     *
     * @apiErrorExample {json} Credenciales Incorrectas:
     *   HTTP/1.1 400 Bad Request
     *   {
     *     "name": "BadRequestError",
     *     "error": "Incorrect credentials"
     *   }
     */
    router.post("/login", loginValidator.validate, routeAdapter(makeLoginController()));

    /**
     * @api {post} /auth/refresh Renovación de Token
     * @apiName RefreshToken
     * @apiGroup Auth
     * @apiVersion 1.0.0
     *
     * @apiBody {String} token Token de refresco.
     *
     * @apiSuccess {String} access_token Nuevo token de acceso.
     * @apiSuccess {String} refresh_token Nuevo token de refresco.
     * @apiSuccess {String} user Datos del usuario.
     *
     * @apiSuccessExample {json} Respuesta exitosa:
     *   HTTP/1.1 200 OK
     *   {
     *     "message": "User refreshed token successfully",
     *     "statusCode": 201,
     *     "body": {
     *        "access_token": "token_de_acceso",
     *        "refresh_token": "token_de_refresco",
     *        "user": {
     *          "id": 1,
     *          "email": "usuario@example.com",
     *          "names": "Usuario Ejemplo",
     *          "last_names": "Apellido Ejemplo"
     *        }
     *      }
     *   }
     *
     * @apiErrorExample {json} Token Invalido:
     *   HTTP/1.1 400 Bad Request
     *   {
     *     "name": "BadRequestError",
     *     "error": "Invalid refresh token"
     *   }
     * @apiErrorExample {json} Token no renovado:
     *   HTTP/1.1 401 Unauthorized
     *   {
     *     "name": "UnauthorizedError",
     *     "error": "refresh token not renewed"
     *   }
     */

    router.post(
      "/refresh",
      refreshTokenValidator.validate,
      routeAdapter(makeRefreshTokenController())
    );

    /**
     * @api {post} /auth/register Registro de Usuario
     * @apiName RegisterUser
     * @apiGroup Auth
     * @apiVersion 1.0.0
     *
     * @apiBody {String} email Correo del usuario.
     * @apiBody {String} names Nombres del usuario.
     * @apiBody {String} last_names Apellidos del usuario.
     * @apiBody {String} password Contraseña del usuario.
     * @apiBody {String} role Rol del usuario.
     *
     * @apiSuccess {String} access_token Token de acceso.
     * @apiSuccess {String} refresh_token Token de refresco.
     * @apiSuccess {String} user Datos del usuario.
     *
     * @apiSuccessExample {json} Respuesta exitosa:
     *   HTTP/1.1 200 OK
     *   {
     *     "message": "User created successfully",
     *     "statusCode": 201,
     *     "body": {
     *       "id": 1,
     *       "email": "manueldazaafon@gmail.com",
     *       "names": "Johan Manuel",
     *       "last_names": "Daza Fonseca",
     *       "role": "admin",
     *       "password": "$2b$10$x6u7eXzcD9juQo.Y4fD.B.tzkXN88VE5Kk4r10qFQyzpVPpuOL5yu"
     *     }
     *   }
     *
     * @apiErrorExample {json} Correo electronico existe:
     *   HTTP/1.1 400 Bad Request
     *   {
     *     "name": "BadRequestError",
     *     "error": "Email already exists"
     *   }
     */
    router.post(
      "/register",
      registerValidator.validate,
      routeAdapter(makeRegisterUserController())
    );

    return router;
  }
}
