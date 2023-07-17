import {
  Button,
  Form,
  Input,
  Select,
  Divider,
  Space,
  message,
  Result
} from "antd";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import { v4 as uuidv4 } from "uuid";

const { TextArea } = Input;

export default function FinForm({ setRecordPage, userID, manager, ccaID }) {
  const [form] = Form.useForm();

  const semList = [1, 2];

  // variables to upload

  const [eventName, setEventName] = useState("");
  const currentYear = new Date().getFullYear();
  const [ay, setAY] = useState(currentYear);
  const [defaultSem, setDefaultSem] = useState(semList[0]);
  const [currentSem, setSem] = useState(semList[0]);
  const [tag, setTag] = useState("");
  const [newTag, setNewTag] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const tag_id = uuidv4();
  const fin_event_id = uuidv4();
  const [tagList, setTagList] = useState([]);
  //const [refreshlist, setRefreshList] = useState("");
  const [resultPage, setResultPage] = useState(false);

  const [creatives, setCreatives] = useState({
    gf: 0,
    nob: 0,
    og: 0,
    notes: "",
    total: 0
  });
  const [prodCost, setProdCost] = useState({
    gf: 0,
    nob: 0,
    og: 0,
    notes: "",
    total: 0
  });
  const [addEquip, setAddEquip] = useState({
    gf: 0,
    nob: 0,
    og: 0,
    notes: "",
    total: 0
  });
  const [props, setProps] = useState({
    gf: 0,
    nob: 0,
    og: 0,
    notes: "",
    total: 0
  });
  const [photoVid, setPhotoVid] = useState({
    gf: 0,
    nob: 0,
    og: 0,
    notes: "",
    total: 0
  });
  const [logistics, setLogistics] = useState({
    gf: 0,
    nob: 0,
    og: 0,
    notes: "",
    total: 0
  });
  const [welfare, setWelfare] = useState({
    gf: 0,
    nob: 0,
    og: 0,
    notes: "",
    total: 0
  });

  const fields = [
    {
      name: "Creatives (Choreographer/Artistic Director/Production Manager)",
      obj: creatives,
      func: setCreatives
    },
    {
      name: "Production Cost (Manpower/Venue/Standard)",
      obj: prodCost,
      func: setProdCost
    },
    {
      name: "Production Cost (Additional Equipment)",
      obj: addEquip,
      func: setAddEquip
    },
    { name: "Props/Set/Costume", obj: props, func: setProps },
    { name: "Photography/Videography", obj: photoVid, func: setPhotoVid },
    { name: "Logistics", obj: logistics, func: setLogistics },
    { name: "Welfare (Flowers/Meals)", obj: welfare, func: setWelfare }
  ];

  const onClick = () => {
    setRecordPage("");
  };

  const calculateTotal = (obj, setObject) => {
    //console.log(obj);
    const total = obj.gf + obj.nob + obj.og;
    setObject((prevData) => ({ ...prevData, total }));
    //console.log(obj);
  };

  const onInputChange = (object, setObject, event) => {
    const { name, value } = event.target;

    if (name === "notes") {
      setObject((prevObject) => ({
        ...prevObject,
        [name]: value
      }));
    } else {
      const intVal = parseFloat(value);
      if (intVal > -1) {
        setObject((prevObject) => ({
          ...prevObject,
          [name]: intVal
        }));
      } else {
        message.warning("Please fill in a non-negative number");
        setObject((prevObject) => ({
          ...prevObject,
          [name]: 0
        }));
      }
    }
  };

  //console.log("creatives:", creatives);
  //console.log("prodCost:", prodCost);

  const onEventNameChange = (event) => {
    setEventName(event.target.value);
    //console.log(event.target.name);
  };
  const onYearChange = (event) => {
    const year = parseInt(event.target.value, 10);
    setAY(year);
  };
  const onSemChange = (value) => {
    setDefaultSem(value);
    //console.log(`selected ${value}`);
  };

  const onSemSelect = (value) => {
    //console.log("value", value);
    setSem(value);
  };
  const onTagChange = (value) => {
    setTag(value);
    setNewTag("");
  };

  const onNewTagChange = (event) => {
    setNewTag(event.target.value);
  };

  async function insertTag(tagName) {
    try {
      //console.log(tag_id);
      const { data, error } = await supabase
        .from("Tags")
        .insert([{ tag_id: tag_id, tag_name: tagName }])
        .select();

      if (error) {
        console.error("Error creating tag:", error.message);
        message.error("Error creating tag!(Tag name must be unique)");
      } else {
        //console.log("Announcement created successfully");
        message.success("Tag Created Successfully!");
      }
    } catch (error) {
      message.error("Error creating tag!");
      console.error("Error creating tag:", error.message);
    }
  }

  async function fetchTags() {
    let { data: Tags, error } = await supabase.from("Tags").select("*");
    const tagNames = Tags.map((tag) => ({
      value: tag.tag_id,
      label: tag.tag_name
    }));
    setTagList(tagNames);
    console.log(tagNames);
  }

  useEffect(() => {
    fetchTags();
  }, []);

  const removeSelectorValueTag = async () => {
    setTag("");
    //const id = uuidv4();
    //await setRefreshList(id);
    // console.log(refreshlist);
    await insertTag(newTag);
    fetchTags();
    setNewTag("");
  };

  const fetchVar = () => {
    console.log("event name:", eventName);
    console.log("AY: ", ay);
    console.log("current sem:", currentSem);
    fields.forEach((item) => {
      console.log(item.obj);
    });
    console.log("newtag: ", newTag);
    console.log("tag", tag);
    console.log("tag", tag ? tag : newTag);
    console.log("total amount:", totalAmount);
  };

  async function onSubmitRecord(
    eventName,
    ay,
    currentSem,
    creatives,
    prodCost,
    addEquip,
    props,
    photoVid,
    logistics,
    welfare,
    tag,
    newTag
  ) {
    if (eventName) {
      try {
        //console.log(tag_id);
        const event_id = fin_event_id;

        const { data, error } = await supabase
          .from("Financial_Event")
          .insert([
            {
              event_id: event_id,
              event_name: eventName,
              acad_year: ay,
              semester: currentSem,
              creatives: creatives,
              prod_cost: prodCost,
              additional_equip: addEquip,
              props: props,
              photo_vid: photoVid,
              logistics: logistics,
              welfare: welfare,
              tag_id: tag ? tag : newTag,
              total_cost: totalAmount,
              cca_id: ccaID
            }
          ])
          .select();
        console.log("tag: ", tag ? tag : newTag);
        console.log(event_id);
        console.log(event_id);

        const { datatwo, error2 } = await supabase
          .from("Finances")
          .insert([{ event_id: event_id, cca_name: "test-cca" }])
          .select();

        if (error || error2) {
          console.error(
            "Error Creating Financial Record. Did you forget to add a tag?",
            error.message
          );
          message.error(
            "Error Creating Financial Record. Did you forget to add a tag?"
          );
        } else {
          //console.log("Announcement created successfully");
          message.success("Record Created Successfully!");
          setResultPage(true);
        }
      } catch (error) {
        message.error(
          "Error Creating Financial Record. Did you forget to add a tag?"
        );
        console.error(
          "Error Creating Financial Record. Did you forget to add a tag?",
          error.message
        );
      }
    } else {
      message.error("Event Name cannot be empty!");
    }
  }

  useEffect(() => {
    const { gf, nob, og } = creatives;
    const total = gf + nob + og;
    setCreatives((prevCreatives) => ({ ...prevCreatives, total }));
  }, [creatives.gf, creatives.nob, creatives.og]);

  useEffect(() => {
    const { gf, nob, og } = prodCost;
    const total = gf + nob + og;
    setProdCost((prev) => ({ ...prev, total }));
  }, [prodCost.gf, prodCost.nob, prodCost.og]);

  useEffect(() => {
    const { gf, nob, og } = addEquip;
    const total = gf + nob + og;
    setAddEquip((prev) => ({ ...prev, total }));
  }, [addEquip.gf, addEquip.nob, addEquip.og]);

  useEffect(() => {
    const { gf, nob, og } = props;
    const total = gf + nob + og;
    setProps((prev) => ({ ...prev, total }));
  }, [props.gf, props.nob, props.og]);

  useEffect(() => {
    const { gf, nob, og } = photoVid;
    const total = gf + nob + og;
    setPhotoVid((prev) => ({ ...prev, total }));
  }, [photoVid.gf, photoVid.nob, photoVid.og]);

  useEffect(() => {
    const { gf, nob, og } = logistics;
    const total = gf + nob + og;
    setLogistics((prev) => ({ ...prev, total }));
  }, [logistics.gf, logistics.nob, logistics.og]);

  useEffect(() => {
    const { gf, nob, og } = welfare;
    const total = gf + nob + og;
    setWelfare((prev) => ({ ...prev, total }));
  }, [welfare.gf, welfare.nob, welfare.og]);

  useEffect(() => {
    const list = [
      creatives.total,
      prodCost.total,
      addEquip.total,
      props.total,
      photoVid.total,
      logistics.total,
      welfare.total
    ];
    setTotalAmount(list.reduce((x, y) => x + y, 0));
  }, [
    creatives.total,
    prodCost.total,
    addEquip.total,
    props.total,
    photoVid.total,
    logistics.total,
    welfare.total
  ]);

  return (
    <div>
      <Button type="primary" onClick={onClick}>
        Back
      </Button>

      {resultPage ? (
        <Result
          status="success"
          title="Successfully Submitted Financial Record!"
          subTitle={`Event Name: ${eventName}`}
        />
      ) : (
        <Form layout="vertical" form={form}>
          <Divider
            orientation="left"
            orientationMargin="0"
            style={{ fontSize: "35px" }}
          >
            Financial Record Submission
          </Divider>
          <p style={{ opacity: "0.5", fontStyle: "italic" }}>
            Note: Any empty fields for numbers will be automatically recognised
            as a zero value.
          </p>
          <Divider
            orientation="left"
            orientationMargin="0"
            style={{ fontSize: "20px" }}
          >
            General Information
          </Divider>
          <Form.Item label="Event Name">
            <Input
              status={null}
              name="event"
              placeholder="Text Input"
              onChange={onEventNameChange}
            />
          </Form.Item>
          <Form.Item label="Academic Year">
            <Input
              value={ay}
              placeholder="Number Input"
              onChange={onYearChange}
            />
          </Form.Item>

          <Form.Item
            label="Semester"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Select
              placeholder="Select Semester"
              defaultValue={defaultSem}
              onChange={onSemChange}
              onSelect={onSemSelect}
              allowClear
              options={semList.map((item) => ({
                value: item,
                label: item
              }))}
            ></Select>
          </Form.Item>

          {fields.map((item) => {
            return (
              <div>
                <Divider
                  orientation="left"
                  orientationMargin="0"
                  style={{ fontSize: "20px", marginTop: "40px" }}
                >
                  {item.name}
                </Divider>
                <Form.Item label="Group Fund">
                  <Input
                    type="number"
                    min={0}
                    max={10000000}
                    name="gf"
                    placeholder="Number Input"
                    onChange={(event) => {
                      onInputChange(item.obj, item.func, event);
                    }}
                  />
                </Form.Item>

                <Form.Item label="NUS Operating Budget">
                  <Input
                    type="number"
                    min={0}
                    max={10000000}
                    name="nob"
                    placeholder="Number Input"
                    onChange={(event) => {
                      onInputChange(item.obj, item.func, event);
                    }}
                  />
                </Form.Item>
                <Form.Item label="Other Grants">
                  <Input
                    name="og"
                    type="number"
                    min={0}
                    max={10000000}
                    placeholder="Number Input"
                    onChange={(event) => {
                      onInputChange(item.obj, item.func, event);
                    }}
                  />
                </Form.Item>
                <Form.Item label="Notes/Cost Breakdown">
                  <TextArea
                    showCount
                    maxLength={1000}
                    style={{
                      height: 100
                    }}
                    onChange={(event) => {
                      onInputChange(item.obj, item.func, event);
                    }}
                    name="notes"
                    placeholder="Text Input"
                    autoSize={{ minRows: 3, maxRows: 6 }}
                  />
                  {/*<Input
                  name="notes"
                  placeholder="input placeholder"
                  onChange={(event) => {
                    onInputChange(item.obj, item.func, event);
                  }}
                /> */}
                </Form.Item>
                <Form.Item label="Total Spent">
                  <Space.Compact
                    style={{
                      width: "100%"
                    }}
                  >
                    {/* <Button onClick={() => calculateTotal(item.obj, item.func)}>
                    Calculate
                  </Button>*/}

                    <Input
                      name="total"
                      placeholder="Create a new Tag"
                      value={item.obj.total}
                    />
                  </Space.Compact>

                  {/* value is automatic sum of all fields*/}
                </Form.Item>
              </div>
            );
          })}
          <Divider
            orientation="left"
            orientationMargin="0"
            style={{ fontSize: "20px" }}
          >
            Tags
          </Divider>
          <Form.Item label="Select Existing Tag">
            <Select
              placeholder="Select Semester"
              onSelect={onTagChange}
              value={tag}
              allowClear
              options={tagList}
            ></Select>
          </Form.Item>

          <Form.Item label="Didn't find a useful tag? Create a New Tag!">
            <Space.Compact
              style={{
                width: "100%"
              }}
            >
              <Input
                value={newTag}
                placeholder="Create a new Tag"
                onChange={onNewTagChange}
              />
              <Button onClick={removeSelectorValueTag}>Create</Button>
            </Space.Compact>
          </Form.Item>
          <Divider
            orientation="left"
            orientationMargin="0"
            style={{ fontSize: "20px" }}
          >
            Total Cost
          </Divider>
          <Form.Item label="Cumulative Cost for all fields: ">
            SGD$ {totalAmount}
          </Form.Item>

          <Divider />
          <Button
            onClick={() =>
              onSubmitRecord(
                eventName,
                ay,
                currentSem,
                creatives,
                prodCost,
                addEquip,
                props,
                photoVid,
                logistics,
                welfare,
                tag,
                newTag
              )
            }
          >
            Create New Record
          </Button>
        </Form>
      )}

      <p></p>
    </div>
  );
}
