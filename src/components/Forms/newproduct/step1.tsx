import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '../Input/TextInput';
import { ForwardedRef, useImperativeHandle } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { setStep } from '../../../store/appslice';
import { setBusiness } from '../../../store/merchatSlice';
import DetailsForm from '../Input/Details';
const businessDetails = yup.object().shape({
  title: yup.string().required('Business title is a required field'),
  address: yup.string().required('Business details is a required field'),
});

type IFormInput = {
  title: string;
  address: string;
};

type Props = {
  reference: ForwardedRef<{ submitForm: () => void }>;
};

export default function ProductDetailsForm({ reference }: Props) {
  const merchant = useAppSelector((state) => state.merchant);
  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      address: merchant.addBusiness.address ?? '',
      title: merchant.addBusiness.title ?? '',
    },
    resolver: yupResolver(businessDetails),
  });

  const dispatch = useAppDispatch();
  const step = useAppSelector((state) => state.app.step);
  useImperativeHandle(reference, () => ({
    submitForm() {
      handleSubmit(onSubmit)();
    },
  }));

  const onSubmit = (data: IFormInput) => {
    dispatch(setBusiness(data));
    dispatch(setStep(step + 1));
  };

  return (
    <div className="bg-white p-10 rounded-2xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            formState: { errors },
          }) => (
            <>
              {' '}
              <TextInput
                name="Product Title"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
              {errors?.title && (
                <span className="text-red-800 block text-sm font-medium leading-6 text-gray-900 mb-2.5">
                  {errors.title.message}
                </span>
              )}
            </>
          )}
        />
        <Controller
          name="address"
          control={control}
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Product Details
              </label>
              <div className="mt-2">
                <DetailsForm value={value} onChange={onChange} />
              </div>
              {errors?.address && (
                <span className="text-red-800 block text-sm font-medium leading-6 text-gray-900 mb-2.5">
                  {errors.address.message}
                </span>
              )}
            </div>
          )}
        />
      </form>
    </div>
  );
}
