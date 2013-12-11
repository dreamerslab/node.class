# node.class

A port of [John Resig Simple JavaScript Inheritance](http://ejohn.org/blog/simple-javascript-inheritance/) on node.js **plus** `multiple inheritance`.



## Requires

Checkout `package.json` for dependencies.



## Installation

Install through npm

    npm install node.class



## Usage

> Require the module before using

    var Class = require( 'node.class' );

> Basic

    var Person = Class.extend({

      // constructor
      init : function ( name, height ){
        this.name   = name;
        this.height = height;
      },

      show_name : function (){
        return this.name;
      },

      show_height : function (){
        return this.height;
      }
    });

    var ben = new Person( 'ben', '176' );

    console.log( ben.height()); // 176

> Inject to prototype chain

    var car = {

      init : function ( name ){
        this.name = name;
      },

      run : function (){
        // ...
      },

      stop : function (){
        // ...
      }
    };

    var sports_car = {

      turbo : function (){
        // ...
      }
    };


    var Porsche = Class.extend( car ).inject( sports_car );

    var nine11 = new Porsche( '911' );

    nine11.turbo();
