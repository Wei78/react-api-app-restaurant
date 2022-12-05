import CartItem from '../cartItem/cartItem';
import Spinner from '../spinner/spinner';
import { useMemo, useState, useTransition, useEffect } from 'react';
import useFoodService from '../../services/FoodService';

import './cart.scss'
import { useCart } from '../../context/CartContext';

const Cart = () => {
    const { cartItems } = useCart();
    const [term, setTerm] = useState('');
    const [isPending, startTransition] = useTransition();
    const {loading, error, getFood} = useFoodService();
    const [initialValue, setInitialValue] = useState([]);

    const onRequest = () => {
        getFood(24)
            .then(onDishListLoaded)
    }

    const onDishListLoaded = (dishList) => {
        setInitialValue(dishList);
    }

    useEffect(() => {
        onRequest();
    }, [])

    const filteredItems = useMemo(() => {
        return cartItems
            // .filter(item => item.name.toLowerCase().includes(text))
        // eslint-disable-next-line
    }, [term, cartItems])

    const onValueChange = (e) => {
        startTransition(() => {
            setTerm(e.target.value);
        })
    }

    const searchCart = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    const visibleData = searchCart(initialValue, term);

    return (
        <section id='cart'>
            <div className="cartlist box-p0">
                <div className='header'>
                    <h2>Cart</h2>
                    <input value={term} type="text" placeholder='Search...' onChange={onValueChange}/>
                </div>
                <ol className='items'>
                        {isPending ? <Spinner /> :
                        filteredItems.map((item) => {
                            return (
                                <CartItem 
                                    key={item.id}
                                    {...item} 
                                    visibleData={visibleData}
                                />
                            )
                        })}
                </ol>
            </div>
            <div className="order box-p1">
                <h4>Delievery</h4>
                <div className="switch-field">
                    <input type="radio" id="radio-one" name="switch-one" value="free" checked/>
                    <label htmlFor="radio-one">Free</label>
                    <input type="radio" id="radio-two" name="switch-one" value="express" />
                    <label htmlFor="radio-two">Express: $9.99</label>
                </div>
                <span>Delievery date: October 26th, 2022 </span>
                <hr />
                <div className='promocode'>
                    <input type="text" placeholder='Promocode'/>
                    <button>Apply</button>
                </div>
                <span>20% off discount</span>
                <hr />
                <table width="100%">
                    <thead>
                        <tr>
                            <td>Total</td>
                            <td>$80.96</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span>Discount</span></td>
                            <td><span>$12.00</span></td>
                        </tr>
                        <tr>
                            <td><span>Delievery</span></td>
                            <td><span>$0.00</span></td>
                        </tr>
                        <tr>
                            <td><span>Tax</span></td>
                            <td><span>+ $14.00</span></td>
                        </tr>
                    </tbody>
                </table>
                <hr />
                <div className='btn-group'>
                    <button>Proceed to checkout</button>
                    <button>Continue shopping</button>
                </div>
            </div>
        </section>
    )

}

export default Cart;