import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

class Cart extends Component {

	constructor(props) {
		super(props);
		this.state = {
			total_price:'',
			checkout:'',
			cartitems:[],
			testcheck:'',
			updatedQuantity:'',
			quantityOfProductInCart:''
		}
		this.updateCart = this.updateCart.bind(this);
		this.passEvent = this.passEvent.bind(this);
		this.checkoutdis = this.checkoutdis.bind(this);
		this.updateQuantity = this.updateQuantity.bind(this);
		this.checking = this.checking.bind(this);
	}


componentDidMount() {
	console.log('testing');
	console.log(this.props.match.params.id);
	var id = this.props.match.params.id;
	

	fetch('http://localhost:3017/cart',{credentials:'include'})
	.then(response => response.json())
    .then(data => {
		if(data.message) {
            console.log('uw test completes here ');
            this.props.history.push('/emptycart');
            
		}
		else {
		this.setState({checkout:data.checkout})
		this.setState({total_price:data.total_price})
		this.setState({cartitems:data.cartitems});
		var listOfProducts = {};
		for(var i in data.cartitems) {
			var product = data.cartitems[i];
			listOfProducts[product.title] = product.quantity;
		}
		this.setState({quantityOfProductInCart:listOfProducts});

	}
	})

}

updateQuantity(event) {
console.log(event.target.name);
var updatedObj = {};
updatedObj[event.target.name] = event.target.value;
this.setState({quantityOfProductInCart:{...this.state.quantityOfProductInCart,...updatedObj}});


}

checking(event) {
	event.preventDefault();
	console.log(this.state.quantityOfProductInCart);
}


updateCart(event) {
	event.preventDefault();
	var qtyOfProduct = this.state.quantityOfProductInCart;
	console.log('debugger test final praheja');
	console.log(qtyOfProduct);
	console.log('debugger test praheja done');
	fetch('http://localhost:3017/updatecart',{
		method:'POST',
		credentials:'include',
		headers:{'Content-Type':'application/json'},
		body:(JSON.stringify({
		qtyOfProduct
		})
	)
	})
	.then(res => res.json())
	.then(data => {
		console.log('update cart response');
		console.log(data);
		this.setState({total_price:data.total_price});
		console.log('update cart response end');
	})
}

checkoutdis(event){
	var checkoutbtn = document.getElementById('checkout');
	checkoutbtn.setAttribute('disabled','disabled');

}

passEvent(evt) {
	evt.preventDefault();
	window.location.href = '/checkout'
}


render() {

return (

	<div className="container-main">
	<form>
	<Table className='product-display'>
	<thead>
	<tr>
		<td> Title </td>
		<td> Price </td>
		<td> Quantity </td>
	</tr>
	</thead>
   <tbody>
	   {this.state.cartitems.map( item => 
	   <tr>

	<td> {item.title}  </td>
	<td> {item.price} </td>
	<td> <input type="text" name={item.title} defaultValue={item.quantity} onChange={this.updateQuantity} /> </td>
	</tr>
	   )
	   }
		<tr>
		  	<td> <div> Total Price is {this.state.total_price} </div> </td>
			<td> <button type="submit" onClick={this.updateCart}> Update Cart </button> </td>
			{this.state.checkout==true ?
		   <td><button type="button" onClick={this.passEvent} id="checkout"> Checkout</button></td>
		   :
		   <td>><div>Out Of Inventory </div></td>
	   }
	   </tr>
	   </tbody>
	</Table>
	</form>
	</div>



	) 

}


}

export default Cart;
