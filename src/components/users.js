import React from "react";
import axios from "axios";
import { Route, Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import "./user.css";

const Users = () => {
  const [userData, setUserData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [userPerPage] = React.useState(5);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users?since=${currentPage}`
      );
      console.log(response.data);
      setUserData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchNext = async () => {
    setCurrentPage(currentPage + 1);
    try {
      const response = await axios.get(
        `https://api.github.com/users?since=${currentPage}`
      );
      console.log(response.data);
      setUserData(userData.concat(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const searchHandler = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    setCurrentPage(1);

    const filtered = userData.filter((val) => {
      if (query === "") {
        return val;
      } else if (val.login.toLowerCase().includes(query.toLowerCase())) {
        return val;
      }
    });
    setUserData(filtered);
  };

  const indexOfLastPost = currentPage * userPerPage;
  const indexOfFirstPost = indexOfLastPost - userPerPage;
  const currentPosts = userData.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="container">
      <div className="search">
        <label>Search</label>
        <input
          placeholder="live search..."
          value={query}
          onChange={searchHandler}
        />
      </div>
<div>
      <InfiniteScroll
        dataLength={userData.length}
        next={fetchNext}
        hasMore={true}
        loader={
          <div className="loading">
            <h4>Loading...</h4>
          </div>
        }
      >
        {currentPosts.map((user) => {
          return (
            <div key={user.id} >
              <ul className="user-info">
                <li className="list">
                  <img src={user.avatar_url} />
                  <Link to={`/users/${user.login}`}>
                    <h3>{user.login}</h3>{" "}
                  </Link>
                </li>
              </ul>
            </div>
          );
        })}
      </InfiniteScroll>
      </div>
    </div>
  );
};
export default Users;
