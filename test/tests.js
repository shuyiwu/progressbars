var assert = chai.assert;
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

describe( 'Progress bars test', function () {
	var fixture;
	
	beforeEach( function ( done ) {
		fixture = document.createElement( 'div' );
		document.body.appendChild( fixture );
		setTimeout( function() {
			done();
		}, 2000 );
	});

	afterEach( function () {
		document.body.removeChild( fixture );
	});
	it('Progress bar displayed on screen', function () {
		var barElement = document.getElementsByClassName( 'progressbar-body' );
		assert.equal(barElement.length, 3);
	});
	it('Progress bar displayed correct value', function () {
		var barElements = document.getElementsByClassName( 'progressbar-label' );
		for(var i = 0; i<barElements.length; i++) {
			assert.equal(barElements[i].innerHTML, bars[i].value + '%');
		}
	});
	it('Progress bar width match its value', function () {
		var barElements = document.getElementsByClassName( 'progressbar-value' );
		for(var i = 0; i<barElements.length; i++) {
			assert.equal(barElements[i].style.width, (bars[i].value>100?100:bars[i].value) + '%');
		}
	});
	it('click "+25" button progress bar value increase 25', function () {
		var currentBar = document.getElementsByClassName( 'progressbar-value' )[0];
		var currentBarValue = document.getElementsByClassName( 'progressbar-label' )[0];
		var buttonAdd25 = document.getElementsByTagName( 'button' )[3];
		simulant.fire(buttonAdd25, 'mousedown');
		simulant.fire(buttonAdd25, 'mouseup');
		bars[0].value = bars[0].value + 25;
		
		setTimeout( function () {
			assert.equal(currentBarValue.innerHTML, bars[0].value + '%');
		}, 600);
	});
	
	it('click "+10" button progress bar value reduced 10', function () {
		var currentBar = document.getElementsByClassName( 'progressbar-value' )[0];
		var currentBarValue = document.getElementsByClassName( 'progressbar-label' )[0];
		var buttonAdd10 = document.getElementsByTagName( 'button' )[2];
		simulant.fire(buttonAdd10, 'mousedown');
		simulant.fire(buttonAdd10, 'mouseup');
		bars[0].value = bars[0].value + 10;
		setTimeout( function () {
			assert.equal(currentBarValue.innerHTML, bars[0].value + '%');
		}, 600);
	});
	
	it('click "-25" button progress bar value reduced 25', function () {
		var currentBar = document.getElementsByClassName( 'progressbar-value' )[0];
		var currentBarValue = document.getElementsByClassName( 'progressbar-label' )[0];
		var buttonMinus25 = document.getElementsByTagName( 'button' )[0];
		simulant.fire(buttonMinus25, 'mousedown');
		simulant.fire(buttonMinus25, 'mouseup');
		bars[0].value = bars[0].value - 25;
		if(bars[0].value < 0){
			bars[0].value = 0;
		}
		setTimeout( function () {
			assert.equal(currentBarValue.innerHTML, bars[0].value + '%');
		}, 600);
	});
	
	it('click "-10" button progress bar value reduced 10', function () {
		var currentBar = document.getElementsByClassName( 'progressbar-value' )[0];
		var currentBarValue = document.getElementsByClassName( 'progressbar-label' )[0];
		var buttonMinus10 = document.getElementsByTagName( 'button' )[1];
		simulant.fire(buttonMinus10, 'mousedown');
		simulant.fire(buttonMinus10, 'mouseup');
		bars[0].value = bars[0].value - 10;
		if(bars[0].value < 0){
			bars[0].value = 0;
		}
		setTimeout( function () {
			assert.equal(currentBarValue.innerHTML, bars[0].value + '%');
		}, 600);
	});
	
	it('Change selected progress bar', function () {
		var select = document.getElementById( 'bar-selector' );
		select.value = 2;
		simulant.fire( select, 'change' );
		var selectedBar = document.getElementsByClassName( 'progressbar-body' )[2];
		assert.include(selectedBar.className, 'highlight', 'progress bar has class "highlight"');

	});
	
	it('Changed current selected progress bar value', function () {
		var currentBar = document.getElementsByClassName( 'progressbar-value' )[2];
		var currentBarValue = document.getElementsByClassName( 'progressbar-label' )[2];
		var buttonAdd25 = document.getElementsByTagName( 'button' )[3];
		simulant.fire(buttonAdd25, 'mousedown');
		simulant.fire(buttonAdd25, 'mouseup');
		bars[2].value = bars[2].value + 25;
		
		setTimeout( function () {
			assert.equal(currentBarValue.innerHTML, bars[2].value + '%');
		}, 600);

	});
	
	it('Change progress bar value less than 0', function () {
		var buttonMinus25 = document.getElementsByTagName( 'button' )[0];
		simulant.fire(buttonMinus25, 'mousedown');	
		simulant.fire(buttonMinus25, 'mouseup');	
		simulant.fire(buttonMinus25, 'mousedown');	
		simulant.fire(buttonMinus25, 'mouseup');	
		simulant.fire(buttonMinus25, 'mousedown');	
		simulant.fire(buttonMinus25, 'mouseup');	
		simulant.fire(buttonMinus25, 'mousedown');	
		simulant.fire(buttonMinus25, 'mouseup');	
		simulant.fire(buttonMinus25, 'mousedown');	
		simulant.fire(buttonMinus25, 'mouseup');	
		
		var currentBar = document.getElementsByClassName( 'progressbar-value' )[2];
		var currentBarValue = document.getElementsByClassName( 'progressbar-label' )[2];
		setTimeout( function () {
			assert.equal(currentBar.style.width, 0 + '%');
			assert.equal(currentBarValue.innerHTML, 0 + '%');
		}, 2000);

	});
	
	it('Change progress bar value more than 100', function () {
		var buttonAdd25 = document.getElementsByTagName( 'button' )[3];
		simulant.fire(buttonAdd25, 'mousedown');	
		simulant.fire(buttonAdd25, 'mouseup');	
		simulant.fire(buttonAdd25, 'mousedown');	
		simulant.fire(buttonAdd25, 'mouseup');	
		simulant.fire(buttonAdd25, 'mousedown');	
		simulant.fire(buttonAdd25, 'mouseup');	
		simulant.fire(buttonAdd25, 'mousedown');	
		simulant.fire(buttonAdd25, 'mouseup');	
		simulant.fire(buttonAdd25, 'mousedown');	
		simulant.fire(buttonAdd25, 'mouseup');	

		var currentBar = document.getElementsByClassName( 'progressbar-value' )[2];
		var currentBarValue = document.getElementsByClassName( 'progressbar-label' )[2];
		
		setTimeout( function () {
			assert.equal(currentBar.style.width, 100 + '%');
			assert.include(currentBar.className, 'allRound warning', 'progress bar has class "warning"');
		}, 2000);
	});
	
});