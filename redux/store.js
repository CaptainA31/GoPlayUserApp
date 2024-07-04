import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userDetail from './userSlice';
import facilityList from './facilitySlice';
import myGameList from './myGamesSlice';
import playNow from './playNowSlice';
import inviteList from './invitedSlice';
import conversationList from './conversationSlice';

const store = configureStore({
    reducer: {
        userDetail,
        facilityList,
        myGameList,
        playNow,
        inviteList,
        conversationList
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(), // add custom middleware here if needed
    devTools: process.env.NODE_ENV !== 'production', // enables Redux DevTools in development
});

export default store;
