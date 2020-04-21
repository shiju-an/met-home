import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';

import ResultEntry from './ResultEntry.js';

export default class ResultsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.separator = this.separator.bind(this);
  }

  separator() {
    return <View style={styles.separator} />;
  }

  render() {
    return (
      <FlatList
        data={this.props.items}
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
