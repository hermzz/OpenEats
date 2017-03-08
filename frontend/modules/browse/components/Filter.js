import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';
import BrowseActions from '../actions/BrowseActions';

require("./../css/filter.scss");

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data || [],
      loading: false,
      filter: {}
    };

    this._onClick = this._onClick.bind(this);
  }

  _onClick(event) {
    event.preventDefault();
    this.props.doFilter(this.props.title, event.target.name);
  }

  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      filter_x: {
        id: 'filter.filter_x',
        description: 'Filter field',
        defaultMessage: 'Filter {title}',
      },
      clear_filter: {
        id: 'filter.clear_filter',
        description: 'Clear filter button',
        defaultMessage: 'Clear filter',
      }
    });

    const items = this.props.data.map((item) => {
      let classNames = ["list-group-item"];
      if (this.props.filter[this.props.title] === item.slug) {
        classNames += [" active"];
      }

      if (item.total == 0) {
        return null;
      }

      return (
        <a className={ classNames }
           href="#"
           key={ item.id }
           name={ item.slug }
           onClick={ this._onClick }>
          { item.title }
          <div className="clear"/>
          <span className="badge">{ item.total }</span>
        </a>
      );
    });

    return (
      <div className="list-group filter">
         <p className="list-group-item disabled">
           <b>{ formatMessage(messages.filter_x, {title: this.props.title }) }</b>
         </p>
        { items }
        { this.props.filter[this.props.title] ?
          <a className="list-group-item"
             href="#"
             name={ '' }
             key={ 9999999999999999 }
             onClick={ this._onClick }>
            { formatMessage(messages.clear_filter) }
          </a>
          : ''
        }
      </div>
    );
  }
}

module.exports.Filter = injectIntl(Filter);