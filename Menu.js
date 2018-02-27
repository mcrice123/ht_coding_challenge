import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import MenuItem from './MenuItem';

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

  showModItems(index, subIndex) {
  	const menuItems = this.state.menuItems.map((item, i) => {
  		if (item === null) {
  			return {};
  		}
  		else if (i === index) {
  			let newItem = item.childMenuItems.map((childItem, childIndex) => {
  				if (childItem === null) {
  					return {};
  				}
  				else if (childIndex === subIndex) {
  					let newChildItem = {
  						id: childItem.id,
		  				checkDesc: childItem.checkDesc,
		  				basePrice: childItem.basePrice,
		  				modifierType: childItem.modifierType,
		  				salesMode: childItem.salesMode,
		  				childMenuItems: childItem.childMenuItems,
		  				isOpen: !childItem.isOpen,
  					};
  					return newChildItem;
  				}
  				else return childItem;
  			});
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
								<MenuItem onPress={() => this.showGroupItems(i)} style={styles.groupItem}>{item.checkDesc}</MenuItem>
								{
									item.isOpen && item.childMenuItems.map((child, index) => {
										return (
											<View key={child.id}>
												<MenuItem onPress={() => this.showModItems(i, index)}>{child.checkDesc}</MenuItem>
												{
													child.isOpen && child.childMenuItems.map((mod, modIndex) => {
														return (
															<View key={mod.id}>
															{
																mod.childMenuItems.map((modChild, childIndex) => {
																	return (
																		<Text key={modChild.id}>{modChild.checkDesc}</Text>
																	);
																})
															}
															</View>
														);
													})
												}
											</View>
										);
									}) 
								}
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
  },
  groupItem: {
  	color: '#000000',
  	fontSize: 20,
  },
});
