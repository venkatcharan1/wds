
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 dark:bg-secondary/10">
      <div className="text-center max-w-md px-4">
        <h1 className="text-8xl font-bold text-primary mb-6">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="rounded-full">
          <a href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
