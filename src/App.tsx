import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";
import { useState } from "react";
import { TAssignment } from "./types/types";

function App() {
  const [textValue, setTextValue] = useState("");
  const [selected, setSelected] = useState<Date>();
  const [assignmentList, setAssignmentList] = useState<TAssignment[]>([]);
  return (
    <>
      <Header textValue={textValue} setTextValue={setTextValue} setAssignmentList={setAssignmentList} selected={selected} setSelected={setSelected} />
      <Assignments assignmentList={assignmentList} setAssignmentList={setAssignmentList} />
    </>
  );
}

export default App;
