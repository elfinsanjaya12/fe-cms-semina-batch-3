import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categories/reducer';
import notifReducer from './notif/reducer';
import authReducer from './auth/reducer';
import talentsReducer from './talents/reducer';
import listsReducer from './lists/reducer';
import eventsReducer from './events/reducer';

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    notif: notifReducer,
    auth: authReducer,
    talents: talentsReducer,
    lists: listsReducer,
    events: eventsReducer,
  },
});

export default store;
