import { ComponentProps, forwardRef } from 'react';

import styles from './styles.module.css';
import classNames from 'classnames';

export interface CardImageProps extends ComponentProps<'img'> {}

const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ src, alt }, forwardedRef) => {
    return (
      <div ref={forwardedRef} className={classNames(styles['image'])}>
        <img src={src} alt={alt} />
      </div>
    );
  },
);

CardImage.displayName = 'CardImage';

export default CardImage;
