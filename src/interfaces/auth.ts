
interface AuthRequest {
    url: string,
    formData: any,
    token: string,
    queryParams?: Record<string, any>
}

interface UserData {
    id: string,
    email: string,
    fullName: string
}

export {AuthRequest, UserData}
