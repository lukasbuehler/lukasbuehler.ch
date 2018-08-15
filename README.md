# [MyWebsite](http://lukasbuehler.ch)
This repo holds all the code for my personal website. 
That way anyone can use my website and copy some things if they'd like to.

## My To-Dos
### Next update
- [ ] Small Fixes
    - [ ] Fontawesome bug with linked symbols
- [ ] Make useable with JS disabled
- [ ] Update the dependencies
- [ ] Use CDNs
- [ ] Make images smaller and easier to load.
- [ ] Have /card or /me for v-card qr code.
- [ ] Make a biography / CV
- [ ] Update the projects


### After that
- [ ] Refactor
    - [ ] Remove unused dependencies
    - [ ] Refactor HTML
    - [ ] Refactor Scripts


### Documentation
- [ ] Gulp
    - [ ] Workflow
- [ ] Cards
- [ ] Multilanguage




## How does it work?
My webpage is obviously based on HTML and CSS but I am also using [Bootsrap](https://getbootstrap.com/).
Bootstrap helps you create good looking, fast and responsive webpages really quickly. I personally started off with a template from W3 Schools that I found [here](https://www.w3schools.com/bootstrap/).
The specific template I used is [here](https://www.w3schools.com/bootstrap/bootstrap_theme_company.asp)

## Note
Keep in mind that this repo just holds all the code to create my website and doesn't necessairily hold all its content. The cards are fetched from a database for example.


## Documentation
This is the documentation for developers.

### Gulp
TODO

#### Workflow
TODO

#### Modifying the structure???
TODO ???

### Cards 
The cards are dynamically loaded content. They can have various content and display projects, ideas, and all sorts of stuff. The card information is stored in a database

#### Database
The database is on the same server like my website.
It holds all the information for the cards, since I want them to be fetched on pageload and easily changable without changing the website code.

It's a **MySQLite** database.

#### Fetching
Some JavaScript runs at start and asks the PHP for a JSON representation of the database. The PHP then connects and returns the cards as JSON. 

To access the database (with read only access) use the following credentials:
```.php
$servername = "lukasbuehler.ch:3306";
$username = "web";
$password = "hello_friend"; // yes this is actually it in plain text. But you won't have write access :)
$dbname = "Cards";
```

#### Displaying
After the JavaScript recieves its JSON representation of the cards, it instantiates the HTML objects with the help of JQuery and makes them visible to the user.

TODO: Multilanguage card content

### Multilanguage

I am using [i18next](https://www.i18next.com/).
TODO: Write more here. Will do, soon.
