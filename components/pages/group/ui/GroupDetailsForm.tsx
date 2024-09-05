"use client";

// react
import { FormEvent, useState } from "react";
// hooks
import useServerAction from "@/hooks/callServerAction";
// actions
import { updateGroup } from "@/actions/group";
// constants
import { icons } from "@/constants";
// cmp
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import clsx from "clsx";
import Loader from "@/components/shared/Loader";

const GroupDetailsForm = ({
  _id,
  group_name,
}: {
  _id: string;
  group_name: string;
}) => {
  const [value, setValue] = useState(group_name);
  const { loading, fn } = useServerAction(updateGroup);

  const handleSubmit = async () => {
    if (!value) return;

    if (value === group_name) return;

    const result = await fn({ _id, group_name: value });

    if (result?.code === 200) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleSubmit();
  };

  const onBlur = () => {
    if (!value) {
      setValue(group_name);
      return;
    }

    handleSubmit();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-5 flex items-center gap-3">
        <div className="text-[30px]">{loading ? <Loader /> : icons.menu}</div>
        <Input
          placeholder="Group name cannot be empty"
          className={clsx(
            "h2 border-none placeholder:text-p1 placeholder:font-normal",
            {
              "Transition text-slate-400 dark:text-slate-600": loading,
            },
          )}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      </div>
    </form>
  );
};

export default GroupDetailsForm;
