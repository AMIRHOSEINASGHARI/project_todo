// next
import Link from "next/link";
// types
import { TodoMarks, TodoSteps } from "@/types/todo";
// cmp
import { icons } from "@/constants";
// cmp
import CompleteTodoAction from "./CompleteTodoAction";
import ImportantTodoAction from "./ImportantTodoAction";
// clsx
import clsx from "clsx";
import TodoMarkBadge from "../TodoMarkBadge";
import CustomTooltip from "../CustomTooltip";

type TodoCardProps = {
  _id: string;
  completed: boolean;
  title: string;
  steps?: [TodoSteps] | [];
  note: string;
  important: boolean;
  marks: [TodoMarks] | [];
  group_name?: string | null;
  group_id?: string | undefined;
};

const TodoCard = ({
  _id,
  completed,
  title,
  important,
  group_name,
  note,
  steps,
  marks,
  group_id,
}: TodoCardProps) => {
  return (
    <div className="dark:bg-dark2 rounded-md bg-white p-2 shadow">
      <div
        className={clsx("flex items-center justify-between", {
          "mb-2":
            group_name || note || steps?.length !== 0 || marks?.length !== 0,
        })}
      >
        <div className="flex items-center gap-2">
          <CompleteTodoAction
            completed={JSON.parse(JSON.stringify(completed))}
            _id={JSON.parse(JSON.stringify(_id))}
          />
          <Link
            className={clsx("text-p1", {
              todo_completed: completed,
            })}
            href={`/todos/${_id}`}
          >
            {title}
          </Link>
        </div>
        <ImportantTodoAction
          important={JSON.parse(JSON.stringify(important))}
          _id={JSON.parse(JSON.stringify(_id))}
        />
      </div>
      <div className="ml-[46px] mr-2 flex flex-wrap items-center gap-3 text-slate-400 md:gap-4">
        {group_name && (
          <CustomTooltip
            trigger={
              <Link href={`/groups/${group_id}`} className="text-p3 sm:text-p2">
                {group_name}
              </Link>
            }
            content={`In group: ${group_name}`}
          />
        )}
        {steps?.length !== 0 && (
          <CustomTooltip
            trigger={
              <span className="text-p3 sm:text-p2">
                {steps?.filter((s) => s?.completed)?.length} of {steps?.length}
              </span>
            }
            content={`${steps?.filter((s) => !s?.completed)?.length} step left`}
          />
        )}
        {note && (
          <CustomTooltip trigger={<div>{icons.document}</div>} content={note} />
        )}
        {marks?.length !== 0 &&
          marks?.map((m) => <TodoMarkBadge key={m} mark={m} />)}
      </div>
    </div>
  );
};

export default TodoCard;
