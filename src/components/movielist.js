import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import { getMovies } from "../services/fakeMovieService";



class Movielist extends Component {
    constructor(props){
        super(props)
        this.state = { 
            movies: getMovies(),
         }
    }
    
     handleTest = () => {
         console.log(this.state.movies)
     };


     handleDelete = (id) =>{
         //alert("You clicked on the delete button")
         document.getElementById("movies-table").deleteRow(1);
        

     };

     renderTableData() {
        return this.state.movies.map((movie, index) => {
           const { _id, title, numberInStock, genre, dailyRentalRate } = movie //destructuring
           return (
              <tr key={_id}>
                 <td>{title}</td>
                 <td>{numberInStock}</td>
                 <td>{genre.name}</td>
                 <td>{dailyRentalRate}</td>
                 <td><button className="btn btn-info" onClick={this.handleDelete}>Delete</button></td>
              </tr>
           )
        })
     }

     


   render() { 
      return ( 
          <main className="container">
        
              <h1 id="title">The number of movies are {this.state.movies.length}</h1>
                <div>
                        <table id="movies-table" className="table table-info table-striped  table-bordered">
                        <thead id="thead">
                                <tr className= "table-info">
                                    <th>Title</th>
                                    <th>Number in Stock</th>
                                    <th>Genre</th>
                                    <th>Daily Rental</th>
                                    <th>Action</th>
                                </tr>    
                            </thead>

                            <tbody >
                                 {this.renderTableData()}
                            </tbody>
                        </table>
                
                </div>

            </main>
        )
    } 
} 
 

export default Movielist ;

