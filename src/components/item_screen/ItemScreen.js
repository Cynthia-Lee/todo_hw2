import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    render() {
        return (
            <div>
                THIS HAS NOTHING SO FAR!
            </div>
        )
    }
}

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired
}

//goHome={this.goHome.bind(this)}
//todoList={this.state.currentList} 
//loadList={this.loadList.bind(this)}/>;

export default ItemScreen
