import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";
import { TAssignment } from "../../types/types";

type Props = {
  assignmentList: TAssignment[]; // Type Assignment
  setAssignmentList: React.Dispatch<React.SetStateAction<TAssignment[]>>;
}

export function Assignments({ assignmentList, setAssignmentList }: Props) {

  const handleDeleteId = (id: string) => {
    setAssignmentList(assignmentList.filter(assignment => assignment.id !== id));
  }

  const handleCompleteId = (id: string, completed: boolean) => {
    setAssignmentList(assignmentList.map(assignment => 
      assignment.id === id ? { ...assignment, completed } : assignment
    ));
  }

  return (
    <section className={styles.assignments}>
      <header className={styles.header}>
        <div>
          <p>Created Assignments</p>
          <span>{assignmentList.length}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed Assignments</p>
          <span>{assignmentList.filter(a => a.completed).length} of {assignmentList.length}</span>
        </div>
      </header>

      <div className={styles.list}>
        {assignmentList.length > 0 ? (
          assignmentList.map((assignment) => (
            <Assignment
              key={assignment.id}
              assignment={assignment}
              onDelete={handleDeleteId}
              onComplete={handleCompleteId} />
          ))
        ) : (
          <small>No assignments available, please create one above.</small>
        )}
      </div>

    </section>
  );
}
