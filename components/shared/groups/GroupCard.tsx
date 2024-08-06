import { icons } from "@/constants";
import { group } from "console";
import Link from "next/link";
import moment from "moment";

type GroupCardProps = {
  _id: string;
  group_name: string;
  todos: number | undefined; // length
  createdAt: Date;
};

const GroupCard = ({ _id, group_name, todos, createdAt }: GroupCardProps) => {
  return (
    <Link
      href={`/groups/${_id}`}
      className="p-3 space-y-3 rounded-md shadow hover:bg-slate-100 Transition"
    >
      <p className="text-p1 font-semibold">{group_name}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="icon_size">{icons.clock}</div>
          <p className="text-p2">{moment(createdAt).format("LLL")}</p>
        </div>
        <p className="text-p1 bg-slate-100 rounded-md py-1 px-2">
          {todos || 0} Tasks
        </p>
      </div>
    </Link>
  );
};

export default GroupCard;
