import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ForwardedRef, useImperativeHandle } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { setStep } from '../../../store/appslice';
import { setBusiness } from '../../../store/merchatSlice';
import SelectInput from '../Input/Select';
const businessDetails = yup.object().shape({
  category: yup.string().required('Business category is a required field'),
});

type IFormInput = {
  category: string;
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
  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      category: '',
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
      </form>
    </div>
  );
}
