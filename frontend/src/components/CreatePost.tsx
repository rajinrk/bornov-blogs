import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
} from '@mui/material';

interface CreatePostForm {
    title: string;
    content: string;
}

const validationSchema = Yup.object({
    title: Yup.string()
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must be at most 100 characters')
        .required('Title is required'),
    content: Yup.string()
        .min(10, 'Content must be at least 10 characters')
        .required('Content is required'),
});

export default function CreatePost() {
    const { values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting } = useFormik<CreatePostForm>({
        initialValues: {
            title: '',
            content: '',
        },
        validationSchema: validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, { resetForm }) => {
            try {
                // TODO: Implement API call to create post
                console.log('Creating post:', values);
                resetForm();
            } catch (error) {
                console.error('Error creating post:', error);
            }
        },
    });

    return (
        <Box className="w-full max-w-4xl mx-auto p-4">
            <Paper elevation={3} className="p-8">
                <Typography variant="h4" component="h1" className="text-center mb-6">
                    Create New Post
                </Typography>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <TextField
                        fullWidth
                        id="title"
                        name="title"
                        label="Title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                    />
                    <TextField
                        fullWidth
                        id="content"
                        name="content"
                        label="Content"
                        multiline
                        rows={6}
                        value={values.content}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.content && Boolean(errors.content)}
                        helperText={touched.content && errors.content}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={isSubmitting}
                        className="mt-4"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Post'}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
} 