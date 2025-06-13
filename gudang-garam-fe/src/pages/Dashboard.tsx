import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const { token, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/items", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then(setItems);
  }, []);

  const deleteItem = async (id: number) => {
    try {
      // DELETE item
      const res = await fetch(`/api/items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        // Remove item from UI
        setItems((prev) => prev.filter((item: any) => item.id !== id));
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred during deletion.");
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Sign Out
      </button>
      <h2>Item List</h2>
      {role !== "guest" && (
        <button onClick={() => navigate("/edit/new")}>Add Item</button>
      )}
      <ul>
        {items.map((item: any) => (
          <li key={item.id}>
            {item.name} – {item.quantity}
            {role === "admin" && (
              <button onClick={() => navigate(`/edit/${item.id}`)}>Edit</button>
            )}
            {role === "admin" && (
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Dashboard;
