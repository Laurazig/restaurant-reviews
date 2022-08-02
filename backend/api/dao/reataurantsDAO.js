let restaurants  

export default class Restaurants   {
    static async injectDB(conn) { //call method when server starts, connects to DB
        if(restaurants){
            return
        }
        try {
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        } catch (e) {
            console.error(
                'unable to establish a collection handle in restaurantsDAO: ${e}',
            )
        }
    }
    static async getRestaurants({  //method 
        filters = null,
        page = 0,
        restaurantsPerPage = 20,

    } = {}) {
        let query
        if(filters) {
            if("name" in filters) {
                query ={$text: {$search: filters["name"] } }
            } else if ("cuisine" in filters) {
                query ={ "cuisine": {$eq: filters["cuisine"] } }
            } else if ("zipcode" in filters) {
                query = { "address.zipcode": { $eq: filters["zipcode"] } }
            }
        }

        let cursor

        try {
            cursor = await restaurants
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { restarantsList: [], totalNumRestaurants:0}
        }

        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

        try {
            const restaurantsList =await displayCursor.toArray()
            const totalNumRestaurants = await restaurants.countDocuments(query)

            return {restaurantsList, totalNumRestaurants}
        } catch (e) {
            console.error(
                `convert cursor to array or problem counting documents, ${e}`,
            )
            return { restarantsList: [], totalNumRestaurants:0}
        }
    }
}

//new code
//DAO
//conn
//static
// cursor.limit
//skip
//.countDocuments

//to revise
//export default class
//.find
//toArray