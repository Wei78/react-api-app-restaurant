import './dishList.scss';

import useFoodService from '../../services/FoodService';
import DishItem from '../dishItem/dishItem';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import { useEffect, useRef, useState } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const DishList = (props) => {

    const [dishList, setDishList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(true);
    const [offset, setOffset] = useState(12);
    const [foodEnded, setFoodEnded] = useState(false);
    
    const {loading, error, getFood} = useFoodService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line 
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getFood(offset)
            .then(onDishListLoaded)
    }

    const onDishListLoaded = (newDishList) => {
        let ended = false;
        if (newDishList.length < 9) {
            ended = true
        }

        setDishList(dishList => [...dishList, ...newDishList])
        setNewItemLoading(false);
        setOffset(offset => offset + 12);
        setFoodEnded(ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('selected'));
        itemRefs.current[id].classList.add('selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items = arr.map((item) => {
            return (
                <CSSTransition key={item.id} timeout={500} classNames="dish-item">
                    <DishItem 
                        itemRefs={itemRefs}
                        name={item.name} 
                        image={item.image} 
                        focusOnItem={focusOnItem}
                        onDishSelected={props.onDishSelected} 
                        key={item.id}
                        id={item.id}
                    />
                </CSSTransition>

            )
        });

        return (
            <ol>
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ol>
        )
    }
    
    const items = renderItems(dishList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <section id='menu' className='section-pre1'>
            <h1>Our Menu</h1>
            <div className='header'>
                <span>NAME</span>
                <span>PRICE</span>
            </div>
            {errorMessage}
            {spinner}
            {items}
            <button 
                className='default-btn load-btn'
                disabled={newItemLoading}
                style={{'display': foodEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>Load More</button>
        </section>
    )

}

export default DishList;