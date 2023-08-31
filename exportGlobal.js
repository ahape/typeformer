function exportGlobal(ns, obj) {
  var root = (0,eval)("this");
  var keys = getKeys();
  var len = keys.length;
  var last = len - 1;
  var k, i = 0;
  for (; i < len; i += 1) {
    k = keys[i];
    if (i === last) { break; }
    if (!root.hasOwnProperty(k)) {
      root[k] = {};
    }
    root = root[k];
  }

  // Export
  root[k] = obj;

  function getKeys() {
    if (ns && Array.isArray(ns)) { return ns; }
    if (ns && typeof ns === "string") { return ns.split("."); }
    throw new Error("'ns' needs to be string or string array");
  }
}

