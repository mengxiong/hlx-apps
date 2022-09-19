import { LoadingButton } from '@mui/lab';
import { Box, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from 'react-hook-form';
import { LoginByPassParams } from 'src/api/auth';

export interface AccountPasswordProps {
  login: (values: LoginByPassParams) => void;
  isLoading: boolean;
}

export function AccountPassword({ login, isLoading }: AccountPasswordProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginByPassParams>({
    defaultValues: {
      username: '13607148408',
      pass: '123456',
    },
  });

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(login)}>
      <TextField
        margin="normal"
        variant="standard"
        required
        fullWidth
        label="账号"
        autoComplete="tel"
        autoFocus
        helperText={errors.username?.message}
        error={!!errors.username}
        {...register('username', { required: '账号不能为空' })}
      ></TextField>
      <TextField
        margin="normal"
        variant="standard"
        required
        fullWidth
        label="密码"
        type="password"
        autoComplete="current-password"
        error={!!errors.pass}
        helperText={errors.pass?.message}
        {...register('pass', { required: '密码不能为空' })}
      ></TextField>
      <LoadingButton
        sx={{ mt: 2 }}
        variant="contained"
        fullWidth
        type="submit"
        loadingPosition="start"
        startIcon={<SaveIcon />}
        loading={isLoading}
      >
        登录
      </LoadingButton>
    </Box>
  );
}
