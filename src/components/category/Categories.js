import React, {  memo } from 'react';
import Type from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const Categories = memo(({ activeCategory, items, onClickCategory }) => {
    return (
        <div className="categories">
            <ul>
                <li 
                    className={activeCategory === null ? 'active' : ''}
                    onClick={() => onClickCategory(null)}>
                    Всі
                </li>
                {items &&
                    items.map((item, index) => (
                <li 
                    className={activeCategory === index ? 'active' : ''}
                    onClick={() => onClickCategory(index)} 
                    key={uuidv4()}>{item}
                </li>
                ))}
            </ul>
      </div>
    );
});

Categories.propTypes = {
    activeCategory: Type.oneOf([Type.number]),
    items: Type.arrayOf(Type.string).isRequired,
    onClickCategory: Type.func
};

export default Categories;