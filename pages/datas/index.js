import styles from "./Datas.module.css";
import {PrismaClient} from "@prisma/client"
import { useState } from "react";
import Adata from "../../componets/adata"
import DataCard from "../../componets/datacard/DataCard";

//intializing prisma
const prisma = new PrismaClient();

export default function DataHome(props){
  const [showAddDataModal, setShowAddDataModal] = useState(false);
  const datas = props.datas;
  return(
    <div className={styles.datasCnt}>
      <div className={styles.datasBreadcrumb}>
        <div>
          <h2>Recipes 🥗🥘🍱🍛</h2>
        </div>
        <div>
          <button
            className="btn"
            style={{
              paddingLeft: "15px",
              paddingRight: "15px",
              fontWeight: "500",
            }}
            onClick={() => setShowAddDataModal((pV) => !pV)}
          >
            Add Food
          </button>
        </div>
      </div>
      <div className={styles.datas}>
        {datas?.map((data, i) => (
          <DataCard data={data} key={i} />
        ))}
      </div>
      {showAddDataModal ? (
        <Adata closeModal={() => setShowAddDataModal(false)} />
      ) : null}
    </div>
  )

}

export async function getServerSideProps() {
  const allData = await prisma.food.findMany();
  return {
    props: {
      datas: allData,
    },
  };
}
