var should = require( 'should' );
var Class  = require( '../lib/class' );

var mixin = {

  a : 'a',

  b : 'b',

  c : 'c',

  do_a : function (){
    return this.a;
  },

  do_b : function (){
    return this.b;
  },

  do_c : function (){
    return this.c;
  },
};

var what = {
  d : 'd',

  do_a : function (){
    return this._super() + this.b;
  },
};

var Klass    = Class.extend( mixin, what );
var instance = new Klass();


instance.d.should.eql( 'd' );
instance.do_a().should.eql( 'ab' );
instance.do_b().should.eql( 'b' );

console.log( 'All tests passed :)' );