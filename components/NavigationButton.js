import React from 'react';
import { TouchableHighlight, StyleSheet } from 'react-native';

export default function NavigationButton(props) {
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={() => this.props.navigation.navigate(this.props.navigate)}
    >
      <Text style={styles.text}>Go to {this.props.navigate}</Text>
    </TouchableHighlight>
  )
}

const styles = create StyleSheet({
  button: {
    backgroundColor: '#1E90FF',
    padding: 20,
    borderRadius: 8,
    marginTop: 20
  }
})