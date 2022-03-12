import React, { useEffect, useState } from "react";
import { Guard } from "@authing/react-ui-components";
import "@authing/react-ui-components/lib/index.min.css";
import * as axios from "axios";

const App = () => {
  // const appId = "61c081fa5d1d41dbb9a891a7"; /// dev2
  const appId = "622acbb58a946f7569f6c668";
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
      {user?.userInfoInIdp?.photo ? (
        <img alt="" src={user?.userInfoInIdp?.photo} />
      ) : (
        <Guard
          appId={appId}
          onLogin={onLogin}
          config={{
            // __appHost__: "https://boif0w-demo.dev2.authing-inc.co",
            // host: "https://boif0w-demo.dev2.authing-inc.co",
            __appHost__: "https://cmdkifehihojpjmo-demo.authing.cn",
            host: "https://cmdkifehihojpjmo-demo.authing.cn",
          }}
        />
      )}
    </div>
  );
};

export default App;
