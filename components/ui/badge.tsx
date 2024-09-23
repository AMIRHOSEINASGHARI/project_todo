import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit items-center rounded-[6px] py-1 px-2 text-[0.75rem] font-[700] transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "bg-slate-700 text-slate-50 dark:bg-slate-700 dark:text-slate-300",
        secondary:
          "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-50",
        destructive:
          "bg-red-500 text-slate-50 dark:bg-red-700 dark:text-slate-50",
        outline: "text-slate-950 dark:text-slate-50",
        green: "badge-green",
        blue: "badge-blue",
        orange: "badge-orange",
        slate: "badge-slate",
        gray: "badge-gray",
        rose: "badge-rose",
        favorite: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
