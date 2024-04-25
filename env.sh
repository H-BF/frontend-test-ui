#!/bin/bash

rm -rf ./env-config.js
touch ./env-config.js

echo "window._env_ = {" >> ./env-config.js
echo "API_REPORT_CRUD_URI: \"$API_REPORT_CRUD_URI\"," >> ./env-config.js
echo "FUNC_REPORT_CRUD_URI: \"$FUNC_REPORT_CRUD_URI\"," >> ./env-config.js
echo "BARRACUDA_API: \"$BARRACUDA_API\"," >> ./env-config.js
echo "FUNC_REPORTS: \"$FUNC_REPORTS\"," >> ./env-config.js
echo "}" >> ./env-config.js
