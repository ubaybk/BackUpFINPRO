import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const followersContext = createContext();

export const FollowersContextProvider = ({ children }) => {
    const [dataMyfollowers, setDataMyFollowers] = useState([]);
    const apiKey = import.meta.env.VITE_API_KEY;
    const token = localStorage.getItem("token");

    const getMyfollowers = () => {
        axios
            .get('https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/my-followers?size=10&page=1', {
                headers: {
                    "Content-Type": "application/json",
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((res) => {
                setDataMyFollowers(res.data);
            })
            .catch((err) => {
                console.error('Error fetching my followers:', err);
            });
    };

    useEffect(() => {
        getMyfollowers();
    }, []);

    return (
        <followersContext.Provider value={{ dataMyfollowers }}>
            {children}
        </followersContext.Provider>
    );
};
