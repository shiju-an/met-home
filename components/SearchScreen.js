import React from 'react';
import {
  View,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isLoading: false,
    };

    this.onSearchInput = this.onSearchInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onSearchInput(e) {
    this.setState({ value: e.nativeEvent.text });
  }

  handleSubmit() {
    this.props.navigation.navigate('Results', {value: this.state.value});
  }

  render() {
    // const spinny = this.state.isLoading ? (
    //   <ActivityIndicator size="large" />
    // ) : null;

    return (
      <View styles={styles.flowRight}>
        <TextInput
          style={styles.search}
          placeholder="search"
          onChange={this.onSearchInput}
        />
        <Button color="black" title="search" onPress={this.handleSubmit} />
        {/* {spinny} */}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
  },
});
