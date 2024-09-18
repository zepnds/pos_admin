import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ForwardedRef, useImperativeHandle } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import TextInput from '../Input/TextInput';
import { useLocation } from 'react-router-dom';
import { createBranch, updateBranch } from '../../../store/merchatSlice';

const branchContact = yup.object().shape({
  branch_email: yup
    .string()
    .email('Please make sure input a valid email address')
    .required('Branch category is a required field'),
});

type IFormInput = {
  branch_email: string;
};

type Props = {
  reference: ForwardedRef<{ submitForm: () => void }>;
};

export default function BranchContact({ reference }: Props) {
  const addBranch = useAppSelector((state) => state.merchant.addBranch);
  const auth = useAppSelector((state) => state.auth);
  const update = useAppSelector((state) => state.merchant.update);
  const { search } = useLocation();
  const id = search.split('id=')[1];
  const step = useAppSelector((state) => state.app.step);

  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      branch_email: addBranch.email ?? '',
    },
    resolver: yupResolver(branchContact),
  });

  const dispatch = useAppDispatch();

  useImperativeHandle(reference, () => ({
    submitForm() {
      handleSubmit(onSubmit)();
    },
  }));

  const onSubmit = (data: IFormInput) => {
    if (step === 2) {
      const _payload = {
        branch_name: addBranch.name,
        branch_address: addBranch.branch_address,
        company_code: parseInt(id),
        branch_email: data.branch_email,
        token: auth.access_token,
      };

      if (update) {
        const _payloadu = {
          branch_name: addBranch.name,
          branch_address: addBranch.branch_address,
          company_code: parseInt(id),
          branch_email: data.branch_email,
          token: auth.access_token,
          id: parseInt(id),
        };

        dispatch(updateBranch(_payloadu));
      } else {
        dispatch(createBranch(_payload));
      }
    }
  };

  return (
    <div className="bg-white p-10 rounded-2xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        {' '}
        <Controller
          name="branch_email"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            formState: { errors },
          }) => (
            <>
              {' '}
              <TextInput
                name="Branch Email"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
              {errors?.branch_email && (
                <span className="text-red-800 block text-sm font-medium leading-6 text-gray-900 mb-2.5">
                  {errors.branch_email.message}
                </span>
              )}
            </>
          )}
        />
      </form>
    </div>
  );
}
