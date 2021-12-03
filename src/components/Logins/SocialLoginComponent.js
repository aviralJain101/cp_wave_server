import React, { Component } from 'react';
import SocialButton from "./SocialButton";

const handleSocialLogin = (user) => {
  console.log(user);
};

const handleSocialLoginFailure = (err) => {
  console.error(err);
};
 
class SocialLB extends Component {
    constructor(props) {
        super(props);
       }

    render() {

        return (

          <div>
            <SocialButton
              provider="facebook"
              appId="222966759929270"
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
            >
              Login with Facebook
            </SocialButton>
          </div>

                
        );
    }
}
export default SocialLB;