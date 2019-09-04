
function getClientHeight() {
    return  window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

// -webkit-transform 转为 WebkitTransform (WebkitTransform,MozTransform,msTransform,OTransform,transform)
function camelCase(str) {
    return (str + '').replace(/^-ms-/, 'ms-').replace(/-([a-z]|[0-9])/ig, function(all, letter) {
       return (letter + '').toUpperCase();
   })
}

function getWholeCssProperty(property) {
    const cases = ['-webkit-','-moz-','-ms-','-o-',''];
    const ds = document.createElement('div').style;
    for(let i = 0, len = cases.length; i < len; i++) {
        const nProperty = camelCase(cases[i] + property);
        if(nProperty in ds) {
            return nProperty;
        }
    }
    return property;
}



export {
    getClientHeight,
    getWholeCssProperty
}
