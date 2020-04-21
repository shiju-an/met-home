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
      searchQuery: '',
      isLoading: false,
    };

    this.onSearchInput = this.onSearchInput.bind(this);
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
  }

  onSearchInput(e) {
    this.setState({ searchQuery: e.nativeEvent.text });
  }

  handleSubmitButton() {
    this.props.handleSubmit(this.state.searchQuery);
  }

  render() {
    // const spinny = this.state.isLoading ? (
    //   <ActivityIndicator size="large" />
    // ) : null;

    return (
      <View styles={styles.flowRight}>
        <TextInput
          style={styles.search}
          placeholder="search da met collection"
          onChange={this.onSearchInput}
        />
        <Button color="black" title="gogogo" onPress={this.handleSubmitButton} />
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
