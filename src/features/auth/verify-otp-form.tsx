"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";

import { SubjectType } from "@/lib/auth";

import { LogoText } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { verifyOtpSchema } from "@/features/auth/schemas";

type Props = {
  email: string;
  type: SubjectType;
};

export default function VerifyOTPForm({ email, type }: Props) {
  const form = useForm({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otpCode: "",
    },
  });

  const onSubmit = (values: z.infer<typeof verifyOtpSchema>) => {
    console.log({ values });
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
              Email Verification
            </CardTitle>
            <CardDescription className="text-center">
              Enter the 6-digits verification code that was sent to{" "}
              <strong>"{email}"</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  name="otpCode"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-center">
                      <FormLabel className="sr-only">
                        One Time Password
                      </FormLabel>
                      <FormControl className="flex items-center justify-center">
                        <InputOTP
                          maxLength={6}
                          {...field}
                          pattern={REGEXP_ONLY_DIGITS}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Verify OTP
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <div className="text-muted-foreground mx-auto text-sm tracking-tight">
              Don&apos; recive the code?{" "}
              <Button
                type="button"
                variant="ghost"
                className="text-foreground h-auto p-0"
              >
                Resend
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
