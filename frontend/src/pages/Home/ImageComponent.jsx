// ImageComponent.js
import React from 'react';
import landingVector from "../../assets/landing-vector.svg";

const ImageComponent = () => {
  return (
    <div className="image-component">
      <img
        src={landingVector}
        className="img-fluid animated" // Adjust width and height classes as needed
        alt="Landing Vector"
      />
    </div>
  );
}

export default ImageComponent;
