import Image from 'next/image';

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
};
