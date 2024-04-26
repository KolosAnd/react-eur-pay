import React, {useEffect, useState} from "react";
import './table.style.scss';
import {Fees} from "../Fees/Fees.jsx";
import {DownloadButton} from "../DownloadButton/DownloadButton.jsx";

export const Table = () => {
    const [operations, setOperations] = useState([]);
    const [feesArray, setFeesArray] = useState([]);

    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/input.json')
            .then(response => response.json())
            .then(data => setOperations(data.operations))
            .catch(error => console.error('Error loading the data', error));
    }, []);

    return (
        <>
            {!error ?
                <div className="table-wrap">
                    <div className="tables-container">
                        <table border="1" className="table">
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>User ID</th>
                                <th>User Type</th>
                                <th>Type</th>
                                <th>Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {operations.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.date}</td>
                                    <td>{item.user_id}</td>
                                    <td>{item.user_type}</td>
                                    <td>{item.type}</td>
                                    <td>{item.operation.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                            <Fees operations={operations} setFees={setFeesArray} setError={setError} />

                    </div>
                    {feesArray?.length > 0 &&
                        <DownloadButton feesArray={feesArray} />
                    }
                </div>
                :
                <div className="error-wrap">
                    <h2>
                        Something wrong with api
                    </h2>
                </div>
            }
        </>

    )
}
