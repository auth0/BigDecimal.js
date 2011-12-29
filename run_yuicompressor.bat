@echo off
mkdir build 2>nul
del build\BigDecimal-all-1.0.2.js 2>nul
copy /B src\_begin.js + src\MathContext.js + src\_middle.js + src\BigDecimal.js + src\_end.js build\BigDecimal-all-1.0.2.js >nul
REM java -jar bin\yuicompressor-2.4.6.jar build\BigDecimal-all-1.0.2.js --charset UTF-8 -o build\BigDecimal-all-1.0.2.min.js
java -jar \bin\closure_compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --js build\BigDecimal-all-1.0.2.js --js_output_file build\BigDecimal-all-1.0.2.min.js
