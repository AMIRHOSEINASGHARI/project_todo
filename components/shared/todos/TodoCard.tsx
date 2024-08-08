// types
import { TodoMarks, TodoSteps } from "@/types/todo";
// cmp
import CompleteTodoAction from "./CompleteTodoAction";
import ImportantTodoAction from "./ImportantTodoAction";
// clsx
import clsx from "clsx";
import { icons } from "@/constants";
import TodoDetails from "../todo-details/TodoDetails";

type TodoCardProps = {
  _id: string;
  completed: boolean;
  title: string;
  steps?: [TodoSteps] | [];
  note: string;
  important: boolean;
  marks: [TodoMarks] | [];
  group_name?: string | null;
};

const TodoCard = ({
  _id,
  completed,
  title,
  steps,
  note,
  important,
  marks,
  group_name,
}: TodoCardProps) => {
  return (
    <div className="rounded-md bg-white p-2 shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CompleteTodoAction
            completed={JSON.parse(JSON.stringify(completed))}
            _id={JSON.parse(JSON.stringify(_id))}
          />
          <TodoDetails
            _id={JSON.parse(JSON.stringify(_id))}
            title={JSON.parse(JSON.stringify(title))}
            completed={JSON.parse(JSON.stringify(completed))}
          />
        </div>
        <ImportantTodoAction
          important={JSON.parse(JSON.stringify(important))}
          _id={JSON.parse(JSON.stringify(_id))}
        />
      </div>
      <div className="mx-[46px]">
        {group_name && (
          <div className="flex items-center gap-2 text-p2 text-yellow-600">
            <div>{icons.menu}</div>
            <p className="font-medium">{group_name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
