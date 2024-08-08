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
        className="mx-2 w-[250px] bg-white sm:mx-5 sm:w-[400px]"
        side="bottom"
      >
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default CustomPopover;
