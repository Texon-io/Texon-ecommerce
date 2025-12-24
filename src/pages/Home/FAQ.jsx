import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../components/ui/accordion"

import SectionHeading from "../../components/ui/SectionHeading.jsx";

const faqData = [
    {
        question: "What is your return policy?",
        answer: "You can return items within 30 days of purchase for a full refund."
    },
    {
        question: "How long does shipping take?",
        answer: "Standard shipping takes 5-7 business days."
    },
    {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to over 50 countries worldwide."
    },
];

function FAQ() {
    return (
        <section className={`py-20 px-6 sm:px-20  w-full`}>
            <SectionHeading>We have got the answers to your questions</SectionHeading>


            <Accordion
                type="single"
                collapsible
                className="w-full text-brand-black"
                defaultValue="item-1"
            >
                {faqData.map((item, i) => (
                    <AccordionItem value={`item-${i+1}`}>
                        <AccordionTrigger >{item.question}</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p>
                                {item.answer}
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    )
}

export default FAQ;
