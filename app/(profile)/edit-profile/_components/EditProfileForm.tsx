"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema } from "@/helpers/validation/auth/edit-profile.validation";
import { Button } from "@/components/ui/button";
import { months } from "@/helpers/common/allmonths";
import { useGetCurrentUser } from "@/hooks/react-query/auth/get-current-user";
import { updateUserProfile } from "@/common/api/auth/auth.api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { queryClient } from "@/components/providers/ReactQuery.provider";

type Props = {
  userDetails: any;
};

const EditProfileForm: React.FC<Props> = ({ userDetails }) => {
  const router = useRouter();
  const generateRange = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };
  const currentYear = new Date().getFullYear();
  const days = generateRange(1, 31);
  const years = generateRange(currentYear - 100, currentYear).reverse();

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: userDetails?.name?.split(" ")[0],
      lastName: userDetails?.name?.split(" ")[1],
      phoneNumber: userDetails?.phoneNumber || "",
      day: userDetails?.dob?.split("-")[0],
      month: userDetails?.dob?.split("-")[1],
      year: userDetails?.dob?.split("-")[2],
    },
  });
  const onSubmit = async (values: z.infer<typeof editProfileSchema>) => {
    const data = {
      name: values?.firstName + " " + values?.lastName,
      email: userDetails?.email,
      dob: `${values.day}-${values.month}-${values.year}`,
      phoneNumber: values.phoneNumber,
    };
    await updateUserProfile(data);
    toast.success("Profile updated successfully");
    queryClient.invalidateQueries({ queryKey: ["current-user"] });
    router.push("/profile");
  };

  const { data, isFetching, isLoading } = useGetCurrentUser();
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 my-5 sm:my-10 z-0 flex justify-center">
      <Card className="w-full max-w-[781px] bg-[#BAE1D6] rounded-[25px] relative">
        <CardContent className="p-4 sm:p-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-8">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-[14px] sm:text-[16px] font-semibold text-[#2D3769] mb-2">
                        Name*
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full h-[40px] sm:h-[50px] bg-white rounded-[10px]"
                          placeholder="Enter First Name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-[14px] sm:text-[16px] font-semibold text-[#2D3769] mb-2">
                        Last name*
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full h-[40px] sm:h-[50px] bg-white rounded-[10px]"
                          placeholder="Enter Last Name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-x-8">
                  <p className="block text-[14px] sm:text-[16px] font-semibold text-[#2D3769] mb-2">
                    Email
                  </p>
                  <div className="col-span-1 sm:col-span-2">
                    <Input
                      name="email"
                      className="w-full h-[40px] sm:h-[50px] bg-white rounded-[10px]"
                      placeholder="Enter Email"
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-[14px] sm:text-[16px] font-semibold text-[#2D3769] mb-2">
                        Phone number*
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full h-[40px] sm:h-[50px] bg-white rounded-[10px]"
                          placeholder="Enter Phone Number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormLabel className="block text-left text-[12px] font-semibold text-[#2D3769] mb-2">
                  Date of birth*
                </FormLabel>
                <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-x-2">
                  <FormField
                    control={form.control}
                    name="day"
                    render={({ field }) => (
                      <FormItem className="w-full sm:w-[112px]">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full h-[40px] sm:h-[50px] bg-white rounded-[10px]">
                              <SelectValue placeholder="Day" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {days.map((day) => (
                              <SelectItem key={day} value={day.toString()}>
                                {day}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="month"
                    render={({ field }) => (
                      <FormItem className="w-full sm:w-[112px]">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full h-[40px] sm:h-[50px] bg-white rounded-[10px]">
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {months.map((month) => (
                              <SelectItem
                                key={month.value}
                                value={month.value.toString()}
                              >
                                {month.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem className="w-full sm:w-[112px]">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full h-[40px] sm:h-[50px] bg-white rounded-[10px]">
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-6">
                <Button
                  type="submit"
                  className="w-full sm:w-[258px] h-[40px] bg-[#00FFA3] text-[#4b62d2] rounded-[25px] font-extrabold text-[16px] sm:text-[19px]"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  onClick={() => router.push("/profile")}
                  className="w-full sm:w-[258px] h-[40px] bg-[#E81C1C] text-white rounded-[25px] font-extrabold text-[16px] sm:text-[19px]"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfileForm;
