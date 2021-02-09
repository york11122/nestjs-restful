export * from './pipes/validation.pipe'
export * from './interceptors/logging.interceptor'
export * from './interceptors/timeout.interceptor'
export * from './guards/role.guard'
export * from './guards/auth.guard'

export function awaitWrap<T, U = any> (promise: Promise<T>): Promise<[U | null, T | null]> {
    return promise
        .then<[null, T]>((data: T) => [null, data])
        .catch<[U, null]>(err => [err, null])
}
