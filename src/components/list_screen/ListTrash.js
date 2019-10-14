import React, { Component } from 'react'
import { thisExpression } from '@babel/types';

export class ListTrash extends Component {
    // modal states
    state = {
        showModal: false
    }

    // modal for del list
    showModal = () => {
        this.setState({showModal: true});
        // console.log("showModal: " + this.state.showModal);
    }

    // yes del list
    deleteList = () => {
        this.hideModal();
        // delete list from todoLists
        var i = this.props.todoLists.indexOf(this.props.todoList);
        // this.getIndex(this.props.todoList, this.props.todoLists);
        this.props.todoLists.splice(i, 1);
        this.props.goHome();
    }

    /*
    getIndex(todoList, todoLists) {
        var i;
        for (i = 0; i < todoLists.length; i++) {
            if (todoLists[i] == todoList) {
                return i;
            }
        }
    }
    */

    // no cancel del list
    hideModal = () => {
        this.setState({showModal: false});
    }

    render() {
        return (
            <div className="">
                <div id="list_trash" onClick={this.showModal}>&#128465;</div>
                <Modal todoList={this.props.todoList} goHome={this.props.goHome} showModal={this.state.showModal} hideModal={this.hideModal} deleteList={this.deleteList}/>  
            </div>
       
        )
    }
}

// dialog modal for delete list
const Modal = ({showModal, hideModal, deleteList}) => {
    return (
        <div className={showModal ? "modal is_visible" : "modal"} id="modal_yes_no_dialog" data-animation="slideInOutLeft">
                <div className="modal_dialog">
                    <header className="dialog_header">
                        Delete list?
                    </header>
                    <section className="dialog_content">
                        <p><strong>Are you sure you want to delete this list?</strong></p>
                    </section>
                        <button id="dialog_yes_button" onClick={deleteList}>Yes</button>
                        <button id="dialog_no_button" onClick={hideModal}>No</button>
                    <footer className="dialog_footer">
                        The list will not be retreivable.
                    </footer>
                </div>
        </div> // used McKenna's todo javascript modal code
    )
}

// onClick={this.props.loadList.bind(this, this.props.todoList)}
// todoList, loadList, todoLists

export default ListTrash
