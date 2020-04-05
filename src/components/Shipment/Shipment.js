
import React from 'react'
import { useForm } from 'react-hook-form'

const Shipment = () => {
  const { register, handleSubmit } = useForm()
  const onSubmit = data => console.log(data)
   
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="firstName" ref={register({ required: true, maxLength: 20 })} />
      <input name="lastName" ref={register({ pattern: /^[A-Za-z]+$/i })} />
      <input name="age" type="number" ref={register({ min: 18, max: 99 })} />
      <input type="submit" />
    </form>
  );
};

export default Shipment;