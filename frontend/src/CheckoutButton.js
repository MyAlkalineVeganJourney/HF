import React from 'react';

const CheckoutButton = ({ stripeLink }) => {
  const redirectToStripe = () => {
    window.location.href = stripeLink;
  };

  return (
    <button type="button" className="accommodation-btn" onClick={redirectToStripe}>
      Book Now
    </button>
  );
};

export default CheckoutButton;
