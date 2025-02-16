import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "text-sm font-medium relative border border-[transparent] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-neutral-900 transition-all duration-150 ease-in-out inline-flex items-center justify-center gap-2 rounded-xl min-h-10 min-w-10 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "text-primary-foreground shadow-inner bg-primary hover:bg-primary/90 before:absolute before:pointer-events-none before:inset-0 before:rounded-xl before:shadow-[0px_2px_0.4px_0px_rgba(255,_255,_255,_0.16)_inset] dark:before:shadow-[0px_2px_0.4px_0px_rgba(219,_207,_153,_0.75)_inset] hover:shadow-none",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/50 border border-secondary-foreground/10",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-secondary-foreground/10 hover:bg-secondary",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 py-2",
        sm: "h-9 px-3",
        lg: "px-6 py-3 text-md",
        icon: "p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
