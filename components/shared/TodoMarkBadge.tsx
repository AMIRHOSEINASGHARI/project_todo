// types
import { TodoMarks } from "@/types/todo";
// constants
import { markColors } from "@/constants/ui";
// cmp
import CustomTooltip from "./CustomTooltip";

const TodoMarkBadge = ({
  mark,
  tooltip = true,
}: {
  mark: TodoMarks;
  tooltip?: boolean;
}) => {
  if (tooltip) {
    return (
      <CustomTooltip
        trigger={
          <div
            className="h-[10px] w-[10px] rounded-full"
            style={{
              backgroundColor: markColors[mark],
            }}
          />
        }
        content={<span className="capitalize">{mark}</span>}
      />
    );
  } else {
    return (
      <div
        className="h-[10px] w-[10px] rounded-full"
        style={{
          backgroundColor: markColors[mark],
        }}
      />
    );
  }
};

export default TodoMarkBadge;
