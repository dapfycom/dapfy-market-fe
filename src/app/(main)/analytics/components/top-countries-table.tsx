import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TopCountriesTableProps {
  countryStats: Array<{
    country: string;
    visitors: number;
    percentage: number;
  }>;
}

export default function TopCountriesTable({
  countryStats,
}: TopCountriesTableProps) {
  // Sort countries by visitors in descending order
  const sortedCountries = [...countryStats].sort(
    (a, b) => b.visitors - a.visitors
  );

  return (
    <Card className="bg-[#F8FAFC] border-[#E2E8F0] shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#1E293B]">
          Top Countries
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#1E293B]">
              <TableHead className="text-sm font-semibold text-white">
                Country
              </TableHead>
              <TableHead className="text-sm font-semibold text-white text-right">
                Visitors
              </TableHead>
              <TableHead className="text-sm font-semibold text-white text-right">
                Percentage
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCountries.map((country, index) => (
              <TableRow
                key={country.country}
                className={index % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}
              >
                <TableCell className="font-medium">{country.country}</TableCell>
                <TableCell className="text-right">
                  {country.visitors.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {country.percentage.toFixed(1)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
