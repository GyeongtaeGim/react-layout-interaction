import { PropsWithChildren, forwardRef } from 'react';
import CardPaper, { CardPaperProps } from './CardPaper';
import CardTitle from './CardTitle';
import CardContent from './CardContent';
import classNames from 'classnames';

import styles from './styles.module.css';
import Skeleton from '../Skeleton';

export interface CardProps {
  variant?: CardPaperProps['variant'];
  componentProps?: {
    CardPaper: CardPaperProps;
  };
}

const CardSkeleton = forwardRef<HTMLElement, PropsWithChildren<CardProps>>(
  ({ variant, componentProps, children }, forwardedRef) => {
    return (
      <CardPaper
        ref={forwardedRef}
        variant={variant}
        {...componentProps?.CardPaper}
      >
        <div className={classNames(styles['image'])}>
          <Skeleton variant='image' />
        </div>
        <CardTitle>
          <Skeleton widthPercent='100' size='subtitle1' />
          <Skeleton widthPercent='40' size='subtitle1' />
        </CardTitle>
        <CardContent>
          {children || (
            <>
              <Skeleton widthPercent='40' size='body1' />
              <Skeleton widthPercent='100' size='body1' />
            </>
          )}
        </CardContent>
      </CardPaper>
    );
  },
);

CardSkeleton.displayName = 'Card';

export default CardSkeleton;
