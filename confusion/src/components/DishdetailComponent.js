import React, {Component} from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';

class DishDetail extends Component{
    
    renderDish(dish){
        return(
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    renderComments(comments){
        return(comments.map((comments)=>{
            return(
            <div key={comments.id}>
                <ul className="list-unstyled">
                    <li>{comments.comment}</li>
                    <li>-- {comments.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</li>
                </ul>    
            </div>
            );
        }));
    }

    render(){
        if(this.props.selectedDish != null){
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 m-1">
                            {this.renderDish(this.props.selectedDish)}
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 m-1">
                            <h4>Comments</h4>
                            {this.renderComments(this.props.selectedDish.comments)}
                        </div>
                    </div>
                </div>
            );
        }else{
            return(
                <div></div>
            );
        }
    }
}

export default DishDetail;