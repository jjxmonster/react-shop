import React from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';

import { addOrder } from '../../../../../data/fetch/order.fetch';
import InputComponent from './InputComponent';
import { removeAllProductsFromShoppingCart } from '../../../../../data/actions/actions.js';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const OrderForm = ({ order, totalCost }) => {
   const { mutate } = useMutation(addOrder, {
      onSuccess: () => dispatch(removeAllProductsFromShoppingCart()),
   });
   const dispatch = useDispatch();

   const onSubmit = async values => {
      await sleep(100);
      values.order = order;
      values.totalPrice = totalCost;
      const data = values;
      addTransaction(data);
   };

   const addTransaction = data => {
      mutate(data);
   };

   return (
      <Form
         onSubmit={onSubmit}
         validate={values => {
            const errors = {};
            if (!values.name) {
               errors.name = 'Required';
            } else if (values.name.length < 3) {
               errors.name = 'Your name is too short';
            }
            if (!values.email) {
               errors.email = 'Required';
            } else if (!values.email.includes('@')) {
               errors.email = 'Email address must contain "@"';
            }
            if (!values.address) {
               errors.address = 'Required';
            }
            return errors;
         }}
         render={({ handleSubmit, form }) => (
            <form
               id='clientForm'
               onSubmit={event => {
                  const promise = handleSubmit(event);
                  promise &&
                     promise.then(() => {
                        form.reset();
                     });

                  return promise;
               }}
            >
               <Field name='name'>
                  {({ input, meta }) => (
                     <InputComponent
                        input={input}
                        meta={meta}
                        placeholder='Enter your name'
                     />
                  )}
               </Field>
               <Field name='email'>
                  {({ input, meta }) => (
                     <InputComponent
                        input={input}
                        meta={meta}
                        placeholder='Enter your email address'
                     />
                  )}
               </Field>
               <Field name='address'>
                  {({ input, meta }) => (
                     <InputComponent
                        input={input}
                        meta={meta}
                        placeholder='Enter your address'
                     />
                  )}
               </Field>
            </form>
         )}
      />
   );
};

export default OrderForm;
