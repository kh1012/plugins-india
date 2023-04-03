import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';



const baseUrl = 'https://api-beta.midasit.com:443';
const programType = 'civil';


function getMapiKey() {
  // url에서 params를 가져오고 mapiKey를 get 합니다.
  const params = new URLSearchParams(window.location.search);
  return params.get("mapiKey");
}


// MAPI-Key가 올바른지 확인하는 함수
async function checkMapiKey() {
  // mapiKey를 QueryString으로부터 가져 옵니다.
  const mapiKey = getMapiKey();

  const response = await fetch(`${baseUrl}/mapiKey/verify`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'MAPI-Key': mapiKey
    }
  });

  // 응답 결과를 getnode-output id를 가진 DOM 객체에 전달합니다.
  document.getElementById('status-output').textContent = 
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
