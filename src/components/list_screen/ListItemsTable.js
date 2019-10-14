import React, { Component } from 'react'
import ListItemCard from './ListItemCard'
import PropTypes from 'prop-types';

/**
 * ItemSortCriteria - these are the different criteria that can be used for
 * sorting the items in a list's items table.
 */
const ItemSortCriteria = {
    SORT_BY_TASK_INCREASING: "sort_by_task_increasing",
    SORT_BY_TASK_DECREASING: "sort_by_task_decreasing",
    SORT_BY_DUE_DATE_INCREASING: "sort_by_due_date_increasing",
    SORT_BY_DUE_DATE_DECREASING: "sort_by_due_date_decreasing",
    SORT_BY_STATUS_INCREASING: "sort_by_status_increasing",
    SORT_BY_STATUS_DECREASING: "sort_by_status_decreasing"
};

export class ListItemsTable extends Component {

    state = {
        currentItemSortCriteria: "default"
    }
    // CONSTRUCTOR
    // Initializing local state by assigning an object to this.state.
    // Binding event handler methods to an instance.
    constructor(props) {
        super(props);

        this.processSortItemsByTask = this.processSortItemsByTask.bind(this);
        this.isCurrentItemSortCriteria = this.isCurrentItemSortCriteria.bind(this);
        this.compare = this.compare.bind(this);
        this.sortTasks = this.sortTasks.bind(this);

        this.processSortItemsByDueDate = this.processSortItemsByDueDate.bind(this);
        this.processSortItemsByStatus = this.processSortItemsByStatus.bind(this);

        this.createKey = this.createKey.bind(this);
    }
    
    // provided from McKenna's todo javascript code
    
    /**
     * This method sorts the todo list items according to the provided sorting criteria.
     * 
     * @param {ItemSortCriteria} sortingCriteria Sorting criteria to use.
     */
    sortTasks(sortingCriteria) {
        // this.setState({currentItemSortCriteria: sortingCriteria}); doesn't do it right away
        // setState is delayed, using function() will pass it with the updated criteria
        // function callback is guaranteed to fire after the update
        this.setState({currentItemSortCriteria: sortingCriteria}, function() {
            this.props.todoList.items.sort(this.compare);
            this.props.loadList(this.props.todoList);
        });
    }

    /**
     * This method tests to see if the current sorting criteria is the same as the argument.
     * 
     * @param {ItemSortCriteria} testCriteria Criteria to test for.
     */
    isCurrentItemSortCriteria(testCriteria) {
        return this.state.currentItemSortCriteria === testCriteria;
    }

    /**
     * This method compares two items for the purpose of sorting according to what
     * is currently set as the current sorting criteria.
     * 
     * @param {TodoListItem} item1 First item to compare.
     * @param {TodoListItem} item2 Second item to compare.
     */
    compare(item1, item2) {
        // let thisModel = window.todo.model;

        // IF IT'S A DECREASING CRITERIA SWAP THE ITEMS
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_DECREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_DECREASING)) {
            let temp = item1;
            item1 = item2;
            item2 = temp;
        }
        // SORT BY ITEM DESCRIPTION
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_DECREASING)) {
            if (item1.description < item2.description)
                return -1;
            else if (item1.description > item2.description)
                return 1;
            else
                return 0;
        }
        // SORT BY DUE DATE
        else if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING)) {
                let dueDate1 = item1.due_date;
                let dueDate2 = item2.due_date;
                let date1 = new Date(dueDate1);
                let date2 = new Date(dueDate2);
            if (date1 < date2)
                return -1;
            else if (date1 > date2)
                return 1;
            else
                return 0;
        }
        // SORT BY COMPLETED
        else {
            if (item1.completed < item2.completed)
                return -1;
            else if (item1.completed > item2.completed)
                return 1;
            else
                return 0;
        }
    }

    /**
     * This function is called in response to when the user clicks
     * on the Task header in the items table.
     */
    processSortItemsByTask() {
        // alert(this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING));
        // alert(this.state.currentItemSortCriteria);
        // this.state.currentItemSortCriteria = "default";
        // IF WE ARE CURRENTLY INCREASING BY TASK SWITCH TO DECREASING
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)) {
            this.sortTasks(ItemSortCriteria.SORT_BY_TASK_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCREASING
        else {
            this.sortTasks(ItemSortCriteria.SORT_BY_TASK_INCREASING);
        }
    }

     /**
     * This function is called in response to when the user clicks
     * on the Due Date header in the items table.
     */
    processSortItemsByDueDate() {
        // IF WE ARE CURRENTLY INCREASING BY DUE DATE SWITCH TO DECREASING
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)) {
            this.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCREASING
        else {
            this.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING);
        }
    }

    /**
     * This function is called in response to when the user clicks
     * on the Status header in the items table.
     */
    processSortItemsByStatus() {
        // IF WE ARE CURRENTLY INCREASING BY STATUS SWITCH TO DECREASING
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_INCREASING)) {
            this.sortTasks(ItemSortCriteria.SORT_BY_STATUS_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCRASING
        else {
            this.sortTasks(ItemSortCriteria.SORT_BY_STATUS_INCREASING);
        }
    }

    createKeyTest(todoList) {
        var i;
        var currKey;
        // want key that is the smallest number available
        // this seems to be O(n)
        var mOne = null; // start of gap
        var minKey;
        var maxKey;
        for (i = 0; i < todoList.length; i++) {
            currKey = todoList.items[i].key;
            if (currKey > maxKey) { // update max
                maxKey = currKey;
            }
            if (minKey < currKey) {
                minKey = currKey;
            }
            if (currKey == minKey++) { // update smallest key from gap
                minKey = currKey;
            } else {
                mOne = minKey;
            }
        }
        // if mOne is the smallest key with a space after it
        if (mOne != null) {
            return mOne + 1;
        } else {
            return maxKey + 1;
        }
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
    * This method creates a new item for editing and sets up the view for editing.
    */
   createNewItem() {
       var k = this.createKey(this.props.todoList);
       let newItem = {
            "key": k,
            "description": "",
            "due_date": "",
            "assigned_to": "",
            "completed": false
            // key
            // description
            // due date
            // completed
        }      
        // submit
        // cancel
        // this.view.loadItemData(this.newItem);
        // ENABLE/DISABLE THE APPROPRIATE BUTTONS
        return newItem;
    }

    render() {
        return (
            <div id="list_items_container">
                <div className="list_item_header_card">
                    <div className="list_item_task_header" onClick={this.processSortItemsByTask}>Task</div>
                    <div className="list_item_due_date_header" onClick={this.processSortItemsByDueDate}>Due Date</div>
                    <div className="list_item_status_header" onClick={this.processSortItemsByStatus}>Status</div>
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
                <div className="list_item_add_card" onClick={this.props.goItem.bind(this, this.createNewItem())}>&#x2b;</div>
            </div>
        )
    }
}

ListItemsTable.propTypes = {
    loadList: PropTypes.func.isRequired,
    todoList: PropTypes.object.isRequired
}

export default ListItemsTable
