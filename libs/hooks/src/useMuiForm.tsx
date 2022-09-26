import { TextField, TextFieldProps } from '@mui/material';
import { useForm, Controller, UseControllerProps } from 'react-hook-form';

export interface UseMuiFormProps<T> {
  items: Array<TextFieldRule<T>>;
}

type Rule<Type, T> = { type?: Type } & Pick<
  UseControllerProps<T>,
  'name' | 'rules' | 'defaultValue'
>;

type TextFieldRule<T> = Rule<'textfield', T> & TextFieldProps;

export function useMuiForm<T>({ items }: UseMuiFormProps<T>) {
  const { handleSubmit, control } = useForm<T>();

  const formItems = items.map(({ rules, name, defaultValue, type, ...restProps }) => {
    return (
      <Controller
        key={name}
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field, fieldState }) => {
          switch (type) {
            default:
              return (
                <TextField
                  margin="normal"
                  fullWidth
                  helperText={fieldState.error?.message}
                  error={!!fieldState.error}
                  {...restProps}
                  {...field}
                ></TextField>
              );
          }
        }}
      />
    );
  });

  return { handleSubmit, formItems };
}
