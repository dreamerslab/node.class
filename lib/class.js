/*!
 * Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype

( function ( root ){
  var initializing = false, fnTest = /xyz/.test( function(){xyz;}) ? /\b_super\b/ : /.*/;

  // The base Class implementation ( does nothing )
  function Class(){};

  function inject(){
    var objects   = Array.prototype.slice.call( arguments );
    var i         = 0;
    var j         = objects.length;
    var prototype = new this();

    var obj, prop;

    for( ; i < j; i++ ){
      obj = objects[ i ];

      for( prop in obj ){
        prototype[ prop ] = obj[ prop ];
      }
    }

    function Class(){}

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    Class.inject = arguments.callee;
    Class.extend = extend;

    return Class;
  };

  // Create a new Class that inherits from this class
  function extend( obj ){
    var _super = this.prototype;

    // Instantiate a base class ( but only create the instance,
    // don't run the init constructor )
    initializing  = true;
    var prototype = new this();
    initializing  = false;

    // Copy the properties over onto the new prototype
    for( var prop in obj ){
      // Check if we're overwriting an existing function
      prototype[ prop ] = typeof obj[ prop ] == 'function' &&
        typeof _super[ prop ] == 'function' && fnTest.test( obj[ prop ]) ?
        ( function ( prop, fn ){
          return function (){
            var tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[ prop ];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret     = fn.apply( this, arguments );
            this._super = tmp;

            return ret;
          };
        })( prop, obj[ prop ]) : obj[ prop ];
    }

    // The dummy class constructor
    function Class(){
      // All construction is actually done in the init method
      if( !initializing && this.init ){
        this.init.apply( this, arguments );
      }
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;
    Class.inject = inject;

    return Class;
  };

  Class.inject = inject;
  Class.extend = extend;

/**
 * @public
 */
  Class.version = '1.1.4';

  // browser support
  // requirejs
  if( typeof define !== 'undefined' ){
    return define( function ( require, exports, module ){
      module.exports = Class;
    });
  }

  // browser support
  // normal usage
  if( typeof exports === 'undefined' ){
    root.Class = Class;
    return;
  }

/**
 * Exports module.
 */
  module.exports = Class;
})( this );
