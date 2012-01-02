@echo off
mkdir build 2>nul
del build\BigDecimal-all-last.js 2>nul
copy /B build\preserved_multiline_comment_begin.yui.js + COPYING + build\preserved_multiline_comment_end.js + src\_begin.js + src\MathContext.js + src\_middle.js + src\BigDecimal.js + src\_end.js build\BigDecimal-all-last.js >nul
echo Created build\BigDecimal-all-last.js
java -jar bin\yuicompressor-2.4.7.jar build\BigDecimal-all-last.js --charset UTF-8 -o build\BigDecimal-all-last.min.js
echo Created build\BigDecimal-all-last.min.js
