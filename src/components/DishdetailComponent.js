import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle } from 'reactstrap';

class Dishdetail extends Component {

    convertDateToCommentDateFormat(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    renderComments(comments) {
        if(comments == null)
            return (
                <div></div>
            );
        
        const commentlist = comments.map((comment) => {
            return (
                <li>
                    <p>{comment.comment}</p>
                    <p> --{comment.author}
                        &nbsp;,&nbsp;{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                    </p>
                </li>
            );
        });
    
        return (
            <ul className="list-unstyled">
                {commentlist}
            </ul>
        );
    }

    renderDish(selectedDish) {
        if(selectedDish != null)
            return (
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg top src={selectedDish.image} alt={selectedDish.name} />
                            <CardBody>
                                <CardTitle><b>{selectedDish.name}</b></CardTitle>
                                <CardText>{selectedDish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                        <div>
                            <h4>Comments</h4>
                        </div>
                        <div>
                            {this.renderComments(selectedDish.comments)}
                        </div>
                    </div>
                </div>
            );
        else
            return (
                <div></div>
            );
    }



    render() {
        return (
            <div className="container">
                {this.renderDish(this.props.dish)}
            </div>
        );
    }
}


export default Dishdetail;