import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {

    // load item that was passed, todoItems
    loadItem() {

    }

    addItem(item) {
        this.props.todoList.items.splice(this.props.todoList.items.length, 0, item);
        this.props.loadList(this.props.todoList);
    }

    render() {
        return (
            <div id="todo_item">
                <h3 id="item_heading">Item</h3>
                <div id="item_form_container">
                    <div id="item_description_prompt" className="item_prompt">Description:</div>
                    <input id="item_description_textfield" className="item_input" type="input" />
                    <div id="item_assigned_to_prompt" className="item_prompt">Assigned To:</div>
                    <input id="item_assigned_to_textfield" className="item_input" type="input" />
                    <div id="item_due_date_prompt" className="item_prompt">Due Date:</div>
                    <input id="item_due_date_picker" className="item_input" type="date" />
                    <div id="item_completed_prompt" className="item_prompt">Completed:</div>
                    <input id="item_completed_checkbox" className="item_input" type="checkbox" />
                </div>
                <button id="item_form_submit_button" className="item_button" onClick={this.addItem.bind(this, this.props.todoItem)}>Submit</button>
                <button id="item_form_cancel_button" className="item_button" onClick={this.props.loadList.bind(this, this.props.todoList)}>Cancel</button>
            </div>
        )
    }
}

// this.addItem(this.props.todoItem)
// submit should differentiate between add item and edit item

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired,
    todoList: PropTypes.object.isRequired,
    loadList: PropTypes.func.isRequired
}

//goHome={this.goHome.bind(this)}
//todoList={this.state.currentList} 
//loadList={this.loadList.bind(this)}/>;

export default ItemScreen
