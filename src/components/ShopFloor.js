import React from 'react';
import Product from './Product';
import ProductCategory from './ProductCategory';

export default class ShopFloor extends React.Component {

  render() {
    const items = this.props.items.map((item, index) => {
      if (item.type !== 'product') {
        return (
          <ProductCategory  
            {...item}
            itemIndex={index}
            addChildren={this.props.addChildren}
            removeDescendants={this.props.removeDescendants}
            key={item.id}
          />
        )
      } else {
        return <Product 
                {...item} 
                key={item.id}
                itemIndex={index} 
                addToCart={this.props.addToCart}  
                />
      }
    }
    );

    return (
      <div className="ShopFloor">
        <ul>
          {items}
        </ul>
      </div>
    );  
  }
}