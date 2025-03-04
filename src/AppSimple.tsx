import React, { useEffect, useState } from "react";
import "./App.css";

import { BoxClient, BoxDeveloperTokenAuth } from "box-typescript-sdk-gen";
// import { BoxDeveloperTokenAuth } from "box-typescript-sdk-gen";
import { UsersManager } from "box-typescript-sdk-gen/lib/managers/users.generated";
import { NetworkSession } from "box-typescript-sdk-gen/lib/networking/network.generated";
import { UserFull } from "box-typescript-sdk-gen/lib/schemas/userFull.generated";

const App = () => {
  const [user, setUser] = useState<UserFull | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const auth = new BoxDeveloperTokenAuth({
        token: "token",
      });
      const networkSession = new NetworkSession({});
      const usersManager = new UsersManager({
        auth: auth,
        networkSession: networkSession,
      });
      const response = await usersManager.getUserMe();
      setUser(response);
    };

    fetchData();
  }, []);

  return <div>{user?.name}</div>;
};

export default App;
