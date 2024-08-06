// "use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CustomTooltip = ({
  trigger,
  content,
  side,
}: {
  trigger: JSX.Element;
  content: JSX.Element | string;
  side?: "top" | "right" | "bottom" | "left";
}) => {
  return (
    <TooltipProvider delayDuration={100} skipDelayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent
          side={side || "bottom"}
          className="bg-slate-900 text-slate-100"
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
