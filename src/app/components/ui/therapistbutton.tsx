import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-soft hover:shadow-card hover:scale-[1.02] transition-all duration-300",
        destructive:
          "bg-destructive text-destructive-foreground shadow-soft hover:shadow-card hover:scale-[1.02]",
        outline:
          "border border-border bg-card/50 backdrop-blur-sm text-card-foreground shadow-soft hover:bg-card hover:shadow-card hover:scale-[1.02]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-soft hover:shadow-card hover:scale-[1.02] transition-all duration-300",
        ghost: "hover:bg-muted/50 hover:text-foreground transition-all duration-300 rounded-xl",
        link: "text-primary underline-offset-4 hover:underline",
        soothing: "bg-gradient-primary text-white shadow-soft hover:shadow-floating hover:scale-[1.02] transition-all duration-300",
        gentle: "bg-gradient-secondary text-white shadow-soft hover:shadow-floating hover:scale-[1.02] transition-all duration-300",
        panic: "bg-gradient-secondary text-white shadow-floating hover:shadow-card hover:scale-[1.05] animate-pulse transition-all duration-300 border-2 border-secondary/30"
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-lg px-3",
        lg: "h-14 rounded-xl px-8 text-base",
        xl: "h-16 rounded-2xl px-12 text-lg font-semibold",
        icon: "h-10 w-10",
        floating: "h-14 w-14 rounded-full shadow-floating"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
