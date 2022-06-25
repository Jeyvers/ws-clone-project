import React from 'react';
import { AccountCircleIcon } from '../imports';
import { Link } from 'react-router-dom';

const SingleChat = ({ id, data }) => {
  return (
    <Link to={`/groups/${id}`}>
      <div className='single-chat'>
        <AccountCircleIcon />
        <div
          className='single-chat-info
        '
        >
          <p className='chat-name'>{data.name}</p>
          <p className='chat-time'>
            <small>{data.time.toLocaleString()}</small>
          </p>
          <p className='chat-message'>Honey.</p>
        </div>
      </div>
    </Link>
  );
};

export default SingleChat;
