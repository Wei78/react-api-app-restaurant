// import logo from '../../img/logo.png';

import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

import './header.scss';

const Header = () => {
    const { cartQuantity } = useCart();

    return (
        <nav id='navbar'>
            <ul id='navlist'>
                <li>
                    <NavLink 
                        end 
                        to="/" 
                        className={({ isActive }) => isActive ? 'navlink active' : 'navlink'}
                    >Home</NavLink>
                </li>
                <li>
                    <NavLink 
                        end 
                        to="/about" 
                        className={({ isActive }) => isActive ? 'navlink active' : 'navlink'}
                    >About</NavLink>
                </li>
                <li>
                    <NavLink 
                        end 
                        to="/cart"
                        className={({ isActive }) => isActive ? 'navlink active' : 'navlink'}
                    >
                        <i className="fa-solid fa-bag-shopping"></i>
                        {cartQuantity > 0 ? <span className="badge">{cartQuantity}</span> : null}
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Header;