import React, {useContext, useEffect, useState} from 'react';
import { Context } from '../../context/store';
import { useNavigate, useSearchParams } from 'react-router-dom';
const BodyLogin = React.lazy(() => import('../header/mobile-login'));

const Login = (props) => {
    const [searchParams, ] = useSearchParams();
    searchParams.get("successfulReset");

    return (
        <React.Fragment>

            
                        <div className="">
                        <div className='col-md-12 primary-bg p-4 text-center'>
                            <h4 className="inline-block">
                               Login
                            </h4>
                        </div>
                            <div className="col-md-12">
                                <BodyLogin/>
                            </div>
                        </div>
        </React.Fragment>
    );
}

export default Login;