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

  // Function to select item without modifier
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
        selectedMods: [],
      }
      selected.push(myObject);
      this.setState({ selected: selected });
    }
  }

  // Function to select modifier
  selectMod(obj, mod) {
    let selected = this.state.selected;
    let itemExists = false;
    let modExists = false;
    let newSelected = selected.map((myItem, i) => {
      if (myItem.id === obj.id) {
        itemExists = true;
        let myMods = this.findMod(mod, myItem.selectedMods);
        if (myMods.length === 0) { // if returned array is empty, no further action needed
          modExists = true;
          return myItem;
        }
        else {
          let newObj = myItem;
          newObj.selectedMods = myMods;
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
        selectedMods: [ mod ],
      }
      selected.push(newItem);
      this.setState({ selected: selected });
    }
  }

  findMod(myMod, mods) {
    let exists = false;
    mods.map((mod, i) => {
      if (myMod.id === mod.id) {
        exists = true;
      }
    });
    let finalArray = [];
    if (exists) {
      finalArray = [];
    }
    else { 
      mods.push(myMod);
      finalArray = mods;
    }
    return finalArray;
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
