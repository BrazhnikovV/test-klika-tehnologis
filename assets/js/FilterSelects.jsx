// импортировать функцию из TableData.js
var TableData = require('./TableData');
// импортировать функцию из TableHeaders.js
var TableHeaders = require('./TableHeaders');

/**
 * FilterSelects - класс 
 * 
 */
class FilterSelects {

  /**
   * constructor - конструктор
   * 
   * @access  {public}
   * @return  {undefined}
   */
  constructor() {      
      this.table_data = new TableData();
      this.table_headers = new TableHeaders();
  };

  /**
   * getData - 
   * 
   * @access  {private}
   * @return  {undefined}
   */
  getData() {       
    console.log('### FilterSelects call meyhod => getData');    

    const input_array = [];

    for ( var i = 0; i < this.table_headers.length; ++i ) {
      var inner_array = [];
      for ( var j = 0; j < this.table_data.length; ++j ) {        
        inner_array.push(this.table_data[j][i]);
      }
      let unic_array = this.unique(inner_array);
      input_array.push(unic_array);
    }

    return input_array;
  };

  /**
   * unique - 
   * 
   * @access  {private}
   * @param   {array}   arr - 
   * @return  {array}
   */
  unique (arr) {
    var obj = {};
    for(var i=0; i<arr.length; i++) {
        var str = arr[i];
        obj[str] = true;
    }
    return Object.keys(obj);
  };
};

module.exports = new FilterSelects();