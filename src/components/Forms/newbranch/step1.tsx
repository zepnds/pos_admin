import { ForwardedRef, useImperativeHandle } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../store';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { setBranch } from '../../../store/merchatSlice';
import { setStep } from '../../../store/appslice';
import TextInput from '../Input/TextInput';

type IFormInput = {
  name: string;
  branch_address: string;
};

type Props = {
  reference: ForwardedRef<{ submitForm: () => void }>;
};

const branchSchema = yup.object().shape({
  name: yup.string().required('Branch name is a required field'),
  branch_address: yup.string().required('Branch address is a required field'),
});

export default function BranchDetails({ reference }: Props) {
  const addBranch = useAppSelector((state) => state.merchant.addBranch);
  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      name: addBranch.title ?? '',
      branch_address: addBranch.address ?? '',
    },
    resolver: yupResolver(branchSchema),
  });

  const dispatch = useAppDispatch();

  const step = useAppSelector((state) => state.app.step);
  useImperativeHandle(reference, () => ({
    submitForm() {
      handleSubmit(onSubmit)();
    },
  }));

  const onSubmit = (data: IFormInput) => {
    dispatch(setBranch(data));
    dispatch(setStep(step + 1));
  };

  return (
    <div className="bg-white p-10 rounded-2xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            formState: { errors },
          }) => (
            <>
              {' '}
              <TextInput
                name="Branch Name"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
              {errors?.name && (
                <span className="text-red-800 block text-sm font-medium leading-6 text-gray-900 mb-2.5">
                  {errors.name.message}
                </span>
              )}
            </>
          )}
        />
        <Controller
          name="branch_address"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            formState: { errors },
          }) => (
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Branch Address
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
              {errors?.branch_address && (
                <span className="text-red-800 block text-sm font-medium leading-6 text-gray-900 mb-2.5">
                  {errors.branch_address.message}
                </span>
              )}
            </div>
          )}
        />
      </form>
    </div>
  );
}
