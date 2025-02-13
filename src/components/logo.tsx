import { cn } from "@/lib/utils";
import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  fontSize?: string;
  iconSize?: number;
}

const Logo = ({ fontSize = "2xl", iconSize = 20 }: Props) => {
  return (
    <Link
      href={"/"}
      className={cn(
        "text-2xl font-extrabold flex items-center justify-center gap-2",
        fontSize
      )}
    >
      <div className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 p-2">
        <BriefcaseBusiness size={iconSize} stroke="white" />
      </div>
      <div className="flex">
        <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
          Job
        </span>
        <p className="text-stone-700 dark:text-stone-300">Pulse</p>
      </div>
    </Link>
  );
};

export default Logo;
