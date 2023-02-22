# Info Form

Technology use `NextJS`, `Zustand`, `Tailwind`, `Yup`, `React-hook-form`

## Structure:
- pages/form : Form step 1-2-3 pages
- store/useFormStore.tsx: Where form data is stored with zustand
- lib/yup.ts: Yup schema validation for each step
- types.ts: Form type declaration
- components/Forms: Components are used in form

## Features:

### Each time submitting, data is stored in FormStore

```tsx
const onSubmit = (data: StepOneData) => {
  setData({ step: 1, data });
  router.push('/form/step-2');
};
```

### The stored data will be used as a default value on revisit

```tsx
const { stepOne, setData } = useFormStore();

const methods = useForm({
  mode: 'onTouched',
  resolver: yupResolver(stepOneSchema),
  defaultValues: stepOne || {},
});
```

### Upload Form

The tricky part lies in Upload Form. The data that is originally stored by the input is `File` object, but if we store it in zustand, it will be transformed into regular object. This will cause an error when we invoke the `URL.createObjectURL(file)` for the FilePreview. 

So we need to invoke it while we get the original File, and store the URL as a new property. In that way, we only invoke it once, and just use the blob url for revisit.

```tsx
const acceptedFilesPreview = acceptedFiles.map(
  (file: FileWithPreview) =>
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    })
);
```
