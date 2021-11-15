const emails = require("./emails");
const nunjucks = require("nunjucks");

exports.buildNunjucksTest = ({ var1 }) => {
  const body = nunjucks.renderString(emails.nunjucksTest.body, { var1 });
  return body;
};
