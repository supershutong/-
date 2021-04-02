/**示例：https://segmentfault.com/a/1190000023694206
 */
const schema = [
  {
    key: 'age',
    type: 'InputNumber',
    ui: {
      label: '年龄'
    },
    props: {
      placeholder: '请输入年龄'
    }
  },
  {
    key: 'gender',
    type: 'Radio',
    value: 'male',
    ui: {
      label: '性别'
    },
    options: [
      {
        name: '男',
        value: 'male'
      },
      {
        name: '女',
        value: 'female'
      }
    ]
  }
]

export default function () {
  const formRef = useRef(null)

  const onSubmit = () => {
    formRef.current.submit().then(data => {
      console.log(data)
    })
  }
  const onReset = () => {
    formRef.current.reset()
  }

  return (
    <>
      <XForm
        ref={formRef}
        schema={schema}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
      />
      <div>
        <Button type="primary" onClick={onSubmit}>
          提交
        </Button>
        <Button onClick={onReset}>重置</Button>
      </div>
    </>
  )
}
