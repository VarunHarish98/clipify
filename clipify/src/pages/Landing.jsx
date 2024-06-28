import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
const LANDING_PAGE_CONTENT = (
  <div>
    The only URL Shortener <br /> you will ever need!👇
  </div>
);
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  accordianAns1,
  accordianAns2,
  accordianAns3,
  accordianQuest1,
  accordianQuest2,
  accordianQuest3,
} from "@/constants/constants";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [longUrl, setLongURL] = useState("");
  const navigate = useNavigate();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-white text-7xl sm:text-2xl lg:text-7xl my-20 font-extrabold text-center">
        {LANDING_PAGE_CONTENT}
      </h2>
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className="flex flex-row w-2/4 gap-2 items-center justify-center"
      >
        <Input
          placeholder="Enter your looooong url..."
          className="h-full text-white"
          type="url"
          value={longUrl}
          onChange={(e) => setLongURL(e.target.value)}
        />
        <Button type="submit" variant="destructive">
          Shorten!
        </Button>
      </form>
      <img src="src/assets/banner.jpeg" alt="banner" className="w-4/5 my-20" />
      <Accordion type="multiple" collapsible className="w-4/5 mb-10">
        <AccordionItem value="item-1">
          <AccordionTrigger>{accordianQuest1}</AccordionTrigger>
          <AccordionContent>{accordianAns1}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>{accordianQuest2}</AccordionTrigger>
          <AccordionContent>{accordianAns2}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>{accordianQuest3}</AccordionTrigger>
          <AccordionContent>{accordianAns3}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Landing;
