import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '../Input/TextInput';
import { ForwardedRef, useImperativeHandle } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { setStep } from '../../../store/appslice';
import { setBusiness } from '../../../store/merchatSlice';
const businessDetails = yup.object().shape({
  title: yup.string().required('Business title is a required field'),
  description: yup.string().required('Business details is a required field'),
});

type IFormInput = {
  title: string;
  description: string;
};

type Props = {
  reference: ForwardedRef<{ submitForm: () => void }>;
};

export default function BusinessDetailForm({ reference }: Props) {
  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      description: '',
      title: '',
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
                name="Business Title"
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
          name="description"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            formState: { errors },
          }) => (
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Business Details
              </label>
              <div className="mt-2">
                <textarea
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  rows={3}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              {errors?.description && (
                <span className="text-red-800 block text-sm font-medium leading-6 text-gray-900 mb-2.5">
                  {errors.description.message}
                </span>
              )}
            </div>
          )}
        />
      </form>
    </div>
  );
}
