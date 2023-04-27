interface CreateCompletionResponseData {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: any[];
}

type CreateCompletionResponse = AxiosResponse<CreateCompletionResponseData>;

type MenuOptions = {
  gradeLevel: number[];
  subjectArea: string[];
  learningObjectivesMax: number;
};

type FormValues = {
  gradeLevel: string;
  subjectArea: string;
  numLearningObjectives: string;
  unit: string;
};
