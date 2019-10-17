import React, { Component } from 'react'

export class ListHeading extends Component {
    // should clear stack when go back home
    goHomeClearStack () {
        // this.props.jsTPS.clearAllTransactions();
        // this.props.goHome;
    }

    render() {
        return (
            <div id="list_heading"
                onClick={this.props.goHome}
                // onClick={this.goHomeClearStack()}
            >   @todo
            </div>
        )
    }
}

export default ListHeading
