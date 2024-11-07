import { gql } from '@apollo/client';

export const CALCULATE_LEASE = gql`
  query CalculateLease($input: LeaseCalculationInput!) {
    leaseCalculation(input: $input) {
      monthlyPayment
      downPayment
      balloonPayment
      tenor
    }
  }
`;

export const GET_BOUNDARIES = gql`
  query getBoundaries {
    boundaries {
      purchasePrice {
        min
        max
      }
      objectYear {
        min
        max
      }
    }
  }
`;