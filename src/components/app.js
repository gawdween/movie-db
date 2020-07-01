import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css"
import Modal from 'react-modal';


class App extends Component {
    constructor(props){
        super(props)
        this.state = { 
            apiData: [], 
            displayHeader: false,
            isOpen: false,
            title: "",
            genre: "",
            numberOfSeats: "",
            updateValues: {
                id: "",
                title: "",
                genre: "",
                numberOfSeats: ""
            }
        };
    }
    
    
     
    //Ge
    getApi = () => {
        axios
        .get("http://localhost:3000/movies")
        .then((results) => {
            console.log(results.data)
            this.setState({apiData: results.data , displayHeader: true});
        });

    };
    
    // To handle 
    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value
        this.setState({[name]: value})
    }

    handleUpdateChange = (event) => {
        let name = event.target.name;
        let value = event.target.value
        this.setState({updateValues: {...this.state.updateValues, [name]: value}});
    }

    resetForm = () => {
        this.setState({ title: "",
        genre: "",
        numberOfSeats: "" })
      }    

      findMovie = (movieId) =>  {
          let {apiData} = this.state;

          let movie = apiData.find(movie => movie.id == movieId);

          console.log("Movie found: ", movie);

          return movie;
      }
      
      deleteData= (id) => {
        
        axios.delete(`http://localhost:3000/movies/${id}`)
        .then((results) => {
            
            this.getApi();
        });

      }

    handleDelete = (e) =>{ 
        e.preventDefault();
        const id = e.target.id
        if(window.confirm(`Are you sure you want to delete ${id}`))
        {
            this.deleteData(id);
        }

       
     }  


    handleSubmit = event => {
        event.preventDefault();

        const {title, genre, numberOfSeats} = this.state

        axios.post("http://localhost:3000/movies", {title, genre, numberOfSeats})
        .then((results) => {
            alert("Your Data has been posted")
            this.setState({apiData: [...this.state.apiData, results.data]});    
        });
        this.resetForm();
    };

    updateData = (e) => {
        e.preventDefault();
        let movieId = e.target.id
        const {title, genre, numberOfSeats} = this.state.updateValues;
        axios.put(`http://localhost:3000/movies/${movieId}`, {title, genre, numberOfSeats})
        .then((results) => {
            alert("Your Data has been updated");
        });
    }

   handleEdit = (e) => {
        let movieId = e.target.id;
        console.log("Id to update: ", movieId);
        let movie  = this.findMovie(movieId);
        if(!movie){
            alert(`Movie with Id "${movieId}" can't be found`);
        } else{
            console.log(`Movie with Id "${movieId}" found`);
            let {id, title, genre, numberOfSeats } = movie;
            this.setState({updateValues: {id, title, genre, numberOfSeats}});
        };
        
    } 

    renderTableData() {
        return this.state.apiData.map((data, index) => {
           const { id, title, genre, numberOfSeats } = data //destructuring
           return (
                <tr key={index}>
                    <td>{id}</td>
                    <td>{title}</td>
                    <td>{genre}</td>
                    <td>{numberOfSeats}</td>
                    <td>
                        <button onClick={this.toggleModal} id={id} aria-label="edit" className="btn btn-primary">
                            Edit
                         </button> &nbsp;{""}
                        <button onClick={this.handleDelete} id={id} aria-label="delete" className="btn btn-danger">
                            Delete
                         </button>
                        </td>
                </tr> 
           )
        })
    };  

    toggleModal = event => {
        console.log(event);
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
        this.handleEdit(event);
      } 
    

    render() { 
            const {id, title, genre, numberOfSeats} = this.state.updateValues;
            const { isOpen } = this.state;
            
        return (  
            
            <div className="container-fluid"  >
                <h2> Movie Database</h2>

               <form onSubmit={this.handleSubmit} id="myForm"> 
                    <div className="form-group">
                        <label className= "font-weight-bold">Name of Movie:
                            <input type="text" className="form-control form-control-lg" onChange={this.handleChange} name="title" value={title} required/>     
                        </label>
                    </div>
                    <div className="form-group">
                        <label className= "font-weight-bold">Genre:
                            <input type="text" className="form-control form-control-lg" onChange={this.handleChange} name="genre" value={genre} required/>
                        </label>      
                    </div> 
                    <div className="form-group">
                        <label className= "font-weight-bold">No. of seats:
                            <input type="number"  className="form-control form-control-lg" onChange={this.handleChange} name="numberOfSeats" value={numberOfSeats} required/>
                        </label>    
                    </div>   
                    <div className="form-group">
                        <button type="submit" className="btn btn-lg btn-primary mb-2 ">Post  Data</button> 
                    </div>
                </form> 

               <div>
                    {this.state.displayHeader? <table id='table' className="table table-primary table-striped  table-bordered">
                        <thead > 
                            <tr> 
                                <th>Id</th>
                                <th>Name of Movie</th>
                                <th>Genre</th>
                                <th>Number of Seats</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
               
                    </table>: ""}
                    <button onClick={this.getApi} className="btn btn-lg btn-primary mb-2 ">Get Data</button> &nbsp;{""}  
               </div>
               <div>
                    <Modal
                        id="modal_with_forms"
                        isOpen={isOpen}
                        closeTimeoutMS={150}
                        contentLabel="modalB"
                        shouldCloseOnOverlayClick={false}
                        onRequestClose={this.toggleModal}
                        >
                        
                        <div className="container-fluid">
                            <h3 id="heading">Edit Movie Data</h3>
                            <form>
                                <fieldset>
                                    <div className="form-group">
                                        <label className= "font-weight-bold">Name of Movie:
                                            <input type="text" className="form-control form-control-lg" onChange={this.handleUpdateChange} name="title" value={title} />     
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label className= "font-weight-bold">Genre:
                                            <input type="text" className="form-control form-control-lg" onChange={this.handleUpdateChange} name="genre" value={genre} />
                                        </label>      
                                    </div> 
                                    <div className="form-group">
                                        <label className= "font-weight-bold">No. of seats:
                                            <input type="number"  className="form-control form-control-lg" onChange={this.handleUpdateChange} name="numberOfSeats" value={numberOfSeats}/>
                                        </label>    
                                    </div>   
                                    <button onClick={this.updateData} id={id} className="btn btn-sm btn-primary">Save</button> &nbsp;{""}
                                    <button className="btn btn-sm btn-primary">Cancel</button>
                                </fieldset>
                            </form>
                        </div>
                    </Modal>
                </div>
            </div>
            
        );
    }
};


  
    
  
    


 
export default App;

