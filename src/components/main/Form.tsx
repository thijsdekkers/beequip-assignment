import React, { useEffect, useState, useContext } from 'react';
import { LeaseContext } from '../../context/LeaseContext';
import InputField from '../common/InputField';
import Button from '../common/Button';
import { useLeaseCalculation } from '../../hooks/useLeaseCalculation';
import styles from '../../Styles.module.css';
import { CalculationInput, CalculationResponse } from '../../types';
import { formatNumber } from '../../utils/formatters';
import { useLazyQuery } from '@apollo/client';
import { GET_BOUNDARIES } from '../../graphql/queries';

const Form = () => {
  const { addCalculation } = useContext(LeaseContext);

  // todo: consolidate these
  const [objectBrand, setObjectBrand] = useState('');
  const [objectType, setObjectType] = useState('');
  const [objectYear, setObjectYear] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [minYearBoundary, setMinYearBoundary] = useState<undefined | number>(undefined);
  const [maxYearBoundary, setMaxYearBoundary] = useState<undefined | number>(undefined);
  const [minPriceBoundary, setMinPriceBoundary] = useState<undefined | number>(undefined);
  const [maxPriceBoundary, setMaxPriceBoundary] = useState<undefined | number>(undefined);

  const { calculateLease } = useLeaseCalculation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const calculationInput: CalculationInput = {
      objectBrand,
      objectType,
      objectYear,
      purchasePrice
    }

    const calculationResponse: CalculationResponse = await calculateLease(objectBrand, objectType, Number(objectYear), Number(purchasePrice));
    
    if (calculationResponse) {
      addCalculation({ ...calculationInput, ...calculationResponse });
    }
  };

  const [getBoundariesQuery] = useLazyQuery(GET_BOUNDARIES);

  useEffect(() => {
    const getBoundaries = async () => {
      try {
        const { data } = await getBoundariesQuery();
        const response = data?.boundaries;
        setMinYearBoundary(response.objectYear.min);
        setMaxYearBoundary(response.objectYear.max);
        setMinPriceBoundary(response.purchasePrice.min);
        setMaxPriceBoundary(response.purchasePrice.max);
        return 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getBoundaries();
  }, [getBoundariesQuery]);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGrid}>
        <InputField
          label="Merk"
          type="text"
          value={objectBrand}
          placeholder="Bijvoorbeeld DAF"
          onChange={(e) => setObjectBrand(e.target.value)}
        />
        <InputField
          label="Type"
          type="text"
          value={objectType}
          placeholder="Bijvoorbeeld XF480"
          onChange={(e) => setObjectType(e.target.value)}
        />
        <InputField
          label="Bouwjaar"
          type="number"
          min={minYearBoundary}
          max={maxYearBoundary}
          value={objectYear}
          placeholder="Bijvoorbeeld 2021"
          helperText={`Tussen ${minYearBoundary} en ${maxYearBoundary}`}
          onChange={(e) => setObjectYear(e.target.value)}
        />
        <InputField
          label="Aanschafwaarde"
          type="number"
          min={minPriceBoundary}
          max={maxPriceBoundary}
          value={purchasePrice}
          placeholder="Bijvoorbeeld 50000"
          helperText={`Tussen ${formatNumber(15000)} en ${formatNumber(1000000)}`}
          onChange={(e) => setPurchasePrice(e.target.value)}
        />
      </div>
      <Button>Berekening opslaan</Button>
    </form>
  );
};

export default Form;