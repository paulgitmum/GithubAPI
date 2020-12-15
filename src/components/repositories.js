import React from "react";
import axios from "axios";
import "./repositories.css";

const Repositories = ({ match }) => {
  const [user, setUser] = React.useState([]);
  const [repos, setRepo] = React.useState([]);
  console.log(match);

  React.useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const result = await axios.get(
        `https://api.github.com/users/${match.params.login}`
      );
      console.log(result.data);
      console.log(result.data.repos_url);

      const url = result.data.repos_url;
      try {
        const response = await axios.get(url);
        console.log(response);
        setRepo(response.data);
      } catch (error) {
        console.log(error);
      }
      setUser(result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <div className="content">
      <h3 >Number of Followers: {user.followers}</h3>
      <h3 >User name: {user.login}</h3>
        <h3>List of Repos</h3>
        {repos.map((repo) => {
          return (
            <div key={repo.id} >
              <ul className="list">
                <li>
                  <p>{repo.name}</p>
                </li>
              </ul>
            </div>
          );
        })}
      </div> 
    </div>
  );
};
export default Repositories;
