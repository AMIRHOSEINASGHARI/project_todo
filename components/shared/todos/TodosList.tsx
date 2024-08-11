"use client";

// react
import { useEffect, useState } from "react";
// types
import { Todo } from "@/types/todo";
// constants
import { icons } from "@/constants";
// cmp
import { Button } from "@/components/ui/button";
import TodoCard from "./TodoCard";
import clsx from "clsx";

type TodosListProps = {
  title?: string;
  todos: Todo[] | undefined;
};

const TodosList = ({ title, todos }: TodosListProps) => {
  const [show, setShow] = useState(
    JSON.parse(localStorage.getItem(title!)!) ?? true,
  );

  useEffect(() => {
    if (title) {
      localStorage.setItem(title || "title", JSON.stringify(show));
    }

    if (todos?.length === 0 && title) {
      localStorage.removeItem(title);
    }
  }, [show, todos]);

  if (todos?.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {title && (
        <Button
          variant="ghost"
          className="w-fit rounded-md bg-slate-100 px-3 py-1"
          onClick={() => setShow(!show)}
        >
          <div
            className={clsx("icon_size Transition mr-2", {
              "Transition -rotate-90 transform": !show,
            })}
          >
            {icons.arrowDown}
          </div>{" "}
          {title} {todos?.length}
        </Button>
      )}
      {show && (
        <div className="space-y-2 rounded-md bg-slate-100 p-2">
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
              group_id={todo?.group?._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodosList;
