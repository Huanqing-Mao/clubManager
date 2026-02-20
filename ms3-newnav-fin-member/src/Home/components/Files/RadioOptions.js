import { Radio } from "antd";
import { useState } from "react";

export default function RadioOptions({ setRadio }) {
  const [defaultValue, setDefaultValue] = useState("a");

  const onChange = (e) => {
    setDefaultValue(e.target.value);
    setRadio(e.target.value);
    console.log(`radio checked:${e.target.value}`);
  };
  const Radios = () => (
    <>
      <Radio.Group defaultValue={defaultValue} onChange={onChange}>
        <Radio.Button value="a">Existing</Radio.Button>
        <Radio.Button value="b">New</Radio.Button>
      </Radio.Group>
    </>
  );
  return (
    <div>
      <Radios />
    </div>
  );
}
