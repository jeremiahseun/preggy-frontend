
interface AuthRequest {
    url: string,
    formData: any,
    token: string
}

interface UserData {
    id: string,
    email: string,
    fullName: string
}

export {AuthRequest, UserData}
