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
					return <Text key={i}>{item.id}</Text>;
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
  }
});
