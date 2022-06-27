import React, { useEffect, useState } from 'react';
import { AccountCircleIcon } from '../imports';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../StateProvider';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

const SingleChat = ({ id, data }) => {
  const [messages, setMessages] = useState([]);
  const { roomsCol } = useGlobalContext();

  useEffect(() => {
    if (id) {
      //
      const messagesCol = collection(db, 'groups', id, 'messages');
      const messagesColQuery = query(messagesCol, orderBy('timestamp', 'desc'));
      onSnapshot(messagesColQuery, (snapshot) => {
        const messagesInDoc = [];
        snapshot.forEach((doc) => {
          messagesInDoc.push(doc.data());
        });
        setMessages(messagesInDoc);
      });
    }
  }, [id]);
  return (
    <Link to={`/groups/${id}`}>
      <div className='single-chat'>
        <AccountCircleIcon />
        <div
          className='single-chat-info
        '
        >
          <p className='chat-name'>
            {data?.name.length > 10
              ? data.name.substring(0, 10) + '...'
              : data?.name}
          </p>
          {console.log(data.time)}
          <p className='chat-time'>
            <small>{messages ? messages[0]?.timestamp : data.time}</small>
          </p>
          <p className='chat-message'>
            {console.log(messages)}
            {messages[0] ? `${messages[0]?.name}: ` : `WhatsApp : `}
            {messages[0]
              ? messages[0]?.message.length > 24
                ? messages[0].message.substring(0, 24) + '...'
                : messages[0]?.message
              : 'Welcome!'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SingleChat;
