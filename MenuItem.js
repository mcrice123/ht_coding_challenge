import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

const MenuItem = ({onPress, style, children}) => {
	return (
		<TouchableHighlight onPress={onPress}>
			<Text style={style}>{children}</Text>
		</TouchableHighlight>
	);
};

export default MenuItem;

