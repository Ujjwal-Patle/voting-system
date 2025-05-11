import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
export function verifyToken(request, response, next) {
    const authHeader = request.get('Authorization');

    if (authHeader) {
        const token = authHeader.split(" ")[1]; // Bearer <token>
        jwt.verify(token, "secret123", (error, payload) => {
            if (error) {
                return response.status(StatusCodes.UNAUTHORIZED).send({ message: 'Token is invalid' });
            } else {
                console.log(payload);
                request.user = { id: payload.userId };
                next();
            }
        });
    } else {
        return response.status(StatusCodes.UNAUTHORIZED).send({ message: 'Token is missing' });
    }
}
