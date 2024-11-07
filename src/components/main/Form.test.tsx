import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Form from './Form';
import { LeaseContext } from '../../context/LeaseContext';
import { GET_BOUNDARIES } from '../../graphql/queries';

describe('Form Component', () => {
  const addCalculationMock = jest.fn();
  const mocks = [
    {
      request: {
        query: GET_BOUNDARIES,
      },
      result: {
        data: {
          boundaries: {
            objectYear: { min: 2013, max: 2022 },
            purchasePrice: { min: 15000, max: 1000000 },
          },
        },
      },
    },
  ];

  const setup = () =>
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LeaseContext.Provider value={{ calculations: [], addCalculation: addCalculationMock }}>
          <Form />
        </LeaseContext.Provider>
      </MockedProvider>
    );

  it('renders form fields with correct placeholders', async () => {
    setup();
    expect(screen.getByPlaceholderText('Bijvoorbeeld DAF')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Bijvoorbeeld XF480')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Bijvoorbeeld 2021')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Bijvoorbeeld 50000')).toBeInTheDocument();
  });

  // it('fetches and displays boundaries correctly', async () => {
  // });

  // it('handles form submission with filled fields', async () => {
  // });

  // it('displays an error message if the boundaries query fails', async () => {
  // });
});