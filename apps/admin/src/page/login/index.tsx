import { Avatar, Box, Container, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { LoginDto } from '@hlx/dto';
import SaveIcon from '@mui/icons-material/Save';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from '@mui/lab';
import { useAuth } from '@hlx/frame';
import { login } from '../../api/auth';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signin } = useAuth();

  const loginMutation = useMutation(login, {
    onSuccess(data) {
      signin(data);
      const from = (location.state as any)?.from || '/';
      navigate(from, { replace: true });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    defaultValues: {
      phone: '15623530290',
      password: '4588335',
    },
  });

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        height: '100%',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        [theme.breakpoints.down(444)]: {
          backgroundImage: 'none',
        },
      })}
    >
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
          mt: 12,
          backgroundColor: '#fff',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          登录
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit((args) => loginMutation.mutate(args))}
        >
          <TextField
            margin="normal"
            variant="outlined"
            required
            fullWidth
            label="账号"
            autoComplete="tel"
            autoFocus
            helperText={errors.phone?.message}
            error={!!errors.phone}
            {...register('phone', { required: '账号不能为空' })}
          ></TextField>
          <TextField
            margin="normal"
            variant="outlined"
            required
            fullWidth
            label="密码"
            type="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password', { required: '密码不能为空' })}
          ></TextField>
          <LoadingButton
            sx={{ mt: 2 }}
            variant="contained"
            fullWidth
            type="submit"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            loading={loginMutation.isLoading}
          >
            登录
          </LoadingButton>
        </Box>
      </Container>
    </Box>
  );
}
