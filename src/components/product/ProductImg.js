import React, { useEffect, useState } from 'react';
import './ProductImg.css';

const ProductImg = ({ imageUrl, altText, size }) => {
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (imageUrl) {
      setImgSrc(imageUrl);
    } else {
      console.log("no image");
    }
  }, [imageUrl]);

  return (
    <img
      src={imgSrc}
      alt={altText}
      className={`product-img ${size}`} 
    />
  );
};

export default ProductImg;
