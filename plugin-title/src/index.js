import React from 'react';
import ReactDOM from 'react-dom/client';

// Basic variables and functions for using an API
const baseUrl = 'https://api-beta.midasit.com:443';
const programType = 'gen';

function App() {
  return (
    <>
      Hello World!
    </>
  )
}

// Find the <div> element with id='root' in the index.html file
const root = ReactDOM.createRoot(document.getElementById('root'));
// Render the following HTML code in the div with id='root'
root.render(<App />);