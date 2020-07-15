import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

import ResultEntry from './ResultEntry.js';

export default class ResultsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      value: this.props.navigation.getParam('value'),
    };

    this.separator = this.separator.bind(this);
    this.searchByArtist = this.searchByArtist.bind(this);
    this.getImages = this.getImages.bind(this);
  }

  separator() {
    return <View style={styles.separator} />;
  }

  searchByArtist(query) {
    axios({
      method: 'get',
      url: 'http://localhost:3000/searchArtist',
      params: {artistName: query},
    })
      .then(data => {
        // console.log(data.data.objectIDs, 'what');
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
      .then(
      //   data => {
      //   data.data.forEach(dat => {
      //     this.setState({items: [...this.state.items, dat]});
      //   });
      // }
      data => {
        this.setState({items: data.data});
      })
      .catch(err => console.log('err client get images info', err));
  }

  componentDidMount() {
    this.searchByArtist(this.state.value);
  }

  render() {
    return (
      <FlatList
        data={this.state.items}
        renderItem={({item}) => (
          <View>
            <ResultEntry
              item={item}
              image={item.primaryImage}
              title={item.title}
              handleAdd={this.props.handleAdd}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        removeClippedSubviews={true} // Unmount components when outside of window
        initialNumToRender={3} // Reduce initial render amount
        maxToRenderPerBatch={1} // Reduce number in each render batch
        updateCellsBatchingPeriod={100} // Increase time between renders
        windowSize={7} // Reduce the window size
        ItemSeparatorComponent={this.separator}
      />
    );
  };
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#000',
  },
});
