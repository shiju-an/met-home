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

    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(e) {
    this.setState({value: e.nativeEvent.text});
  }

  render() {
    const spinny = this.state.isLoading ? (
      <ActivityIndicator size="large" />
    ) : null;

    return (
      <View styles={styles.flowRight}>
        <TextInput
          style={styles.search}
          placeholder="search da met collection"
          value={this.state.value}
          onChange={this.onSearch}
        />
        <Button color="black" title="gogogo" />
        {spinny}
      </View>
    );
  }
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
