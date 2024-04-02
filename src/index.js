import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes,unstable_HistoryRouter as HistoryRouter  } from 'react-router-dom';
import IndexTemplate from './Templates/IndexTemplate';
import Home from './Pages/Home';
import Search from './Pages/Search';

// redux
import { store } from './redux/store';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import Carts from './Pages/Carts';
import Detail from './Pages/Detail';

// Cấu hình chuyển hướng trang khi xử lí không phải là function component
import { createBrowserHistory } from 'history'
export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HistoryRouter history={history}>
    <Provider store={store}>
      <Routes>
        <Route element={<IndexTemplate />}>
          <Route path='' element={<Home />}></Route>
          <Route path='search' element={<Search />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='profile' element={<Profile />}></Route>
          <Route path='carts' element={<Carts />}></Route>
          <Route path='Register' element={<Register />}></Route>
          <Route path='detail'>
            <Route path=':id' element={<Detail />}></Route>
          </Route>
        </Route>
      </Routes>
    </Provider>
  </HistoryRouter>
);

