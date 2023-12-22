import { useNavigate } from "react-router-dom";
import LogOut from "./../assets/logout.png";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <div
      onClick={handleLogout}
      style={{ display: "flex", alignItems: "center" }}
    >
      <img src={LogOut} alt="logout" className="w-4 h-4 full mr-2" />
      <button className="text-sm font-semibold">Logout</button>
    </div>
  );
}

export default Logout;
