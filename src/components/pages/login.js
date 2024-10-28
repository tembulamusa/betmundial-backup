import React, {useContext, useEffect, useState} from 'react';

const BodyLogin = React.lazy(() => import('../header/mobile-login'));

const Login = (props) => {

    return (
        <div className="">
            <div className='col-md-12 primary-bg p-4 text-center'>
                <h4 className="inline-block">
                    Login
                </h4>
            </div>
            <div className='std-medium-width-block'>
                <div className="col-md-12">
                    <BodyLogin/>
                </div>
            </div>
        </div>
    );
}

export default Login;