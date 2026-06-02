import { Quote } from 'lucide-react';

type TestimonialProps = {
  quote: string;
  author: string;
  role: string;
  avatarInitial: string;
};

export function Testimonial({ quote, author, role, avatarInitial }: TestimonialProps) {
  return (
    <figure className="card p-8 md:p-12">
      <Quote className="h-7 w-7 text-brand-500" />
      <blockquote className="mt-6 text-xl md:text-2xl font-medium leading-relaxed text-ink-900 text-balance">
        “{quote}”
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-brand text-white font-extrabold shadow-brand">
          {avatarInitial}
        </span>
        <div>
          <div className="text-sm font-bold text-ink-900">{author}</div>
          <div className="text-xs text-ink-500">{role}</div>
        </div>
      </figcaption>
    </figure>
  );
}
