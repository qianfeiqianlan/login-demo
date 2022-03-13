const { ManagementClient } = require("authing-js-sdk");
const managementClient = new ManagementClient({
  userPoolId: "你的用户池 id",
  secret: "你的用户池密钥",
  host: "https://core.authing.cn",
});

module.exports.getUserDetail = async (id) => {
  try {
    return managementClient.users.detail(id, { withCustomData: true });
  } catch (error) {
    return error;
  }
};

module.exports.convertCorrectUserInfo = (user, currentIdentityId) => {
  const currentIdentity = user.identities?.find(
    (i) => i.id == currentIdentityId
  );
  const basicUser = { phone: user.phone, email: user.email };

  if (currentIdentity?.provider === "oauth2") {
    // const name = user.customData.giteeName;
    // const username = user.customData.giteeLogin;
    // const avatar = user.customData.giteeAvatar;
    const avatar = currentIdentity.userInfoInIdp.photo;
    const name = currentIdentity.userInfoInIdp.middleName;
    const username = currentIdentity.userInfoInIdp.familyName;
    return { name, username, avatar, ...basicUser };
  }

  if (currentIdentity?.provider === "github") {
    const name = currentIdentity.userInfoInIdp.nickname;
    const username = currentIdentity.userInfoInIdp.username;
    const avatar = currentIdentity.userInfoInIdp.photo;
    return { name, username, avatar, ...basicUser };
  }

  if(currentIdentity?.provider === "wechat") {
    const name = currentIdentity.userInfoInIdp.nickname;
    const username = user.username;
    const avatar = currentIdentity.userInfoInIdp.photo;
    return { name, username, avatar, ...basicUser };
  }

  const name = user.nickname || user.name;
  const username = user.username;
  const avatar = currentIdentity.photo;
  return { name, username, avatar, ...basicUser };
};
