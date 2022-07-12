import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../components/Loader/Loader";
import UserCard from "../../components/UserCard/UserCard";

const api = process.env.REACT_APP_API_URL;

export default function UserSearchPage() {
    
    const storedToken = localStorage.getItem('authToken');

    const [usersData, setUsersData] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const [searchString, setSearchString] = useState('');

    useEffect(() => {

        axios
        .get(`${api}/api/users`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => {
            setUsersData(data);
            setSearchResults(data);
        });

    }, []);

    const handleInputChange = (e) => {
        e.preventDefault();
        setSearchString(e.target.value);
        if(e.target.value === '') setSearchResults(usersData);
        else {
            const results = usersData.filter((user) => {
                if(user.username.includes(e.target.value) || user.name.includes(e.target.value)) return true;
            });

            return setSearchResults(results);
        };
    };

    return(
        <>
        <form>
            <input onChange={handleInputChange} value={searchString} />
        </form>

        {searchResults ? 
            <>
            {searchResults.map((user) => (
                <UserCard user={user} key={user._id} />
            ))}
            </>
            :
            <Loader />
        }
        </>
    );
};