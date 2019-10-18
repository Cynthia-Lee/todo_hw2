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
export default class ListItemOrderChange_Transaction extends jsTPS_Transaction {

    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param initList
     * @param initItemOrderToChange
     */
    constructor(initList, initItemOrderToChange, initmoveDirection) {
        super();
        this.list = initList;
        this.itemOrderToChange = initItemOrderToChange;
        this.moveDirection = initmoveDirection;

        let itemIndex = initList.items.indexOf(initItemOrderToChange);
        this.index = itemIndex;
        // this.setState({ move: initmoveDirection });

        // keep old name for undo
        // this.oldName = initList.name;
    }

    /**
     * 
     */
    // @Override
    doTransaction() {
        if (this.moveDirection == "up") {
            this.list.items[this.index] = this.list.items[this.index - 1];
            this.list.items[this.index - 1] = this.itemOrderToChange;
        } else if (this.moveDirection == "down") {
            this.list.items[this.index] = this.list.items[this.index + 1];
            this.list.items[this.index + 1] = this.itemOrderToChange;
        } else {
            console.log(this.moveDirection + "is an invalid ListItemOrderChange_Transaction move direction");
        }
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    // @Override
    undoTransaction() {
        // this.list.name = this.oldName;
        if (this.moveDirection == "up") {
            // console.log(this.index);
            // console.log(this.itemOrderToChange);
            this.list.items[this.index - 1] = this.list.items[this.index];
            this.list.items[this.index] = this.itemOrderToChange;
        } else if (this.moveDirection == "down") {
            this.list.items[this.index + 1] = this.list.items[this.index];
            this.list.items[this.index] = this.itemOrderToChange;
        } else {
            console.log("Undo ListItemOrderChange_Transaction move direction invalid");
        }
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    // @Override
    toString() {
        return "List Item Order Change " + this.moveDirection + " " + this.itemOrderToChange;
    }
}