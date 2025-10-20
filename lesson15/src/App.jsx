import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);        // All users from API
  const [search, setSearch] = useState("");      // Text from the input field
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered result

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data); // Start with all users
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    // Filter users when search text changes
    const results = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(results);
  }, [search, users]);

  return (
    <div className="App">
      <h1>Lesson 15: Search Filter</h1>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user.id}>
              {user.name} — <span>{user.email}</span>
            </li>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
