import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ForwardedRef, useImperativeHandle } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import {
  createBusiness,
  setBusiness,
  updateBusiness,
} from '../../../store/merchatSlice';
import SelectInput from '../Input/Select';
import TextInput from '../Input/TextInput';

const businessDetails = yup.object().shape({
  category: yup.string().required('Business category is a required field'),
  email: yup
    .string()
    .email('Please make sure input a valid email address')
    .required('Business category is a required field'),
});

type IFormInput = {
  category: string;
  email: string;
};

type Props = {
  reference: ForwardedRef<{ submitForm: () => void }>;
};

type BusinessCategory = Array<{
  id: number;
  value: string;
}>;

const businessCategoy: BusinessCategory = [
  {
    id: 1,
    value: 'service',
  },
  {
    id: 2,
    value: 'retail',
  },
];

export default function BusinessCategoryForm({ reference }: Props) {
  const merchat = useAppSelector((state) => state.merchant);
  const step = useAppSelector((state) => state.app.step);
  const auth = useAppSelector((state) => state.auth);

  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      category: merchat.addBusiness.category ?? '',
      email: merchat.addBusiness.email ?? '',
    },
    resolver: yupResolver(businessDetails),
  });

  const dispatch = useAppDispatch();

  useImperativeHandle(reference, () => ({
    submitForm() {
      handleSubmit(onSubmit)();
    },
  }));

  const onSubmit = (data: IFormInput) => {
    dispatch(setBusiness(data));
    if (step === 2) {
      const _payload = {
        name: merchat.addBusiness.title,
        merchant_address: merchat.addBusiness.address,
        merchant_type: data.category.toLocaleUpperCase(),
        merchant_email: data.email,
        id: merchat.update ? merchat.addBusiness.id : auth.id,
        token: auth.access_token,
      };
      if (merchat.update) {
        dispatch(updateBusiness(_payload));
      } else {
        dispatch(createBusiness(_payload));
      }
    }
  };

  return (
    <div className="bg-white p-10 rounded-2xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="category"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            formState: { errors },
          }) => (
            <>
              <SelectInput
                name="Select Category"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                options={businessCategoy}
              />
              {errors?.category && (
                <span className="text-red-800 block text-sm font-medium leading-6 text-gray-900 mb-2.5">
                  {errors.category.message}
                </span>
              )}
            </>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            formState: { errors },
          }) => (
            <>
              {' '}
              <TextInput
                name="Business Email"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
              {errors?.email && (
                <span className="text-red-800 block text-sm font-medium leading-6 text-gray-900 mb-2.5">
                  {errors.email.message}
                </span>
              )}
            </>
          )}
        />
      </form>
    </div>
  );
}
