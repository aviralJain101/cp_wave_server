import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';



const responseGoogle = (response) => {
  console.log(response);
}


class GLogin extends Component {
  constructor(props) {
      super(props);
     }

  render() {

      return (
        <div className="btnGoogle">
          <GoogleLogin
              clientId="920503752377-rm7jhvujkb46j8co2shgebaac721ou4f.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              className="btnGoogle"
              cookiePolicy={'single_host_origin'}
              // buttonText="Sign in with Google"
        >
          {/* <i className="fa fa-google-plus" style={{ marginLeft: 
              '5px' }}/>  */}
              <span>&nbsp;&nbsp;Sign In with Google</span> 
          </GoogleLogin>
        </div>
        
  );
}
}
export default GLogin;