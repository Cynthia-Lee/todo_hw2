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
export default class ListOwnerChange_Transaction extends jsTPS_Transaction {
    // THIS IS THE OBJECT IT WILL MANIPULATE
    // private Num num;

    // AMOUNT TO ADD/REMOVE FOR NUM
    // private int amountToAdd;

    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param initList
     * @param initOwnerToChange
     */
    constructor(initList, initOwnerToChange) {
        super();
        this.list = initList;
        this.ownerToChange = initOwnerToChange;
        
        // keep old name for undo
        this.oldOwner = initList.owner;
    }

    /**
     * 
     */
    // @Override
    doTransaction() {
        this.list.owner = this.ownerToChange;
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    // @Override
    undoTransaction() {
        this.list.owner = this.oldOwner;
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    // @Override
    toString() {
        return "List Owner Change " + this.ownerToChange;
    }
}