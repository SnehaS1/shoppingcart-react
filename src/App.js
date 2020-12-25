import React from "react"; 
import Cart from "./Components/Cart";
import Filter from "./Components/Filter";
import Products from "./Components/Products";
import data from "./data.json";

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      products: data.products,
      cartItems: JSON.parse(localStorage.getItem("cartItems"))? JSON.parse(localStorage.getItem("cartItems")): [],
      size: "",
      sort: ""
    }
  }
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    },()=>{ localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));});
   
  };
  addToCart = (product)=>{
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item=>{
      if(item._id === product._id){
        item.count ++;
        alreadyInCart= true;
      }
    })
    if(!alreadyInCart){
      cartItems.push({...product, count:1})
    }
    this.setState({cartItems});
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
  sortProducts(event) {
    const sort = event.target.value;
    console.log(sort, "lkklkl");
    this.setState((state) => ({
      sort: sort,
      products: this.state.products.slice()
      .sort((a,b) => 
        sort === "lowest" ? 
        a.price > b.price ? 1:-1
         : sort === "highest"
          ?  a.price < b.price ? 1: -1
          :a._id < b._id ? 1:-1
      )


    }))
  }
  filterProducts (event) {
    if(event.target.value === ""){
      this.setState({size: event.target.value, products: data.products})
    }else{
      this.setState({
        size: event.target.value,
        products: data.products.filter(product=> product.availableSizes.indexOf(event.target.value)>=0)
      })
    }
  }
  render(){
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          Product List
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length} sort ={this.state.sort} filterProducts={this.filterProducts.bind(this)} sortproduct={this.sortProducts.bind(this)} size={this.state.size}></Filter>
              <Products products={this.state.products} addToCart={this.addToCart}></Products>
              </div>
              <div className="sidebar">
                <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart}/>
            </div>
          </div>
        </main>
        <footer>
          All Rights Reserved
        </footer>
      </div>
    );
  }
  
}

export default App;
