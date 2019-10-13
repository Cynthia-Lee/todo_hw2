import React, { Component } from 'react'
import ListItemCard from './ListItemCard'
import PropTypes from 'prop-types';

export class ListItemsTable extends Component {
    render() {
        return (
            <div id="list_items_container">
                <div class="list_item_header_card">
                    <div className="list_item_task_header">Task</div>
                    <div className="list_item_due_date_header">Due Date</div>
                    <div className="list_item_status_header">Status</div>
                </div>
                {
                    this.props.todoList.items.map((todoItem)=>(
                        <ListItemCard 
                            key={todoItem.key}
                            todoList={this.props.todoList}
                            loadList={this.props.loadList} 
                            listItem={todoItem} />
                    ))
                }
            </div>
        )
    }
}



ListItemsTable.propTypes = {
    loadList: PropTypes.func.isRequired,
    todoList: PropTypes.object.isRequired
}

export default ListItemsTable
