"use client"
import React, { useEffect } from 'react';

type Props = {
  productId: number;
  price: number;
}

const Session = ({ productId, price }: Props) => {
  useEffect(() => {
    localStorage.setItem("product", productId.toString());
    localStorage.setItem("price", price.toString());
  }, [productId, price]); // Add productId to dependency array

  return (
    <div>
      {/* Optionally render something if needed */}
    </div>
  );
}

export default Session;
