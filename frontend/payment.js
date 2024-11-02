import React, { useEffect, useState } from 'react';
import './App.css'; // Assuming global CSS is placed here

const PaymentPage = () => {
  // State for accommodation price
  const [price, setPrice] = useState(3000);

  // Function to update the price based on accommodation selection
  const updatePrice = (event) => {
    const selectedOption = event.target.value;
    setPrice(selectedOption); // Update price state
  };
  useEffect(() => {
    const stripe = window.Stripe('YOUR_PUBLISHABLE_KEY');

    // Fetch client secret from the backend
    fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: price * 100, // Convert price to cents
        currency: 'usd',
        paymentMethodTypes: ['card', 'afterpay_clearpay', 'klarna', 'affirm'],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const clientSecret = data.clientSecret;

        const elements = stripe.elements({ clientSecret });
        const paymentElement = elements.create('payment');
        paymentElement.mount('#payment-element');
      });
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://myalkalineveganjourney.com/success',
      },
    });

    if (error) {
      console.error(error.message);
    }
  };
  // Function to redirect to Stripe's checkout
  const redirectToStripe = () => {
    const accommodationType = document.getElementById('accommodation-type');
    const selectedOption = accommodationType.options[accommodationType.selectedIndex];
    const stripeLink = selectedOption.getAttribute('data-stripe-link');
    window.location.href = stripeLink;
  };

  return (
    <div>
      {/* Logo Section */}
      <header>
        <div className="logo-section">
          <h1 className="title">💦 My Alkaline Vegan Journey 💦</h1>
          <img
            src="https://raw.githubusercontent.com/MyAlkalineVeganJourney/HF/main/Images/MAVJDigitalLogo.JPG"
            alt="MAVJ Logo"
          />
          <p>"presents"</p>
          <h2 className="event-title">💦🌴 Journey 🚥 2 🚥 Enlightenment 🌴💦</h2>

          {/* Buy Now Buttons */}
          <div className="header-buttons">
            <button
              className="buy-now-btn"
              onClick={() => window.location.href='https://book.stripe.com/6oE16e1GPbF56go145'}
            >
              Buy Now
            </button>
            <button
              id="join-family-header"
              className="header-btn"
              onClick={() => window.location.href='https://book.stripe.com/6oE16e1GPbF56go145'}
            >
              Join the Family
            </button>
          </div>
        </div>
      </header>

      {/* Accommodations Section */}
      <section id="accommodations">
        <div className="border-wrapper accommodations-section">
          <h2 className="accommodations-title">Choose Your Accommodations</h2>
          <form id="accommodation-form">
            <label htmlFor="accommodation-type">Select Accommodation Type - St. Lucia 7 Days ALL INCLUSIVE:</label>
            <select id="accommodation-type" name="accommodation-type" onChange={updatePrice}>
              <option value="3000" data-stripe-link="https://book.stripe.com/cN2eX4gBJ7oPfQY000">
                Four Man Tent/p - $3000
              </option>
              <option value="3200" data-stripe-link="https://book.stripe.com/dR6eX4gBJ9wXeMU7su">
                Two Man Tent/p - $3200
              </option>
              <option value="3350" data-stripe-link="https://book.stripe.com/aEU8yG1GP4cD0W4aEH">
                One Man Tent/p - $3350
              </option>
              <option value="3500" data-stripe-link="https://book.stripe.com/00g6qyadlbF5cEMaEI">
                Air BnB Style Suite/p - $3500
              </option>
              <option value="3800" data-stripe-link="https://book.stripe.com/9AQaGObhpbF50W4eUZ">
                Guest Home/p - $3800
              </option>
            </select>
            <p>Price: ${price}</p>
            <button type="button" className="accommodation-btn" id="checkout-button" onClick={redirectToStripe}>
              Book Now
            </button>
          </form>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section id="ai-assistant">
        <h2>AI Assistant</h2>
        <div id="assistant-container">
          <p>Welcome to the AI Assistant. How can I help you today?</p>
          <input type="text" id="user-input" placeholder="Type your query..." />
          <button onClick={() => console.log('Send Query')}>Send</button>
          <div id="response"></div>
        </div>
      </section>
      <nav>
    <ul class="menu">
        <!-- Home Dropdown -->
        <li class="dropdown">
            <a href="/index.html" class="dropbtn">💦MAVJHome💦</a>
            <ul class="dropdown-content">
                <li><a href="/Pages/Home/Mission.html">Mission and Goals</a></li>
                <li><a href="/Pages/Home/AboutUs.html">About Us</a></li>
                <li><a href="/Pages/Home/Locations.html">Locations</a></li>
                <li><a href="/Pages/Home/BusinessPlan.html">Business Plan</a></li>
            </ul>
        </li>
        <!-- Store Dropdown -->
        <li class="dropdown">
            <a href="/Pages/Store/MAVJStore.html" class="dropbtn">💦 MAVJ Store 💦</a>
            <ul class="dropdown-content">
                <li><a href="/Pages/Store/Merchandise.html">Merchandise</a></li>
                <li><a href="/Pages/Store/SeaMoss.html">Sea Moss</a></li>
                <li><a href="/Pages/Store/Detox.html">Detox</a></li>
                <li><a href="/Pages/Store/AVCandy.html">Alkaline Vegan Candy</a></li>
                <li><a href="/Pages/Store/AVCookiesBrownies.html">Alkaline Vegan Cookies & Brownies</a></li>
                <li><a href="/Pages/Store/AVDrinks.html">Alkaline Vegan Drinks</a></li>
                <li><a href="/Pages/Store/OilsInfusions.html">Oils & Infusions</a></li>
                <li><a href="/Pages/Store/Seeds.html">Seeds</a></li>
                <li><a href="/Pages/Store/Herbs.html">Herbs</a></li>
                <li><a href="/Pages/Store/Consultations.html">Consultations</a></li>
            </ul>
        </li>
        <!-- Journey to Enlightenment Drop-down -->
        <li class="dropdown">
            <a href="/Pages/J2E/J2EGala.html" class="dropbtn">💦🌴Journey 2 Enlightenment🌴💦</a>
            <ul class="dropdown-content">
                <li><a href="/Pages/J2E/J2EWhat.html">What?</a></li>
                <li><a href="/Pages/J2E/J2EWhereWhen.html">Where?When?</a></li>
                <li><a href="/Pages/J2E/J2EAccomodations.html">Accomodations</a></li>
                <li><a href="/Pages/J2E/J2ETransportation.html">Transportation</a></li>
                <li><a href="/Pages/J2E/J2EExcursions.html">Excursions</a></li>
                <li><a href="/Pages/J2E/Food.html">Food</a></li>
                <li><a href="/Pages/J2E/weather.html">Weather</a></li>
                <li><a href="/Pages/J2E/WhatToBring.html">What to Bring</a></li>
                <li><a href="/Pages/J2E/Invest.html">Invest</a></li>
            </ul>
        </li>
        <!-- Invest/Work With Us Drop-down -->
        <li class="dropdown">
            <a href="/Pages/InvestWorkWithUs/InvestWorkWithUs.html" class="dropbtn">💦💫Invest/Work w/Us💫💦</a>
            <ul class="dropdown-content">
                <li><a href="/Pages/Invest/Opportunities.html">Investment Opportunities</a></li>
                <li><a href="/Pages/Invest/Partnerships.html">Partnerships</a></li>
                <li><a href="/Pages/Invest/Careers.html">Careers</a></li>
                <li><a href="/Pages/Invest/Crops.html">Crops</a></li>
                <li><a href="/Pages/Invest/CommunalResidency.html">Living</a></li>
                <li><a href="/Pages/Invest/Donate.html">Donate</a></li>
                <li><a href="/Pages/Invest/Sponsorship.html">Sponsorship</a></li>
                <li><a href="/Pages/Invest/Partnership.html">Partnership</a></li>
            </ul>
        </li>
        <!-- Live Broadcast -->
        <li class="dropdown">
            <a href="/Pages/LiveBroadcast/LiveBroadcast.html" class="dropbtn">💦Live Broadcast💦</a>
            <ul class="dropdown-content">
                <li><a href="/Pages/Dates.html">Dates and Times</a></li>
                <li><a href="/Pages/Access.html">How to Connect</a></li>
            </ul>
        </li>
        <!-- Search Engines -->
        <li class="dropdown">
            <a href="/Pages/SearchEngines/SearchEngines.html" class="dropbtn">💦Search Engines💦</a>
            <ul class="dropdown-content">
                <li><a href="/Pages/Herbs.html">Herbs</a></li>
                <li><a href="/Pages/Illnesses.html">Illnesses</a></li>
                <li><a href="/Pages/Recipes.html">Recipes</a></li>
            </ul>
        </li>
        <!-- Shopping Cart -->
        <li class="dropdown">
            <a href="/Pages/ShoppingCart/ShoppingCart.html" class="dropbtn">💦Shopping Cart💦</a>
            <ul class="dropdown-content">
                <li><a href="/Pages/ShoppingCart/ShoppingCart.html">Herbs</a></li>
                <li><a href="/Pages/Illnesses.html">Illnesses</a></li>
                <li><a href="/Pages/Recipes.html">Recipes</a></li>
            </ul>
        </li>
        <!-- Payment -->
        <li class="dropdown">
            <a href="/Pages/Payment/Payment.html" class="dropbtn">💦Payment💦</a>
            <ul class="dropdown-content">
                <li><a href="/Pages/Payment/Checkout.html">Checkout</a></li>
                <li><a href="/Pages/Payment/Cart.html">View Cart</a></li>
            </ul>
        </li>
        <!-- Contact Us -->
        <li class="dropdown">
            <a href="/Pages/ContactUs/ContactUs.html" class="dropbtn">💦Contact Us💦</a>
            <ul class="dropdown-content">
                <li><a href="/Pages/SocialMedia.html">Social Media</a></li>
                <li><a href="/Pages/Phone.html">Phone</a></li>
                <li><a href="/Pages/Email.html">Email</a></li>
                <li><a href="/Pages/LiveChat.html">Live Chat</a></li>
            </ul>
        </li>
    </ul>
</nav>
