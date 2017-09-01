module.exports = (app) => {
    const controller = {};
    const rp = require('request-promise-native');
    const URLSEARCH = "https://api.mercadolibre.com/sites/MLA/search?q=";
    const URLSCURRENCY = "https://api.mercadolibre.com/currencies/";
    const URLGETPRODUCT = "https://api.mercadolibre.com/items/";

    const getDecimals = (currencyId, callback) => {
        const optionsCurrency = {
            uri: URLSCURRENCY+currencyId,
            json: true
        }

        rp(optionsCurrency)
            .then((resultCurrency) => {
                let decimal = resultCurrency;
                callback(null, decimal);
            })
            .catch((err) => {
                console.log(err);
                callback(err);    
            });
    }

    const getDescription = (id , callback) => {

        const optionsDescripion = {
            uri: URLGETPRODUCT+id+'/description',
            json: true
        }

        rp(optionsDescripion)
            .then((resultDescription) => {
                let description = resultDescription.plain_text;
                callback(null, description);
            })
            .catch((err) => {
                console.log(err);
                callback(err);    
            });
    }

    const getCategories = (available_filters, callback) => {
        let categories = [];
         for (i = 0; i < available_filters.length; i++) {
            let filter = available_filters[i]; 
            if (filter.id == 'category') {
                for (i2 = 0; i2 < filter.values.length; i2++) {
                    let valueFilter = filter.values[i2];
                    categories.push(valueFilter.name);
                }
            }
        }

        callback(null, categories);
    }

	controller.lista = (req, res) => {
        let query = req.query.search;
        let urlSearch = URLSEARCH+query;
        let options = {
           uri: urlSearch,
           json: true // Automatically parses the JSON string in the response
        };

        rp(options)
        .then(function (result) {
            if(result.results.length >0 ) {
                getDecimals(result.results[0].currency_id, (err, decimal) => {
                    if (!err) {
                        let nrDecimal = decimal.decimal_places;
                        getCategories(result.available_filters, (err, categories) => {
                            let products = {
                                author : {
                                    name : '',
                                    lastname : ''    
                                },
                                itens : []
                            };
                            products.categories = categories;

                            for (i = 0; i < result.results.length; i++) {
                                let resultItem = result.results[i];
                                
                                resultItem.price =  resultItem.price.toFixed(nrDecimal);

                                products.itens.push({
                                    id : resultItem.id,
                                    title : resultItem.title,
                                    price : {
                                        currency : resultItem.currency_id,
                                        amount : resultItem.price,
                                        decimals : nrDecimal,
                                        symbol : decimal.symbol
                                    },
                                    picture : resultItem.thumbnail,
                                    condition : resultItem.condition,
                                    free_shipping : resultItem.shipping.free_shipping
                                })
                            }

                            res.send(products);
                        })
                    } else {
                        res.status(500).send({'erro' : 'Erro ao buscar dados'});
                    }
                });
            } else {
                 res.status(500).send({'erro' : 'Erro ao buscar dados'});
            }
        })
        .catch(function (err) {
            console.log(err);
             res.status(500).send({'erro' : 'Erro ao buscar dados'});
        });
    }

    controller.get = (req, res) => {
        let id = req.params.id; 
        let product = {
                    author : {
                        name : '',
                        lastname : ''    
                    },
                };

        const optionsGet = {
            uri: URLGETPRODUCT+id,
            json: true
        }

        rp(optionsGet)
        .then(function (result) {
           
           getDecimals(result.currency_id, (err, decimal) => {
                let nrDecimal = decimal.decimal_places;
                
                result.price =  result.price.toFixed(nrDecimal);
                
                product.item = {
                    id : result.id,
                    title : result.title,
                    price : {
                        currency : result.currency_id,
                        amount : result.price,
                        decimals : nrDecimal,
                        symbol : decimal.symbol
                    },
                    picture : result.pictures[0],
                    condition : result.condition,
                    free_shipping : result.shipping.free_shipping,
                    sold_quantity : result.sold_quantity,
                }

                getDescription(result.id, (err, description) => {
                    product.description = description;
                    res.send(product);
                })
           })
        })
        .catch(function (err) {
            console.log(err);
             res.status(500).send({'erro' : 'Erro ao buscar dados'});
        });
    }

    return controller;
}