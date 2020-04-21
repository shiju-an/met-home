import React from 'react';
import {
  View,
  FlatList,
} from 'react-native';

import ResultEntry from './ResultEntry.js';

export default class ResultsScreen extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
      // currentPagination: [],
      // currentView: this.currentView(),
      // itemsPerPage: 6,
      // currentPage: 1,
      // works: [],
    // };
    // this.currentView = this.currentView.bind(this);
    // this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  // async componentDidMount() {
  //   let allWorks = this.props.data;
  //   this.setState({allWorks: allWorks});
  //   this.setState({
  //     works: allWorks.slice(
  //       0,
  //       this.state.currentPage * this.state.itemsPerPage,
  //     ),
  //   });
  // }

  // handleLoadMore = async () => {
  //   this.setState({
  //     works: [...this.state.works, allWorks.slice(this.state.currentPage * this.state.itemPerPage, (this.state.currentPage + 1) * this.state.itemPerPage)],
  //     currentPage: this.state.currentPage + 1
  //   });
  // }


  // currentView() {
  //   let pagination = 10;
  //   let list = [];
  //   let curPagination;
  //   console.log(this.props.data);
  // console.log(this.state.currentPagination);
  // if (this.state.currentPagination && this.state.currentPagination.length) {
  //   curPagination = this.state.currentPagination.length;
  // } else {
  //   curPagination = 0;
  // }
  // let currentPagination = this.state.currentPagination.length;
  // console.log(this.state.currentPagination.length);

  // for (let i = 0; i < pagination; i++) {
  //   // let arr = this.state.data.slice(this.state.currentPagination.length);
  //   list.push(arr[i]);
  // }
  // this.setState({currentPagination: list});
  // return list;
  // }

  // componentDidUpdate() {
  //   let windowHeight = window.innerHeight;
  //   let scrollState = window.scrollY;
  //   let offset = 100; // If you want to start the load earlier than the bottom

  //   if (scrollState > windowHeight - offset) {
  //     this.currentView();
  //   }
  // }

  render() {
    return (
      <FlatList
        data={this.props.works}
        renderItem={({ item }) => (
          <View>
            <ResultEntry
              keyExtractor={(item, index) => item.key}
              image={item.primaryImage}
              title={item.title}
            />
          </View>
        )}
        // removeClippedSubviews={true} // Unmount components when outside of window
        // initialNumToRender={3} // Reduce initial render amount
        // maxToRenderPerBatch={1} // Reduce number in each render batch
        // updateCellsBatchingPeriod={100} // Increase time between renders
        // windowSize={7} // Reduce the window size
        initialNumToRender={10} // how many item to display first
        onEndReachedThreshold={2} // so when you are at 5 pixel from the bottom react run onEndReached function
        onEndReached={() => {
          this.props.handleLoad();
        }}
      />
    )
  }
}
// export default function ResultsScreen(props) {
//   return (
//     <FlatList
//       data={props.items}
//       renderItem={({ item }) => (
//         <View>
//           <ResultEntry
//             keyExtractor={(item, index) => item.key}
//             image={item.primaryImage}
//             title={item.title}
//           />
//         </View>
//       )}
//       removeClippedSubviews={true} // Unmount components when outside of window
//       initialNumToRender={3} // Reduce initial render amount
//       maxToRenderPerBatch={1} // Reduce number in each render batch
//       updateCellsBatchingPeriod={100} // Increase time between renders
//       windowSize={7} // Reduce the window size
//     />
//   );
// }
