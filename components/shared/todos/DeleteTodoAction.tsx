"use client";

// next
import { useRouter } from "next/navigation";
// acions
import { deleteTodo } from "@/actions/todo";
// hooks
import useServerAction from "@/hooks/callServerAction";
// types
import { DeleteTodoActionProps } from "@/types/todo";
// constants
import { icons } from "@/constants";
// cmp
import { Button } from "@/components/ui/button";
import Loader from "../Loader";
import toast from "react-hot-toast";
import CustomTooltip from "../CustomTooltip";

const DeleteTodoAction = ({ _id, pushRoute }: DeleteTodoActionProps) => {
  const router = useRouter();
  const { loading, fn } = useServerAction(deleteTodo);

  const deleteHandler = async () => {
    const result = await fn({ _id });

    if (result?.code === 200) {
      toast.success(result.message);
      if (pushRoute) {
        router.push(pushRoute);
      }
      router.refresh();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <CustomTooltip
      trigger={
        <Button variant="icon" onClick={deleteHandler}>
          {loading ? <Loader /> : icons.trash}
        </Button>
      }
      content="Delete task"
    />
  );
};

export default DeleteTodoAction;
