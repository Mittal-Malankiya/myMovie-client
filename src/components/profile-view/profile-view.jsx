import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export const ProfileView = ({ user, onUserUpdate, onDeregister }) => {
  const [newUsername, setNewUsername] = useState(user.Username);
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState(user.Email);
  const [newDOB, setNewDOB] = useState(user.Birthday);
  const [showPassword, setShowPassword] = useState(false);

  const handleUpdate = () => {
    // Implement the logic to update user information
    const updatedUser = {
      Username: newUsername,
      Password: newPassword,
      Email: newEmail,
      Birthday: newDOB,
    };
    // Call a function to update the user information
    onUserUpdate(updatedUser);
  };

  return (
    <div>
      <h2>User Profile</h2>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>New Password:</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Form.Check
            type="checkbox"
            label="Show Password"
            onChange={() => setShowPassword(!showPassword)}
          />
        </Form.Group>
        {newPassword && (
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
          </Form.Group>
        )}
        <Form.Group controlId="formDOB">
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control
            type="date"
            value={newDOB}
            onChange={(e) => setNewDOB(e.target.value)}
            required
          />
        </Form.Group>
        <Link to="/profile/favorites">
          <Button variant="primary">View Favorite Movies</Button>
        </Link>
        <Button variant="primary" onClick={handleUpdate}>
          Update Profile
        </Button>
      </Form>
      <Button variant="danger" onClick={onDeregister}>
        Deregister
      </Button>
    </div>
  );
};
