import React from 'react';
import moment from "moment"
import {
  Form, Input, Popconfirm, Button, DatePicker
} from 'antd';
import locale from 'antd/lib/date-picker/locale/ru_RU';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const FormDefault = Form.create({
  mapPropsToFields(props) {
    const result = {}
    for (var key in props.dataSource) {
      let valueKey =  props.dataSource[key]
      if (key === "dateTimeStart"){
        result["dateTime"] = Form.createFormField({
          value: [
            moment(props.dataSource.dateTimeStart, "DD-MM-YYYY HH:mm"),
            moment(props.dataSource.dateTimeOver, "DD-MM-YYYY HH:mm")
          ]
        })
      } else {
        result[key] = Form.createFormField({
          value: valueKey,
        })
      }
    }
    return result
  },
  handleChange(key,value){
    this.props.form.setFieldsValue({
      [key]: value,
    });
  },

})((props) => {
  const { getFieldDecorator } = props.form;
  const handleSubmit = (e, addOrEditFn) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let saveData = {...props.dataSource}
        if (props.dataSource.id) saveData["id"] = props.dataSource.id
        if (props.additionalParameters) saveData = {
          ...saveData,
          ...props.additionalParameters
        }
        delete saveData["nameForm"];
        delete saveData["typeForm"];
        addOrEditFn(saveData)
      }
    })

  }
  const onChangeDateTime = (value) => {
    props.onChangeItem({
      nameField: "dateTimeStart", value: moment(value[0], "DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm"),
      additionalNameField: "dateTimeOver", additionalValue: moment(value[1], "DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm"),
    })
  }
  // Удалить объект
  const clickYesDelete = () => {
    props.deleteItem(props.dataSource.id)
  }
  // ----------------------

  return (
    <Form className="formFlex">
      <Form.Item label="Название" >
        {
          getFieldDecorator("title", {
            rules: [{
               required: true,
               message: "Введите название"
             }]
          })( <Input onChange={(e) => {props.onChangeItem({ nameField: "title", value: e.target.value })}} /> )
        }
      </Form.Item>
      <Form.Item label="Описание" >
        {
          getFieldDecorator("description", {
            rules: [{
               required: true,
               message: "Введите описание"
             }]
          })( <TextArea onChange={(e) => {props.onChangeItem({ nameField: "description", value: e.target.value })}} rows={3}/> )
        }
      </Form.Item>
      <Form.Item label="Дата/Время начала и окончания задачи" >
        {
          getFieldDecorator("dateTime", {
            rules: [{
               required: true,
               message: "Выберете дату и время"
             }]
          })(
            <RangePicker
              locale={locale}
              showTime={{ format: 'HH:mm' }}
              format="DD-MM-YYYY HH:mm"
              placeholder={['Начало', 'Окончание']}
              onOk={(value) => onChangeDateTime(value)}
            />
          )
        }
      </Form.Item>

      <Form.Item >
        {
          (props.dataSource.typeForm === "create")
            ? <Button type="primary" onClick={(e) => handleSubmit(e, props.sendCreate)}>Создать</Button>
            : null
        }
        {
          (props.dataSource.typeForm === "edit")
            ? <div className="form__botomButton">
                <Button type="primary" onClick={(e) => handleSubmit(e, props.sendEdit)}>Сохранить изменения</Button>
                <Popconfirm placement="topRight" title={"Удалить ?"} onConfirm={clickYesDelete} okText="Yes" cancelText="No">
                  <Button type="danger" >Удалить Объект</Button>
                </Popconfirm>
              </div>
            : null
        }
      </Form.Item>
    </Form>
  );
});


export default FormDefault
