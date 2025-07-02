let userFormConfig = {
  "formName": "UserForm",
  "formTitle": "用户信息表单",
  "formItems": [
    {
      "type": "input",
      "label": "用户名",
      "prop": "username",
      "placeholder": "请输入用户名",
      "rules": [
        { "required": true, "message": "用户名不能为空", "trigger": "blur" },
        { "min": 3, "max": 10, "message": "长度在3到10个字符", "trigger": "blur" }
      ],
      "span": 12
    },
    {
      "type": "select",
      "label": "用户角色",
      "prop": "role",
      "options": [
        { "label": "管理员", "value": "admin" },
        { "label": "编辑", "value": "editor" },
        { "label": "访客", "value": "guest" }
      ],
      "rules": [{ "required": true, "message": "请选择角色", "trigger": "change" }],
      "span": 12
    },
    {
      "type": "radio",
      "label": "性别",
      "prop": "gender",
      "options": [
        { "label": "男", "value": "male" },
        { "label": "女", "value": "female" }
      ],
      "span": 12
    },
    {
      "type": "date-picker",
      "label": "出生日期",
      "prop": "birthday",
      "dateType": "date",
      "format": "yyyy-MM-dd",
      "span": 12
    },
    {
      "type": "switch",
      "label": "是否启用",
      "prop": "enabled",
      "activeValue": true,
      "inactiveValue": false
    },
    {
      "type": "textarea",
      "label": "个人简介",
      "prop": "bio",
      "rows": 4,
      "span": 24
    }
  ],
  "formButtons": [
    { "type": "primary", "text": "提交", "event": "submit" },
    { "type": "", "text": "重置", "event": "reset" }
  ]
}

export default userFormConfig