
module.exports = function asyncMiddleware(handler) {       // just to remove Try_Catch docs
    return async (req, res, next) => {
      try {
        await handler(req, res);
      }
      catch(ex) {
        next(ex);
      }
    };
}