import React, { useEffect, useState } from "react";
import { Guard } from "@authing/react-ui-components";
import "@authing/react-ui-components/lib/index.min.css";
import * as axios from "axios";

const App = () => {
  const appId = "61cdab124e0aea77b701480a";
  const [user, setUser] = useState(null);

  const onLogin = (userInfo) => {
    console.log(userInfo);
    axios.get(`/users/${userInfo.id}`).then((u) => {
      console.log(u);
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
            __appHost__: "https://m3apmg-demo.yyy.mereith.com:9999",
            host: "https://m3apmg-demo.yyy.mereith.com:9999",
          }}
        />
      )}
    </div>
  );
};

export default App;
