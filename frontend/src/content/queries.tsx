import axios, { AxiosResponse } from "axios"

type QueryResult = {
    status: number,
    content: any | null,
}

export function post(query: string, content: any): QueryResult{
    
    let fullQuery = "http://localhost:8000/" + query
    axios.post(fullQuery, content, {withCredentials: true})
    .then(result => {
        if (result.data["status"] != "0") {
            return {status: Number(result.data["status"]), content: null}
        }
        return {status: 0, content: result.data["content"],}
    })
    .catch(() => {
        return {status: -1, content: null}
    })
}