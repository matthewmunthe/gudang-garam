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
    <div className={"dashboard-container"}>
      <button
        style={{
          backgroundColor: "red",
          color: "white",
        }}
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Sign Out
      </button>
      <h1>Gudang Garam</h1>
      {role !== "guest" && (
        <button onClick={() => navigate("/edit/new")}>Add Item</button>
      )}
      {items.map((item: any) => (
        <ul className={"item-container"} key={item.id}>
          <div className={"text-container"}>
            <span>
              <b>{item.name}</b> – {item.quantity}
            </span>
            <span>{item.description}</span>
          </div>
          <div className={"button-container"}>
            {role === "admin" && (
              <button
                style={{ margin: "0.5em" }}
                onClick={() => navigate(`/edit/${item.id}`)}
              >
                Edit
              </button>
            )}
            {role === "admin" && (
              <button
                style={{
                  margin: "0.5em",
                  backgroundColor: "red",
                  color: "white",
                }}
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </button>
            )}
          </div>
        </ul>
      ))}
    </div>
  );
};
export default Dashboard;
