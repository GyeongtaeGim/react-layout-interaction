import { PropsWithChildren, ReactNode, forwardRef } from 'react';
import CardPaper, { CardPaperProps } from './CardPaper';
import CardTitle from './CardTitle';
import CardContent from './CardContent';
import CardAction from './CardAction';
import CardImage from './CardImage';

export interface CardProps {
  title?: ReactNode;
  src?: string;
  alt?: string;
  actions?: ReactNode;
  variant?: CardPaperProps['variant'];
  componentProps?: {
    CardPaper: CardPaperProps;
  };
}

const Card = forwardRef<HTMLElement, PropsWithChildren<CardProps>>(
  (
    { title, children, src, alt, actions, variant, componentProps },
    forwardedRef,
  ) => {
    return (
      <CardPaper
        ref={forwardedRef}
        variant={variant}
        {...componentProps?.CardPaper}
      >
        <CardImage src={src} alt={alt} />
        <CardTitle>{title}</CardTitle>
        <CardContent>{children}</CardContent>
        {actions && <CardAction>{actions}</CardAction>}
      </CardPaper>
    );
  },
);

Card.displayName = 'Card';

export default Card;
