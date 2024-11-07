import { useContext } from 'react';
import { LeaseContext } from '../../context/LeaseContext';
import styles from  "../../Styles.module.css"
import { formatNumber } from '../../utils/formatters';

const Sidebar = () => {
  const { calculations } = useContext(LeaseContext);

  return (
    <div className={styles.sidebar}>
      <h2>Bewaarde berekeningen</h2>
      <ul>
        {calculations.map((calc, index) => (
          <li key={index}>
            <table>
              <tbody>
                <tr>
                  <td><strong>{calc.objectBrand} {calc.objectType}</strong></td>
                  <td><span>{formatNumber(Number(calc.monthlyPayment))}</span> /mnd</td>
                </tr>
                <tr>
                  <td>Aanbetaling</td>
                  <td>{formatNumber(calc.downPayment)}</td>
                </tr>
                <tr>
                  <td>Slottermijn</td>
                  <td>{formatNumber(calc.balloonPayment)}</td>
                </tr>
                <tr>
                  <td>Looptijd</td>
                  <td>{calc.tenor} maanden</td>
                </tr>
              </tbody>
            </table>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;