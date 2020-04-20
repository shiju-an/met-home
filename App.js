import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import axios from 'axios';

import SearchScreen from './components/SearchScreen.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
    };
  }

  componentDidMount() {
    axios.get('http://192.168.254.19:3000/testObj')
      .then(data => {
        console.log(data.data.primaryImage);
        this.setState({image: data.data.primaryImage});
      })
      .catch(err => console.log('err client get ', err));
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchScreen />
        <Text>HI MET LIFE WHY NO RENDER</Text>
        <Image source={{uri: this.state.image}} style={styles.image} />
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
