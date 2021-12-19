import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import SellModal from './ModalForm';
import { Accordion, Button } from 'react-bootstrap';
import RenderItems from './RenderItems';


class Sell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreateModalOpen: false
        }
    }
    toggleModalCreate = (event) => {
        // event.preventDefault();
        this.setState({
            isCreateModalOpen: !this.state.isCreateModalOpen
        });
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Sell</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-4">
                            <h3>Items</h3>
                            <hr />
                        </div>
                        <div className="col-8">
                            <Button onClick={this.toggleModalCreate} className="pull-right shadow-none">
                                <span className="fa fa-plus fa-lg"></span>  Sell Item
                            </Button>
                        </div>
                        <div>
                            {
                                (this.props.sellItem.items == null || this.props.sellItem.items.length == 0)?
                                <h4>Selling List is Empty</h4>:
                                <RenderItems
                                    sellItem={this.props.sellItem}
                                />
                            }
                        </div>
                    </div>
                </div>
                <SellModal 
                    isModalOpen={this.state.isCreateModalOpen} 
                    toggleModal={this.toggleModalCreate}
                    postItem={this.props.postItem}
                />
               
            </React.Fragment>
        );

    }
}

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Courses));


export default Sell;