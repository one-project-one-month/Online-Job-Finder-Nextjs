import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center p-4 min-h-screen flex-col">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mb-4">
          Don&apos;t worry, we&apos;ve got plenty more job listings waiting just
          for you. Your dream job is just a few clicks away.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={"/"}
            className="flex items-center justify-center bg-primary px-4 py-2 text-white rounded-md hover:bg-primary/80 transition-colors gap-2"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
        </div>
      </div>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        If you believe this is an error, plaese contact our support team.
      </footer>
    </div>
  );
};

export default NotFoundPage;
