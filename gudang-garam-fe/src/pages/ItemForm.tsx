import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ItemForm = () => {
  const { id } = useParams();
  const isNew = id === "new";
  const [item, setItem] = useState({ name: "", quantity: 0, description: "" });
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isNew) {
      fetch("/api/items", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => res.json())
        .then((data) => {
          const existing = data.find((i: any) => i.id === parseInt(id!));
          if (existing) setItem(existing);
        });
    }
  }, [id]);

  const saveItem = async () => {
    await fetch(`/api/items/${isNew ? "" : id}`, {
      method: isNew ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    });
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>{isNew ? "Create" : "Edit"} Item</h1>
      <input
        value={item.name}
        onChange={(e) => setItem({ ...item, name: e.target.value })}
        placeholder="Name"
      />
      <input
        type="number"
        value={item.quantity}
        onChange={(e) => setItem({ ...item, quantity: Number(e.target.value) })}
        placeholder="Quantity"
      />
      <textarea
        style={{ width: "20em", height: "5em" }}
        value={item.description}
        onChange={(e) => setItem({ ...item, description: e.target.value })}
        placeholder="Description"
      />
      <button onClick={saveItem}>Save</button>
      <button
        style={{
          backgroundColor: "transparent",
          border: "2px solid #014282",
          color: "#B92025",
        }}
        onClick={() => navigate("/dashboard")}
      >
        Cancel
      </button>
    </div>
  );
};
export default ItemForm;
