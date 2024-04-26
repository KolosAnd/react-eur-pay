import { render, screen, } from '@testing-library/react';
import {DownloadButton} from "./DownloadButton";


describe('DownloadButton', () => {

    beforeEach(() => {
        global.URL.createObjectURL = jest.fn(() => "https://url-for-blob");
        global.URL.revokeObjectURL = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders the download button', () => {
        render(<DownloadButton feesArray={[]} />);
        const button = screen.getByRole('button', { name: /download output\.json/i });
        expect(button).toBeInTheDocument();
    });
});
