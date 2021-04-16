import React from 'react';
import moment from 'moment';
import { get, omit } from 'lodash';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import AppBar from '../components/app-bar';
import { colors } from '../lib/styles';
import Page from './page';
import Layout from '../layouts/common';
import BasicInfo from './basic_info';
import Continue from './continue';
import { browsePersonalInfo, addPersonalInfo, editPersonalInfo } from '../personal_info_state';

const baseStyles = {
  user: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '1.5rem',
  },
  primaryText: {
    color: colors.primaryColor,
    fontSize: '1.4rem',
    marginRight: '4rem',
  },
};

class PersonalInfo extends Page {
  constructor(props) {
    super(props);

    const { personalInfo } = props;
    const birthDateObject = moment(personalInfo.birth_date).format('MM/DD/YYYY');
    const birthDateString = personalInfo.birth_date ? `${birthDateObject}` : '';
    this.state = {
      first_name: personalInfo.first_name || '',
      last_name: personalInfo.last_name || '',
      primary_language: personalInfo.primary_language || '',
      birth_date: birthDateString,
    };

    this.handleContinue = this.handleContinue.bind(this);
    this.handleChangeFirst = this.handleChangeText.bind(this, 'first_name');
    this.handleChangeLast = this.handleChangeText.bind(this, 'last_name');
    this.handleChangeDob = this.handleChangeDate.bind(this, 'birth_date');
    this.handleChangeLanguage = this.handleChangeDropDown.bind(this, 'primary_language');
  }

  componentWillMount() {
    const personalInfoId = get(this.props, 'personalInfo.id', null);
    if (!personalInfoId) {
      this.props.browsePersonalInfo();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.personalInfo !== this.props.personalInfo) {
      const birthDateObject = moment(nextProps.personalInfo.birth_date).format('MM/DD/YYYY');
      const birthDateString = nextProps.personalInfo.birth_date ? `${birthDateObject}` : '';
      this.setState({
        first_name: personalInfo.first_name || '',
        last_name: personalInfo.last_name || '',
        primary_language: personalInfo.primary_language || '',
        birth_date: birthDateString,
      });
    }
  }

  handleChangeText(field, e, value) {
    this.setState({
      ...this.state,
      [field]: value,
    });
  }

  handleChangeDate(field, value) {
    this.setState({
      ...this.state,
      [field]: value,
    });
  }

  handleChangeDropDown(field, e, idx, value) {
    this.setState({
      ...this.state,
      [field]: value,
    });
  }

  handleContinue() {
    const {
      addPersonalInfo,
      editPersonalInfo,
      personalInfo,
    } = this.props;

    const infoQuery = personalInfo.id ? editPersonalInfo : addPersonalInfo;

    const infoPayload = omit(this.state.personalInfo, ['user_id']);
    infoPayload.birth_date = moment(infoPayload.birth_date).isValid() ? moment(infoPayload.birth_date).format() : null;

    infoQuery(infoPayload)
      .then(() => this.forward());
  }

  render() {
    const { personalInfo } = this.state;
    return (
      <Layout>
        <div>
          <AppBar
            backButtonOnClick={() => this.props.router.goBack()}
            headerNode="About Me"
          />
          <BasicInfo
            personalInfo={personalInfo}
            onChangeFirst={this.handleChangeFirst}
            onChangeLast={this.handleChangeLast}
            onChangeLanguage={this.handleChangeLanguage}
            onChangeDob={this.handleChangeDob}
          />
          <Continue onClick={this.handleContinue} />
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { personalInfo, user } = state;
  return {
    personalInfo: personalInfo.data,
    user,
  };
}

export default connect(mapStateToProps, {
  browsePersonalInfo,
  addPersonalInfo,
  editPersonalInfo,
})(PersonalInfo);
