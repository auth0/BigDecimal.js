#! /usr/bin/env sh
mkdir build 2>/dev/null
rm -f build/BigDecimal-all-last.js
cat build/preserved_multiline_comment_begin.closure.js COPYING build/preserved_multiline_comment_end.js src/_begin.js src/MathContext.js src/_middle.js src/BigDecimal.js src/_end.js >build/BigDecimal-all-last.js
echo Created build/BigDecimal-all-last.js

closureCompilerOptions="--compilation_level SIMPLE_OPTIMIZATIONS --js build/BigDecimal-all-last.js --js_output_file build/BigDecimal-all-last.min.js"
if which closure-compiler ; then
    echo Using the system-provided \`closure-compiler\' script.
    closure-compiler $closureCompilerOptions
else
    java -jar bin/closure_compiler.jar $closureCompilerOptions
fi
tmp=$?
echo Created build/BigDecimal-all-last.min.js
exit $tmp
