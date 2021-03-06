export const HTTP_UNAUTHORIZED_TEXT_DEFAULT = 'Unauthorized';
export const HTTP_INTERNAL_SERVER_ERROR_TEXT_DEFAULT = 'Internal server error';
export const HTTP_UNAUTHENTICATED_TEXT_DEFAULT = 'Unauthenticated';
export const VALIDATION_ERROR_DEFAULT = 'validation error';

export enum ERROR_CODE {
  FIELD_VALIDATE_ERROR = 1001,
  UNAUTHORIZED = 1002,
  UNAUTHENTICATED = 1003,
  LOGIN_FAILED = 1004,
  USER_ALREADY_EXISTED = 1005,
  EMAIL_ALREADY_EXISTED = 1006,
  EMAIL_NONE_EXISTED = 1007,
  ALREADY_VERIFED = 1008,
  USER_NOT_EXIST = 1009,
  EMAIL_EXPIRED = 1010,
  SMS_NONE_EXISTED = 1011,
  SMS_EXPIRED = 1012,
  SMS_VERIFY_FAILED = 1014,
  CART_NOT_EXISTED = 1015,
  PRODUCT_NOT_EXISTED = 1016,
  GROUPBUY_NOT_EXISTED = 1017,
}
