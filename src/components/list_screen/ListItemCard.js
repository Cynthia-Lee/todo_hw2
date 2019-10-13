import React, { Component } from 'react'
import PropTypes from 'prop-types'; // added

export class ListItemCard extends Component {

    moveItemUp = (listItem) => {
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
                    <div className='list_item_card_button' onClick={this.moveItemUp.bind(this, this.props.listItem)}>&#8679;</div>
                    <div className='list_item_card_button'>&#8681;</div>
                    <div className='list_item_card_button'>&#10005;</div>
                </div>
            </div>
        )
    }
}

// PropTypes added
// {this.props.loadList.bind(this, this.props.todoList)}
ListItemCard.propTypes = {
    listItem: PropTypes.object.isRequired,
    loadList: PropTypes.func.isRequired,
    todoList: PropTypes.object.isRequired
}

export default ListItemCard
