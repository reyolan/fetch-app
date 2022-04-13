import React, { useRef } from 'react'
import styled from 'styled-components'

const SearchBarLayout = styled.div`
  margin-bottom: 10px;
`

const SearchBar = ({ inStock, onSearch, onToggle }) => {
  const inputRef = useRef(null)
  const handleSubmit = (e) => {
    e.preventDefault()

    onSearch(inputRef.current.value)
  }

  return (
    <SearchBarLayout>
      <div>
        <form onSubmit={handleSubmit}>
          <input ref={inputRef} type='text' name='search' />
          <button type='submit'>search</button>
        </form>
      </div>
      <div>
        <input
          type='checkbox'
          value={inStock}
          onClick={(e) => onToggle(e.target.checked)}
        />
        <span>only product's in stock</span>
      </div>
    </SearchBarLayout>
  )
}

export default SearchBar
