import React, { Component } from 'react'
import PropTypes from 'prop-types'; // added

export class ListItemCard extends Component {

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

    moveItemUp = (listItem) => {
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
        // load the list
        this.props.loadList(this.props.todoList);

        // need to disable appropriate buttons
        
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
    }

    moveItemDown = (listItem) => {
        var itemIndex = this.props.todoList.items.indexOf(listItem);
        // B, A 
        // itemIndex = element at A
        let temp = this.props.todoList.items[itemIndex];
        // temp = data at A
        this.props.todoList.items[itemIndex] = this.props.todoList.items[itemIndex+1];
        // B, B
        this.props.todoList.items[itemIndex+1] = temp;
        // A, B
        // load the list
        this.props.loadList(this.props.todoList);

        // need to disable appropriate buttons
    }

    deleteItem = (listItem) => {
        var itemIndex = this.props.todoList.items.indexOf(listItem);
        this.props.todoList.items.splice(itemIndex, 1);
        // load the list
        this.props.loadList(this.props.todoList);

        // ENABLE/DISABLE THE APPROPRIATE BUTTONS
    }
    
    render() {
        return (
            <div className='list_item_card'>
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
                    <div className='list_item_card_button' onClick={this.moveItemUp.bind(this, this.props.listItem)}>&#x21e7;</div>
                    <div className='list_item_card_button' onClick={this.moveItemDown.bind(this, this.props.listItem)}>&#x21e9;</div>
                    <div className='list_item_card_button' onClick={this.deleteItem.bind(this, this.props.listItem)}>&#10005;</div>
                </div>
            </div>
        )
    }
}

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
// {this.props.loadList.bind(this, this.props.todoList)}
ListItemCard.propTypes = {
    listItem: PropTypes.object.isRequired,
    loadList: PropTypes.func.isRequired,
    todoList: PropTypes.object.isRequired
}

export default ListItemCard
