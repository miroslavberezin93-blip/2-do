import { isAxiosError } from "axios";
import { ApiError, ConflictError, InvalidCredentialsError } from "../../errors/errors";

function handleAuthAxiosError(error: unknown): never {
  if (!isAxiosError(error)) throw error;

  switch (error.response?.status) {
    case 400:
      throw new InvalidCredentialsError(error.response?.data);
    case 409:
      throw new ConflictError(error.response?.data);
    default:
      throw new ApiError(error.response?.data, error.response?.status ?? 500);
  }
}

export function serviceWrapper<T extends Record<string, (...args: any[]) => Promise<any>>>(
    service: T): T {
    const wrapped = {} as T;

    for(const key in service) {
        wrapped[key] = (async (...args: any[]) => {
            try {
                return await service[key](...args);
            } catch(error) {
                handleAuthAxiosError(error);
            }
        }) as T[typeof key]
    }

    return wrapped
}