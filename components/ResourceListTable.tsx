"use client";
import { FC, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card } from "./ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Article } from "@prisma/client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, Pencil, Trash } from "lucide-react";
import Link from "next/link";

interface ResourceListTableProps {
  resources: Article[];
}

interface SortingCriterion {
  sortBy: keyof Article;
  direction: "asc" | "desc";
}

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

const TableHeaderSort: FC<{
  sortBy: keyof Article;
  sortingCriteria: SortingCriterion[];
  onClick: (key: keyof Article) => void;
}> = ({ sortBy, sortingCriteria, onClick }) => {
  const criterion = sortingCriteria.find(
    (criterion) => criterion.sortBy === sortBy,
  );
  const directionIcon = criterion?.direction === "asc" ? "▲" : "▼";

  return (
    <TableHead>
      <button onClick={() => onClick(sortBy)}>
        {sortBy} {directionIcon}
      </button>
    </TableHead>
  );
};

const ResourceListTable: FC<ResourceListTableProps> = ({ resources }) => {
  const [selectAll, setSelectAll] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  const [filter, setFilter] = useState<string>("");
  const [sortingCriteria, setSortingCriteria] = useState<SortingCriterion[]>([
    { sortBy: "title", direction: "asc" },
  ]);

  const handleSortChange = (key: keyof Article) => {
    const index = sortingCriteria.findIndex(
      (criteria) => criteria.sortBy === key,
    );
    if (index === -1) {
      // If the key is not already in the sorting criteria, add it with the default direction "asc"
      setSortingCriteria([{ sortBy: key, direction: "asc" }]);
    } else {
      // If the key is already in the sorting criteria, toggle the direction
      setSortingCriteria((prevCriteria) => {
        const updatedCriteria = [...prevCriteria];
        updatedCriteria[index].direction =
          updatedCriteria[index].direction === "asc" ? "desc" : "asc";
        return updatedCriteria;
      });
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value.toLowerCase());
  };

  const filteredArticles = useMemo(() => {
    if (!filter) return resources;

    return resources.filter((article) => {
      const searchTerms = [article.title, article.description, article.author];

      return searchTerms.some((term) => term?.toLowerCase().includes(filter));
    });
  }, [filter, resources]);

  const sortedArticles = useMemo(() => {
    return [...filteredArticles].sort((a, b) => {
      for (const criterion of sortingCriteria) {
        const { sortBy, direction } = criterion;
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        // Handle nullish values
        if (aValue == null || bValue == null) {
          // Decide how to handle the case when one of the values is null or undefined
          // For example, you could place nulls/undefineds at the end or beginning
          // Here, I'm assuming nulls/undefineds should be considered greater than other values
          return aValue == null ? 1 : -1;
        }

        // Normal comparison if both values are not null or undefined
        if (aValue === bValue) continue;
        if (direction === "asc") {
          return aValue < bValue ? -1 : 1;
        } else {
          return aValue > bValue ? -1 : 1;
        }
      }
      return 0;
    });
  }, [filteredArticles, sortingCriteria]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast(JSON.stringify(data.items));
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Button
            size={"sm"}
            type="submit"
            disabled={
              form.formState.isSubmitting || form.getValues().items.length < 1
            }
          >
            <Trash />
          </Button>
          <div className="mb-2 p-4">
            <Input
              type="search"
              onChange={handleFilterChange}
              placeholder="Search"
            />
          </div>

          <Table>
            <TableCaption>List of Seats.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox
                    checked={
                      selectAll ||
                      form.getValues("items").length === resources.length
                    }
                    onCheckedChange={(checked) => {
                      setSelectAll(Boolean(checked));
                      if (checked) {
                        const allIds = resources.map((article) => article.id);
                        form.setValue("items", allIds);
                      } else {
                        form.setValue("items", []);
                      }
                    }}
                  />
                </TableHead>
                <TableHead>s/n</TableHead>
                <TableHeaderSort
                  sortBy="title"
                  sortingCriteria={sortingCriteria}
                  onClick={handleSortChange}
                />
                <TableHeaderSort
                  sortBy="author"
                  sortingCriteria={sortingCriteria}
                  onClick={handleSortChange}
                />
                <TableHeaderSort
                  sortBy="uploadedAt"
                  sortingCriteria={sortingCriteria}
                  onClick={handleSortChange}
                />
                <TableHead>actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedArticles.map((article, index) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name="items"
                      render={() => (
                        <FormItem>
                          <FormField
                            key={article.id}
                            control={form.control}
                            name="items"
                            render={({ field }) => {
                              return (
                                <FormItem key={article.id} className="">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(
                                        article.id,
                                      )}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              article.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== article.id,
                                              ),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                </FormItem>
                              );
                            }}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell>
                    {article.uploadedAt?.toDateString() ?? "Unknown"}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row gap-1">
                      <Link href={`/resource/${article.id}`}>
                        <Button size={"sm"} variant={"ghost"} type="button">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button size={"sm"} variant={"ghost"} type="button">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </form>
      </Form>
    </Card>
  );
};

export default ResourceListTable;
