// actions
import { getUser } from "@/actions/user";
import Information from "./ui/Information";
import EditProfile from "./ui/EditProfile";

const SettingsPage = async () => {
  const data = await getUser();

  const todos = data?.user?.todos;
  const groups = data?.user?.groups;
  const info = {
    username: data?.user?.username,
    name: data?.user?.name,
    createdAt: data?.user?.createdAt,
    updatedAt: data?.user?.updatedAt,
  };

  return (
    <div className="space-y-5">
      <EditProfile />
      <Information {...info} />
    </div>
  );
};

export default SettingsPage;
