"use strict";

import { api_ajax, api_js } from "../API/api.js";

let api = await api_ajax;
console.log(api);

let api2 = await api_js;
console.log(api2);
