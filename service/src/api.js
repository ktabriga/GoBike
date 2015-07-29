export default {
  sendResponse
};

function sendResponse(fn) {
  return (req, res, next) => {
    fn(req, res)
      .then(res.json.bind(res), next);
  }
}
