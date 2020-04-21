import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

import SearchScreen from './components/SearchScreen.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: [],
      items: [],
    };

    this.searchByArtist = this.searchByArtist.bind(this);
    this.getImages = this.getImages.bind(this);
  }

  searchByArtist(query) {
    axios({
      method: 'get',
      url: 'http://192.168.254.19:3000/searchArtist',
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
      url: 'http://192.168.254.19:3000/getImages',
      params: {
        id: query
      }
    })
      .then(data => {
        console.log(
          data,
          'get images on client side, one per image per loop? lol',
        );
        this.setState({testImages: data})
      })
      .catch(err => console.log('err client get object id info', err));
  }

  componentDidMount() {
    // axios.get('http://192.168.254.19:3000/testObj')
    //   .then(data => {
    //     console.log(data.data.primaryImage);
    //     this.setState({image: data.data.primaryImage});
    //   })
    //   .catch(err => console.log('err client get ', err));
    this.searchByArtist('Gustav Klimt');
      // .then(this.getImages(this.state.imageURL))
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <SearchScreen /> */}
        <Text>HI MET LIFE WHY NO RENDER</Text>
        {/* <Image source={{ uri: this.state.image }} style={styles.image} /> */}
        <Text>TEST {this.state.imageURL[20]}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
});
