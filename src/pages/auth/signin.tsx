import * as Yup from 'yup'
import { useRef } from 'react'
import { Form } from '@unform/web'

import { Input } from '@/components/input'
import { Button } from '@/components/button'

export const SignIn: React.FC = () => {
  const formRef = useRef(null)

  const handleSubmit = async (data, { reset }) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .lowercase()
          .trim()
          .email('Invalid email!')
          // .notOneOf([], 'Email already taken')
          .required('Email required'),
        password: Yup.string()
          .min(6, 'Too short!')
          .matches(/(?=.*[a-z])/, 'One lowercase letter required!')
          .matches(/(?=.*[A-Z])/, 'One uppercase letter required!')
          .matches(/(?=.*[0-9])/, 'One number letter required!')
          .required('Password required')
      })

      await schema.validate(data, { abortEarly: false })

      formRef.current.clearErrors({})
      reset()
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {}

        error.inner.forEach(err => (errorMessages[err.path] = err.message))

        formRef.current.setErrors(errorMessages)
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Input name="email" />
        <Input name="password" type="password" />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}
