"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

import { LoadingSwap } from "@/components/loading-swap";
import { LogoText } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { signUpSchema } from "@/features/auth/schemas";

export const SignUpForm = () => {
  const trpc = useTRPC();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const signInMutation = useMutation(
    trpc.auth.signUp.mutationOptions({
      onSuccess() {
        toast.success(
          "Account created successfully. Please check your email to verify your account.",
        );
      },
      onError(error) {
        toast.error(error.message);
      },
    }),
  );

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    signInMutation.mutate(values);
  };

  return (
    <div className="grid h-screen place-items-center px-4">
      <div className="mx-auto w-full max-w-md space-y-6">
        <Link href="/" className="item-center mx-auto flex w-48 justify-center">
          <LogoText className="w-48" />
        </Link>
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Sign Up
            </CardTitle>
            <CardDescription className="text-center">
              Fill in the form below to create an account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your email address"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative flex w-full">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="w-full pr-10"
                          />
                          <Button
                            type="button"
                            className="absolute top-1/2 right-1 -translate-y-1/2 hover:bg-transparent"
                            onClick={togglePassword}
                            variant="ghost"
                          >
                            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={signInMutation.isPending}
                >
                  <LoadingSwap isLoading={signInMutation.isPending}>
                    Continue
                  </LoadingSwap>
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
