(function(){

var tests = function(){

var window = this
, BigDecimal = window.BigDecimal
, MathContext = window.MathContext

test("Calculate E", function (assert) {
    var scale = 20;
    var e = new BigDecimal("0");
    var denominator = new BigDecimal("1");
    var eBefore = new BigDecimal("-1");
    var iteration = 1;

    while (!e.equals(eBefore)) {
        eBefore = e;
        e = e.add(BigDecimal.ONE.divide(denominator, scale, BigDecimal.ROUND_HALF_UP));
        denominator = denominator.multiply(new BigDecimal(iteration+''));
        ++iteration;
    }

    assert.equal(e.toString(), "2.71828182845904523536");
});

test("Convenience functions", function (assert) {
    assert.ok(new BigDecimal("1234.5678").isPositive(), "1234.5678 is positive");
    assert.ok(new BigDecimal("-1234.5678").isNegative(), "-1234.5678 is negative");
    assert.ok(!BigDecimal.ZERO.isPositive() &&
              !BigDecimal.ZERO.isNegative(), "BigDecimal.ZERO is neither positive nor negative");
    assert.ok(BigDecimal.ZERO.isZero(), "BigDecimal.ZERO is zero");
    assert.ok(new BigDecimal("1234.0000").isLessThan(new BigDecimal("1234.5678")) &&
              new BigDecimal("1234.0000").isLessThanOrEqualTo(new BigDecimal("1234.5678")), "1234.0000 is less than 1234.5678");
    assert.ok(!new BigDecimal("1234.0000").isGreaterThan(new BigDecimal("1234.5678")) &&
              !new BigDecimal("1234.0000").isGreaterThanOrEqualTo(new BigDecimal("1234.5678")), "1234.0000 is not greater than 1234.5678");
    assert.ok(new BigDecimal("1234.5678").isGreaterThan(new BigDecimal("1234.0000")) &&
              new BigDecimal("1234.5678").isGreaterThanOrEqualTo(new BigDecimal("1234.0000")), "1234.5678 is greater than 1234.0000");
    assert.ok(!new BigDecimal("1234.5678").isLessThan(new BigDecimal("1234.0000")) &&
              !new BigDecimal("1234.5678").isLessThanOrEqualTo(new BigDecimal("1234.0000")), "1234.5678 is not less than 1234.0000");
    assert.ok(new BigDecimal("1234.5678").isLessThanOrEqualTo(new BigDecimal("1234.5678")) &&
              new BigDecimal("1234.5678").isGreaterThanOrEqualTo(new BigDecimal("1234.5678")), "1234.5678 is less than or equal to itself as well as greater than or equal to itself");
    assert.ok(new BigDecimal("0.000").setScale(2, BigDecimal.prototype.ROUND_HALF_UP).isZero(), "isZero() is independent of scale")
});

module("Rounding")
// What we normally refer to as 'rounding' in 'normal' parlor, in fixed point
// math apparently is called 'change scale'

test("Rounding by setScale()", function (assert) {
    var a = new BigDecimal('1234.3456000')
    //expect(4)
    assert.equal(
        a.setScale(4).toString()
        , '1234.3456'
        , 'Test ROUND_UNNECESSARY'
    )
    assert.throws(
        function () {
            a.setScale(3);
        }
        , function (e) {
            return ("round(): Rounding necessary" == e);
        }
        , 'Test ROUND_UNNECESSARY (2) - Should raise an exception to indicate that a rounding mode must be specified'
    )
    assert.throws(
        function () {
            a.setScale(1);
        }
        , function (e) {
            return ("round(): Rounding necessary" == e);
        }
        , 'Test ROUND_UNNECESSARY (3) - Should raise an exception to indicate that a rounding mode must be specified'
    )
    assert.equal(
        new BigDecimal('1234.00').setScale(0).toString()
        , '1234'
        , 'Test ROUND_UNNECESSARY (4)'
    )
    assert.equal(
        a.setScale(3, MathContext.ROUND_HALF_UP).toString()
        , '1234.346'
        , 'Test ROUND_HALF_UP'
    )
})

module("Division + Multiplication")

test("Moving the decimal point", function (assert) {
    var a = new BigDecimal('1234.5678000')
    //expect(4)
    assert.equal(
        a.movePointRight(2).toString()
        , a.movePointLeft(-2).toString()
        , 'Moving the decimal point to the right by 2 is the same as moving it to the left by -2.'
    )
    assert.equal(
        a.movePointRight(-2).toString()
        , a.movePointLeft(2).toString()
        , 'Moving the decimal point to the right by -2 is the same as moving it to the left by 2.'
    )
    assert.equal(
        a.movePointRight(10).toString()
        , "12345678000000"
        , 'Moving the decimal point to the right by 10 is the same as multiplying by 10^10.'
    )
    assert.equal(
        a.movePointRight(-10).toString()
        , "0.00000012345678000"
        , 'Moving the decimal point to the right by -10 is the same as dividing by 10^10.'
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
