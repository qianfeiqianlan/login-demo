const { ManagementClient } = require("authing-js-sdk");
const managementClient = new ManagementClient({
  userPoolId: "61cdab1178a00d7849116d17",
  secret: "3185b6eb99c63dbff28c07bbc58f1c22",
  host: "https://core.yyy.mereith.com:9999",
});

module.exports.getUserDetail = async (id) => {
  return managementClient.users.detail(id);
};
