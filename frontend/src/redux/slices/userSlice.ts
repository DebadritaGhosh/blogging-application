// userSlice.ts

import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import api from "../../services/api";
import { LoginResponse, LoginState, RegisterState, User } from "../../interfaces";

export interface UsersState {
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: SerializedError | string | null;
	isAuthenticated: boolean;
	user: User;
}

// Initial state
const initialState: UsersState = {
	status: 'idle',
	error: null,
	isAuthenticated: false,
	user: {
		jwt: "",
		refresh: "",
	}
};

export const loginUser = createAsyncThunk<User, LoginState, { rejectValue: string }>('userSlice/login', async (values, { rejectWithValue }) => {
	try {
		const { data } = await api.post("/login", values);
		console.log('LOGIN RESPONSE ===============> ', data);
		return { ...data, user: values.username };
	} catch (error: any) {
		return rejectWithValue(error.message);
	}
});

export const registerUser = createAsyncThunk<User, RegisterState, { rejectValue: string }>('userSlice/register', async (values, { rejectWithValue }) => {
	try {
		const { data } = await api.post("/register", values);
		return { ...data, user: values.username };
	} catch (error: any) {
		return rejectWithValue(error.message);
	}
});

const usersSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		logout: (state) => {
			state.status = "idle";
			state.error = null;
			state.isAuthenticated = false;
			state.user = initialState.user;
		}
	},
	extraReducers: (builder) => {
		builder
			// Login
			.addCase(loginUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.isAuthenticated = true;
				state.user = action.payload;
				state.error = null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload as SerializedError;
				state.isAuthenticated = false;
			})
			// Register
			.addCase(registerUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.isAuthenticated = true;
				state.user = action.payload;
				state.error = null;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload as SerializedError;
				state.isAuthenticated = false;
			});
	},
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;
