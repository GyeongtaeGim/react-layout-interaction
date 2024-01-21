import { useLocation, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';

import CardImage from '../../components/Card/CardImage';

import layout from '../../styles/layout.module.css';
import flex from '../../styles/flex.module.css';
import styles from './styles.module.css';

import CardTitle from '../../components/Card/CardTitle';
import Button from '../../components/Button';
import CardAction from '../../components/Card/CardAction';
import CardContent from '../../components/Card/CardContent';

interface ProductData {
  id: number;
  name: string;
  basePrice: number;
  brand: string;
  description: string;
  thumbnailImage: string;
  productCategory: string;
  display: string;
  CPU: string;
  GPU: string;
}

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { data, isSuccess } = useQuery<ProductData>({
    queryKey: ['product', { productId }],
    queryFn: async () =>
      await (await fetch(`http://localhost:4000/products/${productId}`)).json(),
    enabled: !!productId,
    placeholderData: state,
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ backgroundColor: 'rgba(0,0,0,0.0)' }}
        animate={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        exit={{ backgroundColor: 'rgba(0,0,0,0.0)' }}
        className={classNames(
          layout['fixed'],
          layout['top-0'],
          layout['left-0'],
          layout['z-index-2'],
          layout['fixed'],
          layout['dim'],
        )}
      >
        {isSuccess && (
          <motion.div
            layoutId={productId}
            className={classNames(styles['dialog'])}
          >
            <CardImage src={data?.thumbnailImage} />
            <CardTitle>{data?.name}</CardTitle>
            <CardContent>
              <div className={classNames(flex['flex-col'], flex['gap-16'])}>
                <p>
                  {data.brand} {data.productCategory} ${data.basePrice}
                </p>
                <p>{data.description}</p>
                <p>{data.display}</p>
                <p>{data.CPU}</p>
                {data.CPU !== data.GPU && <p>{data.GPU}</p>}
              </div>
            </CardContent>
            <CardAction>
              <Button onClick={() => navigate(-1)}>Close</Button>
            </CardAction>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetailPage;
