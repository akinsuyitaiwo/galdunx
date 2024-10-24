export interface IUser {
    _id?: string
    username?: string
    password: string
    createdAt?: Date
    updatedAt?: Date
  }

export interface CustomRequest {
    user: IUser
    file: object
    params: object
    query: object
    path: object
}

export interface PayloadInterface {
    id: string
    email: string
}

export interface Credentials {
    username: string
    password: string
}