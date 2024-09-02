type Props = {
  active: number;
  data: Array<Record<string, number | string>>;
};
const TimeLineDefault: React.FC<Props> = ({ active, data }) => {
  return (
    <ol className="border-s border-neutral-300 dark:border-neutral-500">
      {data.map((timeline) => (
        <li key={timeline.id}>
          <div className="flex-start flex items-center pt-3">
            <div
              className={`-ms-[5px] me-3 h-[10px] w-[10px] rounded-full ${
                active === timeline.id
                  ? 'bg-emerald-600 dark:bg-emerald-500'
                  : 'bg-neutral-300 dark:bg-neutral-500'
              } `}
            ></div>
            <h4
              className={`text-xl font-semibold ${
                active === timeline.id ? 'text-emerald-600' : ''
              }`}
            >
              {timeline.title}
            </h4>
          </div>
          <div className="mb-10 ms-4 ">
            <p className="mb-3 text-neutral-500 dark:text-neutral-300">
              {timeline.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default TimeLineDefault;
