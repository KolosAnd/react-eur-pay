import {useGetCashInConfiguration} from "../../apiHooks/useGetCashInConfiguration.js";
import {useGetLegalCashOutConfiguration} from "../../apiHooks/useGetLegalCashOutConfiguration.js";
import {useGetNaturalCashOutConfiguration} from "../../apiHooks/useGetNaturalCashOutConfiguration.js";
import {makeFees} from "../../hooks/makeFees.js";
import React, {useEffect, useState} from "react";


export const Fees = ({operations , setFees, setError}) => {

    const {dataCashIn, isLoadingCashIn, errorCashIn} = useGetCashInConfiguration();
    const {dataLegal, isLoadingLegal,  errorLegal} = useGetLegalCashOutConfiguration();
    const {dataNatural, isLoadingNatural, errorNatural} = useGetNaturalCashOutConfiguration()

    const [feesArray, setFeesArray] = useState([]);

    useEffect(() => {
        if(!isLoadingCashIn && !isLoadingNatural && !isLoadingLegal) {
            const {fees} = makeFees(dataCashIn,dataLegal, dataNatural, operations);
            console.log('fees',fees);
            setFeesArray(fees);
            setFees(fees);
        }
    }, [isLoadingCashIn,isLoadingLegal, isLoadingNatural, operations]);

    useEffect(() => {
        if(errorCashIn || errorLegal || errorNatural) {
            setError(true);
        }
    }, [errorCashIn,errorLegal,errorNatural]);


    return (
        <table border="1" className="table">
            <thead>
            <tr>
                <th>Fees</th>
            </tr>
            </thead>
            <tbody>
            {Boolean(feesArray?.length) && feesArray?.map((item,index) =>
                <tr key={index}>
                    <td>{item}</td>
                </tr>)
            }
            </tbody>
        </table>
    )
}
