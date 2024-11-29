"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";

interface TopPagesTableProps {
  pathStats: Array<{
    path: string;
    views: number;
    uniqueVisitors: number;
  }>;
}

export default function TopPagesTable({ pathStats }: TopPagesTableProps) {
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#1E293B]">
            <TableHead className="text-sm font-semibold text-white">
              Page
            </TableHead>
            <TableHead className="text-sm font-semibold text-white text-right">
              Views
            </TableHead>
            <TableHead className="text-sm font-semibold text-white text-right">
              Unique Visitors
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pathStats.map((page, index) => (
            <motion.tr
              key={page.path}
              className={index % 2 === 0 ? "bg-[#F8FAFC]" : "bg-white"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <TableCell className="font-medium text-[#2563EB]">
                {page.path}
              </TableCell>
              <TableCell className="text-right">
                {page.views.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {page.uniqueVisitors.toLocaleString()}
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
