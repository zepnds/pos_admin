import { useForm, Controller } from 'react-hook-form';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppSelector } from '../../store';
import TextInput from '../../components/Forms/Input/TextInput';
type IFormInput = {
  branch_address: string;
  branch_email: string;
  branch_name: string;
};

const branchDetails = yup.object().shape({
  branch_email: yup.string().required('Branch details is a required field'),
  branch_address: yup.string().required('Branch address is a required field'),
  branch_name: yup.string().required('Branch name is a required field'),
});

export default function AddBranch() {
  const addBranch = useAppSelector((state) => state.merchant.addBranch);
  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      branch_email: addBranch.branch_email ?? '',
      branch_address: addBranch.branch_address ?? '',
      branch_name: addBranch.branch_name ?? '',
    },
    resolver: yupResolver(branchDetails),
  });

  const onSubmit = () => {};

  return (
    <div>
      <Breadcrumb pageName="Add Branch" />
      <div className="bg-white p-10 rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="branch_name"
            control={control}
            render={({
              field: { onChange, onBlur, value },
              formState: { errors },
            }) => (
              <>
                <TextInput
                  name="Branch Name"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
                {errors?.branch_name && (
                  <span className="text-red-800 block text-sm font-medium leading-6 text-gray-900 mb-2.5">
                    {errors.branch_name.message}
                  </span>
                )}
              </>
            )}
          />
          <Controller
            name="branch_email"
            control={control}
            render={({
              field: { onChange, onBlur, value },
              formState: { errors },
            }) => (
              <>
                <TextInput
                  name="Branch Email"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
                {errors?.branch_name && (
                  <span className="text-red-800 block text-sm font-medium leading-6 text-gray-900 mb-2.5">
                    {errors.branch_name.message}
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
    </div>
  );
}
