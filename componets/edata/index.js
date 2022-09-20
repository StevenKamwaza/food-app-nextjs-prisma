import { useState, useRef } from "react";
import axios from "axios";

export default function Edata({ closeModal, data }) {
  const formRef = useRef();
  const [disable, setDisable] = useState(false);

  async function editData() {
    setDisable(true);
    const {
      editDataName,
      editDataPrice,
      editDataImageUrl,
      editDataActive,
      editDataDescription,
      editDataIngredients,
    } = formRef.current;
    const name = editDataName.value;
    const price = editDataPrice.value;
    const imageUrl = editDataImageUrl.value;
    const active = editDataActive.value;
    const description = editDataDescription.value;
    const ingredients = editDataIngredients.value;

    await axios.put("/api/editData", {
      id: parseInt(data?.id),
      name,
      price,
      imageUrl,
      active,
      description,
      ingredients,
    });
    setDisable(false);
    window.location.reload();
  }

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={() => closeModal()}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit data</h3>
          <span
            style={{ padding: "10px", cursor: "pointer" }}
            onClick={() => closeModal()}
          >
            X
          </span>
        </div>
        <div className="modal-body content">
          <form ref={formRef}>
            <div style={{ display: "flex", margin: "2px 2px 0 0" }}>
              <div
                style={{ flex: "1 1 100%", margin: "0 0 2px 5px" }}
                className="inputField"
              >
                <div className="label">
                  <label>Name</label>
                </div>
                <div>
                  <input
                    defaultValue={data?.name}
                    name="editDataName"
                    type="text"
                  />
                </div>
              </div>
              <div
                style={{ flex: "1 1 50%", margin: "0 0 2px 5px" }}
                className="inputField"
              >
                <div className="label">
                  <label>Price($)</label>
                </div>
                <div>
                  <input
                    defaultValue={data?.price}
                    name="editDataPrice"
                    type="text"
                  />
                </div>
              </div>
              <div
                style={{ flex: "1 1 50%", margin: "0 0 2px 5px" }}
                className="inputField"
              >
                <div className="label">
                  <label>Active</label>
                </div>
                <div>
                  <input
                    defaultValue={data?.active}
                    name="editDataActive"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="inputField">
              <div className="label">
                <label>ImageUrl</label>
              </div>
              <div>
                <input
                  defaultValue={data?.imageUrl}
                  name="editDataImageUrl"
                  type="text"
                />
              </div>
            </div>
            <div className="inputField">
              <div className="label">
                <label>Ingredients</label>
              </div>
              <div>
                <textarea
                  defaultValue={data?.ingredients}
                  style={{ width: "100%", height: "100px" }}
                  name="editDataIngredients"
                  type="text"
                ></textarea>
              </div>
            </div>
            <div className="inputField">
              <div className="label">
                <label>Description</label>
              </div>
              <div>
                <textarea
                  defaultValue={data?.description}
                  style={{ width: "100%", height: "100px" }}
                  name="editDataDescription"
                  type="text"
                ></textarea>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button onClick={() => closeModal()}>Cancel</button>
          <button disabled={disable} className="btn" onClick={() => editData()}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}