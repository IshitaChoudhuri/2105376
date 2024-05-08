import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE1MTQ0NDYyLCJpYXQiOjE3MTUxNDQxNjIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjVmN2Y4ZDFiLWY1MWEtNDc1OS1iYTM3LWE4ZDBmYzA4MzVlNyIsInN1YiI6ImlzaGl0YWNob3VkaHVyaTNAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiYWZmb3JkbWVkIiwiY2xpZW50SUQiOiI1ZjdmOGQxYi1mNTFhLTQ3NTktYmEzNy1hOGQwZmMwODM1ZTciLCJjbGllbnRTZWNyZXQiOiJrdGJoaHVRYnBldkRoTlNxIiwib3duZXJOYW1lIjoiSXNoaXRhIiwib3duZXJFbWFpbCI6ImlzaGl0YWNob3VkaHVyaTNAZ21haWwuY29tIiwicm9sbE5vIjoiMjEwNTM3NiJ9.0mSa9wpNrNF97b8ragJiyPr78wbGSTjDm2ldzmzexT8';
        const config = {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        };
        const response = await axios.get('http://20.244.56.144/test/companies/ANZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000', config);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>All Products</h1>
      {/* Render your products here */}
      <ul>
        {products.map(product => (
          <li key={product.productId}>
            {product.productName} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsPage;
