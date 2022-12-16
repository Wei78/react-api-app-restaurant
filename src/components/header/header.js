import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ThemeContext, themes } from '../../context/themeContext';
import { useState } from 'react';

import './header.scss';

const Header = () => {
    const { cartQuantity } = useCart();
    const [darkMode, setDarkMode] = useState(true);

    return (
        <div id='header'>
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
                    <li>
                        <ThemeContext.Consumer>
                            {({ changeTheme }) => (
                                <button
                                    onClick={() => {
                                        setDarkMode(!darkMode);
                                        changeTheme(darkMode ? themes.light : themes.dark);
                                    }}
                                >
                                    <span>{darkMode ? 'light' : 'dark'}</span>
                                </button>
                            )}
                        </ThemeContext.Consumer>
                    </li>
                </ul>
            </nav>
            <section id='additional'>
                <h4><i className="fa-solid fa-utensils"></i>44 Pearlt Street, Krivoy Rog, Ukraine</h4>
                <h4>+ 38 (096) 585 43 10<i className="fa-solid fa-phone"></i></h4>
            </section>
        </div>

    )
}

export default Header;