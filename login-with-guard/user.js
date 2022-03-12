const { ManagementClient } = require("authing-js-sdk");
// const managementClient = new ManagementClient({
//   userPoolId: "61c081f82984512b2602754b",
//   secret: "2d485ea787267bc879c7e6fe91de88d5",
//   host: "https://core.dev2.authing-inc.co",
// });
const managementClient = new ManagementClient({
  userPoolId: "622acbb4bc045dad5d2ebc94",
  secret: "f1f311beccbf0285c893bd3cd5595617",
  host: "https://core.authing.cn",
});

module.exports.getUserDetail = async (id) => {
  return managementClient.users.detail(id);
};
