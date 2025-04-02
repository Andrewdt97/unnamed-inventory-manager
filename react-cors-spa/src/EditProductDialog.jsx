import { useState } from "react";

function EditProductDialog({ toggleEditDialog }) {
  const [number, setNumber] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(number);
    toggleEditDialog();
  }

  return (
    <>
      <p>Testing</p>
      <form method="dialog" onSubmit={handleSubmit}>
        <label>Enter a number</label>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button type="submit">OK</button>
      </form>
    </>
  );
}

export default EditProductDialog;
