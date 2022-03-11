const { ManagementClient } = require("authing-js-sdk");
const managementClient = new ManagementClient({
  userPoolId: "622acbb4bc045dad5d2ebc94",
  secret: "f1f311beccbf0285c893bd3cd5595617",
  host: "https://core.pre.authing.cn",
});

module.exports.getUserDetail = async (id) => {
  return managementClient.users.detail(id);
};
