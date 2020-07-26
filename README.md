this is the back end for exquisite corpse drawing funtime game

enjoy
 

 features
 -block repeat sends from the same canvas from generating an image
 -clear old entries from the database once a day
 

~
logics
there are multiple canvases per drawing

in case of 2 ( current )
IF a canvas is not present (select based on drawing id)
	send to DB
IF a canvas is present (select based on drawing id)
	retrieve it (select based on drawing id) and combine them


in case of more than 2 (the future)
IF a canvas is not present OR the number present is less then the total canvases -1 (select based on drawing id)
	send to DB
IF  the number of canvases (selected by draeing id) is equal to total -1
	retrieve each canvas in order (check if knex has syntax for sorting results, if not use a loop and grab each 	drawing by drawing id and canvas id) and combine all canvases
~