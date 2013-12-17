var should = require( 'should' );
var Class  = require( '../lib/class' );

var mixin_a = {

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

var mixin_b = {
  b : 'whatever'
};

var what = {

  d : 'd',

  do_a : function (){
    return this._super() + this.b;
  },
};

var Klass    = Class.inject( mixin_a, mixin_b ).extend( what );
var instance = new Klass();

var KKlas = Klass.inject({
  x : '1'
}, {
  y : 2
}).extend({
  z : function (){
    return '5';
  }
});

Klass.should.have.property( 'inject' );
Klass.should.have.property( 'extend' );

KKlas.should.have.property( 'inject' );
KKlas.should.have.property( 'extend' );

instance.b.should.eql( 'whatever' );
instance.d.should.eql( 'd' );
instance.do_a().should.eql( 'awhatever' );
instance.do_b().should.eql( 'whatever' );

console.log( 'All tests passed :)' );
