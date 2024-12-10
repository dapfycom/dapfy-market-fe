"use client";

import { motion } from "framer-motion";
import {
  Download,
  MessageCircle,
  MoreHorizontal,
  RefreshCcw,
  Star,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import DashboardContentLayout from "../commons/dashboard-content-layout";

// Mock data for demonstration purposes
const purchaseHistory = [
  {
    id: "ORD001",
    date: "2023-06-15",
    product: "Digital Course A",
    customer: "Alice Johnson",
    amount: 199.99,
  },
  {
    id: "ORD002",
    date: "2023-06-14",
    product: "E-book B",
    customer: "Bob Smith",
    amount: 29.99,
  },
  {
    id: "ORD003",
    date: "2023-06-13",
    product: "Digital Course A",
    customer: "Charlie Brown",
    amount: 199.99,
  },
  {
    id: "ORD004",
    date: "2023-06-12",
    product: "Digital Course C",
    customer: "Alice Johnson",
    amount: 149.99,
  },
  {
    id: "ORD005",
    date: "2023-06-11",
    product: "E-book D",
    customer: "Bob Smith",
    amount: 39.99,
  },
];

const customers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    location: "New York, USA",
    loyalty: "VIP",
    ltv: 1250,
    lastPurchase: "2023-06-15",
    totalSpent: 1250,
    engagementScore: 95,
    reviews: [
      {
        id: 1,
        product: "Digital Course A",
        rating: 5,
        comment: "Excellent content!",
      },
      {
        id: 2,
        product: "Digital Course C",
        rating: 4,
        comment: "Very informative, but could use more practical examples.",
      },
    ],
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    location: "London, UK",
    loyalty: "Returning",
    ltv: 450,
    lastPurchase: "2023-06-14",
    totalSpent: 450,
    engagementScore: 75,
    reviews: [
      {
        id: 3,
        product: "E-book B",
        rating: 4,
        comment: "Good read, but could use more depth in certain areas.",
      },
      {
        id: 4,
        product: "E-book D",
        rating: 5,
        comment: "Fantastic resource! Exactly what I needed.",
      },
    ],
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    location: "Sydney, Australia",
    loyalty: "New",
    ltv: 199.99,
    lastPurchase: "2023-06-13",
    totalSpent: 199.99,
    engagementScore: 30,
    reviews: [
      {
        id: 5,
        product: "Digital Course A",
        rating: 3,
        comment: "Decent content, but expected more for the price.",
      },
    ],
  },
];

export default function CreatorDashboard() {
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [purchaseSearchTerm, setPurchaseSearchTerm] = useState("");
  const [responseText, setResponseText] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(customerSearchTerm.toLowerCase())
  );

  const filteredPurchases = purchaseHistory.filter(
    (purchase) =>
      purchase.id.toLowerCase().includes(purchaseSearchTerm.toLowerCase()) ||
      purchase.product
        .toLowerCase()
        .includes(purchaseSearchTerm.toLowerCase()) ||
      purchase.customer.toLowerCase().includes(purchaseSearchTerm.toLowerCase())
  );

  const getLoyaltyColor = (loyalty: string) => {
    switch (loyalty) {
      case "VIP":
        return "bg-green-500";
      case "Returning":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleRespond = (reviewId: number) => {
    toast.success(`Your response has been submitted successfully.`);
    setResponseText("");
  };

  const handleRefund = (orderId: string) => {
    toast.success(`Refund process started for order ${orderId}.`);
  };

  return (
    <DashboardContentLayout title="Customers Page">
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto"
        >
          <h1 className="text-3xl font-bold mb-6">Customers Page👥</h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Purchase History 📊</CardTitle>
                <CardDescription>
                  Recent purchases across all customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    type="search"
                    placeholder="Search purchases..."
                    value={purchaseSearchTerm}
                    onChange={(e) => setPurchaseSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <div className="max-h-80 overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPurchases.map((purchase) => (
                        <TableRow key={purchase.id}>
                          <TableCell className="font-medium">
                            {purchase.id}
                          </TableCell>
                          <TableCell>{purchase.date}</TableCell>
                          <TableCell>{purchase.product}</TableCell>
                          <TableCell>{purchase.customer}</TableCell>
                          <TableCell>${purchase.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                              onClick={() => handleRefund(purchase.id)}
                            >
                              <RefreshCcw className="mr-2 h-4 w-4" />
                              Refund
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="mb-6">
            <Input
              type="search"
              placeholder="Search customers..."
              value={customerSearchTerm}
              onChange={(e) => setCustomerSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Customer Profiles 👥</CardTitle>
                <CardDescription>
                  Detailed information about your customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-h-80 overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Loyalty</TableHead>
                        <TableHead>LTV</TableHead>
                        <TableHead>Last Purchase</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell className="font-medium">
                            {customer.name}
                          </TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.location}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getLoyaltyColor(
                                customer.loyalty
                              )}`}
                            >
                              {customer.loyalty}
                            </span>
                          </TableCell>
                          <TableCell>${customer.ltv}</TableCell>
                          <TableCell>{customer.lastPurchase}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>Send Email</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  Delete Customer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Customer Reviews ⭐</CardTitle>
                <CardDescription>
                  Recent product reviews from customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-80 overflow-auto">
                  {customers.flatMap((customer) =>
                    customer.reviews.map((review) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="border-b pb-4"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold">
                            {review.product}
                          </span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          {review.comment}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          by {customer.name}
                        </p>
                        <div className="mt-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                              >
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Respond
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Respond to Review</DialogTitle>
                                <DialogDescription>
                                  Write your response to the customer&apos;s
                                  review here. Click save when you&apos;re done.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <Textarea
                                  placeholder="Type your response here."
                                  value={responseText}
                                  onChange={(e) =>
                                    setResponseText(e.target.value)
                                  }
                                />
                              </div>
                              <DialogFooter>
                                <Button
                                  type="submit"
                                  className="bg-blue-600 hover:bg-blue-700 text-white"
                                  onClick={() => handleRespond(review.id)}
                                >
                                  Save Response
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-end"
          >
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="mr-2 h-4 w-4" /> Export Customer Data
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </DashboardContentLayout>
  );
}
