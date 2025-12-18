export type DB = {
  public: {
    users: {
      id: string;
      email: string;
      full_name: string;
      created_at: string;
    };
    courses: {
      id: string;
      title: string;
      subject: string;
      description: string;
      created_by: string;
      is_published: boolean;
      created_at: string;
    };
    course_pages: {
      id: string;
      course_id: string;
      page_index: number;
      title: string;
      content_md: string;
      created_at: string;
    };
    questions: {
      id: string;
      course_id: string;
      question_text: string;
      type: string;
      created_at: string;
    };
    question_options: {
      id: string;
      question_id: string;
      option_text: string;
      is_correct: boolean;
    };
    attempts: {
      id: string;
      course_id: string;
      user_id: string;
      score: number;
      answers_json: any;
      created_at: string;
    };
  };
};
