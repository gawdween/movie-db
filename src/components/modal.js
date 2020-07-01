import React, { Component } from 'react';
import Modal from 'react-modal';
import "bootstrap/dist/css/bootstrap.css"

const MODAL_A = 'modal_a';
const MODAL_B = 'modal_b';

const DEFAULT_TITLE = 'Default title';

class Forms extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  toggleModal = event => {
    console.log(event);
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { isOpen } = this.state;

    return (
      <div>
        <button className="btn btn-primary" onClick={this.toggleModal}>Open Modal</button>
        <Modal
          id="modal_with_forms"
          isOpen={isOpen}
          closeTimeoutMS={150}
          contentLabel="modalB"
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.toggleModal}
          >
          
          <div className="container-fluid">
          <h3 id="heading">Edit Movie Data</h3>
            <form >
              <fieldset>
              <div className="form-group">
                        <label className= "font-weight-bold">Name of Movie:
                            <input type="text" className="form-control form-control-lg" onChange={this.handleChange} name="title" />     
                        </label>
                    </div>
                    <div className="form-group">
                        <label className= "font-weight-bold">Genre:
                            <input type="text" className="form-control form-control-lg" onChange={this.handleChange} name="genre" />
                        </label>      
                    </div> 
                    <div className="form-group">
                        <label className= "font-weight-bold">No. of seats:
                            <input type="number"  className="form-control form-control-lg" onChange={this.handleChange} name="numberOfSeats" />
                        </label>    
                    </div>   
                    <button className="btn btn-sm btn-primary">Ok</button> &nbsp;{""}
                    <button className="btn btn-sm btn-primary">Cancel</button>
              </fieldset>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Forms;


