this is the back end for exquisite corpse drawing funtime game

enjoy
 

 features
 -block repeat sends from the same canvas from generating an image
 -clear old entries from the database once a day
 

~
logics
there are multiple canvases per drawing

in case of 2 ( currently this is how it works but could do more than 2 in the future )
IF a canvas is not present (select based on drawing id)
	send to DB
IF a canvas is present (select based on drawing id)
	retrieve it (select based on drawing id) and combine them

having a sync issue where the DB fails to combine the drawings when they are sent in close to each other because it does not find the drawing in DB for both the canvases...

Potential fix

when a canvas reaches the backend continue to ping the db looking for the second canvas until it shows up
and practically speaking, only one of the canvases need to ping because if it shows up first  or at the same time it will ping to find it and if it shows up second by enough margin then it will find the other canvas immediately

arbitrarily let's choose canvas one to ping the db until it finds a canvas



in case of more than 2 (the future)
IF a canvas is not present OR the number present is less then the total canvases -1 (select based on drawing id)
	send to DB
IF  the number of canvases (selected by draeing id) is equal to total -1
	retrieve each canvas in order (check if knex has syntax for sorting results, if not use a loop and grab each 	drawing by drawing id and canvas id) and combine all canvases
~