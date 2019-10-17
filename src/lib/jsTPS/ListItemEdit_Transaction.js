// package demo;

// import jtps.jTPS_Transaction;
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
export default class ListItemEdit_Transaction extends jsTPS_Transaction {

    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param initList
     * @param initItemToEdit
     */
    constructor(initList, initItemToEdit, initDescriptionToChange, initAssignedToChange, initDueDateToChange, initCompletedToChange) {
        super();
        this.list = initList;
        this.itemToEdit = initItemToEdit;
        // new values
        this.descriptionToChange = initDescriptionToChange;
        this.assignedToChange = initAssignedToChange;
        this.dueDateToChange = initDueDateToChange;
        this.completedToChange = initCompletedToChange;

        // keep old values for undo
        this.oldDescription = this.itemToEdit.description;
        this.oldAssignedTo = this.itemToEdit.assigned_to;
        this.oldDueDate = this.itemToEdit.due_date;
        this.oldCompleted = this.itemToEdit.completed;
    }

    /**
     * 
     */
    // @Override
    doTransaction() {
        this.itemToEdit.description = this.descriptionToChange;
        this.itemToEdit.assigned_to = this.assignedToChange;
        this.itemToEdit.due_date = this.dueDateToChange;
        this.itemToEdit.completed = this.completedToChange;
        // this.props.loadList(this.props.todoList);
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    // @Override
    undoTransaction() {
        this.itemToEdit.description = this.oldDescription;
        this.itemToEdit.assigned_to = this.oldAssignedTo;
        this.itemToEdit.due_date = this.oldDueDate;
        this.itemToEdit.completed = this.oldCompleted;
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    // @Override
    toString() {
        return "List Item Edit " + this.itemToEdit;
    }
}