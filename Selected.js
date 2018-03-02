import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const Selected = ({ items }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Selected Menu</Text>
			{
				items.map((item, i) => {
					return (
            <View key={i}>
              <Text style={styles.menuItem}>{item.checkDesc}</Text>
              { 
                item.selectedMods && item.selectedMods.map((mod, i) => {
                return <Text key={i}>{mod.checkDesc}</Text>;
                })
              }
            </View>
          );
				})
			}
		</View>
	);
};

export default Selected;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    width: '50%',
    height: '100%',
    flexDirection: 'column',
    borderRightWidth: 2,
    borderRightColor: '#000000',
  },
  title: {
  	fontSize: 28,
  },
  menuItem: {
    fontWeight: '700',
  },
});
