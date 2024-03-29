"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInSchema, SignUpSchema } from "@/types";
import { signIn } from "@/actions/auth.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CardItem } from "./ui/3d-card";
import Link from "next/link";

export function SignInForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    const res = await signIn(values);
    if (res.error) {
      toast.error(res.error);
    } else if (res.success) {
      toast.success("Logged In successfully!");
      router.push("/dashboard");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <CardItem
          translateZ="20"
          className="w-full text-xl font-bold text-neutral-600 dark:text-white"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="janedoe@email.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardItem>
        <CardItem
          translateZ="20"
          className="w-full text-xl font-bold text-neutral-600 dark:text-white"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="****" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardItem>

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
          variant={form.formState.isSubmitting ? "outline" : "default"}
        >
          {form.formState.isSubmitting ? "Loading..." : "Sign In"}
        </Button>

        <div className="mt-20 flex items-center justify-between">
          <div onClick={() => router.back()}>
            <CardItem
              translateZ={20}
              as="button"
              className="rounded-xl px-4 py-2 text-xs font-normal dark:text-white"
            >
              Go back
            </CardItem>
          </div>

          <Link href="/sign-up">
            <CardItem
              translateZ={20}
              as="button"
              className="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black"
            >
              Sign up
            </CardItem>
          </Link>
        </div>
      </form>
    </Form>
  );
}
