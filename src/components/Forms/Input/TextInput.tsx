interface FormControl {
  onChange: () => void;
  onBlur: () => void;
  value: string;
  name: string;
}
export default function TextInput({
  onBlur,
  onChange,
  value,
  name,
}: FormControl) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium leading-6 text-gray-900 mb-2.5">
        {name}
      </label>
      <div className="relative">
        <input
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          type="text"
          className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-2.5 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>
    </div>
  );
}
