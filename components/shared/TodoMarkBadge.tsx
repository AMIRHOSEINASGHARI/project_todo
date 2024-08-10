// types
import { TodoMarks } from "@/types/todo";
// cmp
import CustomTooltip from "./CustomTooltip";

const TodoMarkBadge = ({ mark }: { mark: TodoMarks }) => {
  const colors = {
    red: "#ef4444",
    orange: "#f59e0b",
    yellow: "#facc15",
    green: "#22c55e",
    blue: "#3b82f6",
    purple: "#9333ea",
  };

  return (
    <CustomTooltip
      trigger={
        <div
          className="h-[10px] w-[10px] rounded-full"
          style={{
            backgroundColor: colors[mark],
          }}
        />
      }
      content={<span className="capitalize">{mark}</span>}
    />
  );
};

export default TodoMarkBadge;
