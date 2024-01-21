import { forwardRef } from 'react';
import classNames from 'classnames';

import styles from './styles.module.css';
import text from '../../styles/text.module.css';

interface SkeletonProps {
  variant?: 'text' | 'image';
  size?: 'title1' | 'title2' | 'subtitle1' | 'subtitle2' | 'body1';
  widthPercent?: '100' | '80' | '60' | '40' | '20';
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    { size = 'body1', widthPercent = '100', variant = 'text' },
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        className={classNames(
          styles['skeleton'],
          styles[`width-${widthPercent}`],
          styles[variant],
          text[size],
        )}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;
