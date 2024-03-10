export enum ErrorCodes {
  // ========Common========
  INVALID_UUID_ERROR_MESSAGE = 'Invalid Id. It should be a valid uuid.',
  // =========User=========
  USER_NOT_FOUND = `User with this id not found`,
  USER_AND_PASSWORD_ARE_REQUIRED = 'Login and password are required.',
  INVALID_LOGIN_OR_PASSWORD = 'Login must be at least 3 characters long and password must be at least 6 characters long.',
  INCORRECT_OLD_PASSWORD = 'Old password is incorrect',
  INVALID_PASSWORD = 'Password is invalid',
  INVALID_DTO = 'Invalid passwords',
  // =========Track=========
  TRACK_NOT_FOUND = 'Track with this id not found',
  NAME_AND_DURATION_ARE_REQUIRED = 'Name and duration are required.',
  INVALID_TYPES = 'Track should be a string, duration should be a number',
  // =========Artist=========
  ARTIST_NOT_FOUND = 'Artist with this id not found',
  NAME_AND_GRAMMY_ARE_REQUIRED = 'Name and grammy are required.',
  INVALID_ARTIST_TYPES = 'Name should be a string, grammy should be a boolean type',
  // =========Album=========
  ALBUM_NOT_FOUND = 'Album with this id not found',
  NAME_AND_YEAR_ARE_REQUIRED = 'Name and year are required.',
  INVALID_ALBUM_TYPES = 'Name should be a string, year should be a number ',
}
