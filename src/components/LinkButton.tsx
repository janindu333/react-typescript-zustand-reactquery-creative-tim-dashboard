// src/components/LinkButton.tsx
import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { Link, LinkProps } from 'react-router-dom';

type LinkButtonProps = ButtonProps & LinkProps;

const LinkButton = (props: LinkButtonProps) => {
  return <Button component={Link} {...props} />;
};

export default LinkButton;
