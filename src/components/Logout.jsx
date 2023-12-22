import { useNavigate } from "react-router-dom";
import LogOut from "./../assets/logout.png";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      onClick={handleLogout}
      className="pb-4 flex items-center p-2 text-gray-900 rounded-lg hover:bg-purple-300 group"
      style={{ display: "flex", alignItems: "center" }}
    >
      <img src={LogOut} alt="Profile Picture" className="w-4 h-4 full mr-2" />
      <button style={{ fontSize: "1.25em", fontWeight: "bold" }}>Logout</button>
    </div>
  );
}

export default Logout;
