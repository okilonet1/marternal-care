"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { ResourceUploadSchema } from "@/types";
import { toast } from "sonner";
import { addResource } from "@/actions/resource.actions";

export function AddResourceForm() {
  const form = useForm<z.infer<typeof ResourceUploadSchema>>({
    resolver: zodResolver(ResourceUploadSchema),
    defaultValues: {
      author: "",
      description: "",
      doc: undefined,
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ResourceUploadSchema>) {
    const formData = new FormData();

    if (values.doc == undefined) {
      toast.error("Please Upload a Resume");
    } else if (values.doc[0].size > 5000000) {
      toast.error("Please your Resume should not be more than 5mb");
    } else {
      formData.append("doc", values.doc[0]);
      formData.append("desciption", values.description);
      formData.append("title", values.title);
      formData.append("author", values?.author || "");
    }

    const res = await addResource(formData);

    if (res.error) {
      toast.error(res.error);
    } else if (res.success) {
      toast.success("Resource added successfully!");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add new Resource</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new Resource</DialogTitle>
          <DialogDescription>
            {"Click Upload when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-8"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Lorem Ipsum" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Lorem Ipsum" multiple {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="doc"
                render={() => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <Input
                      type="file"
                      accept="application/pdf"
                      {...form.register("doc")}
                    />
                    <FormDescription>(PDF)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddResourceForm;
