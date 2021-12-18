import React, { Component,useState } from "react";
import { Button,Form, FormGroup, Input, Label, FormText, Col } from 'reactstrap';
import axios from 'axios';
import { baseUrl } from '../../shared/baseUrl';


class Sell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
            
        };
        
    }

    // On file select (from the pop up)
	onFileChange = event => {
	
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
	
	};

    handleSell = (event) => {
        // alert(this.props.signupUser)
        console.log(this.state.selectedFile);
        const formData = new FormData();
            // formData.append("itemname", this.itemname.value);
            // formData.append("category", this.category.value);
            // formData.append("price", this.price.value);

            formData.append(
                "imageFile",
                this.state.selectedFile,
                this.state.selectedFile.name
            );
        // axios.post(`${baseUrl}imageUpload`, formData);
        const bearer = 'Bearer ' + localStorage.getItem('token');
        fetch(baseUrl + 'imageUpload', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': bearer
            },
            credentials: 'same-origin'
        })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => { console.log('Image Upload Error ', error.message);
            alert('Your Image could not be posted\nError: '+ error.message); })

        console.log({itemname: this.itemname.value, category: this.category.value, price: this.price.value, imageFile: this.imageFile.value,});
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        // this.props.sellItem({itemname: this.itemname.value, category: this.category.value, price: this.price.value, imageFile: this.imageFile.value,});
        event.preventDefault();
    }

    render()  {
        return (
            <div className="container">
                <div className="row">
                    <Form onSubmit={this.handleSell} className="border" style={{padding: "2% 10%"}}>
                        <FormGroup>
                            <Label htmlFor="itemname">Item Name</Label>
                            <Input type="text" id="itemname" name="itemname"
                                innerRef={(input) => this.itemname = input} 
                                // required
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="category">Category</Label>
                            <Input type="text" id="category" name="category"
                                innerRef={(input) => this.category = input} 
                                // required
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="price">Price</Label>
                            <Input type="text" id="price" name="price"
                                innerRef={(input) => this.price = input} 
                                // required
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label for="imageFile">Image</Label>
                            <Input type="file" id="imageFile" name="imageFile"
                                onChange={this.onFileChange} 
                            />
                            <FormText color="muted">
                                Upload the image of items to sell.
                            </FormText>
                        </FormGroup>
                        <FormGroup className="text-center mt-2 mb-3">
                            <Button type="submit" value="submit" color="primary">Sell</Button>
                        </FormGroup>
                    </Form>
                </div>
            
            </div>
        );
    }
};

export default Sell;