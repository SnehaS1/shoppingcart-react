import React from 'react'

function Filter(props) {
    return (
        <div className="filter">
           <div className="filter-result">{props.count}</div> 
        <div className="filter-sort">Order <select value={props.sort} onChange={e=> props.sortproduct(e)}>
        <option value="latest">Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
            </select></div>
        <div className="filter-size">Filter
        <select value={props.size} onChange={e => props.filterProducts(e)}>
            <option value="">ALL</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXl">XXl</option>
            <option value="XXXl">XXXl</option>
        </select>
        </div>
        </div>
    )
}

export default Filter
