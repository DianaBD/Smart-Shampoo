import React, { useState } from "react"
import "./style/Register.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button, Form, Segment, Grid, Header, Message } from 'semantic-ui-react'

function Register() {

    const [form, setState] = useState({
      username:'',
      password:'',
      email   :'',
      phoneNumber   :'',
      address :'',
      firstName:'',
      lastName:''
    })

    function handleSuccessfulRegister(response) {
        console.log(response.status)
        alert('Register complete! We sent you a confirm email - please confirm your account to login!')
    }

    const updateInputField = e => {
      setState({
        ...form,
        [e.target.name]: e.target.value
      });
    };

    function handleSubmit(e) {
        console.log("AAAAAAAAA handleSubmit");
        var payload = {

          username:    form.username,
          password:    form.password,
          email:       form.email,
          address:     form.address,
          phoneNumber: form.phoneNumber,
          firstName:   form.firstName,
          lastName:    form.lastName
        }
        console.log(payload);
        if(checkFormCompleted(payload)){
          axios.post(`http://192.168.99.100:3000/api/v1/users/register`, payload)
              .then((response) => handleSuccessfulRegister(response))
              .catch((error) => alert(error.response.data.error))
        }
        else{
          alert("Please complete all register fields!")
        }
    };

    function checkFormCompleted(payload){
      var checked = true
      if ( payload.username     === '' ||
           payload.password     === '' ||
           payload.email        === '' ||
           payload.address      === '' ||
           payload.phoneNumber  === '' ||
           payload.firstName    === '' ||
           payload.lastName     === ''
           ) checked = false
      console.log(checked)
      return checked
    }

    return (
      <div id='mainDiv'>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
               Register
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' name='username'   placeholder='Username' onChange={updateInputField}/>
                <Form.Input fluid icon='lock' iconPosition='left' name='password'   placeholder='Password' type='password'  onChange={updateInputField}  />
                <Form.Input fluid icon='mail' iconPosition='left' name='email'     placeholder='E-mail' onChange={updateInputField}  />
                <Form.Input fluid icon='phone' iconPosition='left'name='phoneNumber'placeholder='Phone' onChange={updateInputField}/>
                <Form.Input fluid icon='home' iconPosition='left' name='address'    placeholder='Address' onChange={updateInputField}  />
                <Form.Input fluid                                 name='firstName' placeholder='First Name' onChange={updateInputField}  />
                <Form.Input fluid                                 name='lastName'  placeholder='Last Name' onChange={updateInputField}  />

                  <Button renderAs='button' color='teal' fluid size='large' onClick={handleSubmit}> Sign Up </Button>
                <Link to="/quiz">
                </Link>
              </Segment>
            </Form>

              <Message>
                Already have an account? <Link to="/login">Login</Link>
              </Message>

          </Grid.Column>
        </Grid>
      </div>)
}

export default Register
