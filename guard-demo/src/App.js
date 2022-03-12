import React, { useEffect, useState } from "react";
import { Guard } from "@authing/react-ui-components";
import "@authing/react-ui-components/lib/index.min.css";
import * as axios from "axios";

const App = () => {
  const appId = "你的应用 id"; // euler
  const [user, setUser] = useState(null);

  const onLogin = (userInfo) => {
    // 风险点

    console.log(userInfo);
    axios
      .get(`/users/${userInfo.id}?identityId=${userInfo.federationIdentityId}`)
      .then((u) => {
        console.log(u);
        setUser(u.data);
      });
  };
  return (
    <div>
      {user ? (
        <div>
          <div>当前登录用户</div>
          <div>用户名：{user.username}, </div>
          <div>姓名：{user.name}, </div>
          <div>
            <div>头像：</div>
            <img alt="" src={user?.avatar} />{" "}
          </div>
          <div>原始信息：{JSON.stringify(user)}</div>
        </div>
      ) : (
        <Guard
          appId={appId}
          onLogin={onLogin}
          config={{
            // __appHost__: "https://boif0w-demo.dev2.authing-inc.co",
            // host: "https://boif0w-demo.dev2.authing-inc.co",
            // __appHost__: "https://cmdkifehihojpjmo-demo.pre.authing.cn",
            // host: "https://cmdkifehihojpjmo-demo.pre.authing.cn",
            __appHost__: "https://openeuler.authing.cn",
            host: "https://openeuler.authing.cn",
            // __appHost__: "https://cmdkifehihojpjmo-demo.authing.cn",
            // host: "https://cmdkifehihojpjmo-demo.authing.cn",
          }}
        />
      )}
    </div>
  );
};

export default App;
