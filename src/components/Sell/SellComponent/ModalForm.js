import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody,Form, FormGroup, Input, Label } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem,CardBody, CardHeader } from 'reactstrap';
import Select from 'react-select';
import { baseUrl } from '../../../shared/baseUrl';
import axios from 'axios';

const options = [
    { value: 'Garments', label: 'Garments' },
    { value: 'Western', label: 'Western' },
    { value: 'Watch', label: 'Watch' },
    { value: 'Phone', label: 'Phone' },
    { value: 'Charger', label: 'Charger' },
    { value: 'Earphone', label: 'Earphone' },
    { value: 'Samsung', label: 'Samsung' },
    { value: 'Mi', label: 'Mi' },
    { value: 'Iphone', label: 'Iphone' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Laptop', label: 'Laptop' }
  ];
class SellModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            selectedFile: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        this.props.toggleModal();
        var tags = this.state.selectedOption.map((option) => {
            var tag = option.value;
            return tag;
        });

        const item = new FormData();
        item.append("itemname", this.itemname.value);
        item.append("price", this.price.value);
        item.append("category", tags);
        item.append("itemImage", this.state.selectedFile);

        // axios.post(`${baseUrl}imageUpload`, item);

        this.props.postItem(item);
        // this.props.postItem({itemname: this.itemname.value, price: this.price.value, category: tags});
        event.preventDefault();
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    // On file select (from the pop up)
	onFileChange = event => {
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
	};



    render() {
        const { selectedOption } = this.state;
        return(

            <React.Fragment>
                <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal} centered>
                    <ModalHeader toggle={this.props.toggleModal}>Create Course</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>

                            <FormGroup>
                                <Label htmlFor="itemname">Item Name</Label>
                                <Input type="text" id="itemname" name="itemname"
                                    innerRef={(input) => this.itemname = input} 
                                    required/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="price">Price</Label>
                                <Input type="text" id="price" name="price"
                                    innerRef={(input) => this.price = input} 
                                    required/>
                            </FormGroup>
                            <FormGroup className="mt-3 mb-4">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={options}
                                    isMulti='true'
                                    isSearchable='true'
                                    placeholder='Select Category'
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="itemImage">Image</Label>
                                <Input type="file" id="itemImage" name="itemImage"
                                    onChange={this.onFileChange} 
                                />
                            </FormGroup>
                            <FormGroup className="text-center mt-2 mb-3">
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default SellModal;