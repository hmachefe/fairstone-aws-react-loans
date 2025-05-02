import { useState } from "react";
import { createApplication } from "../api";
import { useNavigate } from "react-router-dom";

export default function CreateForm() {
  const [userId, setUserId]     = useState("");
  const [amount, setAmount]     = useState("");
  const [term, setTerm]         = useState("");
  const [error, setError]       = useState();
  const navigate = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const { applicationId } = await createApplication({
        userId, amount: +amount, term: +term
      });
      navigate(`/applications/${applicationId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ padding: "1rem" }}>
      <div>
        <label>User ID:</label>
        <input value={userId}
               onChange={e=>setUserId(e.target.value)} required/>
      </div>
      <div>
        <label>Amount:</label>
        <input type="number" value={amount}
               onChange={e=>setAmount(e.target.value)} required/>
      </div>
      <div>
        <label>Term (months):</label>
        <input type="number" value={term}
               onChange={e=>setTerm(e.target.value)} required/>
      </div>
      <button type="submit">Create</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
