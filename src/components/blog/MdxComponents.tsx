import Image from 'next/image';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export const mdxComponents = {
  // Custom YouTube embed component for use inside MDX body
  YouTube: ({ id }: { id: string }) => (
    <div className="my-8 aspect-video w-full rounded-xl overflow-hidden shadow-lg border border-border">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  ),
  // Custom Callout component
  Callout: ({ title, children, type = 'info' }: { title?: string, children: React.ReactNode, type?: 'info' | 'warning' }) => (
    <div className={`my-6 px-6 py-4 rounded-xl border-l-4 ${type === 'warning' ? 'bg-amber-500/10 border-amber-500' : 'bg-primary/10 border-primary'}`}>
      {title && <h4 className="font-bold mb-2 mt-0">{title}</h4>}
      <div className="[&>p]:m-0 text-sm">{children}</div>
    </div>
  ),
  // FAQ Wrapper
  FAQ: ({ children }: { children: React.ReactNode }) => (
    <div className="my-8 border border-border rounded-xl p-6 bg-card">
      <h3 className="text-2xl font-bold mt-0 mb-4">Frequently Asked Questions</h3>
      <Accordion type="single" collapsible className="w-full">
        {children}
      </Accordion>
    </div>
  ),
  // FAQ Item
  FAQItem: ({ question, children, value }: { question: string, children: React.ReactNode, value?: string }) => {
    // Generate a default value if not provided explicitly
    const itemValue = value || question.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return (
      <AccordionItem value={itemValue} className="border-border">
        <AccordionTrigger className="text-left font-semibold text-base hover:text-primary">
          {question}
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground leading-relaxed prose prose-sm dark:prose-invert max-w-none">
          {children}
        </AccordionContent>
      </AccordionItem>
    );
  },
};
