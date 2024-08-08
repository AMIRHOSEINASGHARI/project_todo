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

    const result = await fn({ title, important, isGrouped, group });

    if (result.code !== 200) {
      toast.error(result.message);
    }

    if (result.code === 200) {
      setTodo("");
    }
  };

  return (
    <div className="fixed bottom-0 left-[69px] right-0 z-10 border-t bg-white px-5 py-4 sm:left-[300px]">
      <form className="flex items-center gap-1" onSubmit={onSubmit}>
        <Button type="submit" variant="icon" disabled={loading}>
          {loading ? <Loader /> : icons.paper}
        </Button>
        <Input
          type="text"
          value={title}
          placeholder="Add a Task"
          onChange={(e) => setTodo(e.target.value)}
          className="border-slate-400"
        />
      </form>
    </div>
  );
};

export default AddTodo;
