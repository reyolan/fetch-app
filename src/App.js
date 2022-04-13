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

const transformedData = DATA_FROM_API.reduce((prev, curr, index) => {
  if (index === 1) {
    return [prev.category, prev, curr];
  }

  if (!!prev[index].category && prev[index].category !== curr.category) {
    return [...prev, curr.category, curr];
  }

  return [...prev, curr];
});

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
    if (inStock) {
      const filteredItems = transformedData.filter(
        item => item.stocked || typeof item === 'string'
      );
      setItems(filteredItems);
    } else {
      setItems(transformedData);
    }
  }, [inStock]);

  useEffect(() => {
    if (keyword) {
      const filteredItems = transformedData.filter(item => {
        return (
          item?.name?.toLowerCase().includes(keyword.toLowerCase()) ||
          typeof item === 'string'
        );
      });
      setItems(filteredItems);
    } else {
      setItems(transformedData);
    }
  }, [keyword]);

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
