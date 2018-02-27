import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

class Menu extends Component {

	constructor() {
		super();
		this.state = { menuItems: [] };
	}

	componentDidMount() {
		let menuItems = [];
		menuItems = this.props.menuItems.map((item,i) => {
			item.isOpen = false;
			return item;
		});
		this.setState({ menuItems: menuItems });
	}

  showGroupItems(index) {
  	const menuItems = this.state.menuItems.map((item, i) => {
  		if (item === null) {
  			return {};
  		}
  		else if (i === index) {
  			let newItem = {
  				id: item.id,
  				checkDesc: item.checkDesc,
  				basePrice: item.basePrice,
  				modifierType: item.modifierType,
  				salesMode: item.salesMode,
  				childMenuItems: item.childMenuItems,
  				isOpen: !item.isOpen,
  			};
  			return newItem;
  		}
  		else return item;
  	});
  	this.setState({ menuItems: menuItems });
  }

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Menu</Text>
				{
					this.state.menuItems && this.state.menuItems.map((item, i) => {
						return (
							<View key={item.id}>
								<TouchableHighlight onPress={() => this.showGroupItems(i)}>
									<Text>{item.checkDesc}</Text>
								</TouchableHighlight>
								{item.isOpen ? <Text>True</Text> : <Text>False</Text> }
							</View>
						);
					})
				}
			</View>
		);
	}
}

export default Menu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: '50%',
  },
  title: {
  	fontSize: 28,
  }
});
