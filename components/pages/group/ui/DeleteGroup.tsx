"use client";

// next
import { useRouter } from "next/navigation";
// actions
import { deleteGroup } from "@/actions/group";
// hooks
import useServerAction from "@/hooks/callServerAction";
// constants
import { icons } from "@/constants";
// cmp
import { Button } from "@/components/ui/button";
import CustomTooltip from "@/components/shared/CustomTooltip";
import toast from "react-hot-toast";
import Loader from "@/components/shared/Loader";

const DeleteGroup = ({ _id }: { _id: string }) => {
  const router = useRouter();
  const { loading, fn } = useServerAction(deleteGroup);

  const deletehandler = async () => {
    const result = await fn({ _id });

    if (result?.code === 200) {
      toast.success(result.message);
      router.push("/all");
      router.refresh();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div>
      <CustomTooltip
        trigger={
          <Button variant="icon" onClick={deletehandler}>
            {loading ? <Loader /> : icons.trash}
          </Button>
        }
        content="Delete Group"
      />
    </div>
  );
};

export default DeleteGroup;
