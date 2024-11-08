import axios from "axios";
import { createContext } from "react";

export const postByIdContext = createContext()

const PostByIdContextProvider = ({children}) => {
    const [postById, setPostById] = useState([])

    const getPostById = () => {
        axios
            .get(`https://photo-sharing-api-bootcamp.do.dibimbing.id//api/v1/post/${postId}`)
    }
    return(
        <postByIdContext.Provider value={postById}>
            {children}
        </postByIdContext.Provider>
    )
}