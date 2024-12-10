import React, {useContext, useEffect, useState} from 'react';

const BodyLogin = React.lazy(() => import('../header/mobile-login'));

const Login = (props) => {

    return (
        <div className="">
            <div className='col-md-12 border-b page-title p-4 text-center mb-4'>
                <h4 className="">
                    Login
                </h4>
            </div>
            <div className='std-medium-width-block bg-white'>
                <div className="col-md-12">
                    <BodyLogin/>
                </div>
            </div>
        </div>
    );
}

export default Login;