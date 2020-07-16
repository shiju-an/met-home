import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

import Navigator from './routes/homeStack.js';

// import SearchScreen from './components/SearchScreen.js';
// import ResultsScreen from './components/ResultsScreen.js';
// import GalleryScreen from './components/GalleryScreen.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentSaved: '',
      saved: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchByArtist = this.searchByArtist.bind(this);
    this.getImages = this.getImages.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.displaySaved = this.displaySaved.bind(this);
  }

  handleSubmit(value) {
    this.setState({items: []});
    this.searchByArtist(value);
  }

  async handleAdd(value) {
    await this.setState({
      currentSaved: value,
    });
    console.log('PRESSED ADDED??');

    axios({
      method: 'post',
      url: 'http://localhost:3000/gallery',
      data: {
        data: value,
      },
    })
      .then(res => {
        console.log('post client res ', res)
        this.displaySaved();
      })
      .catch(err => console.log('error post ', err.response.data));
  }

  searchByArtist(query) {
    axios({
      method: 'get',
      url: 'http://localhost:3000/searchArtist',
      params: {artistName: query},
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
          this.setState({items: [...this.state.items, dat]});
        })
      })
      .catch(err => console.log('err client get images info', err));
  }

  displaySaved() {
    axios({
      method: 'get',
      url: 'http://localhost:3000/gallery',
    })
      .then(data => {
        data.data.forEach(dat => {
          this.setState({saved: [...this.state.saved, dat.data]})
        })
        console.log(data.data, ' saved images data');
        console.log(this.state.saved, 'STATE SAVED');
      })
      .catch(err => console.log('err client get saved info', err.response.data));
      //let copy = this.state.saved.slice()
      //data => {copy.push(data)}
      //this.setState({saved: copy})
  }

  componentDidMount() {
    this.displaySaved();
  }

  render() {
    return (
      <Navigator />
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
