import React, { memo } from 'react';
import clsx from 'clsx';

type TypographyVariant =
  | 'title1'
  | 'title2'
  | 'title3'
  | 'body1'
  | 'body2'
  | 'body2Bold'
  | 'caption'
  | 'small';

type TextColor =
  | 'text-primary'
  | 'text-secondary'
  | 'text-subtitle'
  | 'black'
  | 'white'
  | 'gray'
  | 'light-gray'
  | 'red'
  | 'primary'
  | 'secondary';

type ElementType = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';

interface TypographyProps {
  variant: TypographyVariant;
  color?: TextColor;
  as?: ElementType;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const variantClassMap: Record<TypographyVariant, string> = {
  title1: 'text-title1',
  title2: 'text-title2',
  title3: 'text-title3',
  body1: 'text-body1',
  body2: 'text-body2',
  body2Bold: 'text-body2-bold',
  caption: 'text-caption',
  small: 'text-small',
};

const colorClassMap: Record<TextColor, string> = {
  'text-primary': 'text-text-primary',
  'text-secondary': 'text-text-secondary',
  'text-subtitle': 'text-text-subtitle',
  black: 'text-black',
  white: 'text-white',
  gray: 'text-gray',
  'light-gray': 'text-light-gray',
  red: 'text-red',
  primary: 'text-primary',
  secondary: 'text-secondary',
};

const Typography: React.FC<TypographyProps> = ({
  variant,
  color = 'text-primary',
  as,
  className = '',
  children,
  onClick,
}) => {
  const Element = as || 'p';

  return (
    <Element
      className={clsx(
        'font-sans',
        variantClassMap[variant],
        colorClassMap[color],
        className
      )}
      onClick={onClick}
    >
      {children}
    </Element>
  );
};

export default memo(Typography);
