interface UserStateCommon {
	username: string;
	password: string;
}
// UserSlice.ts
export interface User {
	jwt: string;
	refresh: string;
}

// 	Interfaces for registration page
export interface LoginState extends UserStateCommon { }

export interface RegisterState extends UserStateCommon {
	email: string;
}

// Login API response
export interface LoginResponse {
    jwt: string;
    refresh_token: string;
    // You can add other properties if there are more in the response
}

// Login API response
export interface registerResponse {
	username : string,
    jwt: string;
    refresh_token: string;
    // You can add other properties if there are more in the response
}
