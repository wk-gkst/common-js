export const describeError = (error: any) => {
  return {
    code: error && error.code ? String(error.code) : "UnknownError",
    message: error && error.message ? String(error.message) : "<EMPTY MESSAGE>",
    reason: error && error.reason ? error.reason : "",
  };
};
