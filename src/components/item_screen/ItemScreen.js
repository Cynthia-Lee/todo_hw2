import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {

    state = {
        description: this.props.todoItem.description, 
        due_date: this.props.todoItem.due_date, 
        assigned_to: this.props.todoItem.assigned_to, 
        completed: this.props.todoItem.completed, 
    }

    /**
     * This method updates the item argument with new description, assignedTo,
     * dueDate, and completed values.
     * 
     * @param {TodoListItem} item Item to update.
     * @param {String} description New description value.
     * @param {String} assignedTo New assignedTo value.
     * @param {String} dueDate New due date value.
     * @param {Boolean} completed New completed value.
     */
    updateItem(item, description, assignedTo, dueDate, completed) {
        item.description = description;
        item.assigned_to = assignedTo;
        item.due_date = dueDate;
        item.completed = completed;
        this.props.loadList(this.props.todoList);
        // this.view.loadListData(this.listToEdit);
        // this.editItem = null;
        // this.newItem = null;
    }

    createKey(todoList) {
        // array.find(function(item){ return item.key==i }
        var i;
        for (i = 0; i < todoList.items.length; i++) {
            if((todoList.items.find(function(item){ return item.key==i })) == null) { // true if found
                return i;
            }
        }
        return i;
    }

    /**
     * This method adds and updates the new item to the list with the
     * arguments provided.
     * 
     * @param {String} description 
     * @param {String} assignedTo 
     * @param {String} dueDate 
     * @param {Boolean} completed 
     */
     updateNewItem(item, description, assignedTo, dueDate, completed) {
        var k = this.createKey(this.props.todoList);
        item.key = k;
        this.addItem(item);
        this.updateItem(item, description, assignedTo, dueDate, completed);
        // this.listToEdit.addItem(this.newItem);
        // this.updateItem(this.newItem, description, assignedTo, dueDate, completed);

    }         

    addItem(item) {
        this.props.todoList.items.splice(this.props.todoList.items.length, 0, item);
        // this.props.loadList(this.props.todoList);
    }

    // Edit item

    /**
     * This method updates the item being edited with the arguments provided.
     * 
     * @param {String} description New description value.
     * @param {String} assignedTo New assignedTo value.
     * @param {String} dueDate New due date value.
     * @param {Boolean} completed New completed value.
     */
    updateEditedItem(item, description, assignedTo, dueDate, completed) {
        this.updateItem(item, description, assignedTo, dueDate, completed);
    }

    render() {
        return (
            <div id="todo_item">
                <h3 id="item_heading">Item</h3>
                <div id="item_form_container">
                    <div id="item_description_prompt" className="item_prompt">Description:</div>
                    <input id="item_description_textfield" className="item_input" type="input"
                        defaultValue={this.props.todoItem.description}
                        onChange={e => this.setState({description: e.target.value})} />
                    <div id="item_assigned_to_prompt" className="item_prompt">Assigned To:</div>
                    <input id="item_assigned_to_textfield" className="item_input" type="input" 
                        defaultValue={this.props.todoItem.assigned_to}
                        onChange={e => this.setState({assigned_to: e.target.value})} />
                    <div id="item_due_date_prompt" className="item_prompt">Due Date:</div>
                    <input id="item_due_date_picker" className="item_input" type="date" 
                        defaultValue={this.props.todoItem.due_date}
                        onChange={e => this.setState({due_date: e.target.value})} />
                    <div id="item_completed_prompt" className="item_prompt">Completed:</div>
                    <input id="item_completed_checkbox" className="item_input" type="checkbox" 
                        defaultChecked={this.props.todoItem.completed}
                        onChange={e => this.setState({completed: e.target.checked})} />
                </div>
                <button id="item_form_submit_button" className="item_button" onClick={this.props.todoItem.key == null ? 
                    this.updateNewItem.bind(this, this.props.todoItem, this.state.description, this.state.assigned_to, this.state.due_date, this.state.completed) 
                    : this.updateEditedItem.bind(this, this.props.todoItem, this.state.description, this.state.assigned_to, this.state.due_date, this.state.completed)}>Submit</button>
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

export default ItemScreen
