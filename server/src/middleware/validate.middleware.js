const validate = (schema) => async (req, res, next) => {
  try {
    const parsedBody = await schema.parseAsync(req.body);
    req.body = parsedBody;
    next(); // Proceed if validation succeeds
  } catch (error) {
    next(error)
  }
};

export default validate;