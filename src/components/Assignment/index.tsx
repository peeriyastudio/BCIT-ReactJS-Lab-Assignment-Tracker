import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import { TAssignment } from "../../types/types";
import { useState } from "react";

type Props = {
  assignment: TAssignment;
  onDelete: (id: string) => void;
  onComplete: (id: string, completed: boolean) => void;
}

export function Assignment({ assignment, onDelete, onComplete }: Props) {
  const [checked, setChecked] = useState(assignment.completed);
  
  const handleCheck = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onComplete(assignment.id, newChecked);
  }

  const handleDelete = () => {
    onDelete(assignment.id);
  }

  const dueDate = assignment.deadline !== undefined ? new Date(assignment.deadline) : null;
  const today = new Date();
  const timeDiff = dueDate ? dueDate.getTime() - today.getTime() : null;
  const daysLeft = timeDiff ? Math.ceil(timeDiff / (1000 * 3600 * 24)) : null;
  const dueTimerClass = daysLeft === 1 ? `${styles.dueTimer} ${styles.warning}` : styles.dueTimer;
  const dueMessage = daysLeft === 1 ? "Due: tomorrow" : daysLeft !== null ? `Due: ${daysLeft} days` : "";

  return (
    <div className={styles.assignment}>
      <button className={styles.checkContainer} onClick={handleCheck}>
        <div>
          {checked && <img src="../src/assets/check-icon.svg" />}
        </div>
      </button>

      <p style={checked ? { color: "gray", textDecoration: "line-through" } : {}}>
        {assignment.title}
        {dueDate !== null && <small className={dueTimerClass} >{dueMessage}</small>}
      </p>

      <button className={styles.deleteButton} onClick={handleDelete}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}
