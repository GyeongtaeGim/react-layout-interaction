import classNames from 'classnames';
import { ComponentProps, PropsWithoutRef, forwardRef } from 'react';

import styles from './styles.module.css';

export interface ButtonProps extends PropsWithoutRef<ComponentProps<'button'>> {
  color?: 'grey' | 'blue';
}

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

export default Button;
