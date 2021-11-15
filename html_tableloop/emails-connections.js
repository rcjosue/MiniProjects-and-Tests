const emails = require("./emails");
const nunjucks = require("nunjucks");

exports.buildNunjucksTest = ({ list1 }) => {
  const body = nunjucks.renderString(emails.nunjucksTest.body, { list1 });
  return body;
};
