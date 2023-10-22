import * as Yup from 'yup';

export const answerValidationSchema = Yup.object().shape({
  content: Yup.string()
    .required('Content is required')
    .min(5, 'Content must contain at least 5 characters')
    .max(1000000, 'Content must not exceed 100,000 characters'),
})
