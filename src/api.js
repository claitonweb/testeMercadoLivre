import axios from 'axios'
const ProductAPI = {
  all: (query,callback) =>  { 
   
    axios.get('api/items?search='+query)
    .then(function (response) {
        callback(null, response);
        console.log(response.data);
        
    })
    .catch(function (error) {
        callback(error);
        console.log(error);
    })
   
  },
  get: (id, callback) => {
    axios.get('/api/items/'+id)
    .then(function (response) {
        console.log(response);
        callback(null, response);
        
    })
    .catch(function (error) {
       console.log(error);
        callback(error);
    })
  }
}

export default ProductAPI
