import { PropsWithChildren, forwardRef } from 'react';

import layout from '../../styles/layout.module.css';
import classNames from 'classnames';

const CardContent = forwardRef<HTMLDivElement, PropsWithChildren>(
  ({ children }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        className={classNames(layout['px-16'], layout['pb-16'])}
      >
        {children}
      </div>
    );
  },
);

CardContent.displayName = 'CardContent';

export default CardContent;
