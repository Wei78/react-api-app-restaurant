import { useState } from 'react';
import './dishItem.scss';

const DishItem = ({name, image, onDishSelected, id, focusOnItem, itemRefs}) => {
    const [open, setOpen] = useState(false);

    return (
        <li 
            ref={el => itemRefs.current[id] = el}
            className="dish-item"
            onClick={() => {
                onDishSelected(id);
                focusOnItem(id);
            }}>
            <img src={image} style={{display: open ? "block" : "none"}} alt="" />
            <div 
                className='dish-name' 
                onMouseOver={() => setOpen(true)} 
                onMouseOut={() => setOpen(false)}
            >{name}</div>
            <span>$ 4.99</span>
        </li>
    )
}

export default DishItem;
