const RequestMiddleware = (req, res, next) => {
  const date_time = new Date();
  console.log(`[${date_time}] => ${req.method} ${req.url} ${req.protocol} ${res}`)
  next()
}

export default RequestMiddleware;