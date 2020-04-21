import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
} from 'react-native';

export default class ResultEntry extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.saveData(this.props.item);
  }

  saveData(value) {
    AsyncStorage.setItem(JSON.stringify(value));
    console.log('SAVED SAVED SAVED PLEASE ');
  }

  render() {  
    return (
      <View style={styles.container}>
        <Text>{this.props.title}</Text>
        <Image source={{uri: this.props.image}} style={styles.image} />
        <Button
          color="black"
          title="savesavesave"
          onPress={this.handleSubmit}
        />
      </View>
    )
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