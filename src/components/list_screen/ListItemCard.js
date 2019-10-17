import React, { Component } from 'react'
import PropTypes from 'prop-types'; // added

// jsTPS
import ListItemOrderChange_Transaction from '../../lib/jsTPS/ListItemOrderChange_Transaction'

export class ListItemCard extends Component {

    // handle control z press
    constructor(props) {
        super(props);

        this.processCtrlZ = this.processCtrlZ.bind(this);
    }

    processCtrlZ(event) {
        if (event.ctrlKey && event.keyCode === 90) { // undo, ctrl z
            this.props.jsTPS.undoTransaction();
            this.props.loadList(this.props.todoList);
        } else if (event.ctrlKey && event.keyCode === 89) { // redo, ctrl y
            this.props.jsTPS.doTransaction();
            this.props.loadList(this.props.todoList);
        }
    }

    /*
    getIndex(listItem) {
        var i;
        for (i = 0; i < this.props.todoList.items.length; i++) {
            if (this.props.todoList.items[i] == listItem) {
                return i;
            }
        }
    }
    */

    /*
    // use keys as index
    // this.props.todoList.items[index]
    var itemIndex = listItem.key;
    // B, A 
    // itemIndex = element at A
    let temp = this.props.todoList.items[itemIndex];
    // temp = data at A
    this.props.todoList.items[itemIndex] = this.props.todoList.items[itemIndex-1];
    // B, B
    this.props.todoList.items[itemIndex-1] = temp;
    // A, B
    // update keys
    this.props.todoList.items[itemIndex-1].key = itemIndex - 1;
    this.props.todoList.items[itemIndex].key = itemIndex;
    // load the list
    this.props.loadList(this.props.todoList);

    // need to disable appropriate buttons
    */

    moveItemUp = (listItem, e) => {
        e.stopPropagation();

        /*
        // this.props.todoList.items[index]
        var itemIndex = this.props.todoList.items.indexOf(listItem);
        // B, A 
        // itemIndex = element at A
        let temp = this.props.todoList.items[itemIndex];
        // temp = data at A
        this.props.todoList.items[itemIndex] = this.props.todoList.items[itemIndex-1];
        // B, B
        this.props.todoList.items[itemIndex-1] = temp;
        // A, B
        */
        let transaction = new ListItemOrderChange_Transaction(this.props.todoList, listItem, "up");
        this.props.jsTPS.addTransaction(transaction);

        // load the list
        this.props.loadList(this.props.todoList);
    }

    /*
    moveItemUp = (listItem) => {
        // this.props.todoList.items[index]
        var itemIndex = this.props.todoList.items.indexOf(listItem);
        // B, A 
        // itemIndex = element at A
        let temp = this.props.todoList.items[itemIndex];
        // temp = data at A
        this.props.todoList.items[itemIndex] = this.props.todoList.items[itemIndex - 1];
        // B, B
        this.props.todoList.items[itemIndex - 1] = temp;
        // A, B
        // load the list
        this.props.loadList(this.props.todoList);
    }

    processMoveItemUp = (listItem, e) => {
        e.stopPropagation();

        let transaction = new ListItemOrderChange_Transaction(this.props.todoList, listItem, "up");
        this.props.jsTPS.addTransaction(transaction);

        // this.moveItemUp(listItem);
        
        //this.props.loadList(this.props.todoList);
    }
    */

    moveItemDown = (listItem, e) => {
        e.stopPropagation();

        /*
        var itemIndex = this.props.todoList.items.indexOf(listItem);
        // B, A 
        // itemIndex = element at A
        let temp = this.props.todoList.items[itemIndex];
        // temp = data at A
        this.props.todoList.items[itemIndex] = this.props.todoList.items[itemIndex + 1];
        // B, B
        this.props.todoList.items[itemIndex + 1] = temp;
        // A, B
        // load the list
        this.props.loadList(this.props.todoList);

        // need to disable appropriate buttons
        */
        let transaction = new ListItemOrderChange_Transaction(this.props.todoList, listItem, "down");
        this.props.jsTPS.addTransaction(transaction);

        // load the list
        this.props.loadList(this.props.todoList);
    }

    deleteItem = (listItem, e) => {
        e.stopPropagation();

        var itemIndex = this.props.todoList.items.indexOf(listItem);
        this.props.todoList.items.splice(itemIndex, 1);
        // load the list
        this.props.loadList(this.props.todoList);

        // ENABLE/DISABLE THE APPROPRIATE BUTTONS
    }

    render() {
        return (
            <div className='list_item_card' onClick={this.props.goItem.bind(this, this.props.listItem)}>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                {this.props.listItem.completed ?
                    <div className='list_item_card_completed'>Completed</div> :
                    <div className='list_item_card_not_completed'>Pending</div>
                }

                <div className='list_item_card_toolbar'>
                    {this.props.todoList.items.indexOf(this.props.listItem) == 0 ?
                        <div className='list_item_card_button disabled' onClick={(e) => e.stopPropagation()}>&#x21e7;</div> :
                        // <div className='list_item_card_button' onClick={(e) => this.moveItemUp(this.props.listItem, e)}>&#x21e7;</div>    
                        <div className='list_item_card_button' onClick={(e) => this.moveItemUp(this.props.listItem, e)}>&#x21e7;</div>
                    }
                    {this.props.todoList.items.indexOf(this.props.listItem) == this.props.todoList.items.length - 1 ?
                        <div className='list_item_card_button disabled' onClick={(e) => e.stopPropagation()}>&#x21e9;</div> :
                        <div className='list_item_card_button' onClick={(e) => this.moveItemDown(this.props.listItem, e)}>&#x21e9;</div>
                    }
                    <div className='list_item_card_button' onClick={(e) => this.deleteItem(this.props.listItem, e)}>&#10005;</div>
                </div>
            </div>
        )
    }
}

// <div className='list_item_card_button' onClick={(e) => this.moveItemUp(this.props.listItem, e)}>&#x21e7;</div>

// (e) => this.moveItemUp(this.props.listItem, e)
// {(e) => this.deleteRow(id, e)}
// {this.deleteRow.bind(this, id)}

/*
const TodoSymbols = {
    DELETE: "&#10005;",     // TRASH SYMBOL
    MOVE_DOWN: "&#x21e9;",  // DOWN ARROW
    MOVE_UP: "&#x21e7;",    // UP ARROW
    PLUS: "&#x2b;"          // PLUS
};
*/
/*
<div className='list_item_card_button' onClick={this.moveItemUp.bind(this, this.props.listItem)}>&#8679;</div>
<div className='list_item_card_button' onClick={this.moveItemDown.bind(this, this.props.listItem)}>&#8681;</div>
<div className='list_item_card_button' onClick={this.deleteItem.bind(this, this.props.listItem)}>&#10005;</div>
*/

// PropTypes added
ListItemCard.propTypes = {
    listItem: PropTypes.object.isRequired,
    loadList: PropTypes.func.isRequired,
    todoList: PropTypes.object.isRequired
}

export default ListItemCard
