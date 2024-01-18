import {
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  forwardRef,
} from 'react';
import CardPaper, { CardPaperProps } from './CardPaper';
import CardTitle from './CardTitle';
import CardContent from './CardContent';
import CardAction from './CardAction';
import CardImage from './CardImage';
import Button from '../Button';

export interface CardProps {
  title?: ReactNode;
  src?: string;
  alt?: string;
  onAction?: MouseEventHandler<HTMLButtonElement>;
  variant?: CardPaperProps['variant'];
  componentProps?: {
    CardPaper: CardPaperProps;
  };
}

const Card = forwardRef<HTMLElement, PropsWithChildren<CardProps>>(
  (
    { title, children, src, alt, onAction, variant, componentProps },
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
        {onAction && (
          <CardAction>
            <Button>Read More</Button>
          </CardAction>
        )}
      </CardPaper>
    );
  },
);

Card.displayName = 'Card';

export default Card;
