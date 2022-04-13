import React from 'react'
import styles from './ProductRow.module.css'

const ProductRow = ({ item }) => {
  return (
    <div className={styles['product-row']}>
      <span>{item.name}</span>{' '}
      <span className={item.stocked ? styles.green : styles.red}>
        {item.stocked ? 'in stock' : 'out of stock'}
      </span>{' '}
      <span className='price'>{item.price}</span>
    </div>
  )
}

export default ProductRow
