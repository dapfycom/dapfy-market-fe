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

const FramerAside = ({
  children,
  ...props
}: PropsWithChildren<MotionProps & HTMLMotionProps<"aside">>) => {
  return <motion.aside {...props}>{children}</motion.aside>;
};

const FramerH1 = ({
  children,
  ...props
}: PropsWithChildren<MotionProps & HTMLMotionProps<"h1">>) => {
  return <motion.h1 {...props}>{children}</motion.h1>;
};

const FramerH2 = ({
  children,
  ...props
}: PropsWithChildren<MotionProps & HTMLMotionProps<"h2">>) => {
  return <motion.h2 {...props}>{children}</motion.h2>;
};

const FramerP = ({
  children,
  ...props
}: PropsWithChildren<MotionProps & HTMLMotionProps<"p">>) => {
  return <motion.p {...props}>{children}</motion.p>;
};

export {
  AnimatePresence,
  FramerAside,
  FramerButton,
  FramerDiv,
  FramerH1,
  FramerH2,
  FramerHeader,
  FramerInput,
  FramerP,
  FramerTable,
  FramerTableRow,
};
