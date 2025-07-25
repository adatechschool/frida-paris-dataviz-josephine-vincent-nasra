[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/iNmLJ4Oy)

Lundi 21 juil 2025 : Nous partons sur une API qui concerne l'univers du voyage. L'API va nous permettre de voir les destinations les plus fréquentées ainsi que les tarifs les plus avantageux sur un large choix de destinations. On va également afficher la date,la classe eco , business et première classe, l'heure de départ et d'arrivée du vol ainsi que l'aeroport de départ , d'arrivée et la durée de vol. 
affichage des prix sur le calendrier,((((image changeante selon la destination))))

Mardi 22 juil 2025 : aujourdhui à 14h43 nous avons enfin trouvé les  "outbound = aller, inbound = retour " ce fût très cardio.
 faut coller "bookinURL" à "name" pour accéder au site.
 selon l'aller ou le retour il faudra prendre tout le contenu de segment.source et segment.destination

 Mercredi 23 juil 2025 : Aujourd'hui 15h13 nous avons enfin réussi a afficher tous les prix maintenant nous devons bouclés l'itineraries au prix,l'aéroport de départ et  d'arrivée,horaire, nom de ville et d'aeroport.

date = outbound.sectorSegments.segment.source/destination.localtime   // const departureDate
date = inbound.sectorSegments.segment.source/destination.localtime    // const arrivalDate
aeroport d'arrivée = destination.station.name // const arrivalAirport
aeroport de départ = source.station.name //const departureAirport
temps de vol = printTickets.outbound.duration // const flightTime
code aeroport arrivée = outbound.sectorSegments.segment.source.station.code // const departureCode
code aeroport retour = inbound.sectorSegments.segment.source.station.code // const arrivalCode

source = point de départ 
destination = arrivée

Jeudi 24 juil 2025: A 10h40, nous pensons mettre notre bouton "ceci est un bouton" sur le côté et intégrer une loupe: quand l'utilisateur cliquera sur ce bouton, il aura le choix sur toutes les destinations possibles entre deux pays. 
A 12h21, nous avons afficher les différentes options de billets entre un point A et un point B avec les différentes valeurs ( prix, heure..). 
Dans l'apres midi, il faudra indiquer les dates. 
A chaque chargement, le billet d'avion change. 
Nous avons reussi à intégrer un calendrier fonctionnel dans notre page HTML.

Vendredi 25 juil 2025: Le programme de demain: recuperer les valeurs des calendriers dans des variables et nous changeront grâce a ses variables , les parametres de l'URL. 

