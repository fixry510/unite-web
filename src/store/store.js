import { configureStore } from '@reduxjs/toolkit';
import loadSlice from './loadSlice';



export default configureStore({
  reducer: {
    loadWrap: loadSlice,
  },
});