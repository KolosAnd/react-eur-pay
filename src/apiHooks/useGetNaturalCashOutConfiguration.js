import {useQuery} from "@tanstack/react-query";


export const useGetNaturalCashOutConfiguration = () => {

    const { isLoading, error, data } = useQuery({
            queryKey: ['cashOutNaturalConfiguration'],
            queryFn: () =>
                fetch(
                    'https://developers.paysera.com/tasks/api/cash-out-natural'
                ).then((response) => response.json())
        }
    );


    return {dataNatural: data, isLoadingNatural:isLoading, errorNatural: error};
}
