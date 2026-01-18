export class UnauthorizedError extends Error {}
export class InvalidCredentialsError extends Error {}
export class ConflictError extends Error {}

export class ApiError extends Error {
    constructor(
        message: string,
        status: number
    ) {
        super(message);
        this.status = status;
    }
    public status: number;
}