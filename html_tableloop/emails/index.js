const fs = require("fs");
const path = require("path");

getTemplate = (name) => {
  return fs.readFileSync(path.join(__dirname, name), "utf8");
};
module.exports = {
  nunjucksTest: {
    body: getTemplate("0-nunjucks-test.html"),
  },
};
