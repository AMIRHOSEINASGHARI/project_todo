"use client";

// react
import { FormEvent, useState } from "react";
// constants
import { icons } from "@/constants";
// mongoose
import { Schema } from "mongoose";
// hooks
import useServerAction from "@/hooks/callServerAction";
// actions
import { createTodo } from "@/actions/todo";
// cmp
import Loader from "../Loader";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AddTodoProps = {
  important?: boolean;
  isGrouped?: boolean;
  group?: Schema.Types.ObjectId;
};

const AddTodo = ({ important, isGrouped, group }: AddTodoProps) => {
  const [title, setTodo] = useState("");
  const { loading, fn } = useServerAction(createTodo);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (title.trim().length === 0) return;

    const result = await fn({ title, important, isGrouped, group });

    if (result.code !== 200) {
      toast.error(result.message);
    } else {
      toast.success(result.message);
      setTodo("");
    }
  };

  return (
    <div className="dark:bg-dark2 border-border-light dark:border-border-dark fixed bottom-0 left-0 right-0 z-10 border-t bg-white px-5 py-4 sm:left-[300px]">
      <form className="flex items-center gap-1" onSubmit={onSubmit}>
        <Button type="submit" variant="icon" disabled={loading}>
          {loading ? <Loader /> : icons.paper}
        </Button>
        <Input
          type="text"
          value={title}
          placeholder="Add a Task"
          onChange={(e) => setTodo(e.target.value)}
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default AddTodo;
