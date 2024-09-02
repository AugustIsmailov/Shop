import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Products from './Products';
import Product from './Product';

import { ROUTES } from '../../utils/routes';

import { useGetProductQuery } from '../../features/api/apiSlice';
import { getRelatedProducts } from '../../features/products/productsSlice';

const SingleProduct = () => {
  
  const { id } = useParams();

  const navigate = useNavigate();

  const { list, related } = useSelector(({ products }) => products);
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();

  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess)  navigate(ROUTES.HOME);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, isSuccess]);

  useEffect(() => {
    if (!data || !list.length) return;

    if (data) dispatch(getRelatedProducts(data.category.id));

  }, [data, dispatch, list.length]);

  return !data ? (
    <section className="preloader">Loading...</section>
  ) : (
    <>
      <Product {...data} />
      <Products products={related} amount={5} title="Related Products" />
    </>
  );
};

export default SingleProduct;
