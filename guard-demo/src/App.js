import React, { useEffect, useState } from "react";
import { Guard } from "@authing/react-ui-components";
import "@authing/react-ui-components/lib/index.min.css";
import * as axios from "axios";

const App = () => {
  const appId = "622acbb58a946f7569f6c668";
  const [user, setUser] = useState(null);

  const onLogin = (userInfo) => {
    console.log(userInfo);
    axios.get(`/users/${userInfo.id}`).then((u) => {
      // console.log(u);
      setUser(u);
    });
  };
  return (
    <div>
      {user ? (
        JSON.stringify(user)
      ) : (
        <Guard
          appId={appId}
          onLogin={onLogin}
          config={{
            __appHost__: "https://cmdkifehihojpjmo-demo.pre.authing.cn",
            host: "https://cmdkifehihojpjmo-demo.pre.authing.cn",
          }}
        />
      )}
    </div>
  );
};

export default App;
