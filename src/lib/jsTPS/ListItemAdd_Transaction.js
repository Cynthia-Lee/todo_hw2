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
export default class ListItemAdd_Transaction extends jsTPS_Transaction {

    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param initList
     * @param initItemToAdd
     */
    constructor(initList, initItemToAdd) {
        super();
        this.list = initList;
        this.itemToAdd = initItemToAdd;
    }
    /*
    constructor(initList, initItemToAdd, initDescriptionToChange, initAssignedToChange, initDueDateToChange, initCompletedToChange) {
        super();
        this.list = initList;
        this.itemToAdd = initItemToAdd;
        // new values
        this.descriptionToChange = initDescriptionToChange;
        this.assignedToChange = initAssignedToChange;
        this.dueDateToChange = initDueDateToChange;
        this.completedToChange = initCompletedToChange;

        // keep old values for undo
    }
    */

    /**
     * 
     */
    // @Override
    doTransaction() {
        // alert(this.list.items.length);
        this.list.items.splice(this.list.items.length, 0, this.itemToAdd);
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    // @Override
    undoTransaction() {
        // remove from list
        let index = this.list.items.indexOf(this.itemToAdd);
        this.list.items.splice(index, 1);
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    // @Override
    toString() {
        return "List Item Add " + this.itemToEdit;
    }
}