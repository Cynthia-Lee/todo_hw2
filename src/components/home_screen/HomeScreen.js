import React, { Component } from 'react'
import Banner from './Banner'
import HomeHeader from './HomeHeader'
import TodoListLinks from './TodoListLinks'
import PropTypes from 'prop-types';

export class HomeScreen extends Component {

    loadNewList = () => {
        // create new list
        let newList = {
            // key
            // name
            // owner
            // items arr
        }
        
        // add to top of all lists
        // this.prependList(this.listToEdit);
        this.props.todoLists.unshift(newList);

        // changing currList
        // go to new list page
        this.props.loadList(newList);
    }

    render() {
        return (
            <div id="todo_home">
                <div id="home_your_lists_container">
                    <HomeHeader />
                    <TodoListLinks loadList={this.props.loadList} todoLists={this.props.todoLists} />
                </div>
                <Banner />
                <div id="home_new_list_container">
                    <button id="home_new_list_button" onClick={this.loadNewList}>
                        Create a New To Do List
                    </button>
                </div>
            </div>
        )
    }
}

HomeScreen.propTypes = {
    loadList: PropTypes.func.isRequired,
    todoLists: PropTypes.array.isRequired
}

export default HomeScreen
