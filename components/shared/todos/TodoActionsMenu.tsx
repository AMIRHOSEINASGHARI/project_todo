"use client";

// cmp
import ImportantTodoAction from "./ImportantTodoAction";
import DeleteTodoAction from "./DeleteTodoAction";

const TodoActionsMenu = ({
  id,
  important,
}: {
  id: string;
  important: boolean;
}) => {
  return (
    <div className="flex items-center gap-1">
      <DeleteTodoAction _id={id} />
      <ImportantTodoAction _id={id} important={important} />
    </div>
  );
};

export default TodoActionsMenu;
