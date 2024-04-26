import { render, screen, waitFor } from '@testing-library/react';
import { Table } from './Table';
import renderer from 'react-test-renderer';
import {QueryClient, QueryClientProvider,} from "@tanstack/react-query";
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
    fetch.resetMocks();
});
const queryClient = new QueryClient()

test('Table default', () => {
    const component = renderer.create(
        <QueryClientProvider client={queryClient}>
            <Table/>
        </QueryClientProvider>
        ,);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


describe('Table component', () => {
    it('loads and displays the operations data correctly', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({
            operations: [
                { date: '2020-01-01', user_id: 1, user_type: 'natural', type: 'cash_out', operation: { amount: 100.00 } }
            ]
        }));

        render(
        <QueryClientProvider client={queryClient}>
            <Table/>
        </QueryClientProvider>);

    });

    it('renders DownloadButton when feesArray has items', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({
            operations: [
                { date: '2020-01-01', user_id: 1, user_type: 'natural', type: 'cash_out', operation: { amount: 100.00 } }
            ]
        }));

        render(
        <QueryClientProvider client={queryClient}>
            <Table/>
        </QueryClientProvider>);

        await waitFor(() => {
            expect(screen.queryByRole('button', { name: /download output\.json/i })).not.toBeInTheDocument();
        });
    });
});
