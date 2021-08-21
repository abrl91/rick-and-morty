const BASE_URL = 'https://rickandmortyapi.com/api';

export const getRickAndMortyData = (type) => {
    let isLoading = true;
    let endPoint = `${BASE_URL}/${type}`;
    return new Promise(async (resolve, reject) => {
        await (async () => {
            try {
                let richAndMortyData = [];
                while (isLoading) {
                    const responseData = await fetch(endPoint);
                    const data = await responseData.json();

                    if (isJsonString(data)) {
                        richAndMortyData = [...richAndMortyData, ...data.results];
                    } else {
                        continue;
                    }


                   if (data.next === null) {
                       const rickAndMortyDataKeyVal = richAndMortyData.reduce((dataObj, item) => (
                           {...dataObj, [item.url]: item}
                       ), {});

                       resolve(rickAndMortyDataKeyVal);
                       isLoading = false;
                       return;
                   }
                   endPoint = data.next;
                }
            } catch (error) {
                reject(error);
            }
        })();
    });
};

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (error) {
        return false;
    }
    return true;
}
