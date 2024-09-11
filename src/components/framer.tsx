"use client";
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  MotionProps,
} from "framer-motion";
import { PropsWithChildren } from "react";

const FramerDiv = ({
  children,
  ...props
}: PropsWithChildren<MotionProps & HTMLMotionProps<"div">>) => {
  return <motion.div {...props}>{children}</motion.div>;
};

const FramerButton = ({
  children,
  ...props
}: PropsWithChildren<MotionProps & HTMLMotionProps<"button">>) => {
  return <motion.button {...props}>{children}</motion.button>;
};

const FramerInput = ({
  children,
  ...props
}: PropsWithChildren<MotionProps & HTMLMotionProps<"input">>) => {
  return <motion.input {...props}>{children}</motion.input>;
};

const FramerTable = ({
  children,
  ...props
}: PropsWithChildren<MotionProps & HTMLMotionProps<"table">>) => {
  return <motion.table {...props}>{children}</motion.table>;
};

const FramerTableRow = ({
  children,
  ...props
}: PropsWithChildren<MotionProps & HTMLMotionProps<"tr">>) => {
  return <motion.tr {...props}>{children}</motion.tr>;
};

const FramerHeader = ({
  children,
  ...props
}: PropsWithChildren<MotionProps & HTMLMotionProps<"header">>) => {
  return <motion.header {...props}>{children}</motion.header>;
};

export {
  AnimatePresence,
  FramerButton,
  FramerDiv,
  FramerHeader,
  FramerInput,
  FramerTable,
  FramerTableRow,
};
