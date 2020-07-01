import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"


class Test extends Component {
    state = { 
        count: 0,
     };

     handleClick  = () => { 
         this.setState({
             count: this.state.count +1
         }

         )
     };

     updateCount = () => {
         const {count} = this.state;
         return count === 0 ? "Zero"  : count;
     }


    render() { 
        return ( 
            <main className="container">
                <span className="badge badge-warning"> {this.state.updateCount()}</span>
                <button className="btn btn-danger" onClick={this.handleClick}>Increment</button>
            </main>
         );
    }
}
 
export default Test;