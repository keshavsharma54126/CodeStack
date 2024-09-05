import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const FeedButtons = React.memo(() => {
  const location = useLocation();
  const tabs = ["For you", "Subscriptions", "My Posts"];

  const getPath = (tab: string) => {
    switch (tab) {
      case "For you":
        return "/blogs";
      case "Subscriptions":
        return "/subscriptions";
      case "My Posts":
        return "/myblogs";
      default:
        return "";
    }
  };

  const getTabFromPath = (path: string) => {
    switch (path) {
      case "/blogs":
        return "For you";
      case "/subscriptions":
        return "Subscriptions";
      case "/myblogs":
        return "My Posts";
      default:
        return "For you";
    }
  };

  const [activeTab, setActiveTab] = useState(getTabFromPath(location.pathname));

  useEffect(() => {
    setActiveTab(getTabFromPath(location.pathname));
  }, [location.pathname]);

  return (
    <nav className="flex items-center justify-center gap-8 border-b border-gray-700 mt-20">
      {tabs.map((tab) => (
        <Link key={tab} to={getPath(tab)}>
          <div
            className={`px-4 py-2 cursor-pointer ${activeTab === tab ? "font-bold text-black" : "text-gray-800"}`}
            // onClick={() => setActiveTab(tab)}
            aria-selected={activeTab === tab}>
            {tab}
            {activeTab === tab && (
              <div className="h-1 mt-1 bg-black rounded-full" />
            )}
          </div>
        </Link>
      ))}
    </nav>
  );
});

export default FeedButtons;
