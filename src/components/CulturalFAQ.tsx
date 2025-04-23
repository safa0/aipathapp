
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqList = [
  {
    question: "Hur kan jag förbättra min kommunikation med andra kulturer?",
    answer: "Läs på om de vanligaste hövlighetsfraserna, observera kroppsspråk och var nyfiken utan att vara påträngande. Lyssna aktivt och våga fråga om du är osäker.",
  },
  {
    question: "Vilken är den bästa första hälsningsfrasen i affärssammanhang internationellt?",
    answer: "En neutral och vänlig hälsning, exempelvis ‘Hej, trevligt att träffas!’ på engelska: ‘Hello, nice to meet you!’ fungerar nästan överallt. Undvik starka handslag där det inte är norm.",
  },
  {
    question: "Hur kan jag hantera missförstånd i ett samtal?",
    answer: "Var tålmodig och fråga öppet vad personen menar. Sammanfatta gärna vad du hört för att säkerställa att ni förstått varandra rätt.",
  },
  {
    question: "Kan jag använda informell ton på andra språk?",
    answer: "Det beror på situation och kultur. I formella affärssammanhang är det bäst att börja artigt och byta till mer avslappnad ton om motparten gör det.",
  },
];

const CulturalFAQ = () => (
  <div className="my-8">
    <h3 className="text-xl font-bold mb-4 flex items-center">
      <HelpCircle className="h-6 w-6 text-brand-purple mr-2" />
      Vanliga frågor & svar
    </h3>
    <Accordion type="single" collapsible className="w-full">
      {faqList.map((faq, idx) => (
        <AccordionItem key={idx} value={`faq-${idx}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

export default CulturalFAQ;
