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
}: PropsWithChildren<
  MotionProps & HTMLMotionProps<"div"> & { className?: string }
>) => {
  return <motion.div {...props}>{children}</motion.div>;
};

const FramerButton = ({
  children,
  ...props
}: PropsWithChildren<
  MotionProps & HTMLMotionProps<"button"> & { className?: string }
>) => {
  return <motion.button {...props}>{children}</motion.button>;
};

const FramerInput = ({
  children,
  ...props
}: PropsWithChildren<
  MotionProps & HTMLMotionProps<"input"> & { className?: string }
>) => {
  return <motion.input {...props}>{children}</motion.input>;
};

const FramerTable = ({
  children,
  ...props
}: PropsWithChildren<
  MotionProps & HTMLMotionProps<"table"> & { className?: string }
>) => {
  return <motion.table {...props}>{children}</motion.table>;
};

const FramerTableRow = ({
  children,
  ...props
}: PropsWithChildren<
  MotionProps & HTMLMotionProps<"tr"> & { className?: string }
>) => {
  return <motion.tr {...props}>{children}</motion.tr>;
};

const FramerHeader = ({
  children,
  ...props
}: PropsWithChildren<
  MotionProps & HTMLMotionProps<"header"> & { className?: string }
>) => {
  return <motion.header {...props}>{children}</motion.header>;
};

const FramerAside = ({
  children,
  ...props
}: PropsWithChildren<
  MotionProps & HTMLMotionProps<"aside"> & { className?: string }
>) => {
  return <motion.aside {...props}>{children}</motion.aside>;
};

const FramerH1 = ({
  children,
  ...props
}: PropsWithChildren<HTMLMotionProps<"h1"> & { className?: string }>) => {
  return <motion.h1 {...props}>{children}</motion.h1>;
};

const FramerH2 = ({
  children,
  ...props
}: PropsWithChildren<HTMLMotionProps<"h2"> & { className?: string }>) => {
  return <motion.h2 {...props}>{children}</motion.h2>;
};

const FramerP = ({
  children,
  ...props
}: PropsWithChildren<HTMLMotionProps<"p"> & { className?: string }>) => {
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
