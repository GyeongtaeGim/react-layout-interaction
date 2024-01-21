import { AnimatePresence, motion } from 'framer-motion';

import classNames from 'classnames';
import Card from '../components/Card';

import styles from './styles.module.css';
import layout from '../styles/layout.module.css';

import flex from '../styles/flex.module.css';
import { useQuery } from '@tanstack/react-query';
import Button, { LinkButton } from '../components/Button';
import { useState } from 'react';
import CardSkeleton from '../components/Card/CardSkeleton';
import Skeleton from '../components/Skeleton';
import { useLocation } from 'react-router-dom';

const MotionCard = motion(Card);
const MotionCardSkeleton = motion(CardSkeleton);

interface ProductData {
  id: number;
  name: string;
  basePrice: number;
  brand: string;
  description: string;
  thumbnailImage: string;
  productCategory: string;
}

const IndexPage = () => {
  const location = useLocation();
  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  const [productCategoryFilter, setProductCategory] = useState<string | null>(
    null,
  );
  const [isSortedByPrice, setSortedByPrice] = useState<boolean>(false);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [
      'products',
      { brandFilter, productCategoryFilter, isSortedByPrice },
    ],
    queryFn: async () => {
      const queryString = new URLSearchParams({
        ...(brandFilter && { brand: brandFilter }),
        ...(productCategoryFilter && {
          productCategory: productCategoryFilter,
        }),
        ...(isSortedByPrice && { _sort: 'basePrice' }),
      }).toString();
      const result: ProductData[] = await (
        await fetch(`http://localhost:4000/products?${queryString}`)
      ).json();

      return result;
    },
    placeholderData: (previousData) => previousData,
  });

  const handleBrandClick = (brand: string) => () => {
    setBrandFilter((prev) => (prev !== brand ? brand : null));
  };
  const handleProductCategoryClick = (productCategory: string) => () => {
    setProductCategory((prev) =>
      prev !== productCategory ? productCategory : null,
    );
  };

  const handleSortClick = () => {
    setSortedByPrice((prev) => !prev);
  };

  return (
    <>
      <section
        className={classNames(
          layout['py-32'],
          layout['top-0'],
          layout['sticky'],
          layout['z-index-2'],
          layout['bg-white-gradient'],
        )}
      >
        <div
          className={classNames(
            layout['container'],
            flex['flex-row'],
            flex['gap-16'],
            flex['flex-wrap'],
          )}
        >
          <Button
            color={isSortedByPrice ? 'blue' : 'grey'}
            onClick={handleSortClick}
          >
            Sort By Price
          </Button>
          {['Apple', 'Samsung', 'Lenovo'].map((brand) => (
            <Button
              onClick={handleBrandClick(brand)}
              color={brandFilter === brand ? 'blue' : 'grey'}
              key={brand}
            >
              {brand}
            </Button>
          ))}
          {['Smartphone', 'Tablet', 'Laptop'].map((productCategory) => (
            <Button
              onClick={handleProductCategoryClick(productCategory)}
              color={
                productCategoryFilter === productCategory ? 'blue' : 'grey'
              }
              key={productCategory}
            >
              {productCategory}
            </Button>
          ))}
        </div>
      </section>
      <section>
        <AnimatePresence mode='sync'>
          {!isSuccess && isLoading && (
            <motion.div
              initial='show'
              exit='hide'
              key='loading'
              className={classNames(layout['container'], layout['relative'])}
            >
              <div
                className={classNames(
                  layout['z-index-1'],
                  layout['absolute'],
                  layout['full-width'],
                  flex['flex-row'],
                  flex['gap-32'],
                  flex['flex-wrap'],
                )}
              >
                {Array(9)
                  .fill(null)
                  .map((_, index) => (
                    <MotionCardSkeleton
                      key={`skeleton_${index}`}
                      transition={{ delay: 0.3 }}
                      variants={{
                        show: { opacity: 1 },
                        hide: { opacity: 0 },
                      }}
                      componentProps={{
                        CardPaper: { className: classNames(styles['card']) },
                      }}
                    >
                      <Skeleton widthPercent='40' size='body1' />
                      <Skeleton widthPercent='100' size='body1' />
                      <Skeleton widthPercent='60' size='body1' />
                      <Skeleton widthPercent='100' size='subtitle1' />
                    </MotionCardSkeleton>
                  ))}
              </div>
            </motion.div>
          )}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.1 }}
              className={classNames(
                layout['container'],
                flex['flex-row'],
                flex['gap-32'],
                flex['flex-wrap'],
              )}
            >
              <AnimatePresence mode='sync'>
                {data.map((product) => (
                  <MotionCard
                    layoutId={`${product.id}`}
                    key={product.id}
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    whileHover={{ scale: 1.02 }}
                    componentProps={{
                      CardPaper: { className: classNames(styles['card']) },
                    }}
                    title={product.name}
                    src={product.thumbnailImage}
                    actions={
                      <LinkButton
                        state={{ previousLocation: location, ...product }}
                        to={`/${product.id}`}
                      >
                        Read More
                      </LinkButton>
                    }
                  >
                    <div
                      className={classNames(flex['flex-col'], flex['gap-16'])}
                    >
                      <p>
                        {product.brand} {product.productCategory} $
                        {product.basePrice}
                      </p>
                      <p>{product.description}</p>
                    </div>
                  </MotionCard>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default IndexPage;
