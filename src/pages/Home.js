/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Categories, SortPopup, PizzaBlock, LoadingBlock } from '../components';
import { useSelector, useDispatch } from 'react-redux';

import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';

const sortItems = [
  { name: 'популярності', type: 'popular', order: 'desc' },
  { name: 'ціні', type: 'price', order: 'desc' },
  { name: 'алфавіті', type: 'name', order: 'asc' },
];

const categoryNames = [ 
  "М'ясні",
  'Вегетаріанські', 
  'Гриль', 
  'Гострі', 
  'Закриті'
];

const Home = () => {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items); 
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded); 
  const { category, sortBy} = useSelector(({ filters }) => filters);

  useEffect(() => { 
    dispatch(fetchPizzas(sortBy, category));
    
    }, [category, sortBy]);

     
//     // fetch('http://localhost:3000/db.json')
//     //   .then((resp) => resp.json())
//     //   .then(json => setPizzas(json.pizzas))
//   }, []);


  const onSelectCategory = React.useCallback((item) => {
    dispatch(setCategory(item));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  const handleAddPizza = (obj) => {
      dispatch({
        type: 'ADD_PIZZA_CART',
        payload: obj,
      })
  };

  return (
      <div className="container">
        <div className="content__top">
          <Categories  
              activeCategory={ category }
              onClickCategory={ onSelectCategory }
              items={ categoryNames }
              />
          <SortPopup 
              activeSortType={ sortBy.type } 
              items={ sortItems } 
              onClickSortType={onSelectSortType}
              />
        </div>
          <h2 className="content__title">Всі піцци</h2>
          <div className="content__items">
              {isLoaded ?
                items.map(value => (
                <PizzaBlock onClickAddPizza={handleAddPizza} 
                key={value.id} 
                addCount={cartItems[value.id] && cartItems[value.id].items.length}
                {...value}/>
                )) : Array(12)
                  .fill(0)
                  .map((_, index) =>
                  <LoadingBlock key={index}/>)}
          </div>
      </div>
    );
};

export default Home;