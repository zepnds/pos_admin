import { useAppSelector } from '../../../store';

interface FormControl {
  onChange: () => void;
  onBlur?: () => void;
  value: string;
  name: string;
  options: Array<Record<string, number | string>>;
}
export default function SelectInput({
  onBlur,
  onChange,
  value,
  name,
  options,
}: FormControl) {
  const merchant = useAppSelector((state) => state.merchant);

  return (
    <div>
      <label
        htmlFor="countries"
        className="block text-sm font-medium leading-6 text-gray-900 mb-2.5"
      >
        {name}
      </label>

      <select
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className="capitalize w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        {merchant.update ? null : (
          <option className="capitalize">Select Options</option>
        )}

        {options.map((i) => (
          <option className="capitalize" key={i.id} value={i.value}>
            {i.value}
          </option>
        ))}
      </select>
    </div>
  );
}
