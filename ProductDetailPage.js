/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography } from '@mui/material';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://20.244.56.144/test/companies/FLP/categories/Phone/products?top=10&minPrice=0&maxPrice=10000`);
      const selectedProduct = response.data.find(p => p.productName === productId);
      setProduct(selectedProduct);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  if (!product) return <Container>No product found</Container>;

  return (
    <Container>
      <Typography variant="h3">{product.productName}</Typography>
      <Typography variant="body1">Price: ${product.price}</Typography>
      <Typography variant="body1">Rating: {product.rating}</Typography>
      <Typography variant="body1">Discount: {product.discount}%</Typography>
      <Typography variant="body1">Availability: {product.availability}</Typography>
    </Container>
  );
};

export default ProductDetailPage;
