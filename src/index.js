import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Map3 from './component/Map/Map7';
// import swDev from './swDev';

const Root = () => (
  //  <App />
  <Map3/>
 );
ReactDOM.render(<Root />, document.getElementById("root"));

// const root = ReactDOM(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//   <ProSidebarProvider>
//   {/* <App /> */}
//   <Map3/>
// </ProSidebarProvider>;
//   </React.StrictMode>
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// swDev(); 