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

  showModItems(child) {
  	return (
      <View>
      {
        child.childMenuItems && child.childMenuItems.map((mod, modIndex) => {
          return (
            <View key={mod.id}>
                  <Text key={mod.id}>{mod.checkDesc}</Text>
            </View>
          );
        })
      }
      </View>
    );
  }

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Menu</Text>
				{
					this.state.menuItems && this.state.menuItems.map((item, i) => {
						return (
							<View key={item.id}>
								{ /* Display 1st-level Item */}
                <MenuItem onPress={() => this.showGroupItems(i)} style={styles.groupItem}>{item.checkDesc}</MenuItem>
								{
									item.isOpen && item.childMenuItems.map((child, index) => {
										return (
											<View key={child.id}>
                        { /* Display 2nd-level Item */}
												<MenuItem onPress={() => this.showModItems(i, index)} style={styles.menuItem}>{child.checkDesc}</MenuItem>
												{
                            // NOT displaying 3rd-level items, but passing them to function
													  child.childMenuItems && this.showModItems(child.childMenuItems[0])
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
  menuItem: {
    fontWeight: '700',
  }
});
