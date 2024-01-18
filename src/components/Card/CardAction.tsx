import { PropsWithChildren, forwardRef } from 'react';
import classNames from 'classnames';

import flex from '../../styles/flex.module.css';
import layout from '../../styles/layout.module.css';

const CardAction = forwardRef<HTMLDivElement, PropsWithChildren>(
  ({ children }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        className={classNames(
          flex['flex-row'],
          flex['justfiy-end'],
          layout['px-16'],
          layout['pb-16'],
        )}
      >
        {children}
      </div>
    );
  },
);

CardAction.displayName = 'CardAction';

export default CardAction;
