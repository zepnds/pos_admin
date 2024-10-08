import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

type Props = {
  value: string;
  onChange: () => void;
};

const DetailsForm = ({ value, onChange }: Props) => {
  return (
    <div>
      <ReactQuill
        value={value}
        onChange={onChange}
        theme="snow" // you can choose 'bubble' or 'snow'
        style={{ height: '230px', marginBottom: '45px' }} // Adjust height as needed
      />
      {/* <div>
        <h3>Output:</h3>
        <div dangerouslySetInnerHTML={{ __html: editorHtml }} />
      </div> */}
    </div>
  );
};

export default DetailsForm;
