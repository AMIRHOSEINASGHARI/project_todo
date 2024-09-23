"use client";

// react
import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import Loader from "@/components/shared/Loader";

const DeleteGroup = ({ _id }: { _id: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { loading, fn } = useServerAction(deleteGroup);

  const onOpenChange = () => {
    setOpen(!open);
  };

  const onClose = () => {
    if (loading) return;
    setOpen(false);
  };

  const deletehandler = async () => {
    const result = await fn({ _id });

    if (result?.code === 200) {
      onClose();
      toast.success(result.message);
      router.push("/all");
      router.refresh();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="icon">{icons.trash}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="text-rose-500 dark:text-rose-400">
            This action cannot be undone. This will permanently delete your
            group and remove your data from the servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            className="flex flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="min-w-[164px] flex flex-1"
            disabled={loading}
            onClick={deletehandler}
          >
            {loading ? <Loader /> : "Yes, Delete the group"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteGroup;
