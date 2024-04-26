import {useQuery} from "@tanstack/react-query";


export const useGetLegalCashOutConfiguration = () => {

    const { isLoading, error, data } = useQuery({
            queryKey: ['cashOutLegalConfiguration'],
            queryFn: () =>
                fetch(
                    'https://developers.paysera.com/tasks/api/cash-out-juridical'
                ).then((response) => response.json())
        }
    );


    return {dataLegal:data, isLoadingLegal: isLoading, errorLegal: error};
}
