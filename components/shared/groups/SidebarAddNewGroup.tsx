"use client";

// react
import { FormEvent, useState } from "react";
// next
import { useRouter } from "next/navigation";
// actions
import { createNewGroup } from "@/actions/group";
// hooks
import useServerAction from "@/hooks/callServerAction";
// cmp
import { Button } from "@/components/ui/button";
import { icons } from "@/constants";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import Loader from "../Loader";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// clsx
import clsx from "clsx";

const SidebarAddNewGroup = () => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const { loading, fn } = useServerAction(createNewGroup);
  const router = useRouter();

  const onOpenChange = () => {
    setValue("");
    setOpen(!open);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!value) return;

    const result = await fn({
      group_name: value,
    });

    if (result?.code === 200) {
      toast.success(result.message);
      setOpen(false);
      setValue("");
      router.push(`/groups/${result?.groupId}`);
    } else {
      toast.error(result.message);
    }
  };

  const dialogTrigger = (
    <Button
      variant="ghost"
      className="flex w-full items-center justify-start gap-4 text-blue-500 max-sm:p-2"
    >
      <div className="icon_size">{icons.plus}</div>
      <p>New Group</p>
    </Button>
  );

  const content = (
    <form className="space-y-3" onSubmit={onSubmit}>
      <span className="text-p1 font-medium">Create new group</span>
      <Input
        type="text"
        value={value}
        placeholder="Group name..."
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        type="submit"
        className={clsx("w-full", {
          "bg-slate-100 text-black": loading,
        })}
      >
        {loading ? <Loader /> : "Submit"}
      </Button>
    </form>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">{content}</DialogContent>
    </Dialog>
  );
};

export default SidebarAddNewGroup;
