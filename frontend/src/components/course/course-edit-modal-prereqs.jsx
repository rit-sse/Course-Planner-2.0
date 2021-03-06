import React from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Form, List } from 'semantic-ui-react';

class PrereqList extends React.Component {
  state = {};

  onFormChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  addPrereq() {
    const { subject, number, coreq } = this.state;
    if(!subject || !number) {
      return; //TODO error handling
    }

    this.props.onChange({
      target: {
        name: 'prereqs',
        value: this.props.prereqs.concat({ subject, number, coreq }),
      },
    });
  }

  toggleCoreq(prereq) {
    this.props.onChange({
      target: {
        name: 'prereqs',
        value: this.props.prereqs.map(p => {
          if(p.subject !== prereq.subject || p.number !== prereq.number) {
            return p;
          }

          // Flip coreq flag
          return { subject: p.subject, number: p.number, coreq: !p.coreq };
        }),
      },
    });
  }

  delPrereq(prereq) {
    this.props.onChange({
      target: {
        name: 'prereqs',
        value: this.props.prereqs.filter(p => {
          return p.subject !== prereq.subject || p.number !== prereq.number;
        }),
      },
    });
  }


  render() {
    const { prereqs } = this.props;
    return (
      <React.Fragment>
        <Form>
          <Form.Group widths="equal">
            <Form.Input fluid placeholder="Subject" name="subject"
              onChange={this.onFormChange.bind(this)} />
            <Form.Input fluid placeholder="Number" name="number"
              onChange={this.onFormChange.bind(this)} />
            <Button primary onClick={this.addPrereq.bind(this)}>Add</Button>
          </Form.Group>
        </Form>
        <List celled verticalAlign="middle">
          {prereqs.map((prereq,i) =>
            <List.Item key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div>{prereq.subject + ' ' + prereq.number}</div>
              <Checkbox label="Co-Req" checked={prereq.coreq}
                onClick={() => this.toggleCoreq(prereq)}/>
              <div style={{flex: 1}} />
              <Button size="tiny" className="show-on-hover"
                onClick={() => this.delPrereq(prereq)}>Delete</Button>
            </List.Item>
          )}
        </List>
      </React.Fragment>
    );
  }
}
PrereqList.propTypes = { onChange: PropTypes.func, prereqs: PropTypes.array };

export default PrereqList;
