import * as Yup from 'yup';

export const editPostValidationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required')
        .min(5, 'Title must be at least 5 characters')
        .max(1000, 'Title must not exceed 1000 characters'),

    content: Yup.string()
        .required('Content is required')
        .min(5, 'Content must be at least 5 characters')
        .max(1000000, 'Content must not exceed 100,000 characters'),
})
