import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';


const responseGoogle = (response) => {
  console.log(response);
}


class GLogin extends Component {
  constructor(props) {
      super(props);
     }

  render() {

      return (
       
          <GoogleLogin
              clientId="920503752377-rm7jhvujkb46j8co2shgebaac721ou4f.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              className="btnGoogle"
              cookiePolicy={'single_host_origin'}
              icon={false}
              // disabled={true}
              // buttonText="Sign in with Google"
          >
            <i className="fa fa-google-plus fa-lg" style={{ marginLeft: 
                '5px' }}/> 
            <span class="googletext">&nbsp;&nbsp;Continue with Google</span> 
          </GoogleLogin>       
  );
}
}
export default GLogin;