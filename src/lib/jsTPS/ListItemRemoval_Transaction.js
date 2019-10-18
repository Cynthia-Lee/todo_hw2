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
export default class ListItemRemoval_Transaction extends jsTPS_Transaction {

    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param initList
     * @param initItemToDelete
     */
    constructor(initList, initItemToDelete) {
        super();
        this.list = initList;
        this.itemToDelete = initItemToDelete;
        this.index = this.list.items.indexOf(this.itemToDelete);
    }

    /**
     * 
     */
    // @Override
    doTransaction() {
        // var itemIndex = this.list.items.indexOf(this.itemToDelete);
        this.list.items.splice(this.index, 1);
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    // @Override
    undoTransaction() {
        // var itemIndex = this.list.items.indexOf(this.itemToDelete);
        this.list.items.splice(this.index, 0, this.itemToDelete);
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    // @Override
    toString() {
        return "List Item Removal " + this.itemToDelete;
    }
}