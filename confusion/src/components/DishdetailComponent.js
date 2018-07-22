import React, {Component} from 'react';
import {Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm, Control, Errors} from 'react-redux-form';

function RenderDish({dish}){
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

function RenderComments({comments, addComment, dishId}){
    return(
        <div>
            {comments.map((comment)=>{
                return(
                    <div key={comment.id}>
                        <ul className="list-unstyled">
                            <li>{comment.comment}</li>
                            <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                        </ul>    
                    </div>
                );
            })}
            <CommentForm dishId={dishId} addComment={addComment}/>
        </div>
    );
}

const DishDetail = (props) => {
    if(props.selectedDish != null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.selectedDish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 m-1">
                        <RenderDish dish={props.selectedDish}/>
                    </div>
                    <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 m-1">
                        <h4>Comments</h4>
                        <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.selectedDish.id}/>
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

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{

    constructor(props){
        super(props);
        this.state={
            isModalOpen: false,
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        })
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.name, values.comment)
    }

    render(){
        return(
            <React.Fragment>
            <Button outline onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg"></span> Submit Comment
            </Button>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody className="m-3">
                    <LocalForm onSubmit={this.handleSubmit}>
                        <Row className="form-group">
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select model=".rating" name="rating" className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="firstname" >Your Name</Label>
                            <Control.text model=".name" id="name" name="name" placeholder="Your Name" className="form-control"
                            validators={{
                                minLength: minLength(3), maxLength: maxLength(15)
                            }}/>
                            <Errors
                                className="text-danger"
                                model=".name"
                                show="touched"
                                messages={{
                                    minLength: 'Must be greater than 2 characters ',
                                    maxLength: 'Must be 15 characters or less '                       
                                }}
                            />
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control"/>    
                        </Row>
                        <Button type="submit" value="submit" color="primary">Submit</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </React.Fragment>
        )
    }
}


export default DishDetail;