import React from 'react';
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
    this.state = {
      data: '',
    };

    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    console.log('handle add on entry, ', this.props.item);
    this.props.handleAdd(this.props.item);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.title}</Text>
        <Image source={{uri: this.props.image}} style={styles.image} />
        <Button color="black" title="save" onPress={this.handleAdd} />
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