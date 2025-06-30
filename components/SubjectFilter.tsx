"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useState } from "react";
import { subjects } from "@/constants";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [subject, setSubject] = useState("");

  useEffect(() => {
    let newUrl = "";
    if (subject === "All") {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["subject"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: subject,
      });
    }
    router.push(newUrl, { scroll: false });
  }, [router, pathname, searchParams, subject]);

  return (
    <Select
      onValueChange={(value) => {
        setSubject(value);
      }}
      value={subject}
      defaultValue={subject}
    >
      <SelectTrigger className="capitalize border border-black rounded-lg px-2 py-1">
        <SelectValue placeholder="Select the subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="capitalize">
          All Subjects
        </SelectItem>
        {subjects.map((subject) => (
          <SelectItem key={subject} value={subject} className="capitalize">
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
