// types
import { Todo } from "@/types/todo";
import TodoCard from "./TodoCard";

type TodosListProps = {
  title?: string;
  todos: Todo[] | undefined;
};

const TodosList = ({ title, todos }: TodosListProps) => {
  if (todos?.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {title && (
        <p className="bg-slate-100 w-fit py-1 px-3 rounded-md">
          {title} {todos?.length}
        </p>
      )}
      <div className="space-y-2 bg-slate-100 p-2 rounded-md">
        {todos?.map((todo) => (
          <TodoCard
            key={todo._id}
            _id={todo._id}
            completed={todo.completed}
            important={todo.important}
            marks={todo.marks}
            note={todo.note}
            title={todo.title}
            steps={todo.steps}
            group_name={todo?.group?.group_name}
          />
        ))}
      </div>
    </div>
  );
};

export default TodosList;
