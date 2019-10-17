import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';

// jsTPS
import ListNameChange_Transaction from '../../lib/jsTPS/ListNameChange_Transaction'
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
        this.props.jsTPS.addTransaction(new ListNameChange_Transaction(this.props.todoList, name));
        this.setState({name: this.getListName()});
        // console.log(this.getListName());
        // set the text field back
    }

    // handle control z key press
    processCtrlZ(event) {
        if (event.ctrlKey && event.keyCode === 90) {
            this.props.jsTPS.undoTransaction();
            this.props.loadList(this.props.todoList);
            this.setState({name: this.getListName()});
            event.preventDefault(); // removes default undo in textbox
        } else if (event.ctrlKey && event.keyCode === 89) {
            this.props.jsTPS.doTransaction();
            this.props.loadList(this.props.todoList);
            this.setState({name: this.getListName()});
            event.preventDefault(); // removes default undo in textbox
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
                <ListHeading goHome={this.props.goHome} />
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
                            defaultValue={this.getListOwner()}
                            onChange={e => this.props.todoList.owner = e.target.value}
                            type="text"
                            id="list_owner_textfield" />
                    </div>
                </div>
                <ListItemsTable todoList={this.props.todoList} loadList={this.props.loadList} goItem={this.props.goItem} />
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
