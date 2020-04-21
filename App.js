import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

import SearchScreen from './components/SearchScreen.js';
import ResultsScreen from './components/ResultsScreen.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      // imagesURL: [],
      // title: [],
      // artistDisplayName: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchByArtist = this.searchByArtist.bind(this);
    this.getImages = this.getImages.bind(this);
  }

  handleSubmit(value) {
    this.setState({items: []});
    this.searchByArtist(value);
  }

  searchByArtist(query) {
    axios({
      method: 'get',
      url: 'http://localhost:3000/searchArtist',
      params: {artistName: query},
    })
      .then(data => {
        console.log(data.data.objectIDs, ' client data object ids');
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
        // console.log(
        //   data.data,
        //   'get images on client side, one per image per loop? lol',
        // );
        data.data.forEach(dat => {
          this.setState({items: [...this.state.items, dat]})
          // console.log(dat.primaryImage, ' image urls');
          // this.setState({imagesURL: [...this.state.imagesURL, dat.primaryImage]})
          // console.log(dat.title, ' image titles');
          // this.setState({title: [...this.state.title, dat.title]});        
        });
        // this.setState({items: data.data});
        // this.setState({imagesURL: data.data.primaryImage});
        // this.setState({title: data.data.title});
        console.log(this.state.items);
        // console.log(this.state.imagesURL);
        // console.log(this.state.title);
        // this.setState({artistDisplayName: data.data[0].artistDisplayName});
      })
      .catch(err => console.log('err client get images info', err));
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchScreen handleSubmit={this.handleSubmit} />
        <ResultsScreen items={this.state.items} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
