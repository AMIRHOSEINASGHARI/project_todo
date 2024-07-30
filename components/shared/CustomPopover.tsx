"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type CustomPopoverProps = {
  popoverButton: JSX.Element;
  content: JSX.Element;
  open: boolean;
  onOpenChange: (open?: boolean) => void;
};

const CustomPopover = ({
  popoverButton,
  content,
  open,
  onOpenChange,
}: CustomPopoverProps) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{popoverButton}</PopoverTrigger>
      <PopoverContent
        className="bg-white w-[250px] sm:w-[400px] mx-2 sm:mx-5"
        side="bottom"
      >
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default CustomPopover;
