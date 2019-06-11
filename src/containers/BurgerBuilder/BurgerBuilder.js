import React , {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
	salad : 10,
	cheese : 20,
	meat : 50,
	bacon : 25

}

class BurgerBuilder extends Component{
	// constructor(props){
	// 	super(props);
	// }
	state ={
		ingredients : {
			
			salad:0,
			bacon : 0,
			cheese:0,
			meat:0
			
		},
		totalPrice : 20,
		purchasable : false
	}

	updatePurchaseState(ingredients){
		const sum = Object.keys(ingredients)
		      .map( igKey => {
				  return ingredients[igKey];
			  })
			  .reduce((sum,el)=>{
					return sum + el;
			  },0);
		this.setState({purchasable: sum > 0});
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type]=updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({ingredients:updatedIngredients,totalPrice:newPrice});
		this.updatePurchaseState(updatedIngredients);
	}
	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount<=0){
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type]=updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({ingredients:updatedIngredients,totalPrice:newPrice});
		this.updatePurchaseState(updatedIngredients);
	}
	render(){
		console.log("Inside render of parent Burger Builder");
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <=0
		}
		//{salad:true,meat:false.....}
		return(
			<Auxiliary>
				<Modal >
					<OrderSummary ingredients={this.state.ingredients}/>
				</Modal>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls
				ingredientAdded={this.addIngredientHandler}
				ingredientRemoved={this.removeIngredientHandler}
				disabled={disabledInfo}
				purchasable = {this.state.purchasable}
				price={this.state.totalPrice}/>
			</Auxiliary>

			);
	}
}

export default BurgerBuilder;

