import React, {Component} from 'react';
import {createBook} from '../actions/book.actions';
import {connect} from 'react-redux'
import './CreateBook.css';

class CreateBook extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            title: '',
            author:'',
            year: ''
        };
    }
    handleOnValueChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state);
    }
    render () {
        return (<div className="create-book">
                <form onSubmit={this.handleSubmit.bind(this)}> 
                    <div className="form-group">
                        <input
                            type="text" 
                            className="form-control"
                            name="title"
                            placeholder="Enter Title"
                            onChange={this.handleOnValueChange.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text" 
                            className="form-control"
                            name="author"
                            placeholder="Enter Author"
                            onChange={this.handleOnValueChange.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text" 
                            className="form-control"
                            name="year"
                            placeholder="Enter Year Published"
                            onChange={this.handleOnValueChange.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value={"Add"}/>
                        <input type="button" className="btn btn-default" value={"Cancel"}/>
                    </div>
                </form>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (book) => {
            dispatch(createBook(book));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateBook);