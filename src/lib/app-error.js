class AppError extends Error {
  constructor(errorCode, httpErrorCode, description) {
    super(description);
    this.errorCode = errorCode;
    this.httpErrorCode = httpErrorCode;
  }

  static HTTP_ERRORS = {
    badRequest: 400,
    notFound: 404,
    conflict: 409,
  };
}

export default AppError