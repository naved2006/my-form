import { useState } from "react";
import "./App.css";

function App() {
  const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    hobby: [],
    country: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    username: "",
    about: "",
  };

  const [form, setForm] = useState(initialForm);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gender
  const handleGender = (e) => {
    setForm((prev) => ({
      ...prev,
      gender: e.target.value,
    }));
  };

  // Hobby
  const handleHobby = (e) => {
    const { value, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      hobby: checked
        ? [...prev.hobby, value]
        : prev.hobby.filter((item) => item !== value),
    }));
  };

  // Reset
  const handleReset = () => {
    setForm(initialForm);
    setEditId(null);
  };

  // Add / Update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.country
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (editId !== null) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editId
            ? {
                ...form,
                id: editId,
              }
            : user
        )
      );

      setEditId(null);
    } else {
      const newUser = {
        ...form,
        id: Date.now(),
      };

      setUsers((prev) => [...prev, newUser]);
    }

    setForm(initialForm);
  };

  // Edit
  const handleEdit = (user) => {
    setForm({
      ...user,
      hobby: [...user.hobby],
    });

    setEditId(user.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  // Search
  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    return (
      user.firstName.toLowerCase().includes(searchText) ||
      user.lastName.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText) ||
      user.username.toLowerCase().includes(searchText) ||
      user.country.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="app">

      {/* ================= BASIC INFORMATION ================= */}

      <section className="section">

        <h1>Basic Information</h1>

        <p className="sub-title">
          Please provide your basic information.
        </p>

        <div className="form-grid">

          {/* First Name */}
          <div className="form-group">
            <label>
              First name <span>*</span>
            </label>

            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First name"
            />
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label>
              Last name <span>*</span>
            </label>

            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last name"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>
              Email address <span>*</span>
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="xyx@gmail.com"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>
              Password <span>*</span>
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          {/* Gender */}
          <div className="form-group">
            <label>Gender</label>

            <div className="radio-box">

              <label className="choice">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={form.gender === "Male"}
                  onChange={handleGender}
                />
                Male
              </label>

              <label className="choice">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={form.gender === "Female"}
                  onChange={handleGender}
                />
                Female
              </label>

            </div>
          </div>

          {/* Hobby */}
          <div className="form-group">
            <label>Hobby</label>

            <div className="hobby-box">

              {[
                "Reading",
                "Writing",
                "Surfing",
                "Travelling",
                "Music",
              ].map((item) => (
                <label className="choice" key={item}>

                  <input
                    type="checkbox"
                    value={item}
                    checked={form.hobby.includes(item)}
                    onChange={handleHobby}
                  />

                  {item}

                </label>
              ))}

            </div>
          </div>

          {/* Country */}
          <div className="form-group">
            <label>
              Country <span>*</span>
            </label>

            <select
              name="country"
              value={form.country}
              onChange={handleChange}
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          {/* Street */}
          <div className="form-group">
            <label>Street address</label>

            <input
              type="text"
              name="street"
              value={form.street}
              onChange={handleChange}
              placeholder="123 Main Street"
            />
          </div>

        </div>


        {/* City / State / ZIP */}

        <div className="three-grid">

          <div className="form-group">
            <label>City</label>

            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>State / Province</label>

            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>ZIP / Postal code</label>

            <input
              type="text"
              name="zip"
              value={form.zip}
              onChange={handleChange}
            />
          </div>

        </div>

      </section>


      {/* ================= PROFILE ================= */}

      <section className="section profile">

        <h1>Profile</h1>

        <p className="sub-title">
          This information will be displayed publicly so be careful what you share.
        </p>

        <div className="form-grid">

          <div className="form-group">
            <label>Username</label>

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="janesmith"
            />
          </div>

          <div className="form-group">
            <label>About</label>

            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              placeholder="Write a few sentences about yourself."
            />
          </div>

        </div>

      </section>


      {/* ================= BUTTONS ================= */}

      <div className="button-section">

        <button
          type="button"
          className="reset"
          onClick={handleReset}
        >
          Reset
        </button>

        <button
          type="button"
          className="add"
          onClick={handleSubmit}
        >
          {editId !== null ? "Update User" : "Add User"}
        </button>

      </div>


      {/* ================= SEARCH ================= */}

      <section className="users-area">

        <div className="search-area">

          <input
            type="text"
            placeholder="Search Users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="user-count">
            {filteredUsers.length} Users found
          </div>

        </div>


        {/* Users Heading */}

        <h2 className="users-title">
          Users
        </h2>


        {/* ================= TABLE ================= */}

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Gender</th>
                <th>Hobby</th>
                <th>Address</th>
                <th>State</th>
                <th>Country</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredUsers.length === 0 ? (

                <tr>
                  <td colSpan="10" className="empty">
                    No users found
                  </td>
                </tr>

              ) : (

                filteredUsers.map((user) => (

                  <tr key={user.id}>

                    <td>
                      {user.username || "-"}
                    </td>

                    <td>
                      {user.firstName} {user.lastName}
                    </td>

                    <td>
                      {user.email}
                    </td>

                    <td>
                      ••••••••
                    </td>

                    <td>
                      {user.gender || "-"}
                    </td>

                    <td>
                      {user.hobby.length
                        ? user.hobby.join(", ")
                        : "-"}
                    </td>

                    <td>
                      {user.street || "-"}
                    </td>

                    <td>
                      {user.state || "-"}
                    </td>

                    <td>
                      {user.country}
                    </td>

                    <td>

                      <div className="actions">

                        <button
                          className="edit"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>


        {/* ================= PAGINATION ================= */}

        <div className="pagination">

          <button>
            Prev
          </button>

          <button>
            Next
          </button>

        </div>


        <div className="showing">
          Showing 0 to {filteredUsers.length} of{" "}
          {filteredUsers.length} Users
        </div>

      </section>

    </div>
  );
}

export default App;