# afrigarage

Afrigarage, projet platine **2021** permettant la mise en relation entre des professionnels qui sont des **garagistes** ainsi
que des automobilistes qui sont les **clients**.
Ce projet reprend une partie du projet platine. Notamment la partie client avec reprises
de quelques règles de gestion de l'application qui sont :

- La gestion de la connexion;
- La gestion de l'inscription dans l'application;
- L’accès aux différents garages inscrits dans notre application backend ;
- D’avoir une vue sur les différentes disponibilités des différents services des garages ;
- La gestion des réservations clients dans des garages ;
- La gestion des favoris ;

*Ceci étant juste une liste non exhaustive de fonctionnalités reprises depuis notre application mobile (platine)*

### Lancer le projet

Pour exécuter ce projet, il faut se mettre à la racine du projet (dans le dossier contenant le **package.json**), puis

Exécuter la commande:
- npm i

Pour installer toutes les dépendances du package.json et ainsi cette commande génerera le dossier **node_modules**

Puis lancer la commande:
- npm run start

Pour exécuter le projet. Et s'y rendre sur [http://localhost:4200](localhost:4200)


### PWA
Le service worker étant ajouté au projet, pour l'utiliser, il faut s'assurer d'avoir 
la dépendance, il suffit d'exécuter la commande :

- npm run start-pwa

##### NB:
Il faut s'assurer d'avoir le **http-server** installé à traver la commande *npm i* précedemment exécuté
sinon installé la commande de façon globale avec la commande 
- npm install --global http-server

### Pipelines avec Gitlab CI

### stages:
- install
- test
- build
- lint
- deploy

==> Que les tests n'ont pas pu être implémentés

#### Accès app
Application accessible sur [link](https://afrigarage-ci.web.app/)
