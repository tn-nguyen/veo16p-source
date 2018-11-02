var bitField = function(param_length) {
	this.length = param_length;
}


bitField.prototype = {
	length: 32,
	data: 0,
	isChecked: function(param_index) {
		if(param_index == undefined) {return false;}
		if(param_index >= this.length) {return false;}
		if(isNaN(parseInt(param_index))) {return false;}

		//return ((this.data && (1<<param_index)) >> param_index);
		if(((this.data & (1<<param_index)) >> param_index) != 0) {
			return true;
		}

		return false;
	},
	check: function(param_index) {
		if(param_index == undefined) {return false;}
		if(param_index >= this.length) {return false;}
		if(isNaN(parseInt(param_index))) {return false;}

		this.data |= (1<<param_index);

		return true;
	}
}

var bitFieldArray = function() {

}

bitFieldArray.prototype = {
	length: 32,
	data: [],
	isChecked: function(param_index) {
		if(isNaN(parseInt(param_index))) {return false;}

		var index = 0;
		var index_in_data = 0;

		////////////////////////////////////
		// 0~31 : data[0] ...
		// 32~63: data[1] ...
		// 64~95: data[2] ...
		////////////////////////////////////
		index = parseInt(param_index / this.length);
		index_in_data = parseInt(param_index % this.length);

		if(this.data[index] == undefined) {return false;}

		//return ((this.data[index] && (1<<index_in_data)) >> index_in_data);
		if(((this.data[index] & (1<<index_in_data)) >> index_in_data) != 0) {
			return true;
		}

		return false;
	},
	check: function(param_index) {
		if(isNaN(parseInt(param_index))) {return false;}

		var index = 0;
		var index_in_data = 0;

		////////////////////////////////////
		// 0~31 : data[0] ...
		// 32~63: data[1] ...
		// 64~95: data[2] ...
		////////////////////////////////////
		index = parseInt(param_index / this.length);
		index_in_data = parseInt(param_index % this.length);

		this.data[index] |= (1<<index_in_data);

		return true;
	}
}
