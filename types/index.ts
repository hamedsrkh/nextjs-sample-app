export interface User{
    id: string,
    name: string,
    description: string,
    employed: boolean
}

export type UserAction = {
    type: string
    payload: User | null
}

type DispatchType = (args: UserAction) => UserAction