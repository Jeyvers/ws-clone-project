import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ChatList from './ChatList';
import moment from 'moment';
import {
  IconButton,
  SearchIcon,
  MessageIcon,
  MoreVertIcon,
  DonutLargeIcon,
  AccountCircleIcon,
} from '../imports';

const Sidebar = () => {
  //

  const addGroup = () => {
    const newGroupName = prompt('Create New Group');

    if (newGroupName) {
      addDoc(collection(db, 'groups'), {
        name: newGroupName,
        time: moment().format('LT'),
      });
    }
  };

  return (
    <div className='sidebar'>
      <div className='sidebar-nav'>
        <span className='avatar'>
          <AccountCircleIcon />
        </span>
        <div>
          <span>
            <IconButton>
              <DonutLargeIcon />
            </IconButton>
          </span>
          <span onClick={() => addGroup()}>
            <IconButton>
              <MessageIcon />
            </IconButton>
          </span>
          <span>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </span>
        </div>
      </div>
      <div className='sidebar-search-area'>
        <div className='sidebar-search'>
          <SearchIcon />
          <input
            type='search'
            placeholder='Search or start new chat'
            name=''
            id=''
          />
        </div>
      </div>
      <ChatList />
    </div>
  );
};

export default Sidebar;
