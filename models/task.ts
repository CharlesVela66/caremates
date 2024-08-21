import { Document, Schema, model, models } from 'mongoose';
interface ITask extends Document {
  name: string;
  description: string;
  status: 'completed' | 'not_completed';
}
const TaskSchema = new Schema<ITask>({
  name: {
    type: String,
    required: [true, 'Task name is required'],
  },
  description: {
    type: String,
    required: [true, 'Task description is required'],
  },
  status: {
    type: String,
    required: [true, 'Task status is required'],
  },
});

const Task = models.Task || model<ITask>('Task', TaskSchema);

export default Task;
