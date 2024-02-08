import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import usersSlice from "../slices/userSlice";

const store = configureStore({
	reducer: {
		users: usersSlice, // Add your usersReducer to the store
	},
	devTools: true // TODO: Enable Redux DevTools only in development mode
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>(); // Note the correction here

export default store;
