# telescopia

### Introduction

Telescopia is a web observatory for the stock market. It was made for the Databases class lectured by Dr. Leonardo Rocha in 2019/2 period of Computing Science at the Federal University of São João del-Rei.

The main goal of the project was to deal with large amounts of data, therefore non-relational databases should be used.

It consists in two main parts:

* **REST API**
* **Frontend application**

As the observatory functions, there are 4:

* Articles by a stock variation
* Articles by keywords (tf-idf)
* Topic Analysis
* Articles by cited stock

#### Articles by a stock variation
This function will return, once given a stock name (already in the database), a variation number and a preset comparison operator, all the dates where the selected stock had the (exact, bigger than, less than, range) given variation. Once the dates are retrieved, the API returns all the articles that were published in those retrieved dates. Also, a graph is displayed showing all the dates and it's variation of the selected stock.

#### Articles by keywords
This function **WAS NOT** implemented, but was intended to be made using tf-idf method, returning articles ranked by the presence of the given keyword.

#### Topic Analysis
----

#### Articles by cited stock
Once given a stock, that was previously registered in the database, all the articles that have cited the stock name are listed, showing the article title, publish date, portal name and a link to the original article. 

### Technologies
For the development of the API, it was used:

* Node.js 10.16.2
* MongoDB 4.2.1
* Mongoose 5.7.12
* Express 4.17.1
* Cors 2.8.5
* Body-parser 1.19.0

For the frontend application:

* Material Design for Bootstrap 4
* Vue.js 2
* Chart.js
* Font Awesome
* Coming Soon Free MDBoostrap Template (index page)

### Installation
Before running the following instructions, make sure you got installed in you computer Node.js and NPM.

#### REST API
First you need to install the dependencies:

```
npm install
```

Then, to run in development mode:
```
npm start
```

**Disclaimer**: To run the API in production mode, it was used the PM2 package.

#### Frontend Application
The frontend application is made out of pure HTML5, CSS and JavaScript libraries, therefore, you won't need nothing but a Code Editor and a Browser to develop it.

To run it in production mode, any HTTP server will serve well.
