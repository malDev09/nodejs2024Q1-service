export enum ErrorCodes {
  INVALID_UUID_ERROR_MESSAGE = 'Invalid userId. It should be a valid uuid.',
  USER_NOT_FOUND = `User with this id not found`,
  USER_AND_PASSWORD_ARE_REQUIRED = 'Login and password are required.',
  INVALID_LOGIN_OR_PASSWORD = 'Login must be at least 3 characters long and password must be at least 6 characters long.',
  INCORRECT_OLD_PASSWORD = 'Old password is incorrect',
  INVALID_PASSWORD = 'Password is invalid',
  INVALID_DTO = 'Invalid passwords',
}
