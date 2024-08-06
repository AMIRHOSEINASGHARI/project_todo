"use client";

// react
import { useState } from "react";
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
import CustomPopover from "../CustomPopover";
import Loader from "../Loader";
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

  const groupHandler = async () => {
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

  const popoverButton = (
    <Button
      variant="ghost"
      className="flex items-center justify-start gap-4 w-full text-blue-500"
    >
      <div className="icon_size">{icons.plus}</div>
      <p className="max-sm:hidden">New Group</p>
    </Button>
  );

  const content = (
    <div className="space-y-3">
      <p className="text-p1 font-medium">Create new group</p>
      <Input
        type="text"
        value={value}
        placeholder="Group name..."
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        className={clsx("w-full", {
          "bg-slate-100 text-black": loading,
        })}
        onClick={groupHandler}
      >
        {loading ? <Loader /> : "Submit"}
      </Button>
    </div>
  );

  return (
    <CustomPopover
      popoverButton={popoverButton}
      content={content}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
};

export default SidebarAddNewGroup;
