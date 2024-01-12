const productsService = require("./products.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function productExists(req, res, next) {
  const product = await productsService.read(req.params.productId);
  if(product){
    res.locals.product = product;
    next();
  }
  next({ status: 404, message: `Product cannot be found.` });
}

async function list(req, res, next) {
  const data = await productsService.list();
  res.json({data});
}

function read(req, res, next){
  const { product: data} = res.locals;
  res.json({data});
}

module.exports = {
  read: [asyncErrorBoundary(productExists), read],
  list: asyncErrorBoundary(list)
};
