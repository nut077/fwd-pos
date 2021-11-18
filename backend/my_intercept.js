//http://localhost:8081/api/v2/product?token1=1234
const interceptor1 = (req, res, next) => {
  if (req.query.token1 === "1234") {
    next();
  } else {
    res.end("No token1");
  }
};

//http://localhost:8081/api/v2/product?token1=1234&token2=4321
const interceptor2 = (req, res, next) => {
  if (req.query.token2 === "4321") {
    next();
  } else {
    res.end("No token2");
  }
};

module.exports = {
  interceptor1,
  interceptor2,
};
