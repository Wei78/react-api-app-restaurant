import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';

import Header from '../header/header';
import Spinner from '../spinner/spinner';

import './app.scss';

const Page404 = lazy(() => import('../pages/page404/404'));
const MainPage = lazy(() => import('../pages/mainPage'));
const SingleDishPage = lazy(() => import('../pages/singleDishPage/singleDishPage'));
const CartPage = lazy(() => import('../pages/cartPage'));

const App = () => {

    return (
      <CartProvider>
          <Router>
          <div className="App">
            <Header />
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route exact path='/' element={<MainPage />} /> 
                <Route exact path='/:dishId' element={<SingleDishPage />} />        
                <Route exact path='/cart' element={<CartPage />} />
                <Route exact path='*' element={<Page404 />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </CartProvider>
    );

}

export default App;
