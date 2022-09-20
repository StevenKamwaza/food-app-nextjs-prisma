import styles from "./Data.module.css";
import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import Edata from "../../componets/edata";
import axios from "axios";
import { useRouter } from "next/router";

const prisma = new PrismaClient();

export default function Data(props) {
  const [showEditDataModal, setShowEditDataModal] = useState(false);
  const router = useRouter();
  const { data } = props;

  async function deleteData() {
    if (window.confirm("Do you want to delete this data?")) {
      
      await axios.post("/api/deletedata", { id: parseInt(data?.id) });
      router.push("/datas");
    }
  }

  return (
    <div className={styles.dataContainer}>
      <div className={styles.data}>
        <div
          alt={`data Image of: ${data?.name}`}
          aria-label={`data Image of: ${data?.name}`}
          className={styles.dataImage}
          style={{ backgroundImage: `url(${data?.imageUrl})` }}
        ></div>
        <div className={styles.dataDetails}>
          <div className={styles.dataName}>
            <h1>{data?.name}</h1>
          </div>
          <div style={{ padding: "5px 0" }}>
            <span>
              <button
                onClick={() => setShowEditDataModal((pV) => !pV)}
                style={{ marginLeft: "0" }}
                className="btn"
              >
                Edit
              </button>
              <button onClick={deleteData} className="btn btn-danger">
                Delete
              </button>
            </span>
          </div>
          <div style={{ padding: "5px 0" }}>
            <span> Price(💵): {data?.price}</span>
          </div>
          <div className={styles.dataDescIngreCnt}>
            <h2>Ingredients</h2>
            <div className={styles.dataSynopsis}>{data?.ingredients}</div>
          </div>
          <div className={styles.dataDescIngreCnt}>
            <h2>Description</h2>
            <div className={styles.dataSynopsis}>{data?.description}</div>
          </div>
        </div>
      </div>
      {showEditDataModal ? (
        <Edata data={data} closeModal={() => setShowEditDataModal(false)} />
      ) : null}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const data = await prisma.food.findUnique({ where: { id: parseInt(id) } });
  return {
    props: {
      data,
    },
  };
}