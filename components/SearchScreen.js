import React from 'react';
import {
  View,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      // imagesURL: [],
      // title: [],
      // artistDisplayName: '',
      isLoading: false,
    };

    // this.searchByArtist = this.searchByArtist.bind(this);
    // this.getImages = this.getImages.bind(this);
    this.onSearchInput = this.onSearchInput.bind(this);
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
  }

  // searchByArtist(query) {
  //   console.log(query, ' search query');
  //   axios({
  //     method: 'get',
  //     url: 'http://localhost:3000/searchArtist',
  //     params: { artistName: query },
  //   })
  //     .then(data => {
  //       console.log(data.data.objectIDs, ' client data object ids');
  //       this.getImages(data.data.objectIDs);
  //     })
  //     .catch(err => console.log('err client get artist object ids ', err));
  // }

  // getImages(query) {
  //   axios({
  //     method: 'get',
  //     url: 'http://localhost:3000/getImages',
  //     params: {
  //       id: query,
  //     },
  //   })
  //     .then(data => {
  //       // console.log(
  //       //   data.data,
  //       //   'get images on client side, one per image per loop? lol',
  //       // );
  //       data.data.forEach(dat => {
  //         // console.log(dat.primaryImage, ' image urls');
  //         this.setState({ imagesURL: [...this.state.imagesURL, dat.primaryImage] })
  //         // console.log(dat.title, ' image titles');
  //         this.setState({ title: [...this.state.title, dat.title] });
  //       })
  //       // this.setState({items: data.data});
  //       // this.setState({imagesURL: data.data.primaryImage});
  //       // this.setState({title: data.data.title});
  //       console.log(this.state.imagesURL);
  //       console.log(this.state.title);
  //       this.setState({ artistDisplayName: data.data[0].artistDisplayName });
  //     })
  //     .catch(err => console.log('err client get images info', err));
  // }

  onSearchInput(e) {
    this.setState({ searchQuery: e.nativeEvent.text });
  }

  handleSubmitButton() {
    this.props.handleSubmit(this.state.searchQuery);
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
          // value={this.state.value}
          onChange={this.onSearchInput}
        />
        <Button color="black" title="gogogo" onPress={this.handleSubmitButton} />
        {spinny}
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
