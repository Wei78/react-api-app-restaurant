import { useHttp } from '../hooks/http.hook';

const useFoodService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://yummly2.p.rapidapi.com/feeds/list';
    const _apiKey = '91a64453d3msh9439a47aa260a37p12d447jsne19e2ddd30ad';
    const _apiHost = "yummly2.p.rapidapi.com";

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': _apiKey,
            'X-RapidAPI-Host':  _apiHost
        }
    };

    const getFood = async (offset = 9) => {
        const res = await request(`${_apiBase}?limit=${offset}&start=0`, options);
        return res.feed.map(d => _transformDish(d));  
    }

    const getDish = async (id) => {
        const res = await request(`${_apiBase}?limit=24&start=0`, options);
        return _transformDish(res.feed[id]); 
    }

    const _transformDish = (dish) => {
        return {
            id: Math.floor(Math.random() * (20 - 1) + 1),
            name: dish.display.displayName,
            image: dish.display.images[0],
            description: dish.content.description ? dish.content.description.text : "No description for this dish :(",
            ingredients: dish.content.ingredientLines,
            price: (Math.random() * (99.99 - 3.99) + 3.99).toFixed(2),
        }
    }

    return {
        loading,
        error,
        getDish,
        getFood,
        clearError
    }
}

export default useFoodService;