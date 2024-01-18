import classNames from 'classnames';
import { ComponentProps, PropsWithoutRef, forwardRef } from 'react';

import styles from './styles.module.css';

export interface ButtonProps
  extends PropsWithoutRef<ComponentProps<'button'>> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <button
        className={classNames(styles['button'], className)}
        {...props}
        ref={forwardedRef}
      />
    );
  },
);

export default Button;
