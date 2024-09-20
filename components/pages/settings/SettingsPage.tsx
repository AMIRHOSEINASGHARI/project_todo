// actions
import { getUser } from "@/actions/user";
// cmp
import Information from "./ui/Information";
import EditProfile from "./ui/EditProfile";
import TodosInformation from "./ui/TodosInformation";
import AllTodos from "./ui/AllTodos";
import SignoutButton from "@/components/shared/SignoutButton";

const SettingsPage = async () => {
  const data = await getUser();

  if (data?.data === null) {
    return "no data";
  }

  const all_todos = data?.data?.all_todos;
  const completed_todos = data?.data?.completed_todos;
  const uncompleted_todos = data?.data?.uncompleted_todos;
  const important_todos = data?.data?.important_todos;
  const groups = data?.data?.groups;
  const info = data?.data?.info;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <EditProfile />
        <SignoutButton />
      </div>
      <Information {...info} />
      <TodosInformation
        all_todos={all_todos?.length}
        completed_todos={completed_todos?.length}
        uncompleted_todos={uncompleted_todos?.length}
        important_todos={important_todos?.length}
        groups={groups?.length}
      />
      <AllTodos todos={all_todos} />
    </div>
  );
};

export default SettingsPage;
