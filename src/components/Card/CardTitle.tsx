import { PropsWithChildren, forwardRef } from 'react';

import classNames from 'classnames';

import layout from '../../styles/layout.module.css';
import text from '../../styles/text.module.css';

const CardTitle = forwardRef<HTMLHeadingElement, PropsWithChildren>(
  ({ children }, forwardedRef) => {
    return (
      <h4
        ref={forwardedRef}
        className={classNames(
          layout['pt-16'],
          layout['pb-8'],
          layout['px-16'],
          text['subtitle2'],
        )}
      >
        {children}
      </h4>
    );
  },
);

CardTitle.displayName = 'CardTitle';

export default CardTitle;
