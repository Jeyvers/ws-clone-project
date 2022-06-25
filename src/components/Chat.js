import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db } from '../firebase';
import moment from 'moment';
import {
  IconButton,
  SearchIcon,
  MoreVertIcon,
  AccountCircleIcon,
  TagFacesIcon,
  AttachFileIcon,
  KeyboardVoiceIcon,
} from '../imports';

const Chat = () => {
  const [input, setInput] = useState('');
  const [groupName, setGroupName] = useState('');
  const [messages, setMessages] = useState([]);
  const { groupId } = useParams();
  const messagesCol = collection(db, 'groups', groupId, 'messages');
  const messagesColQuery = query(messagesCol, orderBy('timestamp', 'asc'));

  const createMessage = (e) => {
    e.preventDefault();
    console.log(input);
    addDoc(messagesCol, {
      message: input,
      name: 'Marvey',
      timestamp: moment().format('LT'),
    });
    setInput('');
  };

  useEffect(() => {
    if (groupId) {
      //

      onSnapshot(doc(db, 'groups', groupId), (doc) =>
        setGroupName(doc.data().name)
      );

      onSnapshot(messagesColQuery, (snapshot) => {
        const messagesInDoc = [];
        snapshot.forEach((doc) => {
          messagesInDoc.push(doc.data());
          console.log('Current data:', doc.data());
        });
        setMessages(messagesInDoc);
      });
    }
  }, [groupId]);

  return (
    <div className='chat'>
      <div className='chat-nav sidebar-nav'>
        <div className='chat-nav-info'>
          <span className='avatar'>
            <AccountCircleIcon />
          </span>
          <div>
            <p className='chat-name'>{groupName}</p>
          </div>
        </div>
        <div>
          <span>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </span>
          <span>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </span>
        </div>
      </div>
      <div className='chat-messages'>
        {messages.map((message) => {
          return (
            <div
              className={`message ${
                message.name === 'Jeyi' ? 'sender-msg' : 'receiver-msg'
              }`}
            >
              <small className='sender-name'> ~ {message.name}</small>
              {message.message}
              <small className='time'>4.18PM</small>
            </div>
          );
        })}
        <div className='message sender-msg'>
          <small className='sender-name'> ~ Marvey</small>
          Sorry about your current health situation too.
          <small className='time'>4.18PM</small>
        </div>
        <div className='message receiver-msg'>
          You can't handle when I talk to you?
          <small className='time'>4.18PM</small>
        </div>
      </div>
      <div className='chat-create'>
        <span>
          <IconButton>
            <TagFacesIcon />
          </IconButton>
        </span>
        <span>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
        </span>
        <form onSubmit={createMessage}>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type a message'
          />
        </form>
        <span>
          <IconButton>
            <KeyboardVoiceIcon />
          </IconButton>
        </span>
      </div>
    </div>
  );
};

export default Chat;
