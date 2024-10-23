import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import { TAssignment } from "../../types/types";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useState } from "react";

type Props = {
  textValue: string,
  selected: Date | undefined,
  setSelected: React.Dispatch<React.SetStateAction<Date | undefined>>,
  setTextValue: React.Dispatch<React.SetStateAction<string>>,
  setAssignmentList: React.Dispatch<React.SetStateAction<TAssignment[]>>,
}

export function Header({ textValue, setTextValue, setAssignmentList, selected, setSelected }: Props) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (setAssignmentList) {
      const deadline = selected ? new Date(selected) : undefined;
      let assignmentObj = { 
        id: crypto.randomUUID(),
        title: textValue,
        deadline,
        completed: false };
      const newAssignment = ((assignmentList: TAssignment[]) => [...assignmentList, assignmentObj]);
      setAssignmentList(newAssignment);
      setTextValue("");
      setSelected(undefined);
    }
  }

  const [showDayPicker, setShowDayPicker] = useState(false);

  const handleDayPick = () => {
    setShowDayPicker(true);
  }

  const handleSelect = (day: Date | undefined) => {
      setSelected(day);
      setShowDayPicker(false);
  }

  return (
    <header className={styles.header}>
      {/* This is simply to show you how to use helper functions */}
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form className={styles.newAssignmentForm} onSubmit={handleSubmit}>
        <input
          value={textValue}
          onChange={handleChange}
          type="text"
          placeholder="Add a new assignment"
        />
        <div className="day-wrapper">
          <input
              style={{ padding: "17px" }}
              readOnly
              value={selected ? selected.toLocaleDateString() : ""}
              type="text"
              placeholder={"Select a deadline 📅"}
              onClick={handleDayPick}
          />
          {showDayPicker && (
          <div className="day-picker">
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={handleSelect}
            />
          </div>
          )}
        </div>
        <button disabled={!textValue}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}