// actions
import { getUser } from "@/actions/user";
// cmp
import Information from "./ui/Information";
import EditProfile from "./ui/EditProfile";
import TodosInformation from "./ui/TodosInformation";

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
      <EditProfile />
      <Information {...info} />
      <TodosInformation
        all_todos={all_todos}
        completed_todos={completed_todos}
        uncompleted_todos={uncompleted_todos}
        important_todos={important_todos}
        groups={groups}
      />
    </div>
  );
};

export default SettingsPage;
