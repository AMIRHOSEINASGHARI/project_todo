// types
import { UserInformationProps } from "@/types/user";

const Information = ({
  username,
  name,
  createdAt,
  updatedAt,
}: UserInformationProps) => {
  return (
    <div className="Grid2">
      <div className="card border">
        <h1 className="text-p1">Username:</h1>
        <span className="font-bold">{username}</span>
      </div>
      <div className="card border">
        <h1 className="text-p1">Name:</h1>
        <span className="font-bold">{name}</span>
      </div>
      <div className="card border">
        <h1 className="text-p1">Created At:</h1>
        <span className="font-bold">
          {new Date(createdAt!).toLocaleDateString()}
        </span>
      </div>
      <div className="card border">
        <h1 className="text-p1">Last Modified:</h1>
        <span className="font-bold">
          {updatedAt ? new Date(updatedAt!).toLocaleDateString() : "-"}
        </span>
      </div>
    </div>
  );
};

export default Information;
