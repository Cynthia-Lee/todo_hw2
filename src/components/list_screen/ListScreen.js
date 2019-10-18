import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';

// jsTPS
import ListNameChange_Transaction from '../../lib/jsTPS/ListNameChange_Transaction'
import ListOwnerChange_Transaction from '../../lib/jsTPS/ListOwnerChange_Transaction'
// src\lib\jsTPS\ListNameChange_Transaction.js

export class ListScreen extends Component {

    state = {
        name: this.props.todoList.name,
        owner: this.props.todoList.owner
    }

    // handle control z press
    constructor(props) {
        super(props);

        this.processCtrlZ = this.processCtrlZ.bind(this);
    }

    getListName() {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            return this.props.todoList.name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            return this.props.todoList.owner;
        }
    }

    setListName(name) {
        // this.props.todoList.name = name;
        let transaction = new ListNameChange_Transaction(this.props.todoList, name);
        this.props.jsTPS.addTransaction(transaction);
        console.log(transaction.toString());
        // this.props.jsTPS.addTransaction(new ListNameChange_Transaction(this.props.todoList, name));
        this.setState({name: this.getListName()});
        // console.log(this.getListName());
        // set the text field back
    }

    setListOwner(owner) {
        // this.props.todoList.name = name;
        let transaction = new ListOwnerChange_Transaction(this.props.todoList, owner);
        this.props.jsTPS.addTransaction(transaction);
        console.log(transaction.toString());
        // this.props.jsTPS.addTransaction(new ListNameChange_Transaction(this.props.todoList, name));
        this.setState({owner: this.getListOwner()});
        // console.log(this.getListName());
        // set the text field back
    }

    // handle control z,y key press
    processCtrlZ(event) {
        if (event.ctrlKey && event.keyCode === 90) { // undo, ctrl z
            console.log("undo");
            this.props.jsTPS.undoTransaction();
            this.props.loadList(this.props.todoList);
            this.setState({name: this.getListName(), owner: this.getListOwner()});
            event.preventDefault(); // removes default undo in textbox
        } else if (event.ctrlKey && event.keyCode === 89) { // redo, ctrl y
            console.log("redo");
            this.props.jsTPS.doTransaction();
            this.props.loadList(this.props.todoList);
            this.setState({name: this.getListName(), owner: this.getListOwner()});
            event.preventDefault(); // removes default redo in textbox
        } else if (event.keyCode == 32) {
            console.log(this.props.jsTPS.toString());
        }
    }

    // react component mounting
    // componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). 
    // Initialization that requires DOM nodes should go here. 
    componentDidMount() {
        document.addEventListener("keydown", this.processCtrlZ);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.processCtrlZ);
    }

    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} jsTPS={this.props.jsTPS}/>
                <ListTrash todoList={this.props.todoList} loadList={this.props.loadList} todoLists={this.props.todoLists} goHome={this.props.goHome} />
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input
                            // defaultValue={this.getListName()}
                            value={this.getListName()}
                            // {(e) => {this.setState({inputVal: e.target.value})}}
                            onChange={e => this.setListName(e.target.value)}
                            type="text"
                            id="list_name_textfield" />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input
                            // defaultValue={this.getListOwner()}
                            value={this.getListOwner()}
                            // onChange={e => this.props.todoList.owner = e.target.value}
                            onChange={e => this.setListOwner(e.target.value)}
                            type="text"
                            id="list_owner_textfield" />
                    </div>
                </div>
                <ListItemsTable todoList={this.props.todoList} loadList={this.props.loadList} goItem={this.props.goItem} jsTPS={this.props.jsTPS}/>
            </div>
        )
    }
}

ListScreen.propTypes = {
    loadList: PropTypes.func.isRequired,
    todoList: PropTypes.object.isRequired,
    todoLists: PropTypes.array.isRequired
}

export default ListScreen
