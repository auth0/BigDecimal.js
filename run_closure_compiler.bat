@echo off
mkdir build 2>nul
del build\BigDecimal-all-last.js 2>nul
copy /B src\_begin.js + src\MathContext.js + src\_middle.js + src\BigDecimal.js + src\_end.js build\BigDecimal-all-last.js >nul
java -jar \bin\closure_compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --js build\BigDecimal-all-last.js --js_output_file build\BigDecimal-all-last.min.js
