import Form from '../components/main/Form';
import Sidebar from '../components/main/Sidebar';
import styles from '../Styles.module.css';

const CalculatorPage = () => (
  <div className={styles.centered}>
    <div className={styles.grid}>
      <Form />
      <Sidebar />
    </div>
  </div>
);

export default CalculatorPage;