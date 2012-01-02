@echo off
mkdir build 2>nul
del build\BigDecimal-all-last.js 2>nul
copy /B build\preserved_multiline_comment_begin.closure.js + COPYING + build\preserved_multiline_comment_end.js + src\_begin.js + src\MathContext.js + src\_middle.js + src\BigDecimal.js + src\_end.js build\BigDecimal-all-last.js >nul
echo Created build\BigDecimal-all-last.js
java -jar bin\closure_compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --js build\BigDecimal-all-last.js --js_output_file build\BigDecimal-all-last.min.js
echo Created build\BigDecimal-all-last.min.js
