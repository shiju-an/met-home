import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

import SearchScreen from './components/SearchScreen.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // searchQuery: 'Gustav Klimt',
      imagesURL: [],
      title: [],
      artistDisplayName: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchByArtist = this.searchByArtist.bind(this);
    this.getImages = this.getImages.bind(this);
  }

  // handleSubmit(value) {
  //   this.setState({searchQuery: value});
  //   console.log(this.state.searchQuery);
  // }

  handleSubmit(value) {
    console.log('handle submit on app.js');
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
          // console.log(dat.primaryImage, ' image urls');
          this.setState({imagesURL: [...this.state.imagesURL, dat.primaryImage]})
          // console.log(dat.title, ' image titles');
          this.setState({title: [...this.state.title, dat.title]});        
        })
        // this.setState({items: data.data});
        // this.setState({imagesURL: data.data.primaryImage});
        // this.setState({title: data.data.title});
        console.log(this.state.imagesURL);
        console.log(this.state.title);
        this.setState({artistDisplayName: data.data[0].artistDisplayName});
      })
      .catch(err => console.log('err client get images info', err));
  }

  // componentDidMount() {
  //   this.searchByArtist(this.state.searchQuery);
  // }

  render() {
    return (
      <View style={styles.container}>
        <SearchScreen handleSubmit={this.handleSubmit} />
        <Text>HI MET LIFE WHY NO RENDER</Text>
        {/* <Image source={{uri: this.state.imageURL[0]}} style={styles.image} /> */}
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
