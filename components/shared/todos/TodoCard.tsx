// types
import { TodoMarks, TodoSteps } from "@/types/todo";
// cmp
import CompleteTodoAction from "./CompleteTodoAction";
import ImportantTodoAction from "./ImportantTodoAction";
// clsx
import clsx from "clsx";
import { icons } from "@/constants";

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
    <div className="rounded-md p-2 shadow bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CompleteTodoAction
            completed={JSON.parse(JSON.stringify(completed))}
            _id={JSON.parse(JSON.stringify(_id))}
          />
          <p
            className={clsx("text-p1", {
              "line-through": completed,
            })}
          >
            {title}
          </p>
        </div>
        <ImportantTodoAction
          important={JSON.parse(JSON.stringify(important))}
          _id={JSON.parse(JSON.stringify(_id))}
        />
      </div>
      <div className="mx-[46px]">
        {group_name && (
          <div className="text-p2 text-yellow-600 flex items-center gap-2">
            <div>{icons.menu}</div>
            <p className="font-medium">{group_name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
