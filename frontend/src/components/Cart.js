import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

class Cart extends Component {

	constructor(props) {
		super(props);
		this.state = {
			total_price:'',
			checkout:'',
			cartitems:[]
		}
		this.updateCart = this.updateCart.bind(this);
		this.passEvent = this.passEvent.bind(this);
		this.checkoutdis = this.checkoutdis.bind(this);
	}


componentDidMount() {
	console.log('testing');
	console.log(this.props.match.params.id);
	var id = this.props.match.params.id;
	var url = 'http://localhost:3017/cart/add/'+id;
	console.log(url);
	fetch(url,{credentials:'include'})
	.then(response => response.json())
    .then(data => {
        console.log('debugger final 100');
		console.log(JSON.stringify(data));
		console.log(data.cartitems[0]);
		this.setState({checkout:data.checkout})
		this.setState({total_price:data.total_price})
		this.setState({cartitems:data.cartitems});

        console.log('debugger final 101');
    })
}

updateCart(evt) {
	fetch('http://localhost:3017/updatecart',{
		method:'POST',
	
	})
	.then(res => res.json())
	.then(data => {
		console.log('update cart response');
		console.log(data);
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
	<form method="POST" action={this.updateCart}>
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
	<td> <input type="text" name={item.title} defaultValue={item.quantity} onkeyup={this.checkoutdis} /> </td>
	</tr>
	   )
	   }

   </tbody>
	
	</Table>
	{
		   this.state.checkout==true ?
		   <button type="button" onclick="passEvent(event)" id="checkout"> Checkout</button>
		   :
		  <div>> Sorry you have one of the products with lesser inventory so you cannot checkout </div>
	   }
	   <div> Total Price is {this.state.total_price} </div>
	   <button type="submit"> Update Cart </button>
	   <div id='checking'> {this.state.checkout} </div>
	</form>
	</div>



	) 

}


}

export default Cart;
