const sampeObjectMap = {
	_type_ : 'object',
	name: 'Name',
	status: 'Status',
	dept: "Sub.Dept",
	logs: {
		_type_: 'array',
		_source_: 'Logs',
		_itemMap_: {
			_type_: 'object',
			id: 'Id',
			status: 'Status',
			data: {
				_type_: 'object',
				_source_: 'Data',
				point: {
					_type_: 'array',
					_source_: 'Point'
				}
			}
		}
	},
	sub: {
		_type_: 'object',
		_source_: 'Sub',
		dept: 'Dept',
		name: 'Name',
		subId: 'SubId',
		config: {
			_type_: 'object',
			_source_: 'Config',
			key: 'Key',
			value: 'Value'
		}
	}
}


document.addEventListener("DOMContentLoaded", () => {

	const sourceDataElem = document.querySelector('#sourceData');
	sourceDataElem.value = JSON.stringify(MP_input,null, 2);
	const objectMapElem = document.querySelector('#objectmap');
	objectMapElem.value = JSON.stringify(sampeObjectMap,null, 2);
	const transformButton = document.querySelector('button');
	transformButton.addEventListener('click', () => {
		const sourceDataElem = document.querySelector('#sourceData');
		const objectMapElem = document.querySelector('#objectmap');
		const input = JSON.parse(sourceDataElem.value);
		const map = JSON.parse(objectMapElem.value);
		const result = ObjectMapper(input, map);
		const resultElem = document.querySelector('.result');
		resultElem.innerHTML = '';
		const textArea = document.createElement('textarea');
		textArea.setAttribute("rows", "30");
		textArea.setAttribute('cols',"104");
		textArea.value = JSON.stringify(result,null, 2);
		resultElem.appendChild(textArea);
	});
});