const http = require("http");
const nunjucks = require("nunjucks");
const { stringify } = require("querystring");
const {
  buildNunjucksTest,
  buildKadetNudgeEmail,
} = require("./emails-connections");

const hostname = "127.0.0.1";
const port = 3000;

const host = "https";
const baseLink = `${host}/api/actions/connect`;
const availabilityLink = `${host}/my/schedule`;
const usernameReceiver = "coach";
const usernameSender = "kadet";
const secretKey = "secret";
const messageSender =
  "pls accpt me pls accpt me pls accpt me pls accpt me pls accpt me pls accpt me pls accpt me pls accpt me pls accpt me pls accpt me pls accpt me pls accpt me";

const endpoint = `${baseLink}/coachApproval?usernameReceiver=${usernameReceiver}&usernameSender=${usernameSender}&secretKey=${secretKey}`;
const approvalLink = `${endpoint}&status=approvedByCoach`;
const declineLink = `${endpoint}&status=declinedByCoach`;
const coach = "coach";
const kadet = "kadet";

const kadetList = [];

for (var i = 1; i < 5; i++) {
  kadetList.push({
    usernameSender: "kadet" + i,
    messageSender,
    secretKey: "secret" + i,
    profileSender: "name",
    baseLink,
    endpoint,
    approvalLink,
    declineLink,
    availabilityLink,
  });
}

const coachLink = `${host}/user/${usernameReceiver}`;

const coachList = [];

for (var i = 1; i < 5; i++) {
  coachList.push({
    usernameReceiver: "coach" + i,
    coachLink,
  });
}

const htmlString = buildNunjucksTest({
  coach,
  kadetList,
});

const htmlString1 = buildKadetNudgeEmail({
  kadet,
  coachList,
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(htmlString1);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
