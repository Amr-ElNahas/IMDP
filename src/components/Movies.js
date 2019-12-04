// Movies.component.js

import React, { Component } from 'react';

export default class Movies extends Component {
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Search/Rate a movie</h3>
                <form>
                    <div className="form-group">
                        <label>Search Movie </label>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Add your rating: </label>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Rate the movie!" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}