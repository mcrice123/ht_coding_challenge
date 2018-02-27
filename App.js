/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import games from './games.json';
import Selected from './Selected';
import Menu from './Menu';

export default class App extends Component<Props> {
  constructor() {
    super();

    this.state = { selected: [] };
  }

  render() {
    console.log("hello");
    return (
      <View style={styles.container}>
        <Selected items={this.state.selected} />
        <Menu menuItems={games.menuItems} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
    width: '100%',
  },
});
