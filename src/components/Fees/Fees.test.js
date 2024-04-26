import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Fees } from './Fees';

import { useGetCashInConfiguration } from '../../apiHooks/useGetCashInConfiguration';
import { useGetLegalCashOutConfiguration } from '../../apiHooks/useGetLegalCashOutConfiguration';
import { useGetNaturalCashOutConfiguration } from '../../apiHooks/useGetNaturalCashOutConfiguration';


jest.mock('../../apiHooks/useGetCashInConfiguration');
jest.mock('../../apiHooks/useGetLegalCashOutConfiguration');
jest.mock('../../apiHooks/useGetNaturalCashOutConfiguration');

describe('Fees component', () => {
    beforeEach(() => {
        useGetCashInConfiguration.mockReturnValue({
            dataCashIn: {percents: 0.03,
                max: {
                    amount: 5,
                    currency: "EUR"
                } },
            isLoadingCashIn: false,
            errorCashIn: null
        });

        useGetLegalCashOutConfiguration.mockReturnValue({
            dataLegal: { percents: 0.3, min: {
                    amount: 0.5,
                    currency: "EUR"
                } },
            isLoadingLegal: false,
            errorLegal: null
        });

        useGetNaturalCashOutConfiguration.mockReturnValue({
            dataNatural: { percents: 0.3,
            week_limit: {
                amount: 1000,
                    currency: "EUR"
            } },
            isLoadingNatural: false,
            errorNatural: null
        });
    });

    it('fetches configuration data and renders fees correctly', async () => {
        const operations = [{ /* ваші моковані операції */ }];
        const setFees = jest.fn();
        const setError = jest.fn();

        render(<Fees operations={operations} setFees={setFees} setError={setError} />);

        await waitFor(() => {
            expect(screen.getByRole('row')).toBeInTheDocument();
        });
    });

    it('handles errors when fetching configuration data', async () => {
        useGetCashInConfiguration.mockReturnValueOnce({
            dataCashIn: null,
            isLoadingCashIn: false,
            errorCashIn: new Error('API error')
        });

        const operations = [{ }];
        const setFees = jest.fn();
        const setError = jest.fn();

        render(<Fees operations={operations} setFees={setFees} setError={setError} />);

        await waitFor(() => {
            expect(setError).toHaveBeenCalledWith(true);
        });
    });
});
