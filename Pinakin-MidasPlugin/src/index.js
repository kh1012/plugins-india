import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';



const baseUrl = 'https://api-beta.rpm.kr-dv-midasit.com:443';
const programType = 'civil';
const MAPIKey = 'eyJ1ciI6InBpbmFraW4iLCJwZyI6ImNpdmlsIiwiY24iOiJDVi1IbzUtV1F3In0.6712bd920290c2352aad68a8ce86953bbc288f147c57464c98e537bc24a8c572'


function checkExistQuerystring() {
  const mapiKeyQuery = getMapiKey();
  console.log(mapiKeyQuery);
  if (mapiKeyQuery === null) return;
  const currentQueryStringDot = document.getElementById('current-querystring-dot');
  currentQueryStringDot.style.backgroundColor = '#059669';
  const currentQueryString = document.getElementById('current-querystring');
  currentQueryString.innerHTML = `Current QueryString is ${mapiKeyQuery}`;
  currentQueryString.style.color = '#059669';
  currentQueryString.style.fontWeight = '700';
  document.getElementById('querystring-wrapper').style.display = 'none';
}

function getMapiKey() {
  // Get params from url and get mapiKey.
  const params = new URLSearchParams(window.location.search);
  return params.get("mapiKey");
}

// Function to create QueryString
function makeQueryString() {
  const inputValue = document.getElementById('querystring-input').value;
  const  queryString  =  '?mapiKey='  +  inputValue ;
  document.getElementById('querystring-output').textContent  =  queryString ;
}

// Function to check if MAPI-Key is correct
async function checkMapiKey() {
  // Get mapiKey from QueryString.
  const mapiKey = getMapiKey();

  const response = await fetch(`${baseUrl}/mapiKey/verify`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'MAPI-Key' : mapiKey
    }
  });

  // Send the response result to the DOM object with getnode-output id.
  document.getElementById('status-output').textContent = 
    JSON.stringify(await response.json(), null, 2);
}

// Function that defines the action when the GET NODE button is clicked
async function getNodeFetch() {
  // Get mapiKey from QueryString.
  const mapiKey = getMapiKey();

  // Send request to get NODE.
  const response = await fetch(`${baseUrl}/${programType}/db/node`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'MAPI-Key' : mapiKey
  }});

  // Send the response result to the DOM object with getnode-output id.
  document.getElementById('getnode-output').textContent = 
    JSON.stringify(await response.json(), null, 2);
}





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
