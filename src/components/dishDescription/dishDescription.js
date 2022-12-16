import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import PropTypes from 'prop-types';
import useFoodService from '../../services/FoodService';

import './dishDescription.scss';
import { useCart } from '../../context/CartContext';

const DishDescription = (props) => {

    const [dish, setDish] = useState(null);

    const {loading, error, getDish} = useFoodService();

    useEffect(() => {
        updateDish();
    // eslint-disable-next-line 
    }, [props.dishId])

    const updateDish = () => {
        const {dishId} = props;
        if (!dishId) {
            return;
        }
        getDish(dishId)
            .then(onDishLoaded)
    }

    const onDishLoaded = (dish) => {
        setDish(dish);
    }

    const skeleton = dish || loading || error ? null : "";
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !dish) ? <View dish={dish} onUpdateDish={updateDish}/> : <h3>Choose dish from menu to see price and description</h3>;

    return (
        <section id='dish-descr'>
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </section>
    )
}

const View = ({dish}) => {
    const {name, image, description, ingredients, id} = dish;
    const { 
        getItemQuantity, 
        increaseCartQuantity, 
        decreaseCartQuantity, 
        removeFromCart 
    } = useCart();
    const quantity = getItemQuantity(id);
    return (
        <>
            <div className='base-info'>
                <div className='img-box' style={{ backgroundImage: `url(${image})` }}>
                    <h1>{name}</h1>
                </div>
                <div className='info-box'>
                    <p>{description}</p>
                    <h3>Ingredients: </h3>
                    <ol>
                        {ingredients.map((line, i) => {
                            if (i > 5) return;
                            return <li key={i}>{line.ingredient}</li>
                        })}
                    </ol>
                    <div className='btn-group'>
                        <Link to={`/${id}`} className='default-btn details-btn'>More Detais</Link>
                        <div className='counter'>
                            <button className='inc' onClick={() => increaseCartQuantity(id)}>+</button>
                            <span className='num'>{quantity}</span>
                            <button className='dec' onClick={() => decreaseCartQuantity(id)}>-</button>
                        </div>
                        <button className='default-btn cart-btn' onClick={() => increaseCartQuantity(id)}><i className="fa-solid fa-cart-shopping"></i>Add to cart</button>
                    </div>
                    
                </div>
            </div>

        </>
    )
}

DishDescription.propTypes = {
    dishId: PropTypes.number
}

export default DishDescription;