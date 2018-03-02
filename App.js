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

    this.selectItem = this.selectItem.bind(this);
  }

  selectItem(obj) {
    let selected = this.state.selected;
    let itemExists = false;
    selected.map((myItem, i) => {
      if (myItem.id === obj.id) {
        itemExists = true;
      }
    });
    if (!itemExists) {
      selected.push(obj);
      this.setState({ selected: selected });
    }
  }

  render() {
    console.log("hello");
    return (
      <View style={styles.container}>
        <Selected items={this.state.selected} />
        <Menu menuItems={games.menuItems} selectItem={this.selectItem} />
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
