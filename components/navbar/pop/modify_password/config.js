export default {
  title: ['modify_password'],
  fields: [{
    type: 'iconLabel',
    field: 'username',
    icon_type: 'admin',
    text: GAREN.user.username
  }, {
    type: 'password',
    field: 'old_password',
    decorator: {
      id: 'old_password',
      rules: [{
        required: true
      }]
    }
  }, {
    type: 'password',
    field: 'new_password',
    decorator: {
      id: 'new_password',
      rules: [{
        required: true
      }]
    }
  }],
  btn: {
    value: 'modify',
    type: 'primary',
    disabled: false
  }
};
