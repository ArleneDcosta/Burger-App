import React , {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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

	updatePurchaseState(){
		
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
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls
				ingredientAdded={this.addIngredientHandler}
				ingredientRemoved={this.removeIngredientHandler}
				disabled={disabledInfo}
				price={this.state.totalPrice}/>
			</Auxiliary>

			);
	}
}

export default BurgerBuilder;

