import React, { FC, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom';
import { createBrowserHistory, BrowserHistory } from 'history';
import { StoreProvider } from "./app/context/StoreContext"

interface Props {
  history: BrowserHistory
}

export const history = createBrowserHistory();
const CustomRouter: FC<Props> = ({ history, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};


ReactDOM.render(
  <React.StrictMode>
    <CustomRouter history={history}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </CustomRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
