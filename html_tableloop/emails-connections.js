const emails = require("./emails");
const nunjucks = require("nunjucks");

exports.buildNunjucksTest = ({ coach, kadetList }) => {
  const usernameReceiver = coach;
  const coachEmail = "hello@kk.com";

  const body = nunjucks.renderString(emails.nudgeTest.body, {
    usernameReceiver,
    kadetList,
  });
  return body;
};

exports.buildKadetNudgeEmail = ({ kadet, coachList }) => {
  const usernameSender = kadet;
  const body = nunjucks.renderString(emails.kadetNudgeTest.body, {
    usernameSender,
    coachList,
  });
  return body;
};
