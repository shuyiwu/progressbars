/**
 * Created by shuyi wu on 30/06/2016.
 */
'use strict';

var bars;
// try to load from localStorage
try {
  bars = JSON.parse( localStorage.progressBars );
} catch ( err ) {}

if ( !bars ) {
  bars = [
    {"name": "progress bar 1", "value": 45},
    {"name": "progress bar 2", "value": 15},
    {"name": "progress bar 3", "value": 75}
  ];
}

var ProgressBars = Ractive.extend({
    add: function( value ){
        var selectedbar = this.get( 'selectedBar' );
        var selectedIndex = this.get( 'selectedIndex' );

        selectedbar.value += value;
        this.animate( 'bars.' + selectedIndex + '.value', selectedbar.value, { duration: 100 } );
    },
    minus: function( value ){
        var selectedbar = this.get( 'selectedBar' );
        var selectedIndex = this.get( 'selectedIndex' );

        selectedbar.value -= value;

        if( selectedbar.value < 0 ){
            selectedbar.value = 0;
        }
        this.animate( 'bars.' + selectedIndex + '.value', selectedbar.value, { duration: 100 } );
    },
    oninit: function( options ){
        this.on( 'increment', function ( event, value ) {
            this.add( value );
        });
        this.on( 'decrement', function ( event, value ) {
            this.minus( value );
        });
        this.on( 'continueDecrement', function ( event, value ) {
            this.minus( value );
        });
        this.on( 'continueIncrement', function ( event, value ) {
            this.add( value );
        });

    },
	events:{
		press: function( node, fire ) {
			var longpressDuration = 500, intervalDuriation=300, pressStartHandler;
			pressStartHandler = function ( event ) {
			    var cancel, timeout, interval;

			    event.preventDefault();

			    timeout = setTimeout( function () {
					interval = setInterval( function () {						
				    	fire({
				        	node: node
				      	});
					}, intervalDuriation );
			    }, longpressDuration );

			    cancel = function () {
			    	clearTimeout( timeout );
					clearInterval( interval );
			      	window.removeEventListener( 'mouseup', cancel );
			      	window.removeEventListener( 'touchend', cancel );
			    };
				window.addEventListener( 'mouseup', cancel );
				window.addEventListener( 'touchend', cancel );
			};
			node.addEventListener( 'mousedown', pressStartHandler );
			node.addEventListener( 'touchstart', pressStartHandler );

			return {
			    teardown: function () {
				    node.removeEventListener( 'mousedown', pressStartHandler );
			    	node.removeEventListener( 'touchstart', pressStartHandler );
			    }
  			};
		},
		tap: function( node, fire ) {
			var longpressDuration = 150, tapHandler, startHandler, timeout;
			startHandler = function ( event ){				
				node.addEventListener( 'mouseup', tapHandler );
				node.addEventListener( 'touchend', tapHandler );
			};
			tapHandler = function ( event ) {
			    var cancel, timeout, interval;

			    event.preventDefault();

			    timeout = setTimeout( function () {						
				   	fire({
				       	node: node
				   	});
					cancel();
			    }, longpressDuration );

			    cancel = function () {
			    	clearTimeout( timeout );
			      	window.removeEventListener( 'touchmove', cancel );
			    };
				window.addEventListener( 'touchmove', cancel );
			    window.removeEventListener( 'mousedown', startHandler );
			    window.removeEventListener( 'touchstart', startHandler );
			};
			node.addEventListener( 'mousedown', startHandler );
			node.addEventListener( 'touchstart', startHandler );
			return {
			    teardown: function () {
				    node.removeEventListener( 'mouseup', tapHandler );
			    	node.removeEventListener( 'touchend', tapHandler );
			    }
  			};
		}
	}
});
var progressbars = new ProgressBars({
    template: '#template',
    el: '#container'
});

progressbars.set( 'bars', bars );
// when the user makes a selection from the drop-down, update the display
progressbars.observe( 'selectedIndex', function ( index ) {
    this.set( 'selectedBar', bars[ index ] );
    this.set( 'bars.' + index + '.onControl', true );
});
// persist changes to localStorage if possible
progressbars.observe( 'bars', function ( bars ) {
  try {
    localStorage.progressBars = JSON.stringify( bars );
  } catch ( err ) {}
});