import {User} from "../../types";
import Api from "../../api";

export async function fetchUser(id : string): Promise<User> {
    const {data} = await Api.get(`/users/${id}`)
    return data
}
