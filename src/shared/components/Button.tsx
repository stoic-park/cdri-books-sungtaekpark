import { forwardRef, memo } from 'react';
import Typography from './Typography';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      disabled = false,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
      primary:
        'bg-primary text-white hover:bg-primary/90 focus:ring-primary/50',
      secondary: 'bg-light-gray text-secondary hover:bg-gray',
      outline:
        'border border-border bg-white text-text-primary hover:bg-bg-secondary',
      ghost: 'text-secondary hover:bg-light-gray',
    };

    const sizeClasses = {
      sm: 'px-3 py-4 text-sm',
      md: 'px-4 py-4 text-sm',
      lg: 'px-4 py-4 text-base',
    };

    const widthClasses = fullWidth ? 'w-full' : '';

    const buttonClasses = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      widthClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled}
        {...props}
      >
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {typeof children === 'string' ? (
          <Typography
            variant="caption"
            color={variant === 'primary' ? 'white' : 'text-secondary'}
          >
            {children}
          </Typography>
        ) : (
          children
        )}
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default memo(Button);
