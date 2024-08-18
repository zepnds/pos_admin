export default function InputText() {
  return (
    <div className="space-y-2">
      <div>
        <label htmlFor="email" className="text-gray-600 mb-2 block"></label>
        Email address
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:outline-none focus:ring-2 focus:ring-gray-200 placeholder-gray-400"
          placeholder="youremail.@domain.com"
        />
      </div>
    </div>
  );
}
