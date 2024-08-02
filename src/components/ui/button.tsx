import { Slot } from '@radix-ui/react-slot';

import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus:outline-none disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary-300 !text-white hover:!text-primary-100 disabled:bg-primary-100',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-neutral-900 !text-white hover:!text-neutral-500 disabled:bg-neutral-400 disabled:!text-neutral-100',
        chip: 'border-2 border-neutral-100 bg-white !text-neutral-500 disabled:bg-neutral-50 disabled:!text-neutral-200 disabled:border-neutral-50 hover:border-neutral-50 hover:bg-neutral-50 hover:!text-neutral-600',
        outline:
          'border border-primary bg-white text-primary hover:border-primary hover:text-primary-hover disabled:bg-white disabled:border-gray-400 disabled:text-gray-400',
      },
      size: {
        default: 'h-42 rounded-sm p-10 text-body-1Sb leading-none',
        chip: 'h-42 rounded-sm py-10 px-20 text-body-1M leading-none',
      },
      selected: {
        true: 'bg-neutral-900 !text-white border-neutral-900',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      selected: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  selected?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, selected = false, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, selected, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
