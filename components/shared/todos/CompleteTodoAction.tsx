"use client";

// actions
import { completeTodo } from "@/actions/todo";
// hooks
import useServerAction from "@/hooks/callServerAction";
// constants
import { icons } from "@/constants";
// cmp
import { Button } from "@/components/ui/button";
import Loader from "../Loader";
import clsx from "clsx";
import toast from "react-hot-toast";

type CompleteTodoActionPorps = {
  _id: string;
  completed: boolean;
};

const CompleteTodoAction = ({ _id, completed }: CompleteTodoActionPorps) => {
  const { loading, fn } = useServerAction(completeTodo);

  const completeHandler = async () => {
    const result = await fn({ _id, completed: !completed });

    if (result?.code === 200) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Button
      variant="icon"
      onClick={completeHandler}
      disabled={loading}
      className={clsx({
        "text-blue-500": completed,
      })}
    >
      {loading ? <Loader /> : completed ? icons.check : icons.circle}
    </Button>
  );
};

export default CompleteTodoAction;
