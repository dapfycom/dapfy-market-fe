import Content from "./components/Content";

interface DigitalMarketplaceProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function DigitalMarketplace({
  searchParams,
}: DigitalMarketplaceProps) {
  const category = searchParams.category as string | undefined;
  const search = searchParams.search as string | undefined;

  return <Content category={category || "All"} search={search} />;
}
