import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MenuItem from '@material-ui/core/MenuItem'
import SelectField from '@material-ui/core/SelectField'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/Table/TableBody'
import TableRow from '@material-ui/core/Table/TableRow'
import TableRowColumn from '@material-ui/core/Table/TableRowColumn'
import TextField from '@material-ui/core/TextField'
import { KeypadDate } from 'common-ui'

import { colors } from '../lib/styles'

const baseStyles = {
  text: {
    color: colors.primaryColor,
    fontSize: 18,
  },
  font: {
    color: colors.primaryColor,
    fontSize: 10,
  },
  underline: {
    display: 'none',
  },
}

const heights = []
for (let i = 50; i < 108; i++) {
  heights.push(<MenuItem value={`${i}"`} key={i} primaryText={`${i}"`} />)
}

class BasicInfo extends Component {
  render() {
    const { personalInfo } = this.props
    return (
      <Table selectable={false}>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableRowColumn style={baseStyles.text}>
              Date of Birth
            </TableRowColumn>
            <KeypadDate
              onChange={this.props.onChangeDob}
              value={personalInfo.birth_date}
            />
          </TableRow>
          <TableRow>
            <TableRowColumn style={baseStyles.text}>Name</TableRowColumn>
            <TableRowColumn style={baseStyles.text}>
              <div>
                <TextField
                  hintText='First Name'
                  floatingLabelText='First Name'
                  floatingLabelFixed={true}
                  hintStyle={baseStyles.blueText}
                  onChange={this.props.onChangeFirst}
                  style={{ marginLeft: 15 }}
                  value={personalInfo.first_name}
                />
              </div>
            </TableRowColumn>
            <TableRowColumn style={baseStyles.text}>
              <div>
                <TextField
                  hintText='Last Name'
                  floatingLabelText='Last Name'
                  floatingLabelFixed={true}
                  hintStyle={baseStyles.blueText}
                  onChange={this.props.onChangeLast}
                  style={{ marginLeft: 15 }}
                  value={personalInfo.last_name}
                />
              </div>
            </TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn style={baseStyles.text}>
              Primary Language
            </TableRowColumn>
            <TableRowColumn style={baseStyles.text}>
              <div>
                <SelectField
                  floatingLabelText='Select Primary Language'
                  value={personalInfo.primary_language}
                  onChange={this.props.onChangeLanguage}
                  underlineStyle={baseStyles.underline}
                  style={baseStyles.text}
                >
                  <MenuItem value='English' primaryText='English' />
                  <MenuItem value='Spanish' primaryText='Spanish' />
                  <MenuItem value='French' primaryText='French' />
                  <MenuItem value='Other' primaryText='Other' />
                </SelectField>
              </div>
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}

BasicInfo.propTypes = {
  onChangeDob: PropTypes.func.isRequired,
  onChangeLanguage: PropTypes.func.isRequired,
  onChangeFirst: PropTypes.func.isRequired,
  onChangeLast: PropTypes.func.isRequired,
}

export default BasicInfo
