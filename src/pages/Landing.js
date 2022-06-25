import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth, provider } from '../firebase';
import { actionTypes } from '../reducer';
import { useGlobalContext } from '../StateProvider';

const Landing = () => {
  const { dispatch } = useGlobalContext();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        console.log(result.user);
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className='landing'>
      <div className='whatsapp-login'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png'
          alt=''
        />{' '}
        <div className='login-text'>
          <h1>Sign in to WhatsApp</h1>
        </div>
        <button onClick={signIn}>Sign In With Google</button>
      </div>
    </div>
  );
};

export default Landing;
