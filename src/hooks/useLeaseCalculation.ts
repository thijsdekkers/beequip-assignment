import { useLazyQuery } from '@apollo/client';
import { CALCULATE_LEASE } from '../graphql/queries';

export const useLeaseCalculation = () => {
  const [calculateLeaseQuery] = useLazyQuery(CALCULATE_LEASE);

  const calculateLease = async (objectBrand: string, objectType: string, objectYear: number, purchasePrice: number) => {
    try {
      const { data } = await calculateLeaseQuery({
        variables: { input: { purchasePrice: purchasePrice, object: { brand: objectBrand, type: objectType, year: objectYear } } },
      });
      return data?.leaseCalculation;
    } catch (error) {
      console.error("Error calculating lease:", error);
    }
  };

  return { calculateLease };
};