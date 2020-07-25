const ObjectMapper = (function () {
	const reservedKeys = ["_type_", "_source_", "_itemMap_"];

	function ObjectMapper(source, targetMap) {
		
		function mapKeyValuesToObject(type, value) {

			function getValue(ctx, valKey) {
				valKey = valKey.split('.');
				return valKey.reduce((acc, key) => acc[key], ctx);
			}
			if (type === "object") {
				const ctx = targetMap["_source_"]
					? source[targetMap["_source_"]]
					: source;
				return Object.keys(targetMap).reduce((acc, key) => {
					if (reservedKeys.indexOf(key) === -1) {
						const valKey = targetMap[key];
						if (!isObject(valKey)) {
							acc[key] = getValue(ctx, valKey);
						} else {
							acc[key] = ctx[valKey['_source_']] ? ObjectMapper(ctx, valKey) : ctx[valKey['_source_']];
						}
					}
					return acc;
				}, value);
			}
			return value;
		}

		function addItemsToArray(type, value) {
			if(type === 'array') {
				const ctx = targetMap["_source_"]
					? source[targetMap["_source_"]]
					: source;
				if(targetMap['_itemMap_']) {
					return ctx.map(item => ObjectMapper(item, targetMap['_itemMap_']));
				} else {
					return ctx;
				}
			}
			return value;
		}

		if (!isObject(targetMap)) {
			return null;
		}
		const type = targetMap["_type_"].toLowerCase();
		let value = source && type === "object" ? {} : [];
		if (!value) {
			return value;
		}
		value = mapKeyValuesToObject(type, value);
		value = addItemsToArray(type, value);

		return value;
	}

	function isObject(obj) {
		return typeof obj === "object";
	}

	return ObjectMapper;
})();
