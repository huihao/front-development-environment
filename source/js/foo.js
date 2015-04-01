var $ = require('jquery');
module.exports = function(selector,num) {
	console.log(selector+"++"+num)
    return $(selector).val(num);
};
