import { useState } from 'react';

import RandomDish from '../randomDish/randomDish';
import DishList from '../dishList/dishList';
import DishDescription from '../dishDescription/dishDescription';
import ErrorBoundary from '../errorBoundary/errorBoundary';

import './mainPage.scss';

const MainPage = () => {

    const [selectedDish, setDish] = useState(null);
    
    const onDishSelected = (id) => {
        setDish(id);
    }

    return (
        <div id='main-box'>
            <RandomDish/>
            <main>
                <DishList onDishSelected={onDishSelected}/>
                <ErrorBoundary>
                    <DishDescription dishId={selectedDish}/>
                </ErrorBoundary>
            </main>
        </div>
    )
}

export default MainPage;