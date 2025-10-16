import { AuthRequest } from "@/src/interfaces/auth";

export default class Api {

baseUrl: string = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";


/// POST REQUEST
    async post(url: string, formData: string): Promise<Response> {
        console.log(`${formData} data`)
    return await fetch(`${this.baseUrl}/${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    });

}

/// AUTH GET REQUEST
    async authGet({ url, token, queryParams }: AuthRequest): Promise<Response> {
        let encodedString = "";
        if (queryParams && queryParams !== null) {
            for (var param in queryParams) {
                encodedString += `&${param}=${queryParams[param]}`
            }
            url += "?" + JSON.stringify(encodedString);
        }
    return await fetch(`${this.baseUrl}/${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
}

/// AUTH POST REQUEST
    async authPost({ url, formData, token }: AuthRequest): Promise<Response> {
    return await fetch(`${this.baseUrl}/${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: formData
    });
}

/// AUTH PUT REQUEST
    async authPut({ url, formData, token }: AuthRequest): Promise<Response> {
    return await fetch(`${this.baseUrl}/${url}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: formData
    });
}

}
