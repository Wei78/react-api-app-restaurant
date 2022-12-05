import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Spinner from '../../spinner/spinner';
import ErrorMessage from '../../errorMessage/errorMessage';
import useFoodService from '../../../services/FoodService';

// import image from '../../../img/burger.jpg';
import './singleDishPage.scss';

const SingleDishPage = () => {

    const {dishId} = useParams();
    const [dish, setDish] = useState(null);

    const {loading, error, getDish, clearError} = useFoodService();

    useEffect(() => {
        updateDish();
    // eslint-disable-next-line 
    }, [dishId])

    const updateDish = () => {
        clearError();
        getDish(dishId)
            .then(onDishLoaded)
    }

    const onDishLoaded = (dish) => {
        setDish(dish);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !dish) ? <View dish={dish} onUpdateDish={updateDish}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({dish}) => {
    const {name, image, description, ingredients} = dish;

    return (
        <section id='single-dish' className='section-mar section-pre'>
            <div className='details'>
                <div className='description'>
                    <h1>{name}</h1>
                    <p>{description}</p>
                </div>
                <div className='main'>
                    <div className='img-box' style={{ backgroundImage: `url(${image})` }}>
                    </div>
                    <div className='main-box'>
                        
                    </div>
                </div>
                <div className='additional'>
                    <h3>Ingredients</h3>
                    <ol>
                        {ingredients.map((line, i) => {
                            return <li key={i}>{line.ingredient}</li>
                        })}
                    </ol>

                </div>
            </div>
        </section>
    )
}

export default SingleDishPage;