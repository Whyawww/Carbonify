import styles from './FallingLeaves.module.css';

const FallingLeaves = () => {
  const leaves = Array.from({ length: 10 });

  return (
    <div className={styles.leavesContainer}>
      {leaves.map((_, index) => (
        <div key={index} className={styles.leaf}></div>
      ))}
    </div>
  );
};

export default FallingLeaves;
