class ApiError extends Error {
  constructor(description, statusCode) {
    super(description);
    this.statusCode = statusCode;
  }
}

module.exports = ApiError;
