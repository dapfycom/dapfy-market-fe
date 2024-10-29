"use client";

import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

const broadcastSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  content: z.string().min(1, "Email content is required"),
  targetAudience: z
    .array(z.string())
    .min(1, "Select at least one audience group"),
});

type BroadcastFormValues = z.infer<typeof broadcastSchema>;

export function BroadcastForm() {
  const [isSending, setIsSending] = useState(false);

  const form = useForm<BroadcastFormValues>({
    resolver: zodResolver(broadcastSchema),
    defaultValues: {
      subject: "",
      content: "",
      targetAudience: [],
    },
  });

  async function onSubmit(data: BroadcastFormValues) {
    try {
      setIsSending(true);
      // TODO: Implement your API call here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      toast.success("Broadcast sent successfully");
      form.reset();
    } catch (error) {
      toast.error("Failed to send broadcast");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject Line</FormLabel>
              <FormControl>
                <Input placeholder="Enter email subject..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Content</FormLabel>
              <FormControl>
                <Editor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Compose your email..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="targetAudience"
          render={() => (
            <FormItem>
              <FormLabel>Target Audience</FormLabel>
              <div className="flex flex-col space-y-2">
                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes("customers")}
                          onCheckedChange={(checked) => {
                            const value = checked
                              ? [...field.value, "customers"]
                              : field.value?.filter(
                                  (value) => value !== "customers"
                                );
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Customers (who purchased products)
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes("subscribers")}
                          onCheckedChange={(checked) => {
                            const value = checked
                              ? [...field.value, "subscribers"]
                              : field.value?.filter(
                                  (value) => value !== "subscribers"
                                );
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Newsletter Subscribers
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSending}>
          {isSending ? "Sending..." : "Send Broadcast"}
        </Button>
      </form>
    </Form>
  );
}
