import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { User } from "../models/user";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage);
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage);
        } else {
            throw Error("Request failed with status:" + response.status + "message:" + errorMessage);
        }

        
    }

}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/users", { method: "GET" });
    return response.json();

}



export interface LoginCredentials {
    username: string,
    password: string,
}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData("/api/users/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    return response.json();

}

export async function logout() {
    await fetchData("/api/users/logout", { method: "POST" });

}

export async function fetchUser(): Promise<User[]> {
    const response = await fetchData("/api/users", { method: "GET" });
    return response.json();

}

export interface UserInput {
    username:string,
    email:string,
    password:string,
   
}

export async function createUser(user: UserInput): Promise<User> {
    const response = await fetchData("/api/user",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }

    );

    return response.json();


}

export async function updateUser(userId: string, user: UserInput): Promise<User> {
    const response = await fetchData("/api/user/" + userId,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
    return response.json();
}

export async function deleteUser(userId: string) {
    await fetchData("/api/user/" + userId, { method: "DELETE" });
}