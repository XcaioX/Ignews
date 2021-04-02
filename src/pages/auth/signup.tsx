import * as Yup from 'yup'
import { useRef } from 'react'
import { Form } from '@unform/web'

import { Input } from '@/components/input'
import { Button } from '@/components/button'

export const SignUp: React.FC = () => {
  const formRef = useRef(null)

  const handleSubmit = async (data, { reset }) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().min(2, 'Name too short!').required('Name required'),
        username: Yup.string()
          .min(2, 'Username too short!')
          // .notOneOf([], 'Username already taken')
          .required('Username required'),
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
          .required('Password required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], "Passwords don't match")
          .required('Password must be confirmed')
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
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" />
        <Input name="username" />
        <Input name="email" />
        <Input name="password" type="password" />
        <Input name="confirmPassword" type="password" />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}
