import { Button, ButtonProps } from "@/components/ui/button";

export const PrimaryButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button className="bg-blue-600 text-white hover:bg-blue-700" {...props}>
      {children}
    </Button>
  );
};

export const SecondayButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button className="bg-green-500 text-white hover:bg-green-600" {...props}>
      {children}
    </Button>
  );
};

export const GhostButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      variant="ghost"
      className="text-blue-600 hover:bg-blue-100 hover:text-blue-800"
      {...props}
    >
      {children}
    </Button>
  );
};

export const OutlineButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      variant="outline"
      className="bg-white text-blue-600 hover:bg-blue-100 hover:text-blue-800 border-blue-300"
      {...props}
    >
      {children}
    </Button>
  );
};
