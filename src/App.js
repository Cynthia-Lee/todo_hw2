import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }

  /**
    * This function will navigate the user to the item screen where they
    * may edit an item.
    */
  goItem() {
    this.setState({currentScreen: AppScreen.ITEM_SCREEN});
    // would have loadList info already
  }

  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists} />;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome.bind(this)}
          goItem={this.goItem.bind(this)}
          todoList={this.state.currentList} 
          todoLists={this.state.todoLists}
          loadList={this.loadList.bind(this)} />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen 
          currentScreen={this.state.currentScreen} // currentScreen: PropTypes.string.isRequired
          // todoItem: PropTypes.object.isRequired
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList} 
          loadList={this.loadList.bind(this)}/>;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;