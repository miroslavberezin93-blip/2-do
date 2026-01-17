export class UnauthorizedError extends Error {}
export class InvalidCredentialsError extends Error {}
export class ConflictError extends Error {}

export class ApiError extends Error {
    constructor(
        status: number,
        message: string
    ) {
        super(message);
        this.status = status;
    }
    public status: number;
}