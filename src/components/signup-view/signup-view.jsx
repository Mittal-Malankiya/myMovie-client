import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {};

  <form onSubmit={handleSubmit} className="my-4">
    <div className="mb-3">
      <label className="form-label">Username:</label>
      <input
        type="text"
        className="form-control"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        minLength="3"
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Password:</label>
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Email:</label>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Birthday:</label>
      <input
        type="date"
        className="form-control"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        required
      />
    </div>
    <button type="submit" className="btn btn-primary">
      Submit
    </button>
  </form>;
};
