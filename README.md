# [MyWebsite](http://lukasbuehler.ch)

This repo holds all the code for my personal website. 
That way anyone can use my website and copy some things if they'd like to.

## My To-Dos

### Changes of this update

- [x] Small Fixes
    - [x] Fontawesome bug with linked symbols
- [x] Update the dependencies
- [x] Use CDNs
- [x] Make images smaller and easier to load.
- [x] Update the projects

### Open To-Do's

- [ ] Make useable with JS disabled
- [ ] Have /card or /me for v-card qr code.
- [ ] Make a biography / CV

## How does it work?

My website is a static website at it's core. There is 
My webpage is obviously based on HTML and CSS but I am also using .
Bootstrap helps you create good looking, fast and responsive webpages really quickly.

## Note

Keep in mind that this repo just holds all the code to create my website and doesn't necessairily hold all its content. The cards are fetched from a database for example.

## Documentation

This is the documentation for developers.

### Development

In this part of the documentation you'll find everything you'll need to work on this website, or make one on your own with the tools I use. This repository holds all the information to build and bundle my website. As far as code is concerned. There may be missing some images or other contextual resources.

In the following sections I'm going to explain the core technologies used to develop my website. Some might just be used to bundle it, others are used on my website and are key components visible to every visitor.

For the documentation I assume you can use the terminal, navigate in the filesystem and have [git](https://git-scm.com/) installed.

To get startet, clone this repository.

```.sh
git clone https://github.com/lukasbuehler/my-website-dev.git lukas-website
```

Instead of "lukas-website" you can give it any name you'd like. This will be the name of the folder that holds all the development files.

#### [npm](https://www.npmjs.com/)

The node packet manager is a very handy tool to get everything you need. I won't cover the installation here, for this see the website linked in the header of this chapter.  
I'd recommend you to learn the basic commands but to get started with my website you'll just need to install everything.

So navigate inside the folder with the development files. You should see a "package.json" file.

There, run:

```.sh
npm install
```

This will install everything you need. Just like that.

#### Workflow

Now, we developers like to automate stuff, especially when it comes to easy repetitive tasks. 
With npm you can define "scripts" that are just commands, that run other commands, which run tools and these actually do something. Now that is a really ugly description so try it yourself. The scripts are defined in the "package.json".

Use the following commands:

##### Development Build

```sh
npm run build
```

This will just build the page from all the files in **src/** in a development build. You will find the source files in **tmp/**

##### Local Development Server

```sh
npm run test
```

This will start a local test server, that, when ready, will open the page in your browser. It will also use watchers so when you change something in the code and save, it will automatically build and reload the page in your browser.

##### Production Build

```sh
npm run prod
```

This will make a production build using webpack and copy it to dist.

##### Deploying for production

```sh
npm run deploy
```

**Note:** This will push your production build, that is found in the **dist** directory to the sub repository that holds all my files for my live website. Since I have my webserver hooked up via a webhook to automatically use the files from the sub repository [**my-website**](https://github.com/lukasbuehler/my-website).

#### [TypeScript](https://www.typescriptlang.org/)

I like to work with TypeScript instead of JavaScript when possible. If you don't know it, but you know some other programming languages like Java, C# you'll love it.

Important to know is that it is a super set of JavaScript and compiles to JavaScript and runs normally in every browser.

##### TypeScript and other JS frameworks
TypeScript is strongly typed, unlike JavaScript, and  needs to know what you can use and what not. If you import all additional frameworks with "npm install", you'll be fine.  
However, I am using CDNss to not absolutely bloat the generated **bundle.js**. Also if users have already visited a website that uses one of the same frameworks and still have it in their cache, they won't need to download it again to display my website, which improves loading time.

#### [Bootsrap](https://getbootstrap.com/)

Bootsrap is an open-source front-end framework that originated from Twitter and will make webpage look great with very little effort.  
There is a small learning curve to it, but it's absolutely worth it.  

Bootstrap can be included with a CDN link, as you will find in my HTML markup.  

To use bootstrap you add classes to your markup. This is applied to everything. You can do layout, tables, spacing, styling, shadows, rounded borders and much more.

The docs are very good and there is a big community with lots of answered questions on stack overflow.

#### [Webpack](https://webpack.js.org/)
Webpack is the key to all of this. In earlier versions of my website I used [gulp](https://gulpjs.com/) as my builder, but I have since changed to webpack.

To see what happens check out the "webpack.config.js".

#### [i18next](https://www.i18next.com/)

I use i18next to make my website multilanguage, check it out further down the read me. Right [there](#Multilanguage).

i18next comes with language cookies and browser language detection (almost) out of the box.

### Page Components
Let me also quickly explain the main page components and things

#### Cards 
The cards are dynamically loaded content. They can have various content and display projects, ideas, and all sorts of stuff. The card information is stored in a database on the webserver.

##### Database
The database is on the same server like my website.
It holds all the information for the cards, since I want them to be fetched on pageload and easily changable without changing the website code.

It's a **MySQLite** database.

##### Fetching
Some JavaScript runs at start and asks the PHP for a JSON representation of the "Cards" table. The PHP then connects and returns the cards as JSON. 

To access the database (with read only access) use the following credentials:
```.php
$servername = "lukasbuehler.ch:3306";
$username = "web";
$password = "hello_friend"; // yes this is actually the database password in plain text. But you will only have read access :)
$dbname = "Cards";
```

##### Displaying
After the JavaScript recieves its JSON representation of the cards, it instantiates the HTML objects with the help of JQuery and makes them visible to the user.

#### Multilanguage

In the **src/** folder is a folder called **lang/** which is copied to the bundled files. It holds all texts that are multilanguage.

It first differentiates for language, then for pages and in the .json files are the exact codes for all the text snippets.  

Now I have a kind of special setup. I wrote a script (You'll find it in src/scripts/ as **multi_lang.ts**) which checks at every load for elements in the dom with the **i18n** class. Now if an element has this class it looks for a second class starting with "**i18n-**" and followed by the exact location the corresponding translated text snipped is found. 

So if you want to change something language specific, say add an element with a new text, you'll have to define it for every language, in the correct page **.json** file.

##### lang/ structure
The language folder needs to have the correct language code. **de-ch** is swiss german, **de** is general german, which means every other german, like **de-at** will just fall back to **de**. The same is true for english. (**en-gb** and **en-us** will display **en**) Also, english is set as my standard language fallback. So a chinese user will see the english page.

In the folder with the language code, there will be **.json** files which I like to call page files. Here's why and how they are setup:

- **general.json** - Is for everything like the navbar, buttons and everything that is page independant.

- **index.json** - Is for the index page

- **about.json** - Would be for an about page.

So every page there is a page language-file. And there is also a general language file which is for everything else.

**Important:** To make page files work the body needs to have the ID of the page file name. For example the Index page, has an **index.json** language file and has this id on its body:

```.html
<body id="index">
```  

This is required because one can't read the filename with plain javascript. So just don't forget about that.
