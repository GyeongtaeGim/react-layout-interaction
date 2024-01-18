import {
  ComponentProps,
  PropsWithChildren,
  PropsWithoutRef,
  forwardRef,
} from 'react';

import styles from './styles.module.css';
import classNames from 'classnames';

export interface CardPaperProps
  extends PropsWithoutRef<ComponentProps<'article'>> {
  variant?: 'elevation' | 'outline';
}

const CardPaper = forwardRef<HTMLElement, PropsWithChildren<CardPaperProps>>(
  ({ children, variant = 'elevation', className, ...props }, forwardedRef) => {
    return (
      <article
        ref={forwardedRef}
        className={classNames(styles['paper'], styles[variant], className)}
        {...props}
      >
        {children}
      </article>
    );
  },
);

CardPaper.displayName = 'CardPaper';

export default CardPaper;
