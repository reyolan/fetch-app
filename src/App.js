import React, { useState, useEffect } from 'react';

import SearchBar from './components/SearchBar';
import ProductCategory from './components/ProductCategory';
import ProductRow from './components/ProductRow';

const DATA_FROM_API = [
  {
    category: 'Sporting Goods',
    price: '$49.99',
    stocked: true,
    name: 'Football',
  },
  {
    category: 'Sporting Goods',
    price: '$9.99',
    stocked: true,
    name: 'Baseball',
  },
  {
    category: 'Sporting Goods',
    price: '$29.99',
    stocked: false,
    name: 'Basketball',
  },
  {
    category: 'Electronics',
    price: '$99.99',
    stocked: true,
    name: 'iPod Touch',
  },
  {
    category: 'Electronics',
    price: '$399.99',
    stocked: false,
    name: 'iPhone 5',
  },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' },
];

// const transformedData = DATA_FROM_API.reduce((acc, curr, index) => {
//   if (index === 1) {
//     return [acc.category, acc, curr];
//   }

//   if (!!acc[index].category && acc[index].category !== curr.category) {
//     return [...acc, curr.category, curr];
//   }

//   return [...acc, curr];
// });

// REDUCE PRACTICE
const transformedData = DATA_FROM_API.reduce(
  (acc, currentData, index, dataArr) => {
    return !acc.length || currentData?.category !== dataArr[index - 1]?.category
      ? [...acc, currentData.category, currentData]
      : [...acc, currentData];
  },
  []
);

function App() {
  const [items, setItems] = useState([]);
  const [inStock, setInStock] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleInStockStatusChange = value => {
    setInStock(value);
  };

  const handleSearchSubmit = value => {
    setKeyword(value);
  };

  useEffect(() => {
    setItems(transformedData);
  }, []);

  useEffect(() => {
    if (!keyword && !inStock) {
      setItems(transformedData);
      return;
    }

    const filteredItems = transformedData.reduceRight((acc, currentItem) => {
      if (
        acc[0]?.category === currentItem ||
        (currentItem.name?.toLowerCase().includes(keyword.toLowerCase()) &&
          (!inStock || currentItem.stocked === inStock))
      ) {
        return [currentItem, ...acc];
      }

      return acc;
    }, []);

    setItems(filteredItems);
  }, [keyword, inStock]);

  return (
    <div className='App'>
      <SearchBar
        inStock={inStock}
        onToggle={handleInStockStatusChange}
        onSearch={handleSearchSubmit}
      />
      <div className='product-table'>
        {items.map(item => {
          return typeof item === 'string' ? (
            <ProductCategory key={item}>{item}</ProductCategory>
          ) : (
            <ProductRow key={item.name} item={item} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
