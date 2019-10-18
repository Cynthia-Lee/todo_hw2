// jsTPS
import jsTPS_Transaction from './jsTPS_Transaction'

/**
 * 
 * 
 * This class is a transaction that can be executed and undone. It
 * can be stored in the jTPS transaction stack and must be constructed
 * with all the data necessary to perform both do and undo.
 * 
 * @author THE McKilla Gorilla (accept no imposters)
 * @version 2.0
 */

const ItemSortCriteria = {
    SORT_BY_TASK_INCREASING: "sort_by_task_increasing",
    SORT_BY_TASK_DECREASING: "sort_by_task_decreasing",
    SORT_BY_DUE_DATE_INCREASING: "sort_by_due_date_increasing",
    SORT_BY_DUE_DATE_DECREASING: "sort_by_due_date_decreasing",
    SORT_BY_STATUS_INCREASING: "sort_by_status_increasing",
    SORT_BY_STATUS_DECREASING: "sort_by_status_decreasing"
};

export default class ListItemSorts_Transaction extends jsTPS_Transaction {

    /*
    state = {
        currentItemSortCriteria: "default"
    }
    */

    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param initList
     * @param initCurrentItemSortCriteria
     */
    constructor(initList, initCurrentItemSortCriteria) {
        super();
        this.list = initList;
        this.currentItemSortCriteria = initCurrentItemSortCriteria; // currentItemSortCriteria

        // keep old name for undo
        // this.oldList = initList.items.slice();
        this.oldList = new Array();
        let i = 0;
        for (i = 0; i < this.list.items.length; i++) {
            this.oldList[i] = this.list.items[i];
        }
        // console.log(this.oldList);
        // console.log("---");

        // methods
        this.compare = this.compare.bind(this);
        this.sortTasks = this.sortTasks.bind(this);
    }

    sortTasks() {
        this.list.items.sort(this.compare);
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
        if (this.currentItemSortCriteria == ItemSortCriteria.SORT_BY_TASK_DECREASING
            || this.currentItemSortCriteria == ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING
            || this.currentItemSortCriteria == ItemSortCriteria.SORT_BY_STATUS_DECREASING) {
            let temp = item1;
            item1 = item2;
            item2 = temp;
        }
        // SORT BY ITEM DESCRIPTION
        if (this.currentItemSortCriteria == ItemSortCriteria.SORT_BY_TASK_INCREASING
            || this.currentItemSortCriteria == ItemSortCriteria.SORT_BY_TASK_DECREASING) {
            if (item1.description < item2.description)
                return -1;
            else if (item1.description > item2.description)
                return 1;
            else
                return 0;
        }
        // SORT BY DUE DATE
        else if (this.currentItemSortCriteria == ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING
            || this.currentItemSortCriteria == ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING) {
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
     * 
     */
    // @Override
    doTransaction() {
        this.sortTasks();
        // console.log(this.list.items);
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    // @Override
    undoTransaction() {
        // this.list.items = this.oldList.items;
        let i = 0;
        for (i = 0; i < this.list.items.length; i++) {
            this.list.items[i] = this.oldList[i];
        }
        // load the old list
        // console.log(this.list.items);
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    // @Override
    toString() {
        return "List Item Sort " + this.currentItemSortCriteria;
    }
}