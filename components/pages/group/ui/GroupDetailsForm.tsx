"use client";

// react
import { FormEvent, useState } from "react";
// constants
import { icons } from "@/constants";
// cmp
import { Input } from "@/components/ui/input";
import useServerAction from "@/hooks/callServerAction";
import { updateGroup } from "@/actions/group";
import toast from "react-hot-toast";
import clsx from "clsx";

const GroupDetailsForm = ({
  _id,
  group_name,
}: {
  _id: string;
  group_name: string;
}) => {
  const [value, setValue] = useState(group_name);
  const { loading, fn } = useServerAction(updateGroup);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!value) return;

    const result = await fn({ _id, group_name: value });

    if (result?.code === 200) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-5 flex items-center gap-3">
        <div className="text-[30px]">{icons.menu}</div>
        <Input
          placeholder="Group name cannot be empty"
          className={clsx(
            "h2 border-none placeholder:text-p1 placeholder:font-normal",
            {
              "Transition text-slate-400": loading,
            },
          )}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => !value && setValue(group_name)}
        />
      </div>
    </form>
  );
};

export default GroupDetailsForm;
