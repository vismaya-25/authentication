import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function DashboardPage() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return <h2>Loading profile...</h2>;
  }

  return (
    <div className="dashboard-container">

      <div className="dashboard-card">

        <h1>Welcome, {user.fullName} 👋</h1>

        <div className="profile-section">

          <img
            src={user.avatar}
            alt={user.fullName}
            className="profile-image"
          />

          <h2>{user.fullName}</h2>

          <p>@{user.username}</p>

        </div>

        <div className="profile-details">

          <div className="profile-item">
            <strong>Username</strong>
            <span>{user.username}</span>
          </div>

          <div className="profile-item">
            <strong>Email</strong>
            <span>{user.email}</span>
          </div>

          <div className="profile-item">
            <strong>Full Name</strong>
            <span>{user.fullName}</span>
          </div>

          <div className="profile-item">
            <strong>Account Created</strong>
            <span>
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default DashboardPage;