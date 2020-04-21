import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import SearchScreen from './components/SearchScreen.js';
import ResultsScreen from './components/ResultsScreen.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      artistDisplayName: '',
      myKey: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchByArtist = this.searchByArtist.bind(this);
    this.getImages = this.getImages.bind(this);
    this.displaySaved.bind(this);
  }

  handleSubmit(value) {
    this.setState({ items: [] });
    this.searchByArtist(value);
  }

  searchByArtist(query) {
    axios({
      method: 'get',
      url: 'http://localhost:3000/searchArtist',
      params: { artistName: query },
    })
      .then(data => {
        this.getImages(data.data.objectIDs);
      })
      .catch(err => console.log('err client get artist object ids ', err));
  }

  getImages(query) {
    axios({
      method: 'get',
      url: 'http://localhost:3000/getImages',
      params: {
        id: query,
      },
    })
      .then(data => {
        data.data.forEach(dat => {
          this.setState({ items: [...this.state.items, dat] })
        })
      })
      .catch(err => console.log('err client get images info', err));
  }

  displaySaved = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys()
      const items = await AsyncStorage.multiGet(keys)
      console.log(items);
      return items;
    } catch (error) {
      console.log(error, ' problemo');
    }
  }

  componentDidMount() {
    this.displaySaved();
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchScreen handleSubmit={this.handleSubmit} />
        <ResultsScreen items={this.state.items} storageKey={this.state.myKey}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  image: {
    width: 300,
    height: 300,
  },
});
