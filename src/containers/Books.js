import React, {Component} from 'react';
import {connect} from 'react-redux';
import Book from '../components/Book';
// import {books} from '../data';

class Books extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isLoading) {
            return (
                <p>Loading ...</p>
            )
        } else if (this.props.error) {
            return (
                <div className="alert alert-danger" role="alert"> 
                    {this.props.error.message}
                </div>
            )
        } else {
            return (
                <div>
                    <table className="table table-stripped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Year</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.books.map(book => {
                                    return (
                                        <Book book={book} key={book.id}/>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )
        }
        
    }
}
const mapStateToProps = (state) => {
    return {
        books: state.booksData.books || [],
        isLoading: state.booksData.isLoading,
        error: state.booksData.error || null
    };
};
export default connect(mapStateToProps, null)(Books);