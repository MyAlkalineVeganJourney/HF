import React, { useState } from 'react';
import CheckoutButton from './CheckoutButton'; // Add the Checkout Button component

const Accommodations = () => {
  const [selectedPrice, setSelectedPrice] = useState(3000); // Default price
  const [stripeLink, setStripeLink] = useState("https://book.stripe.com/cN2eX4gBJ7oPfQY000"); // Default link

  const handleAccommodationChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const price = selectedOption.value;
    const link = selectedOption.getAttribute('data-stripe-link');

    setSelectedPrice(price);
    setStripeLink(link);
  };

  return (
    <section id="accommodations">
      <div className="border-wrapper accommodations-section">
        <h2 className="accommodations-title">Choose Your Accommodations</h2>
        <form id="accommodation-form">
          <label htmlFor="accommodation-type">Select Accommodation Type - St. Lucia 7 Days ALL INCLUSIVE:</label>
          <select id="accommodation-type" onChange={handleAccommodationChange}>
            <option value="3000" data-stripe-link="https://book.stripe.com/cN2eX4gBJ7oPfQY000">Four Man Tent/p - $3000</option>
            <option value="3200" data-stripe-link="https://book.stripe.com/dR6eX4gBJ9wXeMU7su">Two Man Tent/p - $3200</option>
            <option value="3350" data-stripe-link="https://book.stripe.com/aEU8yG1GP4cD0W4aEH">One Man Tent/p - $3350</option>
            <option value="3500" data-stripe-link="https://book.stripe.com/00g6qyadlbF5cEMaEI">Air BnB Style Suite/p - $3500</option>
            <option value="3800" data-stripe-link="https://book.stripe.com/9AQaGObhpbF50W4eUZ">Guest Home/p - $3800</option>
          </select>
          <p>Price: ${selectedPrice}</p>
          <CheckoutButton stripeLink={stripeLink} /> {/* Pass the selected link to CheckoutButton */}
        </form>
      </div>
    </section>
  );
};

export default Accommodations;
