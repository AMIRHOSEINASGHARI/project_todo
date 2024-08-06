import { getUser } from "@/actions/user";
import React from "react";

const SettingsPage = async () => {
  const data = await getUser();

  console.log(`SettingsPage: data is ${data}`);
  return <div>SettingsPage</div>;
};

export default SettingsPage;
