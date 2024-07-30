"use client";

// actions
import { importantTodo } from "@/actions/todo";
// hooks
import useServerAction from "@/hooks/callServerAction";
// constants
import { icons } from "@/constants";
// cmp
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Loader from "../Loader";
// clsx
import clsx from "clsx";

const ImportantTodoAction = ({
  _id,
  important,
}: {
  _id: string;
  important: boolean;
}) => {
  const { loading, fn } = useServerAction(importantTodo);
  const { toast } = useToast();

  const importantHandler = async () => {
    const result = await fn({ _id, important: !important });

    toast({
      title: result.message,
      variant: result.code !== 200 ? "destructive" : "default",
    });
  };

  return (
    <Button
      variant="icon"
      className={clsx({
        "text-blue-500": important,
      })}
      onClick={importantHandler}
      disabled={loading}
    >
      {loading ? <Loader /> : important ? icons.starFill : icons.star}
    </Button>
  );
};

export default ImportantTodoAction;
