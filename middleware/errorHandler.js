
const notFound = (req,res,next) => {
    const error = new Error(`Not Found: ${req.originalUrl}`);
    res.status(404);
    next(error);
}

//if the request direct to notFound middleware will generate error and move to errorHandler middleware
const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode);
   // res.json({status: "fail" , message: err?.message , stack: err?.stack});
   res.json({status: "fail" , message: err?.message});

}

module.exports = {notFound,errorHandler};
//module.exports = {notFound};