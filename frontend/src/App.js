import React from 'react';
import './App.css';
import Accommodations from './Accommodations'; // Importing the Accommodations component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>💦 My Alkaline Vegan Journey 💦</h1>
        <p>"presents"</p>
        <h2>💦🌴 Journey 🚥 2 🚥 Enlightenment 🌴💦</h2>
        <div className="header-buttons">
          <button onClick={() => window.location.href='https://book.stripe.com/6oE16e1GPbF56go145'}>Buy Now</button>
        </div>
      </header>
      <Accommodations /> {/* This will render the Accommodations section */}
    </div>
  );
}

export default App;
