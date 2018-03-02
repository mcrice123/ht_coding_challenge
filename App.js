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
    this.selectMod = this.selectMod.bind(this);
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
      let myObject = {
        id: obj.id,
        checkDesc: obj.checkDesc,
        basePrice: obj.basePrice,
        modifierType: obj.modifierType,
        salesMode: obj.salesMode,
      }
      selected.push(myObject);
      this.setState({ selected: selected });
    }
  }

  selectMod(obj, mod) {
    let selected = this.state.selected;
    let itemExists = false;
    let modExists = false;
    let newSelected = selected.map((myItem, i) => {
      if (myItem.id === obj.id) {
        itemExists = true;
        if (myItem.selectedMod && (myItem.selectedMod.id === mod.id)) {
          modExists = true;
          return myItem;
        }
        else {
          let newObj = myItem;
          newObj.selectedMod = {
            id: mod.id,
            checkDesc: mod.checkDesc,
            basePrice: mod.basePrice,
            modifierType: mod.modifierType,
            salesMode: mod.salesMode,
          }
          return newObj;
        }
      }
      else return myItem;
    });
    if (itemExists && !modExists) {
      this.setState({ selected: newSelected });
    }
    if (!itemExists) {
      let newItem = {
        id: obj.id,
        checkDesc: obj.checkDesc,
        basePrice: obj.basePrice,
        modifierType: obj.modifierType,
        salesMode: obj.salesMode,
        selectedMod: mod,
      }
      selected.push(newItem);
      this.setState({ selected: selected });
    }
  }

  render() {
    console.log("hello");
    return (
      <View style={styles.container}>
        <Selected items={this.state.selected} />
        <Menu menuItems={games.menuItems} selectItem={this.selectItem} selectMod={this.selectMod} />
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
