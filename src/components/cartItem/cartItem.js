import { useCart } from '../../context/CartContext';

import './cartItem.scss';

const CartItem = ({id, quantity, visibleData}) => {
    const { removeFromCart } = useCart();
    const item = visibleData.find(i => i.id === id);
    if (item == null) return null;
    return (
        <li className='cart-item'>
                <div className='img-box'>
                    <img src={item.image} alt="" />
                </div>
                <div className='details'>
                    <h4><strong>{item.name}</strong> x{quantity}</h4>
                    <h3>$ {item.price * quantity}</h3>
                    <div className='perunit'>
                        <span>$ {item.price}</span>
                        |
                        <span>Price for one</span>
                    </div>
                    <button className="default-btn"onClick={() => removeFromCart(item.id)}>Remove from cart</button>
                </div>
        </li>
    )
}

export default CartItem;