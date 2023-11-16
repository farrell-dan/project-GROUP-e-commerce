//Route where we validate if we can buy the items 


"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const collectionName = "Items"
const database = "ECommerceWebsite"

// "name": "Barska GB12166 Fitness Watch with Heart Rate Monitor",
// "price": "$49.99",
// "body_location": "Wrist",
// "category": "Fitness",
// "_id": 6543,
// "imageSrc": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALQAtAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcDBAUIAgH/xABQEAABAwMCAwMGCQgGBgsAAAABAAIDBAUREiEGEzEHQVEiYXGBkcEUFTJScpKhsdEjM0JDYoKTokRFVbLC4RYkNVNj8CUmNDZkZXODlLPx/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAGBEBAQADAAAAAAAAAAAAAAAAAAERITH/2gAMAwEAAhEDEQA/ALxREQEREBERAREQFz66+Wm3zcmvudHTS4zy5p2tdjbuJ84WtxlzRwleTTuLJRQzFrgcEeQeh8V5dlqJ6qV0lVLLNIdi6Rxc4gAY3Pmwg9GVnaVwpSyPj+Muc9nUQxucPUcYPqK/KXtN4TqHOabkYS0Z/LRObn0bbrzvFjmeU3UNPTVsTj7l8yDL36G+SDkAnJx4e5B6ntHENovXN+K6+Gp5Tg1+g9CenXr0PsXTXk/h93L4htY5mk/DoRqBx+sbuPavWCAiIgIiICIiAiIgIiICIiAiIgIiICIiDjcZ6TwneGPcG8yjlY3JxlzmkAe0heeaLhp8czm10hjIIOiI79Nt+5X52g/91qv1feqvrGH4zlYBuNP90IO1wNwzZpatonttPMGM/Xs5n97Kk/FXCtgdROe2y29rx+kymY0+0BYeAqSTMlQWnRjSCRsSpTdqd1RSPY0ZJCCjqjhmip6yCponSQOglbJozqa7S4HGD44x1V3W290VxmMELnNnEYk5b24Ok9D4d6q+6xvikkY5pBGdipLwr5PE1P8AtW5n3BBPUREBERAREQEREBERAREQEREBERAREQV92mcYWOltVRaxXRzV7nhjqeHL3M8dWNgR1wSFWlbxVBUyiemtM5qHNbzHzVAazIAGzWjONvnLl3Vgqb1UT9TJUzPP1v8ANdzh7hquvL/9QpHysacOl+SxvpcdvUMnzIP1nHfFYgbFBNTQRNGGtZGdvaV8/wCnHGHX4yafMYgp3SdmkojDq24U8O27Y4i/+Ykfcsr+ze3S+TFePLP7DT9gIQVuOMry+bXcqOirR351scfWHe5d/h3tBoKfiCnrLlSTUUAi5LgDzmxgDAwQAT0329+d269l1zpwX0c0FY0b6R+SefQDkfzKB3e2y0rpaeoifDM0eVHI3S4er3oPSlur6S6UUVbb6hlRTSjLJIzkHfB+0ELZUC7FakTcGGBv9Fq5Y8enD/8AGp6gIiICIiAiIgIiICIiAiIgIiICx1ErIIJJpHNYxjS5znHAAC/Z5RDC+VwJDGk4Heqiv3Ety4guD7MZOVRsGurgdTOilbuC1jiSc+rqN+5BxOFOGjWk3a6txQNe7QwuxzQTnUT83pt3+jrK7jxt8Ghjo7QGUkGRFHII8vkPzY2Ae72LgXm9vttBIxmp0I2dE0kc12NmjG4x126YPgoPTuudRcKa8GoJqzJqYeXlo6nGM9MZ9vrQSO78X1DKmSOa01lVLHgvfXSk4z08luQAcHv7lpM4wq3fnOG6V7N/kRyNO2x336LlubXUQlZGWwRBrPIjhOhm5xgFx73OO+d/QF+wuug0NY9zmui1NzCMdck4z1JOTnqUTKYWXj3lua1klba3YDtFRmWnIOcbkeSCAd8Dod1KqqWk4vpxRXGlEdSBmOWPfHnY73HY+dVLJSV9fC6Wab880ayYADJjGknB3IDRv+JW1Yq6rslQyknkkdREfnQ0/wCqEkDVn9FpOM/85KtXsoo3WCe7WOqnjfKZRUwFp/Ox6Q0uHoIAPhkeIViqpB8Nq4XOpJjT3elyYZRjZ+CO/ucCQfSpLwFxdLf3CKdtQ6TlkyvkiaxscjTjQAN+mSSUE2REQEREBERAREQEREBERAREQfjgCCHAEd+VT1so44aK8XRrnP59U/Q95y4tbsM+suVu1JIppS3qGHHsVZ2+MHs3ie3vqJdX/wAhyCueKrj8BvtFC+Pmx0sXMkjyBre8HrkEdC3u7yupw3RsmsVFqc5rmsDg5h3zgj3rgcX0c1XxzWUsRaHymPQXnAxyWn3FSbhVuqx0RB/VBSpXRNBC6R0jy5xOnbO3knI/586401YIbgKWipuZPG5tMwSSaWOyzWc7eYKSbBuFGJJLe99a67zR0mK1zYZGu5Uh0taMgjc9evgpGCnulS9sdDS0EJqGOkj0umOnEYbnfHi7HqWlxNTRvp6qWUObLHTNwI8aSS8ZznfG3d71905tfxXEbhU8id0k3JLZSyR7dZG5G5zgbnquTebjVNt1EyQtc6rpRzS8b9cjHtWlnU84HrXVNvs1W85cS6imJOSS35JPnxp9qsHg2hhtt24gp42hrpaiOpGPmyM8PptkVUdm7nfEIb/5ywt+pHlW7a3Z42uYb/ZdHq9PMqcI2kiIiAiIgIiICIiAiIgIiICIiAdxgqr+HJoKmzX+x08zZDSVTxH46XfJ6/tNcrMqIhPTyxFzmiRhbqacEZGNlUF1prlwzxV8aS0hZQTtdBOYYdMegYw75RJcNiSdzvjKCM8TRtg4ltF5la808sfKl0AZD2tcO/boR1+aVt8KktsdDnrymrvXKkpqyGppKiR8dNUeWyoidjkv+dnw39ByR0KiFRW1HCYgtl1opxIxmY5WY0TM7nNJPo27lKlSeqkmbSTGnGqblu5Yz1djb7VGWz10jXA1Fa6nZIwTHl/lmeS7OG6c4yWdR0GVgfxnC5hDYKhriNnYacfatGPiGNjJtMtbzZ3h0smiPLsANxjoNh3JIzip0ySKenikic2SNzAWO65BGxUW4pyRUnS0tbSkuyG7eV1Gdx6lipuLKOlpYadlNU6IowxuzegGPFdS3Wt1+fHxFWQzUtnpmhoMm3wgl2wwP0Mgb9D0Uk2sjp8E0TqKitUEo0u1GpkBG4J3HrHkj1KwOCrjTXG/cRPZIDNFLDT4HzGNP+MyfZ4qDmpqmVLxT07nV0p5dNT9SXYJA9mXHzZUs4A4MmscjKqvyajSZHag0kSOGDh43IxsQe/fdaaTxERAREQEREBERAREQEREBERAWCtpIK6llpaqMSQyt0uaVnRBQFPfIbTeKux3Mn4vhmLY3kZ0eAcB1aCdh3eBHSeNgFdbm09wpYr7aZQHNDnB0jR3Fj87+nIPnVW8e03L4wu7SMZqnEeg7hatkvt2sEhdbK2SFmcujcNUbvS07Z8/VBNbh2ZcN1Ly6236a2OJ/wCz3GP5PmBJaT7Xelag7JIIxqn4tt0cfe7lj3vW/Q9rNU2NrLlZqWoPQuilMefU4O+9bT+1O3tbqh4aBeehdMxoPrDSgWrgnhK0OEzY6viGqbu0ObiAHx7mkeku9C/OKbq+la2qutQyEN/MUkPTwwG/peBJ29C4V37T7xXsMdBT0tA0jq0GV/qLsD+VQeolqKuZ9TVyyyzP3c+Vxc4+soLb7GpDdbrdrjURNBp444aYZJ5LXFxc1pP0W+wd2ArXVZ9hdPy7LdJsbvqwz2Maf8SsxAREQEREBERAREQEXFv/ABTaLA3/AKRq2tlxkQs8p59Xd68KF13ayzf4vtuGd0lTLj+Vv4oLORUXcO1i+SEinmpIP/Shz/eJXBqe0PiWfGbtUtz05YDM+zCD0ki8uS8W32bUZLtXOx1zUf5rTlu1dOWiWtmdq73TE49KD1Y+aKP85Ixv0nALA+5UDPl11M30zNHvXlF1ZLnDppcZxkSEoZJHDeR5HncSgvLjThzhq8fCa+lrohdHDUGxVLSJXAY8pu/cO7HRQA8PsbSQTGup45Jm6mwyhwdpyQDkAju8VweEduJKInxk/wDrcpbUu1Nt5cMhtK0fzOQc8cLXGRgkjtxmjHR8T2kfYV+jha6vwGWecgdOg+8qweB7lJFUim1fkZP0D3FT6eTlxF2BsEFBs4Rroi34VFBRN8ZXd37oK6UfClriqqI1dY6ejly+aUMMbWsbnWMbk9Ou3eu7xJVyVVW4udkA4A8FyL07HDkY/wDA1BPrJHvQWBZb1wfaaT4La6ylp4dWotGoanYAySdycAbnwXUbxNYndLvRD0zNH3ry+WjwCayzZurPg0oPU7L1aZNo7nRO+jUMPvW1HUQS/mpo3/RcCvJwrJsPPNI0d3Mdk/YsgrZ8xjn519MvO3pyEHrJF5Xp75caZr3QVckYjOCWSgezxXao+M+IaZ4aLnXZxkB0hft6MkIPRyKlLX2m3puOZUwVI7xLEP8ADpUttfafb5ntjudM+mJ/WRHmN9JHUerKCfIsNJVU9bTsqKSZk0Lxlr2HIKIPP3E9mutbWVFdG7nAyuc55OScnw657lE5KGseXh0bnHTsNYO6tauke2ilAA0uO4IUHqqeJ0rnOZ7EHCNtq9WeQ7GnfosPxbUNEYfHp8rGXOA3XUe/lk6C5voK1oxUXC8UVKHSzZd5EZcTv5h6kCOw1T8kFm/hk+5bcXC1ZJjS2c/QpnOUktF6oWU0LJrg1mGgFrn4wpPQcQ2mJpD7jSY8TKEFfx8FVzutPWeuAs+9bMfBNaBj4NUH0ysH3qey8TWXP+06L+KFrniazf2nSfxQgi9v4Vr6CsiqoqXMkeSOZUR43BHcfOt6S13YiIOhhHKZob+Vb0yT4+ddV/Etm/tSl/iBYXcSWYn/AGnTn99BhoTerfK2aBlLrZuNRz711J+K+KXMMb/i/BHzD+K5juJLMelxp/rLWl4gtRORcKf66D8nqLrIS6RlMSfA4961a6W41dIKWWGERiMxAseM6S7Ue9fb77az/T4PrLEbxbSdq6n+uEHEdYnf7uT1SNKwPsb2knROM/sgqQ/GttPSup/rhfDrlQn+mU5/9wIIw+zPbq8t4z86Ij3rC61yAsxIwhvjkdyk9RX0ZYdNTATjukC4k1VFvidn1kHMlo5WMeCGl0hwMOC2IoJmVLX6fJawjORvv/ktas5rm/DIteiORoErc4DsE4z47LLG+R5Bc5ziepcc5QbEDNMdGycN0s1cwFw222Cy0lPV1GgQtkkOMvAGrB93tSmp2P3c1SSwkxZEbANjv1QZ7NcrxbqZ8NNWyUzXSFxjac74A9yL6jIGvPziiDsXGaOOmkifkHOxwotO0ODiDlSK9gAzsJ8pjyCPDBUWe7chBy6lo1nCxWcZ4koQ4nDnY2OOoK3pWtcT5IK1qSMR8QW1zdsygfag0HvOSHMjOP2B+CwPe3vhj+0e9bk0flu9JWB0WUH5R08lbOIKamY9+C47kBrR1JOdgPFdmr4PvVJCZZrbFpBxhk+pxPgAHZKkPZnFTxMrpjTvmqCQx+nSSyP0E7gnPTPQKPPvd7huscvwqoE1PJpiglJ0s7tJafNt4+dBH+ZFjPKZjx1H8V+B8TukTT6HH8VNaeko6fjC4GKqETomTloiiLmh3KdrI320nO2/hlatcJLnZnNirHXSdlVEA58HKfFqDgAPnBxx37YCCK6ov9yPrFfBkgBwY25+mVLa2CGqpqmzU7WOdbY9dPI0byubnn79+clw8zAtyCV8UVkgbfZaEPpY/wAi2Fz2uJkeMnu36b+CCCufC3rE0fvlNUW35Fu/Tyipnzm0xrmNmnskklfK4Swwa2uaNuXqBBGk52GR5S+vgUcouJu1TC2CobRPdV0sRAewucNek4w443265OPEISXRZxyW58NR/FMx5xyWfWd+KmXHDaiiMFspqeOms7Wh1OYTqE/fqc7vO/T175BWKlp4oYYOH5msbJXxa5nuG8cz8GEZ6jAAyP8AiFBEyA3GadoyMjOrce1fbXDG0UY9WfvWzVGokcGVOdcQ0aSMFuO4rCGYCDYlP/V+U9M1TBgbDZru7xX3ANm48AsdQMWUN8aof3Vmhbpa3c9EHaoItQGy61tkghc7mP7vkjcqORE46ldW2s1EnzIO7Q0JqonStzgvKKQ8HW+eqtckkQOnnEdPMEQSTibgqlvD5KmllNLVv+UcZY8+JHcfOPtVd1/APElJI7FE2qjH6dPK0/YcH7Fd6IPOFda6yjOKumqKbfH5eJzPtIWjHHyrvbZHtL2c8DyT49PtXpwgOBDgCD1BWkyzWuOp+Ex26kbPgjmNhaHYPXfCDzNO2Rkr2yQPa4HcY6LFlveyQfuFei6vg201JJDZY874a/I9jgVyqjs5t8nyJWD6UDc/ZhBS1ous1orBVUZc2TSWkOjJBB8R7D6l1JuLnyNmd8CpxUzN0uqnMc6Qeg93oGysSfsyZ+pkp3fS1N+5aUnZnVD5LKV30ah/vCCraWudR1AqIJSyUAjUWas5GDkEEHIJWyb/AFeqMtqgzlv1tEcLGAOxjOA0Anc7nop9L2cXAfJpA76NQPetZ/Z3dR0t8vqqI/xQV/TVopahk9PNy5YzlrsdPaktaJuUJJgeSwRx4AGloJIG3nJU8PZ/dR/V1T/Fj/FfP+gF1/s6q/iM/FBDm36cOmLqiOQTyGWRksLHtLz+lpIIB9C16i6zVHP51VrE+gSDA3DfkjpsB4DCnQ7Prqf6uqP4sf4rI3s6ux/q6QDz1Ef4oIGbxUG3tt7qnXSNdqbE+MODT5sjI/8A1a9RVmpqX1M8r3zSO1ufjcnxVlx9mtyd8qlY36VQPctuLsvqjgvbRt9M8hP2BBVNVVGrnkqJ3OfLI7U92jGT47Ba5I7mPP7quyHsti/WzwN9DHP+8hdOl7NrXFjmTOJ/4ULGfeCgoWduq2RN5TwXVQ0k9PknPuWw2ItA1EN27yvRtPwpZoaCWidSNmhlILxMdRJHT0erC2rfYbRbMGgttLA4fpsiGr29UFA23hu9XAD4BbKqYHo/l6WH952B9qm1g7Mro7D7tVRUsZ6xxHmP9HgPtVsog07Xbaa1UMVHRsLYox3nJce8k+KLcRAREQEREBERAREQEREBERAREQEREBERAREQEREBERB//9k=",
// "numInStock": 9,
// "companyId": 19962
// },


const initialCart = [
{
  _id : 9999,
  price : "9999$",
  numInStock : 0,  
}
]

// "validating qty"

// Other route :
// "validating user name"
// "validating user last name"
// "validating Visa Number"
// "validating Visa expiration"

// Get a specific item by his ID


//todo
//Get shopping cart from the backend
//check ID and qty of each compared to the qty order
//transform it into a promises All

//makebetter/
//Use updateMany with filter



const BuyItem = async (request, response) => {
  console.log("REQUESTBODY");
  console.log(request.body);

  const { ItemsInCart } = request.body;

  console.log(ItemsInCart);

  if (!ItemsInCart) {
    return response
    .status(401)
    .json({ status: 401,  message : `You need to provide an array of object with this propriety : ${{
      _id : 9999,
      price : "9999$",
      numInStock : 0,  
    }} `});
    }

  //Validating all items in the cart
  if (((ItemsInCart)).some(item => item._id && item.price && item.numInStock)) {
    return response
    .status(401)
    .json({ status: 401,  message : "You need to provide key for each id, price and number of stock for each item to validate the order"});
  }


  //Todo //
  //Work with an array of file multiple file// 
  //I can just connect one time and make all my test there an 
  // and push my Same error inside a array. YEAH! 
  //todo // 

  
    try {

    let itemError = [];
    let adminItemError = [];

      await client.connect();
      const db = client.db(database);
      console.log("connected!");

      for (let index = 0; index < ItemsInCart.length; index++) {
          const item = ItemsInCart[index];
      //retrieve Id in the database 
      const itemFound = await db.collection(collectionName).findOne({_id : Number(item._id)});

      if (!itemFound || itemFound.matchedCount === 0) {
        
        //Add the item that had a problem to the array for admin management
        adminItemError.push(itemFound);  
        
        return response
          .status(404)
          .json({ status: 404, message : `Item not found, please verify the item Id : ${item._id} was not found` });
        } 
      
      if (item.numInStock < 0) {
         //Add the item that had a problem to the array for admin management
        itemError.push(itemFound);  

        return response
          .status(405)
          .json({ status: 405,  message : `Item ${item.name} not in stock, please choose another item` });
        } 
      

      const itemUpdate = await db.collection(collectionName).UpdateOne({_id : item._id}, { $inc: { "numInStock" : -1 } })
      
      if (itemUpdate.matchedCount  === 0 || itemUpdate.modifiedCount) {
        
        //Add the item that had a problem to the array for admin management
        adminItemError.push(itemFound)
        
        return response
          .status(405)
          .json({ status: 405, message : `Item not updated, there was an error with your order, please try again later` });
        }  

      }
        //If all test is passed 
        if (index === ItemsInCart.length && itemError.length < 1) {
        return response
        .status(200)
        .json({status:200, message : "Purchased successuf !"});
        }

        else 
          if (index === ItemsInCart.length && itemError.length > 0) {
            return response
            .status(200)
            .json({status:401, message : `Some error happen in your cart, please verify the disponibillity of these items ${itemError}`});
            }
  }
  catch(error) {
    console.error(error.stack);
    return response
    .status(500)
    .json({status:500, message : " Unexpected Error with the server" });
  
  } finally {
  client.close();
  console.log("disconected!");
    }
  }

module.exports = BuyItem;
