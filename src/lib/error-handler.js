import AppError from "./app-error.js";

function handleError(error, _req, res, _next) {
  console.error(error);
  if (error instanceof AppError) {
    return res
      .status(error.httpErrorCode)
      .json({ code: error.errorCode, reason: error.message });
  }

  res.status(500).json({
    reason: error.message,
  });
}

export default handleError;
