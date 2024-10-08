"use client";

// actions
import { importantTodo } from "@/actions/todo";
// hooks
import useServerAction from "@/hooks/callServerAction";
// constants
import { icons } from "@/constants";
// cmp
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Loader from "../Loader";
// clsx
import clsx from "clsx";

const ImportantTodoAction = ({
  _id,
  important,
}: {
  _id: string;
  important: boolean;
  text?: string;
}) => {
  const { loading, fn } = useServerAction(importantTodo);

  const importantHandler = async () => {
    const result = await fn({ _id, important: !important });

    if (result.code === 200) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Button
      variant="icon"
      className={clsx({
        "text-blue-500 dark:text-blue-500": important,
      })}
      onClick={importantHandler}
      disabled={loading}
    >
      {loading ? <Loader /> : important ? icons.starFill : icons.star}
    </Button>
  );
};

export default ImportantTodoAction;
