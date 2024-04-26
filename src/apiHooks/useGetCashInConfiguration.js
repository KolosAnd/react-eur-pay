import {useQuery} from "@tanstack/react-query";


export const useGetCashInConfiguration = () => {

    const { isLoading, error, data } = useQuery({
        queryKey: ['cashInConfiguration'],
        queryFn: () =>
            fetch(
                'https://developers.paysera.com/tasks/api/cash-in'
            ).then((response) => response.json())
        }
    );


    return {dataCashIn: data, isLoadingCashIn: isLoading, errorCashIn: error};
}
