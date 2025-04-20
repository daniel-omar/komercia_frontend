export interface ResponseData<T> {
    data: T;
    errors?: string | null;
    message?: string[] | string;
    status?: number;
}