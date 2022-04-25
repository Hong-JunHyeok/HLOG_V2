export type ResponseType<T = any> = {
    code: number;
    payload: T;
    message: string;
}
