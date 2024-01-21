import classNames from 'classnames';
import { ComponentProps, PropsWithoutRef, forwardRef } from 'react';

import styles from './styles.module.css';
import { Link, LinkProps } from 'react-router-dom';

export interface BaseButtonProps {
  color?: 'grey' | 'blue';
}

export interface ButtonProps
  extends Omit<PropsWithoutRef<ComponentProps<'button'>>, 'color'>,
    BaseButtonProps {}

export interface LinkButtonProps
  extends Omit<LinkProps, 'color'>,
    BaseButtonProps {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, color = 'grey', ...props }, forwardedRef) => {
    return (
      <button
        className={classNames(styles['button'], styles[color], className)}
        {...props}
        ref={forwardedRef}
      />
    );
  },
);

Button.displayName = 'button';

export default Button;

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, color = 'grey', ...props }, forwardedRef) => {
    return (
      <Link
        className={classNames(styles['button'], styles[color], className)}
        {...props}
        ref={forwardedRef}
      />
    );
  },
);

LinkButton.displayName = 'LinkButton';
