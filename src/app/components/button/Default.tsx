type Prop = {
  title: string;
  buttonStyle?: Record<string, string | number>;
  className?: string;
};
export default function DefaultButton(props: Prop) {
  return (
    <button
      style={props.buttonStyle}
      type="submit"
      className={`block w-full py-2 text-center text-white bg-teal-500 border border-teal-500 rounded hover:bg-transparent hover:text-teal-500 transition uppercase font-roboto font-medium ${props.className}`}
    >
      {props.title}
    </button>
  );
}
