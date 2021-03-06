// импортировать React.js (расширение .js необязательно)
var React = require('react');
// импортировать ReactDom.js 
var ReactDOM = require('react-dom');
// импортировать функцию из TableData.js
var TableData = require('./TableData');
// импортировать  Pager.js
var Pager = require('./Pager').default;
// импортировать CountRecords.js
var CountRecords = require('./CountRecords').default;
// импортировать функцию из TableHeaders.js
var TableHeaders = require('./TableHeaders');

/**
 * Table - класс таблицы
 * 
 */
class Table extends React.Component {

  /**
   * constructor - конструктор
   * 
   * @access  {public}
   * @return  {undefined}
   */
  constructor(props) {
      console.log('### Table call method => constructor');

      super(props);      
      this.state = {
        headers : new TableHeaders(),
        data_dinamic :   new TableData(),
        data_origin  :   new TableData(),
        count_records :  10,
        // mode - disable,asc,desc
        states_headers : ['disable', 'disable', 'disable', 'disable', 'disable'],
        current_page : 0
      };      

      this.onSorted    = this.onSorted.bind(this);      
      this.filtered    = this.filtered.bind(this);
      this.sortedAsc   = this.sortedAsc.bind(this);
      this.sortedDesc  = this.sortedDesc.bind(this);
      this.onPageClick = this.onPageClick.bind(this);
      this.onCountRecords = this.onCountRecords.bind(this);
  };

  /**
   * render - 
   * 
   * @access  {private}
   * @return  {undefined}
   */
  render() {   
    console.log('### Table call method => render');    

    if (this.props.hasOwnProperty('is_filtering')) {
      if (this.props.is_filtering) {
        let filtering_data = this.filtered(this.props.filter);
        if(filtering_data.length !== 0) {
          this.state.data_dinamic = filtering_data;
        }
        else {
          this.state.data_dinamic = this.state.data_origin;
        }
      }
    }

    const table_headers = this.state.headers.map((header, index) =>
      <th key={index} 
          onClick={this.onSorted.bind(this, index)}>
            {header}
            <span className={"sorted "+this.state.states_headers[index]}></span>
      </th>
    );

    // отрезаем строки таблицы согласно CountRecords
    let offset = this.state.count_records * this.state.current_page;
    let inner_array = this.state.data_dinamic.slice(offset, this.state.count_records + offset); 

    if ( inner_array.length === 0 ) {
      this.state.current_page = 0;
      offset = this.state.count_records * this.state.current_page;
      inner_array = this.state.data_dinamic.slice(offset, this.state.count_records + offset); 
    }
    
    // формируем параметры для пространичной разбивки
    const all_count_records = this.state.data_dinamic.length;

    // формируем таблицу для отрисовки
    const table_data = inner_array.map((item, index) =>
      <tr key={index}>
        <td>{item[0]}</td>
        <td>{item[1]}</td>
        <td>{item[2]}</td>
        <td>{item[3]}</td>
        <td>{item[4]}</td>
      </tr>
    );

    return (
      <div className="row">
        <div id="table" className="col-md-12">
          <table className="table table-bordered table-hover table-condensed table-fixed">
              <thead className="bg-info">
                <tr>
                  {table_headers}
                </tr>
              </thead>
              <tbody>{table_data}</tbody>
          </table>
        </div>        
        <div className="col-md-12">
          <div id="pager" className="col-xs-6">
            <Pager 
              all_count_records={all_count_records} 
              count_records={this.state.count_records}
              current_page={this.state.current_page}
              onPageClick={this.onPageClick} 
            />
          </div>
          <div id="count-records" className="col-xs-6">
            <CountRecords onCountRecords={this.onCountRecords} />
          </div>
        </div>
      </div>      
    );
  };

  /**
   * onSorted - отсортировать данные таблицы
   * 
   * @access  {private}
   * @param   {integer}   index - 
   * @return  {undefined}
   */
  onSorted (index) {
    console.log('### Table call method => onSorted');

    let self = this;

    if(this.state.states_headers[index] === 'disable' ) {

      // Сбросить состояния всех заголовков при переходе к новому заголовку
      for ( let i = 0; i < this.state.states_headers.length; i++ ) {
        this.state.states_headers[i] = 'disable';
      }

      this.state.states_headers[index] = 'asc';
      this.state.data_dinamic.sort(function(a, b) {
        return self.sortedDesc(a, b, index);
      });      
    }
    else {
      if(this.state.states_headers[index] === 'asc' ) {
        this.state.states_headers[index] = 'desc';        
        this.state.data_dinamic.sort(function(a, b) {
          return self.sortedAsc(a, b, index);
        });
      }      
      else {
        this.state.states_headers[index] = 'asc';
        this.state.data_dinamic.sort(function(a, b) {
          return self.sortedDesc(a, b, index);
        });
      }
    }

    this.setState(prevState => ({
      data_dinamic: this.state.data_dinamic
    }));

    this.props.onSorted();
  };

  /**
   * sortedAsc - 
   * 
   * @access  {private}
   * @param   {integer}   index - 
   * @param   {array}     a - элемент сортируемого массива
   * @param   {array}     b - элемент сортируемого массива
   * @return  {integer}
   */
  sortedAsc (a, b, index) {
    //console.log('### Table call method => sortedAsc');

    if (a[index] > b[index]) {
      return -1;
    }
    else if (a[index] < b[index]) {
      return  1;
    }
    else{
      if (a[index] > b[index]) {
          return -1;
      }
      else if (a[index] < b[index]) {
          return 1;
      }
      else {
          return 0;
      }
    }
  };

  /**
   * sortedDesc - 
   * 
   * @access  {private}
   * @param   {integer}   index - 
   * @param   {array}     a - элемент сортируемого массива
   * @param   {array}     b - элемент сортируемого массива
   * @return  {integer}
   */
  sortedDesc (a, b, index) {
    //console.log('### Table call method => sortedDesc');

    if (a[index] < b[index]) {
      return -1;
    }
    else if (a[index] > b[index]) {
      return  1;
    }
    else{
      if (a[index] < b[index]) {
          return -1;
      }
      else if (a[index] > b[index]) {
          return 1;
      }
      else {
          return 0;
      }
    }
  };

  /**
   * filtered - 
   * 
   * @access  {private}
   * @param   {array}   index - 
   * @return  {undefined}
   */
  filtered (index) {
    console.log('### Table call method => filtered');

    let inner_array = [];

    for ( let i = 0; i < index.length; ++i ) {
      for ( let j = 0; j < this.state.data_origin.length; ++j ) {
        if(this.state.data_origin[j].indexOf(index[i]) !== -1) {        
          inner_array.push(this.state.data_origin[j]);        
        }
      } 
    }

    let unic_input_array = [];

    for ( let i = 0; i < inner_array.length; ++i ) {
      unic_input_array.push(inner_array[i]);
    }

    return unic_input_array;
  };

  /**
   * onCountRecords - 
   * 
   * @access  {private}
   * @param   {integer}   count_records - 
   * @return  {undefined}
   */
  onCountRecords (count_records) {
    console.log('### Table call method => onCountRecords');

    this.setState(prevState => ({
      count_records: count_records
    }));
  };

  /**
   * onPageClick - 
   * 
   * @access  {private}
   * @param   {integer}   index - 
   * @return  {undefined}
   */
  onPageClick (index) {
    console.log('### Table call method => onPageClick');

    this.setState(prevState => ({
      current_page: index
    }));
  };  

  /**
   * componentDidMount - 
   * 
   * @access  {private}
   * @return  {undefined}
   */
  componentDidMount() {
    console.log('### Table call method => componentDidMount');
  };

  /**
   * componentWillUnmount - 
   * 
   * @access  {private}
   * @return  {undefined}
   */
  componentWillUnmount() {
    console.log('### Table call method => componentWillUnmount');
  }
}
export default Table;