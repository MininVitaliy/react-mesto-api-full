const allowedCors = [
  "https://praktikum.tk",
  "http://praktikum.tk",
  "https://mesto.russia.student.nomoredomains.club/",
  "http://mesto.russia.student.nomoredomains.club/",
];

const handlerCors = (req, res, next) => {
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers["access-control-request-headers"];

  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);
    return res.end();
  }
  next();
};

module.exports = handlerCors;