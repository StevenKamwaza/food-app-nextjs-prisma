import Link from "next/link";
import styles from "./DataCard.module.css"

export default function DataCard({ data }) {
  return (
    <Link href={`/data/${data.id}`}>
      <div className={styles.dataCard}>
        <div
          alt={`data Image of: ${data?.name}`}
          aria-label={`data Image of: ${data?.name}`}
          className={styles.dataCardImg}
          style={{ backgroundImage: `url(${data.imageUrl})` }}
        ></div>
        <div className={styles.dataCardFooter}>
          <div className={styles.dataCardName}>
            <h3>{data.name}</h3>
          </div>
          <div className={styles.dataCardPrice}>
            <span>Price(💵)</span>
            <span>{data.price}</span>
          </div>
          <div className={styles.dataCardActive}>
            <span>Active:</span>
            <span>{data.active}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}