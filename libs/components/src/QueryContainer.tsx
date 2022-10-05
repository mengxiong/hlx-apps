import React, { useLayoutEffect, useRef, useState } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { Box, BoxProps, CircularProgress, Fade, Typography } from '@mui/material';
import EmptyImage from './empty.svg';

export interface QueryContainerProps extends BoxProps {
  isEmpty?: boolean;
}

const isDefaultEmpty = (value: unknown) => {
  return value === undefined || (Array.isArray(value) && value.length === 0);
};

function Loading() {
  return (
    <Fade in>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    </Fade>
  );
}

function EmptyState() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <EmptyImage />
      <Typography variant="caption" color="#969799">
        暂无数据
      </Typography>
    </Box>
  );
}

function ErrorState({ error }: { error: Error }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Typography variant="body1" color="error">
        {error.message || '加载失败'}
      </Typography>
    </Box>
  );
}

export function QueryContainer(props: QueryContainerProps & UseQueryResult) {
  const { error, isLoading, isSuccess, children, data, sx } = props;
  const timeoutRef = useRef<number>();

  const [loadingVisible, setLoadingVisible] = useState(false);

  useLayoutEffect(() => {
    if (isLoading) {
      timeoutRef.current = window.setTimeout(() => {
        setLoadingVisible(true);
      }, 100);
    } else {
      window.clearTimeout(timeoutRef.current);
      setLoadingVisible(false);
    }
    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, [isLoading]);

  const isEmpty = props.isEmpty === undefined ? isDefaultEmpty(data) : props.isEmpty;

  let content: React.ReactNode = children;
  if (error) {
    content = <ErrorState error={error as Error} />;
  } else if (isSuccess && isEmpty) {
    content = <EmptyState />;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: 100,
        opacity: loadingVisible ? 0.5 : undefined,
        ...sx,
      }}
    >
      {content}
      {loadingVisible && <Loading />}
    </Box>
  );
}
