import { icons } from "@/constants";
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
      className="card dark:bg-dark2 dark:hover:bg-dark3 space-y-3"
    >
      <p className="text-p1 font-semibold">{group_name}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="icon_size">{icons.clock}</div>
          <p className="text-p2">{moment(createdAt).format("LLL")}</p>
        </div>
        <p className="bg-light1 dark:bg-dark3 rounded-md px-2 py-1 text-p1">
          {todos || 0} Tasks
        </p>
      </div>
    </Link>
  );
};

export default GroupCard;
