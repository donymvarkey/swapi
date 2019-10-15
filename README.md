
# Complete Star Wars API.


### Requirements
> Node.Js >=10  
> Docker >= 15  
> Mongo >= 3  

---
###  To run the server.
>```
>$git clone https://github.com/donymvarkey/swapi.git
>$cd swapi
>$docker-compose up --build
>```
---
### Get all character details

>end-point --> **/character/all**  
req-type --> **GET**  
**example request**
>```
>$curl -X GET localhost:8000/character/all
>```
>**example response**   
 ```
{
	"status":true,
	"data":[
		{
		         "species":["Human"],
		         "vehicles":["Snowspeeder","Imperial Speeder Bike"],
		         "starships":["X-wing","Imperial shuttle"],
		         "_id":"5d84aa80be077f1e52f9d030",
		         "name":"luke skywalker",
		         "height":"172",
		         "mass":"77",
		         "hair_color":"blond",
		         "eye_color":"blue",
		         "birth_year":"19BBY",
		         "gender":"male",
		         "homeworld":"Tatooine",
		         "__v":0
	     },
	     {
			"species":["Droid"],
			 "vehicles":[],
			 "starships":[],
			 "_id":"5d84aa8cbe077f1e52f9d031",
			 "name":"c-3po",
			 "height":"167",
			 "mass":"75",
			 "hair_color":"n/a",
			 "eye_color":"yellow",
			 "birth_year":"112BBY",
			 "gender":"n/a",
			 "homeworld":"Tatooine",
			 "__v":0
		},
		...
	],
	"msg":"success"
}
```
 ---

### Search for a particular character

>end-point --> **/character/:name**  
request-type --> **GET**  
params --> {
>>name ==> String  

>}

> **example-request**    
>  ``
>$curl -X GET localhost:8000/character/luke%20skywalker
> ``

>**example-response**  
```
{
	"status":true,
	"data":{
		"species":["Human"],
		"vehicles":["Snowspeeder","Imperial Speeder Bike"],
		"starships":["X-wing","Imperial shuttle"],
		"_id":"5d84aa80be077f1e52f9d030",
		"name":"luke skywalker",
		"height":"172",
		"mass":"77",
		"hair_color":"blond",
		"eye_color":"blue",
		"birth_year":"19BBY",
		"gender":"male",
		"homeworld":"Tatooine",
		"__v":0
	},
	"msg":"success"
}
```

@[donymvarkey](https://github.com/donymvarkey)
