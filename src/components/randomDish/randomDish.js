import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFoodService from '../../services/FoodService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './randomDish.scss';

const RandomDish = (props) => {
    const [dish, setDish] = useState({});

    const {loading, error, getDish, clearError} = useFoodService();

    const updateDish = () => {
        clearError();
        const id = Math.floor(Math.random() * (20 - 1) + 1);
        getDish(id)
            .then(onDishLoaded)
    }

    useEffect(() => {
        updateDish();
        // eslint-disable-next-line 
    }, [])

    const onDishLoaded = (dish) => {
        setDish(dish);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View dish={dish} onUpdateDish={updateDish}/> : null;

    return (
        <section id='randomdish' className='section-pre'>
            {errorMessage}
            {spinner}
            {content}
        </section>
    )
}

const View = ({dish, onUpdateDish}) => {
    const {name, image, description, id} = dish;

    return (
        <>
            <div className='img-block' style={{ backgroundImage: `url(${image})` }}></div>
            <div className='description'>
                <h2>{name}</h2>
                <p>{description}</p>
                <div className='btn-group'>
                    <button className='default-btn' onClick={() => onUpdateDish()}>Try another dish!</button>
                    <Link to={`/${id}`} className='default-btn details-btn'>More Detais</Link>
                </div>
            </div>
        </>
    )
}

export default RandomDish;