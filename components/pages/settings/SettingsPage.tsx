// actions
import { getUser } from "@/actions/user";
// cmp
import Information from "./ui/Information";
import EditProfile from "./ui/EditProfile";

const SettingsPage = async () => {
  const data = await getUser();

  const all_todos = data?.data?.all_todos;
  const completed_todos = data?.data?.completed_todos;
  const uncompleted_todos = data?.data?.uncompleted_todos;
  const important_todos = data?.data?.important_todos;
  const groups = data?.data?.groups;
  const info = data?.data?.info;

  return (
    <div className="space-y-5">
      <Information {...info} />
      <EditProfile />
    </div>
  );
};

export default SettingsPage;
