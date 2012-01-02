(function(){

var tests = function(){

var window = this
, BigDecimal = window.BigDecimal
, MathContext = window.MathContext

test("Calculate E", function () {
	var scale = 20;
	var e = new BigDecimal("0");
	var denominator = new BigDecimal("1");
	var eBefore = new BigDecimal("-1");
	var iteration = 1;

	while (!e.equals(eBefore)) {
		eBefore = e;
		e = e.add(BigDecimal.prototype.ONE.divide(denominator, scale, BigDecimal.prototype.ROUND_HALF_UP));
		denominator = denominator.multiply(new BigDecimal(iteration+''));
		++iteration;
	}

	equal(e.toString(), "2.71828182845904523536");
});

module("Rounding")
// What we normally refer to as 'rounding' in 'normal' parlor, in fixed point
// math apparently is called 'change scale'

test("Rounding 1 - regular", function(){
	var a = new BigDecimal('1234.5678000')
	//expect(4)
	equals(
		a.setScale(4).toString()
		, '1234.5678'
		, 'Since tail is zeros, rounding arg is not needed.'
	)
	equals(
		a.setScale(2, MathContext.prototype.ROUND_HALF_UP).toString()
		, '1234.57'
		, 'Since tail is non zeros, rounding Is needed.'
	)
})

module("Division + Multiplication")

test("+/-E (divide, multiply by 10) - Moving the dot", function(){
	var a = new BigDecimal('1234.5678000')
	//expect(4)
	equals(
		a.movePointRight(2).toString()
		, a.movePointLeft(-2).toString()
		, 'The dot can be moved in either direction.'
	)
	equals(
		a.movePointRight(-2).toString()
		, a.movePointLeft(2).toString()
		, 'The dot can be moved in either direction.'
	)
	equals(
		a.movePointRight(10).toString()
		, "12345678000000"
		, 'Moving dot right adds zeros in either direction.'
	)
	equals(
		a.movePointRight(-10).toString()
		, "0.00000012345678000"
		, 'Moving dot right adds zeros in either direction.'
	)
})

} // end of var tests = fn

if (typeof define == 'function' && define.amd !== null){
	define(function(){return tests}) 
	// this only returns test suite runner pointer.
	// calling code will have to pass 'window' to it with BigDecimal and MathContext attached
	// 'window' can be emulated.
} else {
	tests.call(window)
}

}).call(this)