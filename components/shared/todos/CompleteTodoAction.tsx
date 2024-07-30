"use client";

// actions
import { completeTodo } from "@/actions/todo";
// hooks
import useServerAction from "@/hooks/callServerAction";
// constants
import { icons } from "@/constants";
// cmp
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Loader from "../Loader";
import clsx from "clsx";

type CompleteTodoActionPorps = {
  _id: string;
  completed: boolean;
};

const CompleteTodoAction = ({ _id, completed }: CompleteTodoActionPorps) => {
  const { loading, fn } = useServerAction(completeTodo);
  const { toast } = useToast();

  const completeHandler = async () => {
    const result = await fn({ _id, completed: !completed });

    toast({
      title: result.message,
      variant: result.code !== 200 ? "destructive" : "default",
    });
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
