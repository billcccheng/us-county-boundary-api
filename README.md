#US County Boundary RESTFUL API
I was doing this project which required me to shade the selected counties of the users. 
Despite searching the web, I did not find any API supporting this. Strange thing is that
I thought Google MAP API would support this but...no...yeah...it gives you the shaded area
of the counties but not the borders.

So I went online to search for the county boundaries and found a lot of different source,
but all were really unorganized. I decided to parse the information down and write a small
API using NodeJS as a side project (also to practice NodeJS since I just started learning NodeJS).

So I have deployed this to Heroku and the data can be fetched from:

`https://us-county-boundary-api.herokuapp.com/api?state=TX&county=Brazos`

where `state` and `county` are the parameters you need to change to get the data you need.
The response of the above is as below:

`{"state":"TX","county":"Brazos","shape":[["30.61284","-96.49978"],["30.63036","-96.55024"],["30.64452","-96.5989"],["30.68937","-96.57121"],["30.69567","-96.56698"],["30.69603","-96.56612"],["30.70945","-96.53614"],["30.72114","-96.50986"],["30.73002","-96.49003"],["30.7428","-96.46101"],["30.74872","-96.45527"],["30.76113","-96.44685"],["30.77282","-96.43949"],["30.78893","-96.42681"],["30.7984","-96.42112"],["30.81315","-96.41584"],["30.82613","-96.40999"],["30.83997","-96.39885"],["30.85362","-96.39152"],["30.86401","-96.38741"]...}`

So this is simply a JSON array which you can manipulate.
