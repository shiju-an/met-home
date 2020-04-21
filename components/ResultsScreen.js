import React from 'react';
import {
  View,
  FlatList,
} from 'react-native';

import ResultEntry from './ResultEntry.js';

export default function ResultsScreen(props) {
  return (
    <FlatList
      data={props.items}
      renderItem={({ item }) => (
        <View>
          <ResultEntry
            keyExtractor={(item, index) => item.key}
            image={item.primaryImage}
            title={item.title}
          />
        </View>
      )}
      removeClippedSubviews={true} // Unmount components when outside of window
      initialNumToRender={3} // Reduce initial render amount
      maxToRenderPerBatch={1} // Reduce number in each render batch
      updateCellsBatchingPeriod={100} // Increase time between renders
      windowSize={7} // Reduce the window size
    />
  );
}
